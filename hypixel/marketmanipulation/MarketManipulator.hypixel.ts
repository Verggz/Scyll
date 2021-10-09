import { BinUtil } from "../util/BinUtil.hypixel";
import { Storage } from "@google-cloud/storage";
import { AucItem } from "../model/AucItem.interface";

var storage = new Storage({"projectId":"projectscyll","keyFilename":"./projectscyll-97351f835781.json"});

var isupdating: boolean = false;

export class MarketManipulator{
    public static async FindManipByNameAndStartPrice(name:string,pricefor1:number){
        var curtime = Date.now()
        if(BinUtil.bin.lastupdates == undefined && BinUtil.isupdating == false||BinUtil.bin.lastupdates == 0  && BinUtil.isupdating == false|| BinUtil.bin.lastupdates + 6000000 <= curtime  && BinUtil.isupdating == false){
            BinUtil.isupdating = true;
            console.log("ooof");
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

        var allofitem: AucItem[] = [];
        var allofitemprice: number[] = [];
        for(var i = 0; i < BinUtil.bin.auctions.length; i++){
            if(BinUtil.bin.auctions[i].item.toLowerCase().includes(name)){
                allofitem.push(BinUtil.bin.auctions[i]);
                allofitemprice.push(BinUtil.bin.auctions[i].price);
            }
        }

        allofitemprice = allofitemprice.sort((a,b): number =>{
            return a -b;
        });

        if(allofitemprice.length == 0){
            console.log("length ");
            return false;
        }

        var closestprice: number = allofitemprice.reduce((prev, curr) => Math.abs(curr - pricefor1) < Math.abs(prev - pricefor1) ? curr : prev);
        var closestpriceindex = allofitemprice.indexOf(closestprice);
        allofitemprice = allofitemprice.slice(closestpriceindex);

        if(allofitemprice.length == 0){
            return false;
        }

        var closestflipprice: number = allofitemprice.reduce((prev, curr) => Math.abs(curr - Math.ceil(pricefor1 * 1.75)) < Math.abs(prev -  Math.ceil(pricefor1 * 1.75)) ? curr : prev);

        if(closestprice == closestflipprice){
            console.log("same");
            return false;
        }else{
           
            var closestflippriceindex: number = allofitemprice.indexOf(closestflipprice);

            var itemstobuy = [];
            var total = 0;
            var profit = 0;

            for(var i = 0; i < closestflippriceindex; i++){
                total += allofitemprice[i];
                profit += closestflipprice - allofitemprice[i];
                itemstobuy.push(allofitemprice[i]);
            }

            console.log(profit);


            return {"itemstobuy": itemstobuy, "totalcost": total,"profit":profit,"amountofitems":itemstobuy.length,"margin":1.75,"final":closestflipprice};
        }

    }

    public static async FindManipWithStartAndEndPrice(name:string,startprice:number,endprice: number){
        var curtime: number = Date.now();
        if(BinUtil.bin.lastupdates == undefined  && isupdating == false||BinUtil.bin.lastupdates == 0  && isupdating == false|| BinUtil.bin.lastupdates + 600000 <= curtime  && isupdating == false){
            console.log("ooof");
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
        }

        var allofitem: AucItem[] = [];
        var allofitemprice: number[] = [];

        for(var i = 0; i < BinUtil.bin.auctions.length; i++){
            if(BinUtil.bin.auctions[i].item.toLowerCase().includes(name)){
                allofitem.push(BinUtil.bin.auctions[i]);
                allofitemprice.push(BinUtil.bin.auctions[i].price);
            }
        }

        allofitemprice = allofitemprice.sort((a,b): number =>{
            return a -b;
        });

        if(startprice >= endprice){
            return "starthigherthanend";
        }
        if(allofitemprice.length == 0){
            return "invaliditem";
        }

        var closeststartprice: number = allofitemprice.reduce((prev, curr) => Math.abs(curr - startprice) < Math.abs(prev - startprice) ? curr : prev);
        var closeststartpriceindex: number = allofitemprice.indexOf(closeststartprice);

        allofitemprice = allofitemprice.slice(closeststartpriceindex);

        if(allofitemprice.length == 0){
            console.log("length ");
            return false;
        }

        var closestendprice: number = allofitemprice.reduce((prev, curr) => Math.abs(curr - endprice) < Math.abs(prev - endprice) ? curr : prev);
        var closestendpriceindex: number = allofitemprice.indexOf(closestendprice);

        if(closeststartprice == closestendprice){
            return "tooclose";
        }

        allofitemprice = allofitemprice.slice(0,closestendpriceindex);

        if(allofitemprice.length == 0){
            console.log("length ");
            return false;
        }



        var itemstobuy = [];
        var total = 0;
        var profit = 0;

        for(var i = 0; i < allofitemprice.length; i++){
            total += allofitemprice[i];
            profit += closestendprice - allofitemprice[i];
            itemstobuy.push(allofitemprice[i]);
        }




        return {"itemstobuy": itemstobuy, "totalcost": total,"profit":profit,"amountofitems":itemstobuy.length};
    }
}