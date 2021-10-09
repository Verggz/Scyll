import { CraftFlipper } from '../../../../hypixel/craftflipping/CraftFlipper.hypixel';
import { CraftFlipperCalculator } from '../../../../hypixel/craftflipping/CraftFlipperCalculator.hypixel';
import router from '../../FlipperRouter.router';

export class AverageCraftFlipEndpoint{
    static async AverageCraftFlip(): Promise<void>{
        router.GetRouter().post('/craft/average',async function(req,res,next){
            if(req.body.index == false){
                res.json({'status':'notsupported','message':"This api endpoint is currently not supported or is under construction."});
                //CraftFlipperCalculator.CalculateAllAverageResourcePricesOfItem(req.body.recipe).then(e =>{
                //    CraftFlipper.CompareItemPriceToRecipeAhAverage(req.body.recipe,e).then(flipped =>{
                //        res.json(flipped);
                //    });
                //});
            }else{
                res.json({'status':'notsupported','message':"This api endpoint is currently not supported or is under construction."});
                //CraftFlipperCalculator.CalculateAllLowestResourcePricesOfItem(req.body.recipe[parseInt(req.body.index)]).then(e =>{
                //    CraftFlipper.CompareItemPriceToRecipeAhAverage(req.body.recipe[parseInt(req.body.index)],e).then(flipped =>{
                //        res.json(flipped);
                //    })
                //});
            }
        });
    }
}