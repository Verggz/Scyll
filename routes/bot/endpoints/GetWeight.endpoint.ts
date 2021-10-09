import { WeightCalculator } from '../../../calc/weight/WeightCalculator.calc';
import router from '../BotRouter.router';

export class GetWeightEndpoint{
    public static async GetWeight(){
        router.GetRouter().get("/weight/:user/:profile",async function(req,res,next){
            WeightCalculator.CalculateWeightByProfile(req.params.user,req.params.profile).then(total =>{
                if(total == "noprofile"){
                    res.json({'status':'invalidprofile'});
                    return;
                }

                res.json(total);
            })
        });
    }
}