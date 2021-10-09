import axios from "axios";
import { AucItem } from "../model/AucItem.interface";
import { Item } from "../model/Item.interface";
import { FlipperUtil } from "./FlipperUtil.hypixel";
import hypixelapi from '../main.hypixel';
import { SoldAuction } from "../model/SoldAuction.interface";
import { ItemlUtil } from "./ItemUtil.hypixel";
import fs from 'fs/promises';

import { Storage } from "@google-cloud/storage";
import CacheDatabaseDb from "../../db/CacheDatabase.db";
import { AuctionHouse } from "../model/AuctionHouse.interface";

var storage = new Storage({"projectId":"projectscyll","keyFilename":"./projectscyll-97351f835781.json"});

export class AuctionUtil{
    public static auction: AuctionHouse = {"auctions":[],"lastupdates":0};
    public static isDerpy: boolean = false;
    public static async GetAllItemsFromAh(): Promise<AucItem[] | undefined>{
        if(!FlipperUtil.makingrequest || !AuctionUtil.isDerpy){
            //FlipperUtil.makingrequest = true;
            var page = await axios.get("https://api.hypixel.net/skyblock/auctions?page=0");
            var allPages: Promise<any>[] = [];


           for(var i = 0; i < page.data.totalPages - 1; i++){
               
                allPages.push( axios.get(`https://api.hypixel.net/skyblock/auctions?page=${i}`).then(res =>{
                    var allAucItems : AucItem[]= [];
                    
                    for(var j = 0; j < res.data.auctions.length; j++){
                        if(res.data.auctions[j] == undefined){
                            continue;
                        }
                        if(res.data.auctions[j].highest_bid_amount != 0){

                            allAucItems.push({"aucid":res.data.auctions[j].uuid,"item":res.data.auctions[j].item_name,"price":res.data.auctions[j].highest_bid_amount,"time":res.data.auctions[j].end - Date.now(),"bin":res.data.auctions[j].bin,"lore":res.data.auctions[j].item_lore,"bids":res.data.auctions[j].bids,"item_bytes":res.data.auctions[j].item_bytes,"start":res.data.auctions[j].start,"end":res.data.auctions[j].end});
                        }else{
                            allAucItems.push({"aucid":res.data.auctions[j].uuid,"item":res.data.auctions[j].item_name,"price":res.data.auctions[j].starting_bid,"time":res.data.auctions[j].end  - Date.now(),"bin":res.data.auctions[j].bin,"lore":res.data.auctions[j].item_lore,"bids":res.data.auctions[j].bids,"item_bytes":res.data.auctions[j].item_bytes,"start":res.data.auctions[j].start,"end":res.data.auctions[j].end});
                        }
                        
                    }
                    
                    return allAucItems;
                }).catch(e =>{
                    return undefined;
                }));
                
           }
          
           return Promise.all(allPages).then((data: AucItem[][]) =>{
            //FlipperUtil.makingrequest = false;
            var end = Date.now();
            var allactiveItems : AucItem[] = [];
            //console.log(data);
            
            if(data !== []){
                for(var i = 0; i < data.length; i++){
                    if(data[i] == undefined){
                        continue;
                    }
                    if(data[i].length != 0){
                        for(var j = 0; j < data[i].length; j++){
                            allactiveItems.push({"item":data[i][j].item,"aucid":data[i][j].aucid,"price":data[i][j].price,"bin":data[i][j].bin,"time":data[i][j].time,"lore":data[i][j].lore,"bids":data[i][j].bids,"item_bytes":data[i][j].item_bytes,"start":data[i][j].start,"end":data[i][j].end});
                        }
                       
                    }
                }
                
                return allactiveItems;
            }else{
                return undefined;
            }
            
           });
            //console.log(res);
            
        }else{
            
            return undefined;
        }
    }


