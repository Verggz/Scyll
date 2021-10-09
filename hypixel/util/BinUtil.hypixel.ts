import { Auction } from "hypixel-api-reborn";
import { AuctionUtil } from "./AuctionUtil.hypixel";
import { ItemlUtil } from "./ItemUtil.hypixel";

import { Storage } from "@google-cloud/storage";
import { AucItem } from "../model/AucItem.interface";
import { AuctionHouse } from "../model/AuctionHouse.interface";
import cachedb from '../../db/CacheDatabase.db';

import fs from 'fs/promises';
import fssync from 'fs';
import betterfs from 'fs-extra';

var storage = new Storage({"projectId":"projectscyll","keyFilename":"./projectscyll-97351f835781.json"});

export class BinUtil{

    public static bin: AuctionHouse = {"auctions":[],"lastupdates":0};
    public static sniped: any = {"timesincelastcall":0,"auctions":[]};
    public static isupdating: boolean = false;

    public static async SaveAllBinsToGCS(){
        var ah = await AuctionUtil.GetAllItemsFromAh();
        if(ah == undefined){
            return;
        }
        var trueAuctions = [];
        for(var i = 0; i < ah.length; i++){
            if(ah[i].bin != undefined){
                trueAuctions.push(ah[i]);
            }
        }
        return await storage.bucket('projectscyllcache').file("bincache.json").save(JSON.stringify({"timesincelastcall":Date.now(),auctions:trueAuctions}));
    }

    public static async SaveAllBinsToFile(){
        var ah = await AuctionUtil.GetAllItemsFromAh();
        if(ah == undefined){
            return;
        }
        var trueAuctions = [];
        for(var i = 0; i < ah.length; i++){
            if(ah[i].bin != undefined){
                trueAuctions.push(ah[i]);
            }
        }

        await betterfs.writeJSON(__dirname + "/../../../cache/bincache.json",{timesincelastcall:Date.now(),auctions:trueAuctions})

        return true;
    }

    public static async SaveAllBINItems(){
        var ah = await AuctionUtil.GetAllItemsFromAh();
        var itemBuffer = await ItemlUtil.GetAllitems();

        if(itemBuffer == undefined){
            return;
        }

        var allitems = JSON.parse(itemBuffer);
        var allitemskeys = Object.keys(allitems);

        var saved : Promise<any | undefined>[] = [];

        for(var i = 0; i < allitemskeys.length; i++){
            if(allitems[allitemskeys[i]].bazaar){
                continue;
            }

            saved.push(AuctionUtil.KeepIndex(i).then(index =>{
                var check: Promise<any>[] = [];
                if(ah == undefined){
                    return;
                }
                for(var j = 0; j < ah.length; i++){

                    if(!ah[j].bin){
                        continue;
                    }
                    
                    if(ah[j].item.toLowerCase().includes(allitems[allitemskeys[index]].name.toLowerCase())){
                        check.push(AuctionUtil.KeepIndex(j).then(otherindex =>{
                            if(ah == undefined){
                                return;
                            }
                            return AuctionUtil.GetAuctionItemID(ah[otherindex].item_bytes).then(id =>{
                                if(ah == undefined){
                                    return;
                                }

                                if(id == allitems[index]){
                                    return ItemlUtil.ConvertItemBytesToItemData(ah[otherindex].item_bytes).then(final =>{
                                        if(ah == undefined){
                                            return;
                                        }
                                        var finalitem: any = {"id":id,"name":allitems[allitemskeys[index]].name.trim(), "price":ah[otherindex].price,"itembytes":ah[otherindex].item_bytes}
                                        if(final.value[0].tag.value.display.value.Lore.value.value[final.value[0].tag.value.display.value.Lore.value.value.length - 1].replace(/\u00A7[0-9A-FK-OR]/ig,'').split(" ")[0].trim() == "a"){
                                            finalitem["rarity"] = final.value[0].tag.value.display.value.Lore.value.value[final.value[0].tag.value.display.value.Lore.value.value.length - 1].replace(/\u00A7[0-9A-FK-OR]/ig,'').split(" ")[1];
                                        }else{
                                            finalitem["rarity"] = final.value[0].tag.value.display.value.Lore.value.value[final.value[0].tag.value.display.value.Lore.value.value.length - 1].replace(/\u00A7[0-9A-FK-OR]/ig,'').split(" ")[0];
                                        }
                                    
                                        if(final.value[0].tag.value.ExtraAttributes.value.dungeon_item_level){
                                            finalitem["stars"] = final.value[0].tag.value.ExtraAttributes.value.dungeon_item_level.value;
                                        }
        
                                        if(final.value[0].tag.value.ExtraAttributes.value.modifier){
                                            finalitem["reforge"] = final.value[0].tag.value.ExtraAttributes.value.modifier.value;
                                        }

                                        return finalitem;
                                    })
                                    
                                }else{
                                    return undefined;
                                }
                            })
                        }));
                    }
                }

                return Promise.all(check).then(allitems =>{
                    return allitems.sort((a,b): number =>{
                        if(a.price < b.price){
                            return -1;
                        }else if(a.price > b.price){
                            return 1;
                        }else{
                            return 0;
                        }
                    })[0];
                });
            }));
        }

        return Promise.all(saved).then(final =>{
            var binfile: any = {};
            for(var i = 0; i < final.length; i++){
                if(final[i] == undefined){
                    continue;
                }

                binfile[final[i].id] = final[i];
            }

            return binfile;
        });


    }

