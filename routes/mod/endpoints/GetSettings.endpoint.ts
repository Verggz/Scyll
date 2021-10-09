import router from '../ModRouter.router';
import registrydb from '../../../db/BetaRegistryDatabase.db';

export class GetSettingsEndpoint{
    public static async GetSettings(){
        router.GetRouter().get("/settings/:user",async function(req,res,next){
            var user = await registrydb.GetDocumentByParams("name","==",req.params.user);

            if(user != false){
              if(user[0].key == req.query.key){
                res.json({'status':'success','settings':user[0].settings});
              }else{
                res.json({'status':'registryfailed'});
              }

            }else{
                res.json({'status':'registryfailed'});
            }
        });
    }
}
