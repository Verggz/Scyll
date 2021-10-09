import { AucItem } from "../model/AucItem.interface";
import { Book } from "../model/Book.interface";
import { BinUtil } from "./BinUtil.hypixel";
import { ItemlUtil } from "./ItemUtil.hypixel";
import { Storage } from "@google-cloud/storage";

var storage = new Storage({"projectId":"projectscyll","keyFilename":"./projectscyll-97351f835781.json"});

export class BookUtil{
    public static async GetAllBooksFromAh(){
        var curtime: number = Date.now();
        if(BinUtil.bin.lastupdates == undefined  && BinUtil.isupdating == false||BinUtil.bin.lastupdates == 0  &&  BinUtil.isupdating == false|| BinUtil.bin.lastupdates + 600000 <= curtime  &&  BinUtil.isupdating == false){
            console.log("ooof");
            BinUtil.isupdating = true;
            await BinUtil.SaveAllBinsToGCS();
            var getBinCache = async  () => new Promise((resolve,reject) =>{
                let buf = "";
    
                storage.bucket("projectscyllcache").file("bincache.json")
                .createReadStream()
                .on('data', d=> {buf += d})
                .on('end',() => resolve(JSON.parse(buf)));
            });
            var tempFile: any = await getBinCache();
            
            BinUtil.bin.lastupdates = tempFile.timesincelastcall;
            BinUtil.bin.auctions = tempFile.auctions;
            BinUtil.isupdating = false;
        }
        var allBooks : AucItem[] = [];
        for(var i = 0; i < BinUtil.bin.auctions.length; i++){
            if(BinUtil.bin.auctions[i].item.toLowerCase() == "enchanted book" && BinUtil.bin.auctions[i].bin){
                allBooks.push(BinUtil.bin.auctions[i]);
            }
        }

        return allBooks;
    }

    public static async GetBookStats(book: AucItem): Promise<Book | undefined>{
        var item: any = await ItemlUtil.ConvertItemBytesToItemData(book.item_bytes);

        if(item.value[0].tag.value.ExtraAttributes.value.enchantments == undefined){
            return undefined;
        }

        var name = Object.keys(item.value[0].tag.value.ExtraAttributes.value.enchantments.value);
        
        return {"level":item.value[0].tag.value.ExtraAttributes.value.enchantments.value[name[0]].value,"enchantment":name[0],"price":book.price};
    }

    public static async GetAllBooksByLevel(books: any[],level:number){
        var finalbooks = [];
        for(var i = 0; i < books.length; i++){
            if(books[i] == undefined){
                continue;
            }

            if(books[i].level == level){
                finalbooks.push(books[i]);
            }

        }

        return finalbooks;
    }

    public static async GetLowestPriceOfEachBook(books:Book[]){
        var allbooks: any = {};

        for(var i = 0; i < books.length; i++){
            if(!allbooks[books[i].enchantment]){
                allbooks[books[i].enchantment] = books[i];
            }else{
                if(allbooks[books[i].enchantment].price > books[i].price){
                    allbooks[books[i].enchantment] = books[i];
                }
            }
        }

        return allbooks;
    }

    
}