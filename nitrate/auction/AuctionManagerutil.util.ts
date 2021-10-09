import { AucItem } from "../../hypixel/model/AucItem.interface";
import { AuctionUtil } from "../../hypixel/util/AuctionUtil.hypixel";
import { ItemlUtil } from "../../hypixel/util/ItemUtil.hypixel";
import ahdb from '../collection/AuctionsCollection.collection';

export class AuctionManager{
    //Saves 1 auction of an item that is within 30 minutes
    public static async SaveAllAuctionsToFirestore(){
        var ah = await AuctionUtil.GetAllItemsFromAh();
        if(ah == undefined){
            return;
        }
        var j = 0;
        for(var i = 0; i < ah.length; i++){
            if(ah[i] == undefined){
                continue;
            }
            if(ah[i].bin == undefined && ah[i].time >= 1200000 && ah[i].time  <= 2400000 && ah[i].price > 25000){
                j++;
                ahdb.SetDocument(ah[i].item,{"aucid":ah[i].aucid,"bids":ah[i].bids,"bin":false,"item":ah[i].item,"item_bytes":ah[i].item_bytes,"lore":ah[i].lore,"price":ah[i].price,"time":ah[i].time,"start":ah[i].start,"end":ah[i].end},{"merge":true});
                
                
            }
        }

        console.log(j);

    }

    public static async ResetHourlyCache(){

    }

    public static async AddToDailyCache(hourlydata : any){

    }
}