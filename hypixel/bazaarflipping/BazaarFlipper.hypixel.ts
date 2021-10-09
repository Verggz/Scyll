import { Product } from "hypixel-api-reborn";
import { BazaarProduct } from "../model/BazaarProduct.interface";
import { BazaarUtil } from "../util/BazaarUtil.hypixel";

export class BazaarFlipper{
    public static async FindBestItemByInvestment(investment: number){

    }

    public static async WeightMarginByAmountOfInstant(product: Product){

    }

    public static async GetBestBazaarItemsCurrently(): Promise<BazaarProduct[] | undefined>{
        var allBazaarItems = await BazaarUtil.GetAllitemsFromBazaarRT();

        if(allBazaarItems != undefined){
            //selloffer == buyprice10
            //selloffer buysummary
            //buyorder == sellprice 5
            //buyorder sellsummary
            //sellprice == sellsummary

            //(((b.quickstatus.buyprice - b.quickstatus.sellprice) / b.quickstatus.sellprice) * 100)
            
            //buyprice is always higher than the sell price
            //console.log(allBazaarItems[20].id,((allBazaarItems[20].quickstatus.buyprice - allBazaarItems[20].quickstatus.sellprice)/ (allBazaarItems[20].quickstatus.sellprice)) * 100)
            var sortedBazaar = allBazaarItems.sort((a,b): number =>{
                
                if((((b.buysummary[0].pricePerUnit - b.sellsummary[0].pricePerUnit) / b.sellsummary[0].pricePerUnit) * 100) > (((a.buysummary[0].pricePerUnit - a.sellsummary[0].pricePerUnit) / a.sellsummary[0].pricePerUnit) * 100)){
                    return 1;
                }else if((((b.buysummary[0].pricePerUnit - b.sellsummary[0].pricePerUnit) / b.sellsummary[0].pricePerUnit) * 100) < (((a.buysummary[0].pricePerUnit - a.sellsummary[0].pricePerUnit) / a.sellsummary[0].pricePerUnit) * 100)){
                    return -1
                }else{
                    return 0;
                }
            });


            return sortedBazaar;
            
        }else{
            return undefined;
        }
    }
}