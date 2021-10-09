import { AucItem } from "../model/AucItem.interface";
import { Recipe } from "../model/Recipe.interface";
import { FlipperUtil } from "../util/FlipperUtil.hypixel";
import { CraftFlipperCalculator } from "./CraftFlipperCalculator.hypixel";
import fs from 'fs/promises';
import axios from "axios";

export class CraftFlipper{

    public static async CraftFlipBasedOnItemprice(budget:number): Promise<any | undefined>{

    }

    public static async CompareLowestBinToCraftPrice(item: string){
        var lowestbin = (await axios.get("https://moulberry.codes/lowestbin.json")).data;

        var resources = await CraftFlipperCalculator.CalculateAllResourcePricesOfItem(lowestbin,item);

        if(resources == "notcraftable"){
            return {"status":"notcraftable"};
        }
        var allItems = JSON.parse((await fs.readFile(__dirname + "/../../../cache/hypixelcache/items.json")).toString());

        var finalobj: any[] = [];
        var idKeys = Object.keys(resources.amount.recipe);
        console.log(resources);
        //console.log(allItems);

        var profit: number = 0;
        var totalcost: number = 0;

        for(var i = 0; i < idKeys.length; i++){
            totalcost += resources.price[idKeys[i]];
            finalobj.push({"id":idKeys[i],"price":resources.price[idKeys[i]],"name":allItems[idKeys[i]].name,amount:resources.amount.recipe[idKeys[i]]});
        }

        profit = lowestbin[resources.final] - totalcost;
        console.log(resources.final);
        if(allItems[resources.final]){
            return {"status":"success","finalitem":{"id":resources.final,"price":lowestbin[resources.final],"name":allItems[resources.final].name,"materials":finalobj,"totalcost":totalcost,"profit":profit}};
        }else{
            return {"status":"success","finalitem":{"id":resources.final,"price":lowestbin[resources.final],"name":resources.final,"materials":finalobj,"totalcost":totalcost,"profit":profit}};
        }
        
    }

    public static async CraftFlipBasedOnProfit(lowestPrice:number,highestprice:number): Promise<any | undefined>{
        var file = await JSON.parse((await fs.readFile(__dirname + "/../../../cache/hypixelcache/craftcache.json")).toString());
        
        var fileKeys = Object.keys(file);

        var remainingItems : any[]= [];
        for(var i = 0; i < fileKeys.length; i++){
            if(lowestPrice <= file[fileKeys[i]].profit && file[fileKeys[i]].profit <= highestprice){
                remainingItems.push(file[fileKeys[i]]);
            }
        }

        if(remainingItems.length > 0){
            var flipIndex = Math.floor(Math.random() * (remainingItems.length));
            return remainingItems[flipIndex];
        }else{
            return undefined;
        }
    }

    public static async CompareItemPriceToRecipeAhAverage(recipe: Recipe,prices: any,amountOfStars:number = 0): Promise<any>{
        var total = await CraftFlipperCalculator.getTotalCostOfRecipe(recipe,prices);
            if(recipe.finalItem.dungeonItem == true){
                return FlipperUtil.GetAveragePriceOfDungeonItem(recipe.finalItem,0).then(res =>{
                    
                    if(res != undefined){
                        if(total.amountOfItems > total.items.length){
                            
                            if(res.amount - total.total > 0){
                                return {"flip":true,"profit":res.amount - total.total,itemcost:res.amount,matcost:total.total,items:total.items}
    
                            }else{
                                return {"flip":false,"profit":res.amount - total.total,itemcost:res.amount,matcost:total.total,items:total.items}
                            
                            }
                        }else{
                            return {'status':"itemisntavailable","message":"One of the items required in a craft flip currently isn't available on the auction house."};
                        }

                    }else{
                        return undefined;
                    }
                });
            }else{
                return FlipperUtil.GetAveragePriceOfItem(recipe.finalItem).then(res =>{
                    if(res != undefined){
                        if(res.amount - total.total > 0){
                            return {"flip":true,"profit":res.amount - total.total,itemcost:res.amount,matcost:total.total,items:total.items}

                        }else{
                            return {"flip":false,"profit":res.amount - total.total,itemcost:res.amount,matcost:total.total,items:total.items}
                        
                        }
                    }else{
                        return undefined;
                    }
                });
            }


        
    }

    public static async CompareItemPriceToRecipeAhLowest(ah: AucItem[],recipe: Recipe,prices: any,amountOfStars:number): Promise<any>{
        var total = await CraftFlipperCalculator.getTotalCostOfRecipe(recipe,prices);

        if(recipe.finalItem.dungeonItem == true){
            return FlipperUtil.GetLowestPriceOfDungeonItemWithoutAPICall(ah,recipe.finalItem,amountOfStars).then(res =>{
                if(res != undefined){
                    if(total.amountOfItems >= total.items.length){
                        
                        if(res.amount - total.total > 0){
                            var newFinalItem = recipe.finalItem;
                            newFinalItem.name = recipe.finalItem.name +" " + "✪".repeat(amountOfStars);
                            return {"flip":true,"profit":res.amount - total.total,itemcost:res.amount,matcost:total.total,items:total.items,finalitem:newFinalItem};
                            
                        }else{
                            var newFinalItem = recipe.finalItem;
                            newFinalItem.name = recipe.finalItem.name + " " +"✪".repeat(amountOfStars);
                            return {"flip":false,"profit":res.amount -total.total,itemcost:res.amount,matcost:total.total,items:total.items,finalitem:newFinalItem};
                           
                        }
                    }else{
                        return {'status':"itemisntavailable","message":"One of the items required in a craft flip currently isn't available on the auction house."};
                    }
                }else{
                    return undefined;
                }
            });
        }else{
            return FlipperUtil.GetLowestPriceOfItemWithoutAPICall(ah,recipe.finalItem).then(res =>{
                if(res != undefined){
                    if(total.amountOfItems >= total.items.length){
                        
                        if(res.amount - total.total > 0){
                            return {"flip":true,"profit":res.amount - total.total,itemcost:res.amount,matcost:total.total,items:total.items,finalitem:recipe.finalItem};
                            
                        }else{
                            return {"flip":false,"profit":res.amount -total.total,itemcost:res.amount,matcost:total.total,items:total.items,finalitem:recipe.finalItem};
                           
                        }
                    }else{
                        return {'status':"itemisntavailable","message":"One of the items required in a craft flip currently isn't available on the auction house."};
                    }
                }else{
                    return undefined;
                }
            });
        }
    }

}