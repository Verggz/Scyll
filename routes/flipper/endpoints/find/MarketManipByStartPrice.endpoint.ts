import { MarketManipulator } from '../../../../hypixel/marketmanipulation/MarketManipulator.hypixel';
import router from '../../FlipperRouter.router';

export class MarketManipByStartPriceEndpoint{
    public static async MarketManipByStartPrice(){
        router.GetRouter().post("/manip/advise", async function(req,res,next){
            if(req.body.margin == false){
                
                MarketManipulator.FindManipWithStartAndEndPrice(req.body.item,req.body.startprice,req.body.endprice).then(price =>{
                    if(price == false){
                        res.json({'status':'invalidnumber'});
                    }
                    res.json({'status':'success',price});
                })
            }else{
                res.json({'status':"invalidbody"});
            }
        });
    }
}