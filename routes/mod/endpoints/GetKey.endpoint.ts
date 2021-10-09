import router from '../ModRouter.router';
import registrydb from '../../../db/BetaRegistryDatabase.db';

export class GetKeyEndpoint{
    public static async GetKey(){
        router.GetRouter().get("/key",async function(req,res,next){
            var user = await registrydb.GetDocumentByParams("discordid","==",req.query.id as string);

            if(user != false){
                console.log(user[0]);
                res.json({'status':'success','key':user[0].data().key});
            }else{
                res.json({'status':'accountdoesntexist'});
            }
        });
    }
}