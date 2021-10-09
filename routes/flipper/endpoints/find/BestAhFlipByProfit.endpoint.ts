import { json } from 'body-parser';
import { AuctionFlipper } from '../../../../hypixel/auctionflipping/AuctionFlipper.hypixel';
import { AuctionUtil } from '../../../../hypixel/util/AuctionUtil.hypixel';
import { ServerStatsUtil } from '../../../../util/ServerStatsUtil.util';
import router from '../../FlipperRouter.router';

export class BestAhFlipByProfitEndpoint{
    public static async BestAhFlipByProfitRT(){
        router.GetRouter().post("/auction/advise/profit/rt",async function(req,res,next){            
            if(parseInt(req.body.profit)){
               if(AuctionUtil.isDerpy){
                   res.json({'status':'auctionclosed'});
                   return;
               }
                AuctionFlipper.FindBestAuctionFlipByProfitRange(req.body.profit).then(result =>{

                    if(result == undefined){
                        res.json({'status':'couldntgetauction'});
                        return;
                    }


                    if(result.item){
                        // ServerStatsUtil.incrementprofit(result.item.profit);
                        // ServerStatsUtil.incrementflips();
                        res.json(result);
                    }else{
                        res.json(result);
                    }

                });
            }else{
                res.json({'status':"invalidprofit"});
            }

        });
    }

    public static async BestAhFlipByProfit(){
        router.GetRouter().post("/auction/advise/profit/discrete",async function(req,res,next){
            if(parseInt(req.body.profit)){
                if(AuctionUtil.isDerpy){
                    res.json({'status':'auctionclosed'});
                    return;
                }

                // AuctionFlipper.FindBestAuctionFlipByProfitRangeFirestore(parseInt(req.body.profit)).then(result =>{


                //     if(result == undefined){
                //         res.json({'status':'couldntgetauction'});
                //         return;
                //     }

                //     res.json(result.item);
                // })

                AuctionFlipper.FindBestAuctionFlipByProfitRange(req.body.profit).then(result =>{

                    if(result == undefined){
                        res.json({'status':'couldntgetauction'});
                        return;
                    }

                    //if(result == "savingtogcs"){
                    //    res.json({'status':'updatingcache'});
                    //    return;
                    //}
                    res.json(result.item);
                });
            }else{
                res.json({'status':'invalidprofit'});
            }
        });
    }


}