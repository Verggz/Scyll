import { CraftFlipper } from '../../../../hypixel/craftflipping/CraftFlipper.hypixel';
import router from '../../FlipperRouter.router';

export class CraftFlipEndpoint{
    public static async CraftFlip(){
        router.GetRouter().post("/flip/craft",async function(req,res,next){
             CraftFlipper.CompareLowestBinToCraftPrice(req.body.item).then(final =>{
                 console.log(final);
                 res.json(final);
             })
        });
    }
}