    public static async GetAllAuctionsOfItemWithCache(item: string,auctionFile:any,v2:any){
        if(item == "bow" || item == "cake" || item =="stone" || item == "egg" || item == "diamond"){
            return undefined;
        }
            var items : AucItem[] = [];
            for(var i = 0; i < auctionFile.auctions.length; i++){
                if( auctionFile.auctions[i] == undefined){
                    continue;
                }

                if(auctionFile.auctions[i].item.toLowerCase().includes(item) && !auctionFile.auctions[i].bin){
                   //console.log()
                   if(auctionFile.auctions[i].item.toLowerCase() == item.toLowerCase().trim()){
                        items.push(auctionFile.auctions[i]);
                        continue;
                   }
                   if(auctionFile.auctions[i].item.toLowerCase().trim().indexOf(item.toLowerCase().trim()) == 0){
                    items.push(auctionFile.auctions[i]);
                    continue;
                   }else{
                       var prefix = await ItemlUtil.CheckIfPrefixExists(auctionFile.auctions[i].item.toLowerCase().trim(),item.toLowerCase().trim());
                       if(prefix != false){
                           var check = await ItemlUtil.RemovePrefix(auctionFile.auctions[i].item.toLowerCase().trim(),prefix);
                           //var starcheck = check.replace("/✪/","");

                           

                            if(check.toLowerCase().trim() == item.toLowerCase().trim()){
                                var amountofstars = await ItemlUtil.getAmountOfStarsOnItem(check.toLowerCase().trim());
                                if(amountofstars == undefined){
                                    amountofstars = 0;
                                }

                                var id = await AuctionUtil.GetAuctionItemID(auctionFile.auctions[i].item_bytes);

                                if(v2[id + "_" + amountofstars]){
                                    items.push(auctionFile.auctions[i]);
                                }
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
            
            return items;
        
    }

    public static async GetAllAuctionsOfItemWithCacheDiscrete(item: string,auctionFile:any){
        if(item == "bow" || item == "cake" || item =="stone" || item == "egg" || item == "diamond"){
            return undefined;
        }
            var items : AucItem[] = [];
            for(var i = 0; i < auctionFile.auctions.length; i++){
                if( auctionFile.auctions[i] == undefined){
                    continue;
                }

                if(auctionFile.auctions[i].item.toLowerCase().includes(item) && !auctionFile.auctions[i].bin){
                   //console.log()
                   if(auctionFile.auctions[i].item.toLowerCase() == item.toLowerCase().trim()){
                        items.push(auctionFile.auctions[i]);
                        continue;
                   }
                   if(auctionFile.auctions[i].item.toLowerCase().trim().indexOf(item.toLowerCase().trim()) == 0){
                    items.push(auctionFile.auctions[i]);
                    continue;
                   }else{
                       var prefix = await ItemlUtil.CheckIfPrefixExists(auctionFile.auctions[i].item.toLowerCase().trim(),item.toLowerCase().trim());
                       if(prefix != false){
                           var check = await ItemlUtil.RemovePrefix(auctionFile.auctions[i].item.toLowerCase().trim(),prefix);
                           //var starcheck = check.replace("/✪/","");

                           

                            if(check.toLowerCase().trim() == item.toLowerCase().trim()){

                                items.push(auctionFile.auctions[i]);
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
            
            return items;
        
    }

    public static async GetAllAuctionsOfItemWithoutAPICall(item:string,auction:any): Promise<AucItem[]>{


            var items : AucItem[] = [];
            for(var i = 0; i < auction.length; i++){
                if(auction[i] == undefined || auction[i].length == 0 || !auction[i]){
                    
                    continue;
                }
                if(auction[i].item.toLowerCase().includes(item) && !auction[i].bin){
                    
                    items.push(auction[i]);
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



           
    
            return items;
        
    }



    public static async SaveAllAuctionsToGCS(){
        var ah = await AuctionUtil.GetAllItemsFromAh();
        if(ah == undefined){
            return;
        }
        var trueAuctions = [];
        for(var i = 0; i < ah.length; i++){
            if(ah[i].bin == undefined){
                trueAuctions.push(ah[i]);
            }
        }
        return await storage.bucket('projectscyllcache').file("auctioncache.json").save(JSON.stringify({"timesincelastcall":Date.now(),auctions:trueAuctions}));
    }

    public static async SaveAllAuctionsToFile(){
        var ah = await AuctionUtil.GetAllItemsFromAh();
        if(ah == undefined){
            return;
        }
        var trueAuctions = [];
        for(var i = 0; i < ah.length; i++){
            if(ah[i].bin == undefined){
                trueAuctions.push(ah[i]);
            }
        }

        await fs.writeFile(__dirname + "/../../../cache/hypixelcache/auction/auctioncache.json",JSON.stringify({"timesincelastcall":Date.now(),"auctions":trueAuctions}));

        return true;
    }

    //deprecated, use SaveAllAuctionsToGCS instead
    public static async KeepIndex(index:number): Promise<number>{
        return index;
    }


    public static async GetAllAuctionsEndedByFirestore(){

    }

    public static async GetAllAuctionsEnded(): Promise<SoldAuction[] | undefined>{
        var allAuctions = await  axios.get("https://api.hypixel.net/skyblock/auctions_ended");
        var allAucItems: SoldAuction[] = [];
       
        if(!allAuctions.data.success){
            return undefined;
        }
        
        for(var i = 0; i < allAuctions.data.auctions.length; i++){
            if(allAuctions.data.auctions[i].bin == true){
                var itemid = await AuctionUtil.GetAuctionItemID(allAuctions.data.auctions[i].item_bytes);
                allAucItems.push({"aucid":allAuctions.data.auctions[i].auction_id,"bin":allAuctions.data.auctions[i].bin,"buyer":allAuctions.data.auctions[i].buyer,"item_bytes":allAuctions.data.auctions[i].item_bytes,"price":allAuctions.data.auctions[i].price,"seller":allAuctions.data.auctions[i].seller,"sellerProfile":allAuctions.data.auctions[i].seller_profile,"timestamp":allAuctions.data.auctions[i].timestamp,"itemid":itemid});
            }
                
        }

        if(allAucItems.length != 0)
            return allAucItems;

        return undefined;
        
    }

    public static async SaveAllEndedAuctionsToCache(auctions: SoldAuction[]){
        var saved: Promise<any | undefined>[] = [];
        var allItems = await ItemlUtil.GetAllitems();

        if(allItems != undefined){
            var allItemsFile = JSON.parse(allItems);
            var allItemsKeys = Object.keys(allItemsFile);

            for(var i = 0; i < auctions.length; i++){
                saved.push(AuctionUtil.KeepIndex(i).then(index =>{
                    return ItemlUtil.ConvertItemBytesToItemData(auctions[index].item_bytes).then(final =>{
                        var item = final.value[0].tag.value.display.value.Name.value.replace(/\u00A7[0-9A-FK-OR]/ig,'');
                        var found = false;

                        for(var j = 0; j < allItemsKeys.length; j++){
                            
                            if(item.toLowerCase().includes(allItemsFile[allItemsKeys[j]].name.replace(/✪/g ,'').trim().toLowerCase())){
                                found = true;

                                return {"name":allItemsFile[allItemsKeys[j]].name.toLowerCase(),"price":auctions[index].price,timestamp: auctions[index].timestamp}
                            }else{
                                
                            }
                        }

                       
                    });
                }));
    
            }
        }


        return Promise.all(saved).then(all =>{
            return CacheDatabaseDb.GetDocumentById("auctionprices").then(actualFile =>{
                if(!actualFile || actualFile instanceof Error){
                    return undefined;
                }

                for(var i = 0; i < all.length; i++){


                    if(all[i] != undefined){
                        if(actualFile[all[i].name]){
                            actualFile[all[i].name] = {"name":all[i].name,"price":all[i].price,timestamp:all[i].timestamp};
                        }else{
                            actualFile[all[i].name] = all[i];
                        }
                        
                    }
                }

                return actualFile;
            })
            

            
            
        });
    }

    public static async SaveAllEndedAuctionsToCachev2(auctions: SoldAuction[]){
        var saved: Promise<any | undefined>[] = [];
        var allItems = await ItemlUtil.GetAllitems();

        if(allItems != undefined){
            var allItemsFile = JSON.parse(allItems);
            var allItemsKeys = Object.keys(allItemsFile);

            for(var i = 0; i < auctions.length; i++){
                saved.push(AuctionUtil.KeepIndex(i).then(index =>{
                    return ItemlUtil.ConvertItemBytesToItemData(auctions[index].item_bytes).then(final =>{
                        var item = final.value[0].tag.value.display.value.Name.value.replace(/\u00A7[0-9A-FK-OR]/ig,'');
                        var found = false;
                        for(var j = 0; j < allItemsKeys.length; j++){
                            
                            if(auctions[index].itemid == allItemsKeys[j]){
                                var finalitem: any = {"id":auctions[index].itemid,"name":item,"price":auctions[index].price,timestamp: auctions[index].timestamp,stars:0}
                                found = true;

                                if(final.value[0].tag.value.display.value.Lore.value.value[final.value[0].tag.value.display.value.Lore.value.value.length - 1].replace(/\u00A7[0-9A-FK-OR]/ig,'').split(" ")[0].trim() == "a"){
                                    finalitem["rarity"] = final.value[0].tag.value.display.value.Lore.value.value[final.value[0].tag.value.display.value.Lore.value.value.length - 1].replace(/\u00A7[0-9A-FK-OR]/ig,'').split(" ")[1];
                                }else{
                                    finalitem["rarity"] = final.value[0].tag.value.display.value.Lore.value.value[final.value[0].tag.value.display.value.Lore.value.value.length - 1].replace(/\u00A7[0-9A-FK-OR]/ig,'').split(" ")[0];
                                }

                                if(final.value[0].tag.value.ExtraAttributes.value.petInfo){
                                    finalitem["petinfo"] = JSON.parse(final.value[0].tag.value.ExtraAttributes.value.petInfo.value);
                                }

                                if(final.value[0].tag.value.ExtraAttributes.value.dungeon_item_level){
                                    finalitem["stars"] = final.value[0].tag.value.ExtraAttributes.value.dungeon_item_level.value;
                                }

                                if(final.value[0].tag.value.ExtraAttributes.value.modifier){
                                    finalitem["reforge"] = final.value[0].tag.value.ExtraAttributes.value.modifier.value;
                                }

                                

                                return finalitem;
                            }else{
                                
                            }
                        }

                       
                    });
                }));
    
            }
        }


        return Promise.all(saved).then(all =>{
            return CacheDatabaseDb.GetDocumentById("auctionpricesv2").then(actualFile =>{
                if(!actualFile || actualFile instanceof Error){
                    return undefined;
                }

                for(var i = 0; i < all.length; i++){


                    if(all[i] != undefined){
                        if(all[i].petinfo){
                            actualFile[all[i].petinfo.type + "_" + all[i].id + "_" + all[i].stars.toString()] = all[i];
                            continue;
                        }
                        actualFile[all[i].id + "_" + all[i].stars.toString()] = all[i];
                        
                    }
                }

                return actualFile;
            })
            

            
            
        });
    }

    public static async GetAuctionItemID(itembytes: string): Promise<string>{
        var itemdata = await ItemlUtil.ConvertItemBytesToItemData(itembytes);
        return itemdata.value[0].tag.value.ExtraAttributes.value.id.value;

    }
}