import axios from 'axios';
import client from '../main.hypixel';
import { AucItem } from '../model/AucItem.interface';
import { Item } from '../model/Item.interface';
import { AuctionUtil } from '../util/AuctionUtil.hypixel';
import { FlipperUtil } from '../util/FlipperUtil.hypixel';
import { ItemlUtil } from '../util/ItemUtil.hypixel';
import fs from 'fs/promises';
import cachedb from '../../db/CacheDatabase.db';
import ahdb from '../../nitrate/collection/AuctionsCollection.collection';

import { Storage } from "@google-cloud/storage";
import { ServerStatsUtil } from '../../util/ServerStatsUtil.util';

var storage = new Storage({"projectId":"projectscyll","keyFilename":"./projectscyll-97351f835781.json"});

export class AuctionFlipper{
    public static async GetAllItemsFromAuctionsWithinTimeFrame(time:number,items:AucItem[]){
        var newItems : AucItem[] = [];

        for(var i = 0; i < items.length; i++){
            if(items[i].time <= time && items[i].time > 0){
                newItems.push(items[i]);
            }
        }

        newItems = newItems.sort((a, b): number =>{
            if(a.price < b.price){
                return -1;
            }else if(a.price > b.price){
                return 1;
            }else{
                return 0;
            }
        });


        return newItems;
    }

    public static async FindBestAuctionFlipByProfitRangeFirestore(profitrange:number){
        var allDocs = await ahdb.collection.where("end",">=",Date.now() - 1800000).get();
        var allDocsData: any = [];
        var endedCache = await cachedb.GetDocumentById("auctionprices");
       

        if(allDocs.empty == true){
            
            return undefined;
        }

        for(var i = 0; i <  allDocs.docs.length; i++){
            allDocsData.push(allDocs.docs[i].data());
        }

        var auctions : any = {"auctions":allDocsData};
        if(!endedCache || endedCache instanceof Error){
            return;
        }

        var foundItems = [];
        var amount = 0;

        var endedCacheKeys = Object.keys(endedCache);

        for(var i = 0; i < endedCacheKeys.length; i++){
            if( endedCacheKeys[i] == "enchanted book" || endedCacheKeys[i] == "hopper"  || endedCacheKeys[i] == "book"){
                continue;
            }

            if(endedCache[endedCacheKeys[i]].price < profitrange){
                
                continue;
            }
            
            foundItems.push(AuctionUtil.KeepIndex(i).then(index =>{
                return AuctionUtil.GetAllAuctionsOfItemWithCache(endedCacheKeys[index],auctions,null).then(items =>{
                    amount++;
                    if(items == undefined){
                        return undefined;
                    }
                    if(items.length == 0){
                        return undefined;
                    }
                    if(!endedCache || endedCache instanceof Error){
                        return;
                    }


                    //if()

                    for(var j = 0; j < items.length; j++){
                        if(items[j] == undefined){
                            console.log("yes");
                            return undefined;
                        }

                        if(endedCache[endedCacheKeys[index]].price - items[j].price >= profitrange && endedCache[endedCacheKeys[index]].price - items[j].price <= profitrange + (Math.round(profitrange * 1.5))){
                            return{"aucid":items[j].aucid,"item":items[j].item,"curprice":items[j].price,"profit":endedCache[endedCacheKeys[index]].price - items[j].price,"normalprice":endedCache[endedCacheKeys[index]].price};
                        }
                    }
                })
            }));
            

            
        }

        return Promise.all(foundItems).then(found =>{
            var finalItems = [];
            for(var i = 0; i < found.length; i++){
                if(found[i] != undefined){
                    finalItems.push(found[i]);
                }
            }
            console.log(finalItems.length);
           
            return {"item":finalItems[Math.floor(Math.random() * finalItems.length)]};
        })

    }

    public static currentlycaching : boolean = false;

