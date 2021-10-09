import router from '../UserRouter.router';
import registrydb from '../../../db/BetaRegistryDatabase.db';
import uniqid from 'uniqid';

export class RegisterEndpoint{
    static async Register(){
        router.GetRouter().post("/beta/register",async function(req,res,next){
            if(req.body != null){
                await registrydb.SetDocument(req.body.id,{id:req.body.id,nickname:req.body.name,key:uniqid("k-"),discordid:req.body.discordid},{"merge":true});
                res.json({'status':'success',registry:{id:req.body.id,nickname:req.body.name,key:uniqid("k-"),discordid:req.body.discordid}});
            }
           
        });
    }
}