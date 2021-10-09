import { AucItem } from "../model/AucItem.interface";
import { Book } from "../model/Book.interface";
import { BookUtil } from "../util/BookUtil.hypixel";

import cachedb from '../../db/CacheDatabase.db';

export class BookFlipper{
    public static async FindBestBookToFlipByMarginCache(){
        var bookprices = await cachedb.GetDocumentById("bookprice");

        if(bookprices && !(bookprices instanceof Error)){
            return bookprices;
        }else{
            return undefined;
        }
    }

    public static async FindBestBookToFlipByMargin(ah:AucItem[]){
        return BookUtil.GetAllBooksFromAh().then(books =>{
            var allBooks: Promise<Book | undefined>[] = [];
            for(var i = 0; i < books.length; i++){
                allBooks.push(BookUtil.GetBookStats(books[i]).then(book =>{
                    if(book != undefined){
                        return book;
                    }
                }));
            }

            return Promise.all(allBooks).then(finalbooks =>{
                var actualbooks: any[] = [];
                for(var i = 0; i < finalbooks.length; i++){
                    if(finalbooks[i] == undefined){
                        continue;
                    }
                    actualbooks.push(finalbooks[i]);
                }
                var lvl1books = [];
                var lvl5books: any[] = [];
                for(var i = 0; i < actualbooks.length; i++){
                    if(actualbooks[i].level == 1){
                        lvl1books.push(actualbooks[i]);
                    }
                    if(actualbooks[i].level == 5){
                        lvl5books.push(actualbooks[i]);
                    }
                }

                return BookUtil.GetLowestPriceOfEachBook(lvl1books).then(lowestlvl1 =>{
                    return BookUtil.GetLowestPriceOfEachBook(lvl5books).then(lowestlvl5 =>{
                        var margin = [];
                        var bookUtilKeys = Object.keys(lowestlvl5);

                        for(var i = 0; i < bookUtilKeys.length; i++){
                            if(lowestlvl1[bookUtilKeys[i]] == undefined){
                                continue;
                            }
                            if(lowestlvl1[bookUtilKeys[i]].price * 16 < lowestlvl5[bookUtilKeys[i]].price && lowestlvl5[bookUtilKeys[i]].price >= 500000){
                                margin.push({"book":bookUtilKeys[i],"lvl5price":lowestlvl5[bookUtilKeys[i]].price,"lvl1price":lowestlvl1[bookUtilKeys[i]].price,"totalcraftprice":lowestlvl1[bookUtilKeys[i]].price * 16,"margin":((lowestlvl5[bookUtilKeys[i]].price - lowestlvl1[bookUtilKeys[i]].price * 16) / (lowestlvl1[bookUtilKeys[i]].price * 16)) * 100});
                            }
                        }
                        margin = margin.sort((a, b): number =>{
                            if(a.margin > b.margin){
                                return -1;
                            }else if(a.margin < b.margin){
                                return 1;
                            }else{
                                return 0;
                            }
                        });

                        cachedb.SetDocument("bookprice",{"timesincelastcall":Date.now(),books:margin}, {"merge":true});

                        return margin;
                    });
                });

                
            });
        })
    }

}