    public static async FindBestAuctionFlipByProfitRange(profitrange:number){
        var foundItems: Promise<any>[] = [];

         var AhCache = false;

        // var getAhCache = async  () => new Promise((resolve,reject) =>{
        //     let buf = "";

        //     storage.bucket("projectscyllcache").file("auctioncache.json")
        //     .createReadStream()
        //     .on('data', d=> {buf += d})
        //     .on('end',() => resolve(JSON.parse(buf)));
        // });
        //(current time - 30 mins in milliseconds) <= other time
        var curtime = Date.now();
        if(AuctionFlipper.currentlycaching == false && AuctionUtil.auction.lastupdates == undefined||AuctionFlipper.currentlycaching == false && AuctionUtil.auction.lastupdates == 0 ||AuctionFlipper.currentlycaching == false && AuctionUtil.auction.lastupdates + 600000 <= curtime ){
            AuctionFlipper.currentlycaching = true;
            console.log("ooof");
            // await AuctionUtil.SaveAllAuctionsToGCS().then(final =>{
            // });
            
            // var getAhCache = async  () => new Promise((resolve,reject) =>{
            //     let buf = "";
    
            //     storage.bucket("projectscyllcache").file("auctioncache.json")
            //     .createReadStream()
            //     .on('data', d=> {buf += d})
            //     .on('end',() => resolve(JSON.parse(buf)));
            // });
            // var tempFile: any = await getAhCache();
            await AuctionUtil.SaveAllAuctionsToFile();
            var tempFile = JSON.parse((await fs.readFile(__dirname + "/../../../cache/hypixelcache/auction/auctioncache.json")).toString());
            AuctionFlipper.currentlycaching = false;
            
            AuctionUtil.auction.lastupdates = tempFile.timesincelastcall;
            AuctionUtil.auction.auctions = tempFile.auctions;
        }

        var endedCache = await cachedb.GetDocumentById("auctionprices");
        var endedCachev2 = await cachedb.GetDocumentById("auctionpricesv2");
        

        if(!endedCache || endedCache instanceof Error){
            return;
        }
        var endedCacheKeys = Object.keys(endedCache);

        for(var i = 0; i < endedCacheKeys.length; i++){
            if( endedCacheKeys[i] == "enchanted book" || endedCacheKeys[i] == "hopper"  || endedCacheKeys[i] == "book"){
                continue;
            }

            if(endedCache[endedCacheKeys[i]].price < profitrange){
                continue;
            }
            foundItems.push(AuctionUtil.KeepIndex(i).then(index =>{
                
                return AuctionUtil.GetAllAuctionsOfItemWithCache(endedCacheKeys[index],AuctionUtil.auction,endedCachev2).then(items =>{
                    if(items == undefined){
                        return undefined;
                    }
                    if(items.length == 0){
                        return undefined;
                    }
                    if(!endedCache || endedCache instanceof Error){
                        return;
                    }

                    //if()

                    for(var j = 0; j < items.length; j++){
                        if(items[j] == undefined){
                            return undefined;
                        }

                        if(endedCache[endedCacheKeys[index]].price - items[j].price >= profitrange && endedCache[endedCacheKeys[index]].price - items[j].price <= profitrange + (Math.round(profitrange * 1.5)) && items[j].price > endedCache[endedCacheKeys[index]].price * 0.1 && items[j].time < 2700000){
                            return {"aucid":items[j].aucid,"item":items[j].item,"curprice":items[j].price,"profit":endedCache[endedCacheKeys[index]].price - items[j].price,"normalprice":endedCache[endedCacheKeys[index]].price};
                        }
                    }
                })
            }));

            
            

            
        }




        return Promise.all(foundItems).then(found =>{
            
            var finalItemstemp: any = [];
            var finalItems: any = [];
            for(var i = 0; i < found.length; i++){
                if(found[i] != undefined){
                    
                    finalItemstemp.push(found[i]);
                }
            }
            finalItems = ItemlUtil.RemoveAllDuplicatesAuction(finalItemstemp);
            
            return {"item":finalItems[Math.floor(Math.random() * finalItems.length)],"allitems":finalItems,"ahcache":AhCache};
        })
    }

