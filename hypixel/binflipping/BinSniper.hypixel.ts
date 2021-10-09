import { BinUtil } from "../util/BinUtil.hypixel";
import { Storage } from "@google-cloud/storage";

import cachedb from '../../db/CacheDatabase.db';
import { AuctionUtil } from "../util/AuctionUtil.hypixel";
import { ItemlUtil } from "../util/ItemUtil.hypixel";
import fs from 'fs/promises';

var storage = new Storage({"projectId":"projectscyll","keyFilename":"./projectscyll-97351f835781.json"});

export class BinSniper{
    public static async FindSnipeByProfitWithFile(profit:number){
        if(BinUtil.sniped.timesincelastcall <= 0){
            var file = JSON.parse((await fs.readFile(__dirname + "/../../../cache/result/binresults.json")).toString());
            var viable = [];
    
            console.log(file.auctions.length);
    
            for(var i = 0; i < file.auctions.length; i++){
                if(file.auctions[i].item.price < profit){
                    continue;
                }
    
                if(file.auctions[i].usual.price - file.auctions[i].item.price >= profit && file.auctions[i].usual.price - file.auctions[i].item.price <= profit * 1.5){
                    viable.push({"item":file.auctions[i].item,"usual":file.auctions[i].usual});
                }
            }
    
    
    
            return {"random":viable[Math.floor(Math.random() * viable.length)],all:viable};
        }else{
            var viable = [];

            for(var i = 0; i < BinUtil.sniped.auctions.length; i++){
                if(BinUtil.sniped.auctions[i].item.price < profit){
                    continue;
                }

                if(BinUtil.sniped.auctions[i].usual.price - BinUtil.sniped.auctions[i].item.price >= profit && BinUtil.sniped.auctions[i].usual.price - BinUtil.sniped.auctions[i].item.price <= profit * 1.5){
                    viable.push({"item":BinUtil.sniped.auctions[i].item,"usual":BinUtil.sniped.auctions[i].usual});
                }

                
            }

            return {"random":viable[Math.floor(Math.random() * viable.length)],all:viable};
        }



    }

    public static async FindAllSnipesWithTwoLowestFile(profit:number){
        if(BinUtil.sniped.timesincelastcall <= 0){
            var file = JSON.parse((await fs.readFile(__dirname + "/../../../cache/result/binresults.json")).toString());
            var viable: any[] = [];
    
            console.log(file.auctions.length);
    
            for(var i = 0; i < file.auctions.length; i++){
                if(file.auctions[i][0] < profit){
                    continue;
                }

                if(file.auctions[i][1].price - file.auctions[i][0].price >= profit && file.auctions[i][1].price - file.auctions[i][0].price <= profit * 1.4){
                    viable.push({"item":file.auctions[i][0],"usual":file.auctions[i][1]})
                }
            }
    
    
    
            return {"random":viable[Math.floor(Math.random() * viable.length)],all:viable};
        }else{
            var viable = [];

            for(var i = 0; i < BinUtil.sniped.auctions.length; i++){
                if(BinUtil.sniped.auctions[i][0].price < profit){
                    continue;
                }

                if(BinUtil.sniped.auctions[i][1].price - BinUtil.sniped.auctions[i][0].price >= profit && BinUtil.sniped.auctions[i][1].price - BinUtil.sniped.auctions[i][0].price <= profit * 1.5){
                    viable.push({"item":BinUtil.sniped.auctions[i][0],"usual":BinUtil.sniped.auctions[i][1]});
                }

                
            }

            return {"random":viable[Math.floor(Math.random() * viable.length)],all:viable};
        }

       
    }
    public static async FindSnipeByProfit(profit:number){
        var curtime: number = Date.now();
        if(BinUtil.bin.lastupdates == undefined  && BinUtil.isupdating == false||BinUtil.bin.lastupdates == 0  &&  BinUtil.isupdating == false|| BinUtil.bin.lastupdates + 120000 <= curtime  &&  BinUtil.isupdating == false){
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
        console.log("done");

        BinUtil.bin.auctions = BinUtil.bin.auctions.sort((a, b): number =>{
            if(a.price < b.price){
                return -1;
            }else if(a.price > b.price){
                return 1;
            }else{
                return 0;
            }
        })

        var endedCache = await cachedb.GetDocumentById("auctionprices");
        var endedCachev2 = await cachedb.GetDocumentById("auctionpricesv2");

        if(!endedCache || endedCache instanceof Error) return;

        var endedCacheKeys = Object.keys(endedCache);

        var allItems: Promise<any>[] = [];

        for(var i = 0; i < endedCacheKeys.length; i++){
            if(endedCache[endedCacheKeys[i]].price < profit){
                continue;
            }
            allItems.push(AuctionUtil.KeepIndex(i).then(index =>{
                return BinUtil.GetAllBINsOfItemWithPrice(endedCacheKeys[index],"",endedCachev2).then(items =>{
                    var viable = [];
                    if(items == undefined){
                        return undefined;
                    }
                    if(items.allitems.length == 0){
                        return undefined;
                    }
                    if(!endedCache || endedCache instanceof Error){
                        return;
                    }
                        //console.log(items);
                    
                    
                
                    for(var j = 0; j < items.allitems.length; j++){
                        if(items.allitems[j] == undefined){
                            console.log("yes1");
                            continue;
                        }
                        //console.log("price",items.allitems[j].price,"profit",profit,"yes",items.allitems[j].price < profit);
                        if(items.allitems[j].price < profit){
                            //console.log("yes2");
                            continue;
                        }

                        if(items.allitems[j].id == undefined){
                            console.log("yes3");
                            continue;
                        }

                        if( items.allitems[j].stars == undefined){
                            console.log("yes4");
                            continue;
                        }
                        if(items.cacheitem[items.allitems[j].id + "_" + items.allitems[j].stars].price - items.allitems[j].price >= profit &&  items.cacheitem[items.allitems[j].id + "_" + items.allitems[j].stars].price - items.allitems[j].price <= profit * 1.5){
                            viable.push({"aucid":items.allitems[j].aucid,"item":items.allitems[j].item,"curprice":items.allitems[j].price,"profit":items.cacheitem[items.allitems[j].id + "_" + items.allitems[j].stars].price - items.allitems[j].price,"normalprice":items.cacheitem[items.allitems[j].id + "_" + items.allitems[j].stars].price});
                        }




                    }
                    

                    return viable;

    
                })
            }));
        }

        return Promise.all(allItems).then(final =>{
            var finalItems: any[] = [];

            for(var i = 0; i < final.length; i++){
                if(final[i] != undefined){
                    for(var j = 0; j< final[i].length; j++){
                        finalItems.push(final[i][j]);
                    }
                    
                }
                
            }

            finalItems = finalItems.sort((a, b): number =>{
                if(a.price < b.price){
                    return -1;
                }else if(a.price > b.price){
                    return 1;
                }else{
                    return 0;
                }
            });
            


            return {"item":finalItems[Math.floor(Math.random() * finalItems.length)],"allitems":finalItems};
        })
    }
}