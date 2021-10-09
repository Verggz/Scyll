import router from '../../FlipperRouter.router';

export class GetBazaarItemEndpoint{
    public static async GetBazaarItem(): Promise<void>{
        router.GetRouter().get('/bazaar/:item',async function(req,res,next){
            if(req.params.item == "best"){
                return;
            }
        });
    }
}