    public static async CompareAuctionsToLowestBIN(item:Item,auc:AucItem[]){
        
            if(item.dungeonItem == true){
                var flippable : Promise<any>[] = [];
                
                    for(var i = 0; i < auc.length - 1; i++){
                        flippable.push( ItemlUtil.getAmountOfStarsOnItemWithIndex(auc[i].item,i).then(amountOfStars =>{
                            
                            if(amountOfStars != undefined){
                                //console.log(auc);
                                var newAuc = [...auc];
                                
                                return FlipperUtil.GetLowestPriceOfDungeonItem(item,amountOfStars).then(itemamount =>{
                                   
                                    if(itemamount != undefined){
                                        if(itemamount.amount >= newAuc[i].price){
                                            return {"flip":true,"auction":newAuc[i],item:itemamount};
                                        }else{
                                            return {"flip":false,"auction":newAuc[i],item:itemamount};
                                        }
                                    }
                                });

                            }else{
                                return undefined;
                            }
                        }));


                    }

                    return Promise.all(flippable);
            }else{
               // var itemamount = await FlipperUtil.GetLowestPriceOfItem(item);
               // if(itemamount != undefined){
               //     for(var i = 0; i < auc.length; i++){
               //         if(itemamount.amount >= auc[i].price){
               //             flippable.push({"flip":true,"auction":auc[i],item:itemamount});
               //         }else{
               //             flippable.push({"flip":false,"auction":auc[i],item:itemamount});
               //         }
               //     }
//
               //     return flippable;
               // }

            }
            return undefined;

        


    }
    public static async CompareAuctionsToLowestBINWithoutAPICall(ah:AucItem[],item:Item,specific:AucItem[]){
        item.dungeonItem = true;
        if(item.dungeonItem == true){
            var flippable : Promise<any>[] = [];
            //console.log(specific[specific.length - 2]);
                for(var i = 0; i < specific.length; i++){
                    
                    flippable.push( ItemlUtil.getAmountOfStarsOnItemWithIndex(specific[i].item,i).then(amountOfStars =>{
                        //console.log("amount of stars",amountOfStars,"specific item",amountOfStars.item)
                        var amount = amountOfStars.index;
                        var specificItem = specific[amount];
                        if(amountOfStars.stars != undefined){
                            return FlipperUtil.GetLowestPriceOfDungeonItemWithoutAPICall(ah,item,amountOfStars.stars).then(itemamount =>{
                                //console.log(`amount of stars:${amountOfStars},  itemamount: ${itemamount?.item}, newSpef: ${ amountOfStars.item}`)
                                if(itemamount != undefined){
                                    if(itemamount.amount >= specificItem.price){
                                        var auctionItem : AucItem = {"item":amountOfStars.item,"aucid":specificItem.aucid,"bids":specificItem.bids,"bin":specificItem.bin,"item_bytes":specificItem.item_bytes,"lore":specificItem.lore,"price":specificItem.price,"time":specificItem.time,"start":specificItem.start,"end":specificItem.end};
                                        return {"flip":true,"auction":auctionItem,item:itemamount};
                                    }else{
                                        var auctionItem : AucItem = {"item":amountOfStars.item,"aucid":specificItem.aucid,"bids":specificItem.bids,"bin":specificItem.bin,"item_bytes":specificItem.item_bytes,"lore":specificItem.lore,"price":specificItem.price,"time":specificItem.time,"start":specificItem.start,"end":specificItem.end};
                                        return {"flip":false,"auction": auctionItem,item:itemamount};
                                    }
                                }
                            });

                        }else{
                            var newSpef = [...specific];
                            
                            return FlipperUtil.GetLowestPriceOfDungeonItemWithoutAPICall(ah,item,0).then(itemamount =>{
                                
                                if(itemamount != undefined){
                                    if(itemamount.amount >=  specificItem.price){
                                        var auctionItem : AucItem = {"item":amountOfStars.item,"aucid":specificItem.aucid,"bids":specificItem.bids,"bin":specificItem.bin,"item_bytes":specificItem.item_bytes,"lore":specificItem.lore,"price":specificItem.price,"time":specificItem.time,"start":specificItem.start,"end":specificItem.end};
                                        return {"flip":true,"auction":auctionItem,item:itemamount};
                                    }else{
                                        var auctionItem : AucItem = {"item":amountOfStars.item,"aucid":specificItem.aucid,"bids":specificItem.bids,"bin":specificItem.bin,"item_bytes":specificItem.item_bytes,"lore":specificItem.lore,"price":specificItem.price,"time":specificItem.time,"start":specificItem.start,"end":specificItem.end};
                                        return {"flip":false,"auction": auctionItem,item:itemamount};
                                    }
                                }
                            });
                        }
                    }));


                }

                return Promise.all(flippable).then(flipped =>{
                    
                    return flipped;
                });
        }else{

            var flippable: Promise<any>[] = [];

            for(var i = 0; i < specific.length; i++){
                flippable.push(AuctionUtil.KeepIndex(i).then(index =>{
                    FlipperUtil.GetLowestPriceOfItemWithoutAPICall(ah,item).then(itemamount =>{
                        var specificItem = specific[index];
                        if(itemamount != undefined){
                            if(itemamount.amount >= specificItem.price){
                                return {"flip":true,"auction":specificItem,item:itemamount};
                            }else{
                                return {"flip":false,"auction":specificItem,item:itemamount};
                            }
                        }
                    });
                }));
            }

            return Promise.all(flippable);

        }
        

    


}

    public static async CompareAuctionToAverageBIN(){

    }




}