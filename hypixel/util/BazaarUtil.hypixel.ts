import { Item } from "../model/Item.interface";
import {Product } from "hypixel-api-reborn";
import client from '../main.hypixel';
import { BazaarProduct } from "../model/BazaarProduct.interface";
import axios from "axios";
import fs from 'fs/promises';

export class BazaarUtil{
    public static async GetBuyInstantlyPriceOfItemInBazaar(item: Item): Promise<{"item":string,"amount":number}>{
        

        var allProducts : Product[] = await client.getSkyblockBazaar();

        var buyPrice: number = 0;

        for(var i = 0; i < allProducts.length; i++){
            if(allProducts[i].productId == item.id){
                buyPrice = allProducts[i].status.buyPrice;
                break;
            }
        }

        return {"item":item.name,"amount":buyPrice};

        //return {"item":item.name,"buyprice"}
    }

    public static async GetBuyOrderPriceOfItemInBazaarById(id:string){
        var allProducts : Product[] = await client.getSkyblockBazaar();

        var buyPrice: number = 0;

        for(var i = 0; i < allProducts.length; i++){
            if(allProducts[i].productId == id){
                buyPrice = allProducts[i].sellSummary[0].pricePerUnit;
                break;
            }
        }

        return {"item":id,"amount":buyPrice};
    }

    public static async GetAllitemsFromBazaarRT(){
        var bazaar = await axios.get("https://api.hypixel.net/skyblock/bazaar").catch(e =>{console.log(e)});
           
            if(bazaar){
                 if(bazaar.data){
                     var fullBazaar: BazaarProduct[] = [];
                     var productkeys = Object.keys(bazaar.data.products);
                     //console.log(bazaar.data.products);
                     for(var i = 0; i < productkeys.length; i++){
                         if(productkeys[i] == "ENCHANTED_CARROT"){
                             continue;
                         }

                         if(productkeys[i].includes("GEM")){
                             continue;
                         }

                         if(productkeys[i] == "SNOW_BALL"){
                             continue;
                         }

                         if(bazaar.data.products[productkeys[i]].buy_summary[0] == undefined || bazaar.data.products[productkeys[i]].sell_summary[0] == undefined){
                             continue;
                         }
                         fullBazaar.push({"id":productkeys[i],"quickstatus":{
                             "buyorders":bazaar.data.products[productkeys[i]].quick_status.buyOrders,"buyprice":bazaar.data.products[productkeys[i]].quick_status.buyPrice,"buyvolume":bazaar.data.products[productkeys[i]].quick_status.buyVolume,"weeklybuys":bazaar.data.products[productkeys[i]].quick_status.buyMovingWeek,"dailybuys":bazaar.data.products[productkeys[i]].quick_status.buyMovingWeek / 7,
                             "dailysales":bazaar.data.products[productkeys[i]].quick_status.buyMovingWeek / 7,"sellorders":bazaar.data.products[productkeys[i]].quick_status.sellOrders,"sellprice":bazaar.data.products[productkeys[i]].quick_status.sellPrice,"sellvolume":bazaar.data.products[productkeys[i]].quick_status.sellVolume,"weeklysales":bazaar.data.products[productkeys[i]].quick_status.sellMovingWeek},
                             "buysummary":bazaar.data.products[productkeys[i]].buy_summary,"sellsummary":bazaar.data.products[productkeys[i]].sell_summary});
                     }

                     
                 
                     return fullBazaar;
                 }else{
                     return undefined;
                 }
            }else{
                return undefined;
            }
    }



    public static async GetAllItemsFromBazaar(): Promise<BazaarProduct[] | undefined>{
        var bazaarFileBuffer = await fs.readFile(__dirname + "/../../../cache/hypixelcache/bazaar.json");
        var file = JSON.parse(bazaarFileBuffer.toString());
        var now = Date.now()
        if(now  - file.lastcall >= 1000 * 60 * 60 * 12){
            var bazaar = await axios.get("https://api.hypixel.net/skyblock/bazaar").catch(e =>{console.log(e)});
            console.log("calling api");
            if(bazaar){
                 if(bazaar.data){
                     fs.writeFile(__dirname + "/../../../cache/hypixelcache/bazaar.json",JSON.stringify({"lastcall":now,"products":bazaar.data.products}));
                     var fullBazaar: BazaarProduct[] = [];
                     var productkeys = Object.keys(bazaar.data.products);
                     for(var i = 0; i < productkeys.length; i++){
                         fullBazaar.push({"id":productkeys[i],"quickstatus":{
                             "buyorders":bazaar.data.products[productkeys[i]].quick_status.buyOrders,"buyprice":bazaar.data.products[productkeys[i]].quick_status.buyPrice,"buyvolume":bazaar.data.products[productkeys[i]].quick_status.buyVolume,"weeklybuys":bazaar.data.products[productkeys[i]].quick_status.buyMovingWeek,"dailybuys":bazaar.data.products[productkeys[i]].quick_status.buyMovingWeek / 7,
                             "dailysales":bazaar.data.products[productkeys[i]].quick_status.buyMovingWeek / 7,"sellorders":bazaar.data.products[productkeys[i]].quick_status.sellOrders,"sellprice":bazaar.data.products[productkeys[i]].quick_status.sellPrice,"sellvolume":bazaar.data.products[productkeys[i]].quick_status.sellVolume,"weeklysales":bazaar.data.products[productkeys[i]].quick_status.sellMovingWeek},
                             "buysummary":bazaar.data.products[productkeys[i]].buy_summary,"sellsummary":bazaar.data.products[productkeys[i]].sell_summary});
                     }
                 
                     return fullBazaar;
                 }else{
                     return undefined;
                 }
            }else{
                return undefined;
            }
        }else{
            console.log("calling cache");
            var fullBazaar: BazaarProduct[] = [];
            var productkeys = Object.keys(file.products);
            for(var i = 0; i < productkeys.length; i++){
                fullBazaar.push({"id":productkeys[i],"quickstatus":{
                    "buyorders":file.products[productkeys[i]].quick_status.buyOrders,"buyprice":file.products[productkeys[i]].quick_status.buyPrice,"buyvolume":file.products[productkeys[i]].quick_status.buyVolume,"weeklybuys":file.products[productkeys[i]].quick_status.buyMovingWeek,"dailybuys":file.products[productkeys[i]].quick_status.buyMovingWeek / 7,
                    "dailysales":file.products[productkeys[i]].quick_status.buyMovingWeek / 7,"sellorders":file.products[productkeys[i]].quick_status.sellOrders,"sellprice":file.products[productkeys[i]].quick_status.sellPrice,"sellvolume":file.products[productkeys[i]].quick_status.sellVolume,"weeklysales":file.products[productkeys[i]].quick_status.sellMovingWeek},
                    "buysummary":file.products[productkeys[i]].buy_summary,"sellsummary":file.products[productkeys[i]].sell_summary});
            }
        
            return fullBazaar;
        }
       
    }


}