import { BinSniper } from '../../../../hypixel/binflipping/BinSniper.hypixel';
import { BinUtil } from '../../../../hypixel/util/BinUtil.hypixel';
import router from '../../FlipperRouter.router';

export class FindBinSnipeEndpoint{
    public static async FindBinSnipe(){
        router.GetRouter().post("/binsnipe/advise", async function(req,res,next){
            BinSniper.FindAllSnipesWithTwoLowestFile(req.body.profit).then(final =>{
                res.json(final);
            })
        });
    }
}