    public static async SaveAllSecondLowestSnipeToFile(){
        var bin = await betterfs.readJSON(__dirname + "/../../../cache/bincache.json")
        if(bin.timesincelastcall <= 0 || bin.timesincelastcall + 120000 <= Date.now()){
            return;
        }

       bin.auctions = bin.auctions.sort((a: any, b: any): number =>{
            if(a.price < b.price){
                return -1;
            }else if(a.price > b.price){
                return 1;
            }else{
                return 0;
            }
        });
        var allitems = JSON.parse((await fs.readFile(__dirname + "/../../../cache/hypixelcache/items.json")).toString());
        var endedCache = await cachedb.GetDocumentById("auctionpricesv2");

        if(endedCache == undefined ||endedCache == false || endedCache instanceof Error) return;

        var endedCacheKeys = Object.keys(endedCache);

        var lowest: Promise<any>[] = [];

        for(var i = 0; i < endedCacheKeys.length; i++){

            lowest.push(AuctionUtil.KeepIndex(i).then(index =>{
                if(endedCache == undefined ||endedCache == false || endedCache instanceof Error) return;
                var cacheKeyArr = endedCacheKeys[index].split("_")
                var stars: number = parseInt(cacheKeyArr.pop() as string);
                
                if(endedCache[cacheKeyArr.join("_") +"_"+ String(stars + 1)]){
                    if(endedCache[cacheKeyArr.join("_") +"_"+ String(stars)].price > endedCache[cacheKeyArr.join("_") +"_"+ String(stars + 1)]){
                        return undefined;
                    }
                }
                return BinUtil.GetLowestAndSecondLowestOfBIN(bin,endedCache[endedCacheKeys[index]],allitems[endedCache[endedCacheKeys[index]].id].name)
            }))
            
        }

        return Promise.all(lowest).then(items =>{
            var viableitems = [];
            for(var i = 0; i < items.length; i++){
                if(items[i] == undefined){
                    continue;
                }

                if(items[i][1].price - items[i][0].price > 0){
                    viableitems.push(items[i]);
                }
            }
            BinUtil.sniped = {"timesincelastcall":Date.now(),"auctions":viableitems};

            fs.writeFile(__dirname + "/../../../cache/result/binresults.json",JSON.stringify({"timesincelastcall":Date.now(),"auctions":viableitems}));
            return viableitems;
        })
    }

    public static async GetLowestAndSecondLowestOfBIN(bin:any,item:any,itemname:string){
        var twolowest = [];
        for(var i = 0; i < bin.auctions.length; i++){
            if(twolowest.length >= 2){
                break;
            }
            if(bin.auctions[i].item.toLowerCase().includes(itemname.toLowerCase())){
                var amountofstars = await ItemlUtil.getAmountOfStarsOnItem(bin.auctions[i].item.toLowerCase().trim());
                if(amountofstars.stars == undefined){
                    amountofstars.stars = 0;
                }

                if(item.stars == amountofstars.stars){
                    var id = await AuctionUtil.GetAuctionItemID(bin.auctions[i].item_bytes);
                    if(id == "ENCHANTED_BOOK") continue;

                    twolowest.push({"id":id,"stars":amountofstars.stars,"aucid":bin.auctions[i].aucid,"price":bin.auctions[i].price,"item":bin.auctions[i].item});
                }
            }
        }

        if(twolowest.length < 2){
            return undefined;
        }

        return twolowest;

        
    }

