import router from '../ModRouter.router';
import registrydb from '../../../db/BetaRegistryDatabase.db';

export class VerifyKeyEndpoint{
    public static async VerifyKey(){
        router.GetRouter().post("/key/verify",async function(req,res,next){
            var user = await registrydb.GetDocumentByParams("key",'==',req.body.key);
            if(user != false){
                res.json({'status':'success'});
            }else{
                res.json({'status':'notverified'});
            }
        });
    }
}