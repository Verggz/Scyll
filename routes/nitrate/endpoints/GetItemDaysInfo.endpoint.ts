import { ItemlUtil } from "../../../hypixel/util/ItemUtil.hypixel";
import { BazaarGraphCreator } from "../../../nitrate/graph/BazaarGraphCreator.nitrate";
import router from '../NitrateRouter.router';
export class GetItemDaysInfoEndpoint{
    public static async GetItemDaysInfo(){
        router.GetRouter().get('/days/:item',async function(req,res,next){
            if(req.params.item.includes("_")){
                BazaarGraphCreator.GetDataWithinDayTimespan(req.params.item,req.query.min as string,req.query.max as string).then(final =>{
                    if(final == undefined){
                        res.json({'status':'couldntgetitemdata'});
                        return;
                    }

                    if(final == false){
                        res.json({'status':'invalidinput'});
                        return;
                    }
                    res.json({'status':'success','items':final});
                });
            }else{
                var item = await ItemlUtil.getItemIDByName(req.params.item.toLowerCase());
                if(item != undefined){
                    console.log(req.query.min as string);
                    console.log(req.query.max as string);
                    BazaarGraphCreator.GetDataWithinDayTimespan(item,req.query.min as string,req.query.max as string).then(final =>{
                        if(final == undefined){
                            res.json({'status':'couldntgetitemdata'});
                            return;
                        }

                        if(final == false){
                            res.json({'status':'invalidinput'});
                            return;
                        }
                        res.json({'status':'success','items':final});
                    });
                }
            }

        });
    }
}