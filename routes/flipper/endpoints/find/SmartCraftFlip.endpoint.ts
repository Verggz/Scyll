import { CraftFlipper } from '../../../../hypixel/craftflipping/CraftFlipper.hypixel';
import router from '../../FlipperRouter.router';

export class SmartCraftFlipEndpoint{
    static async SmartCraftFlip(){
        router.GetRouter().post("/craft/advise/profit",async function(req,res,next){
            var craftFlip = await CraftFlipper.CraftFlipBasedOnProfit(req.body.lowest,req.body.highest);

            if(craftFlip != undefined){
                res.json(craftFlip);
            }else{
                res.json({'status':'notenoughdata','message':"There wasn't enough data between that profit range to find an item to flip (you can help me gather more data by using the other craft flipping commands.)"})
            }
        });
    }
}