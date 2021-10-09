import { AuctionFlipper } from '../../../../hypixel/auctionflipping/AuctionFlipper.hypixel';
import { AucItem } from '../../../../hypixel/model/AucItem.interface';
import { Item } from '../../../../hypixel/model/Item.interface';
import { AuctionUtil } from '../../../../hypixel/util/AuctionUtil.hypixel';
import router from '../../FlipperRouter.router';
import multer from 'multer';
import express from 'express';

export class CompareAuctionToBINEndpoint{
    public static async CompareAuctionToBIN(): Promise<void>{
        router.GetRouter().post('/auctions/compare',async function(req,res,next){
            var ah : AucItem[] | undefined = await AuctionUtil.GetAllItemsFromAh();

            if(ah != undefined){
                var total = await AuctionFlipper.CompareAuctionsToLowestBINWithoutAPICall(ah,req.body.item,req.body.auctions);
                
                if(total != undefined){
                    res.json({'status':'success',flips:total});
                }else{
                    res.json({'status':'invalidcomparison'});
                }
            }else{
                res.json({'status':'couldntgetah'});
            }

           
        });
    }
}