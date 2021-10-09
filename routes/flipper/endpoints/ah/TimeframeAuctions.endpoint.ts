import { Base64 } from 'js-base64';
import { AuctionFlipper } from '../../../../hypixel/auctionflipping/AuctionFlipper.hypixel';
import { AucItem } from '../../../../hypixel/model/AucItem.interface';
import { Item } from '../../../../hypixel/model/Item.interface';
import { AuctionUtil } from '../../../../hypixel/util/AuctionUtil.hypixel';
import { ItemlUtil } from '../../../../hypixel/util/ItemUtil.hypixel';
import router from '../../FlipperRouter.router';

export class TimeFramedAuctionsEndpoint{
    public static async TimeFramedAuctions(): Promise<void>{
        router.GetRouter().get("/auctions/timeframe",async function(req,res,next){
            if(req.query.id == undefined && req.query.name != undefined){
                if(req.query.timeframe == undefined || isNaN(parseInt(req.query.timeframe as string))){
                    res.json({'status':'invalidtimeframe'});
                    return;
                }
                
                var item : Item | undefined = await ItemlUtil.getItemByName(decodeURI(req.query.name as string));

                if(item != undefined){
                    var ah : AucItem[] | undefined = await AuctionUtil.GetAllItemsFromAh();

                    if(ah != undefined){
                        var allAucItems : AucItem[] | undefined = await AuctionUtil.GetAllAuctionsOfItemWithoutAPICall(item.name.toLowerCase(),ah);

                        if(allAucItems != undefined){
                            var timeFramedAuc : AucItem[] = await AuctionFlipper.GetAllItemsFromAuctionsWithinTimeFrame(parseInt(req.query.timeframe as string),allAucItems);
                            //var bs64 = Base64.encode(JSON.stringify(timeFramedAuc));
                            res.json({'status':'success','item':item,'auctions':timeFramedAuc});
                        }else{
                            res.json({'status':'noauctionsofitem'});
                        }
                    }else{
                        res.json({'status':"couldntgetah"});
                    }
                }else{
                    res.json({"status":"invaliditem"});
                }
            }else if(req.query.id != undefined && req.query.name == undefined){
                if(req.query.timeframe == undefined || isNaN(parseInt(req.query.timeframe as string))){
                    res.json({'status':'invalidtimeframe'});
                    return;
                }
                var item: Item |undefined = await ItemlUtil.getItemById(req.query.id as string);

                if(item != undefined){
                    var ah : AucItem[] | undefined = await AuctionUtil.GetAllItemsFromAh();

                    if(ah != undefined){
                        var allAucItems : AucItem[] | undefined = await AuctionUtil.GetAllAuctionsOfItemWithoutAPICall(item.name.toLowerCase(),ah);

                        if(allAucItems != undefined){
                            var timeFramedAuc : AucItem[] = await AuctionFlipper.GetAllItemsFromAuctionsWithinTimeFrame(parseInt(req.query.timeframe as string),allAucItems);

                            res.json({'status':'success','item':item,'auctions':timeFramedAuc});
                        }else{
                            res.json({'status':'noauctionsofitem'});
                        }
                    }else{
                        res.json({'status':"couldntgetah"});
                    }
                }else{
                    res.json({"status":"invaliditem"});
                }
            }else{
                res.json({'status':'invalidparams','message':'you had not put the required parameters, [id] or [name] for this endpoint.'});
            }
        });
    }
}