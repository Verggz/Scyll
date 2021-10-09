import { AucItem } from "../model/AucItem.interface";
import { Item } from "../model/Item.interface";
import { Recipe } from "../model/Recipe.interface";
import { AuctionUtil } from "../util/AuctionUtil.hypixel";
import { BazaarUtil } from "../util/BazaarUtil.hypixel";
import { BinUtil } from "../util/BinUtil.hypixel";
import { FlipperUtil } from "../util/FlipperUtil.hypixel";
import { ItemlUtil } from "../util/ItemUtil.hypixel";
import { Storage } from "@google-cloud/storage";
import fs from 'fs/promises';
import { CraftUtil } from "../util/CraftUtil.hypixel";
import axios from "axios";

var storage = new Storage({"projectId":"projectscyll","keyFilename":"./projectscyll-97351f835781.json"});

export class CraftFlipperCalculator{
    public static async CalculateAllResourcePricesOfItem(lowestbin:any,item:string): Promise<any>{
        var materials = await CraftUtil.FindAllMaterialsByItemNameOrId(item);

        if(materials == undefined){
            return "notcraftable";
        }

        var materialKeys = Object.keys(materials.recipe);
        var materialprices: any = {};
        

        for(var i = 0; i < materialKeys.length; i++){
            if(!lowestbin[materialKeys[i]]){
                var bzitem = await BazaarUtil.GetBuyOrderPriceOfItemInBazaarById(materialKeys[i]);

                materialprices[materialKeys[i]] = bzitem.amount * materials.recipe[materialKeys[i]];
                continue;
            }

            materialprices[materialKeys[i]] = lowestbin[materialKeys[i]] * materials.recipe[materialKeys[i]];
        }

        return {amount:materials,price:materialprices,final:materials.final};

    }

    //CHANGE THIS TO USE THE BIN CACHE INSTEAD OF AH
    public static async CalculateAllLowestResourcePricesOfItem(ah:AucItem[],itemrecipe:Recipe,amountOfStars:number): Promise<any | undefined>{
        var allPrices : any[] = [];
        var nondupedList : Item[] = ItemlUtil.RemoveAllDuplicates(itemrecipe.slots);

        
        for(var i = 0; i < nondupedList.length; i++){
            allPrices.push(AuctionUtil.KeepIndex(i).then(index =>{
                
                if(nondupedList[index].id == "NONE") return undefined;
        //console.log(nondupedList[index]);
        //console.log(nondupedList[index]);
    
        if(nondupedList[index].bazaar == false){
            
            if(ah == undefined){
                return undefined;
            }
            
            
            if(nondupedList[index].dungeonItem == true){
                //console.log(nondupedList[index]);
                //console.log("list2", nondupedList[index]);
               if(nondupedList[index].category.includes("item")){
                return FlipperUtil.GetLowestPriceOfDungeonItemWithoutAPICall(ah,nondupedList[index],0).then(price =>{
                    
                    if(price != undefined){
                        
                        return {"item":price.item,price:price.amount,"totalamount":nondupedList.length};
                    }else{
                        return undefined;
                    }
                });
               }else{
                //console.log("list3", nondupedList[index]);
                return FlipperUtil.GetLowestPriceOfDungeonItemWithoutAPICall(ah,nondupedList[index],amountOfStars).then(price =>{
                    
                    if(price != undefined){
                        
                        return {"item":price.item,price:price.amount,"totalamount":nondupedList.length};
                    }else{
                        return undefined;
                    }
                });
               }

            }else{
                return FlipperUtil.GetLowestPriceOfItemWithoutAPICall(ah,nondupedList[index]).then(price =>{
                    
                    if(price != undefined){
                        if(price.item.includes("✪")){

                        }
                        
                        return {"item":price.item,price:price.amount,"totalamount":nondupedList.length};
                    }else{
                        return undefined;
                    }
                });
            }

        }else{
            
            return BazaarUtil.GetBuyInstantlyPriceOfItemInBazaar(nondupedList[index]).then(price =>{
                if(price != undefined){
                
                    return {"item":price.item,price:price.amount,"totalamount":nondupedList.length};
                }else{
                    return undefined;
                }
            });
        }


            }));
        }


        return await Promise.all(allPrices);
    }

