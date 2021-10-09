import { BazaarFlipper } from '../../../../hypixel/bazaarflipping/BazaarFlipper.hypixel';
import router from '../../FlipperRouter.router';

export class GetBestBazaarItemsEndpoint{
    static async GetBestBazaarItems(){
        router.GetRouter().get("/bazaar/best",async function(req,res,next){
            var bestItems = await BazaarFlipper.GetBestBazaarItemsCurrently();

            res.json({'status':'success',items:bestItems});
        });
    }
}