    public static async GetAllBINsOfItemWithPrice(item:string,itemid:string,v2:any){
        var items : any[] = [];
        var v2item: any = {};

        for(var i = 0; i < BinUtil.bin.auctions.length; i++){
            if(BinUtil.bin.auctions[i].item.toLowerCase().includes(item.toLowerCase())){
                var amountofstars = await ItemlUtil.getAmountOfStarsOnItem(BinUtil.bin.auctions[i].item.toLowerCase().trim());
                if(amountofstars.stars == undefined){
                    amountofstars.stars = 0;
                }

                var id = await AuctionUtil.GetAuctionItemID(BinUtil.bin.auctions[i].item_bytes);
                if(id == "ENCHANTED_BOOK") continue;
                
                if(v2[id + "_" + amountofstars.stars]){
                    if(v2[id + "_" + amountofstars.stars].timestamp + 1800000 > Date.now()){
                        if(v2[id + "_" + amountofstars.stars + 1]){

                            if(v2[id + "_" + amountofstars.stars].price <= v2[id + "_" + amountofstars.stars + 1].price){
                                items.push({"id":id,"stars":amountofstars.stars,"aucid":BinUtil.bin.auctions[i].aucid,"price":BinUtil.bin.auctions[i].price,"item":BinUtil.bin.auctions[i].item});
                            }
                        }else{
                            items.push({"id":id,"stars":amountofstars.stars,"aucid":BinUtil.bin.auctions[i].aucid,"price":BinUtil.bin.auctions[i].price,"item":BinUtil.bin.auctions[i].item});
                        }

                        if(!v2item[id + "_" + amountofstars.stars]){
                            v2item[id + "_" + amountofstars.stars] = v2[id + "_" + amountofstars.stars];
                        }
                    }
                    

                   
                }

                   
            }
        }

        items = items.sort((a, b): number =>{
            if(a.price < b.price){
                return -1;
            }else if(a.price > b.price){
                return 1;
            }else{
                return 0;
            }
        });
        
        return {"allitems":items,"cacheitem":v2item};
    
    }

    public static async SaveAllSnipesToFile(){
        if(BinUtil.bin.lastupdates <= 0 || BinUtil.bin.lastupdates + 120000 <= Date.now() || BinUtil.isupdating){
            return;
        }

        BinUtil.bin.auctions = BinUtil.bin.auctions.sort((a, b): number =>{
            if(a.price < b.price){
                return -1;
            }else if(a.price > b.price){
                return 1;
            }else{
                return 0;
            }
        });

        var endedCache = await cachedb.GetDocumentById("auctionprices");
        var endedCachev2 = await cachedb.GetDocumentById("auctionpricesv2");

        if(!endedCache || endedCache instanceof Error) return;

        var endedCacheKeys = Object.keys(endedCache);

        var allItems: Promise<any>[] = [];

        for(var i = 0; i < endedCacheKeys.length; i++){
            allItems.push(BinUtil.GetAllBINsOfItemWithPrice(endedCacheKeys[i],"",endedCachev2))
        }

        return Promise.all(allItems).then(final =>{
            var flipitems: any[] = [];
            console.log(final.length);
            var none = 0;
            for(var i = 0; i < final.length; i++){
                if(final[i] == undefined){
                    none++;
                    continue;
                }

                for(var j = 0; j < final[i].allitems.length; j++){
                    flipitems.push({"item":final[i].allitems[j],"usual":final[i].cacheitem[final[i].allitems[j].id + "_" + final[i].allitems[j].stars]});
                }
            }

            console.log(none);
            BinUtil.sniped = {"timesincelastcall":Date.now(),"auctions":flipitems};

            fs.writeFile(__dirname + "/../../../cache/result/binresults.json",JSON.stringify({"timesincelastcall":Date.now(),"auctions":flipitems}));

            return flipitems;

            
        });

    }
}