    public static async CalculateAllAverageResourcePricesOfItem(itemrecipe: Recipe): Promise<any | undefined>{
        var allPrices : Promise<any | undefined>[] = [];
        var nondupedList : Item[] = ItemlUtil.RemoveAllDuplicates(itemrecipe.slots);
        for(var i = 0; i < nondupedList.length; i++){
            if(nondupedList[i].id == "NONE") continue;
            if(nondupedList[i].bazaar == undefined){
                if(nondupedList[i].dungeonItem == false){
                    allPrices.push(FlipperUtil.GetAveragePriceOfItem(nondupedList[i]).then(price =>{
                        
                        if(price != undefined){
                            
                            return {"item":price.item,price:price.amount};
                        }else{
                            return undefined;
                        }
                    }));
                }else{
                    allPrices.push(FlipperUtil.GetAveragePriceOfDungeonItem(nondupedList[i],nondupedList[i].numberOfStars).then(price =>{
                        if(price != undefined){
                            
                            return {"item":price?.item,price:price?.amount};
                        }else{
                            return undefined;
                        }
                        
                    }));
                }

            }else{
                allPrices.push(BazaarUtil.GetBuyInstantlyPriceOfItemInBazaar(nondupedList[i]).then(price =>{
                    if(price != undefined){
                        
                        return {"item":price.item,price:price.amount}
                    }
                }))
            }
//
        }

        return Promise.all(allPrices);
    }

    public static async CompareItemPriceToCraftPrice(item1: Item,item2: Item){

    }

    public static async getTotalCostOfRecipe(recipe:Recipe,prices:any): Promise<any>{
        //console.log("the prices",prices)
        var amounts : Map<string,number> = new Map<string,number>();
        for(var i = 0; i < recipe.slots.length; i++){
            //console.log(recipe.slots[i].name);
            if(amounts.get(recipe.slots[i].name.toLowerCase()) == undefined){
                
                amounts.set(recipe.slots[i].name.toLowerCase(), recipe.slots[i].amount);
            }else{
                amounts.set(recipe.slots[i].name.toLowerCase(),amounts.get(recipe.slots[i].name.toLowerCase()) as number + recipe.slots[i].amount);
            }
        }
        var total : number = 0;
        var costOfItem = [];
        

        for(var i = 0; i < prices.length; i++){
            if(prices[i] === undefined){
                continue;
            }
            var itemPrice = prices[i].item;

            var amountsKeys = Array.from(amounts.keys());
            for(var j = 0; j < amountsKeys.length; j++){
                var prefixCheck : boolean | number = await ItemlUtil.CheckIfPrefixExists(prices[i].item.toLowerCase(),amountsKeys[j]);
                var starsCheck = prices[i].item.includes("✪");
                
                if(prefixCheck != false){
                    var newItem = await ItemlUtil.RemovePrefix(prices[i].item.toLowerCase(),prefixCheck);
                    
                    if(newItem.includes("✪")){
                        itemPrice = newItem.replace(/✪/g ,'').trim();
                    }else{
                        itemPrice = newItem;
                    }
                    
                    if(amountsKeys[j].includes(itemPrice)){
                        var amount : number = amounts.get(amountsKeys[j]) as number;
                
                        costOfItem.push({"item":amountsKeys[j],"amount":amount,"costfor1":prices[i].price,"totalcost":prices[i].price * amount});
                        total += prices[i].price * amount;
                        break;
                    }
                    
                    
                }else if(starsCheck != false){
                    itemPrice = prices[i].item.replace(/✪/g ,'').trim().toLowerCase();
                    
                    if(amountsKeys[j].includes(itemPrice)){
                        var amount : number = amounts.get(amountsKeys[j]) as number;
                        
                        costOfItem.push({"item":prices[i].item,"amount":amount,"costfor1":prices[i].price,"totalcost":prices[i].price * amount});
                        total += prices[i].price * amount;
                        break;
                    }

                   
                }
                //console.log(await ItemlUtil.CheckIfPrefixExists(prices[i].item,amountsKeys[j]));
            }

            if(amounts.get(prices[i].item.toLowerCase()) != undefined){
                var amount : number = amounts.get(itemPrice.toLowerCase()) as number;
                
                costOfItem.push({"item":prices[i].item,"amount":amount,"costfor1":prices[i].price,"totalcost":prices[i].price * amount});
                total += prices[i].price * amount;
                //console.log(`${e[i].item.toLowerCase()}: ${e[i].price * amount}`);
            }


        }
        
        for(var i = 0; i < prices.length; i++){
            if(prices[i] != undefined){
                return {"total":total,items:costOfItem,"amountOfItems":prices[i].totalamount};
            }
        }
       
    }
}