import router from '../UserRouter.router';
import registrydb from '../../../db/BetaRegistryDatabase.db';

export class GetRegistryEndpoint{
    static async GetRegistry(){
        router.GetRouter().get("/beta/getregistry",async function(req,res,next){
            var registry = await registrydb.GetDocumentById(req.query.registry as string);
            
            if(registry){
                res.json({'status':'success','registry':registry});
            }else{
                res.json({'status':'registrydoesntexist'});
            }
        });
    }
}