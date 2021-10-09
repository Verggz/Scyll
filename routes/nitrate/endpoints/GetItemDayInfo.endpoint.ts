import { ItemlUtil } from '../../../hypixel/util/ItemUtil.hypixel';
import { BazaarGraphCreator } from '../../../nitrate/graph/BazaarGraphCreator.nitrate';
import router from '../NitrateRouter.router';
//this is the endpoint for getting the price of an item on a particular day
export class GetItemDayInfoEndpoint{
    public static async GetItemDayInfo(){
        router.GetRouter().get('/day/:item',async function(req,res,next){
            if(req.params.item.includes("_")){
                BazaarGraphCreator.GetDataWithinDayTimespan(req.params.item,req.query.day as string,req.query.day as string).then(final =>{
                    if(final == undefined){
                        res.json({'status':'couldntgetitemdata'});
                        return;
                    }

                    if(final == false){
                        res.json({'status':'invalidinput'});
                        return;
                    }
                    res.json({'status':'success','item':final[0]});
                });
            }else{
                var item = await ItemlUtil.getItemIDByName(req.params.item.toLowerCase());
                if(item != undefined){
                    BazaarGraphCreator.GetDataWithinDayTimespan(item,req.query.day as string,req.query.day as string).then(final =>{
                        if(final == undefined){
                            res.json({'status':'couldntgetitemdata'});
                            return;
                        }

                        if(final == false){
                            res.json({'status':'invalidinput'});
                            return;
                        }
                        res.json({'status':'success','item':final[0]});
                    });
                }
            }

        });
    }
}