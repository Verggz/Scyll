import router from '../ModRouter.router';
import registrydb from '../../../db/BetaRegistryDatabase.db';

export class SetSettingsEndpoint{
    public static async SetSettings(){
        router.GetRouter().post("/settings",async function(req,res,next){
          var user = await registrydb.GetDocumentByParams("name","==",req.body.name);

          if(user != false){
            if(user[0].key == req.body.key){
              registrydb.SetDocument(user[0].id,{settings:req.body.settings},{"merge":true});
              
              res.json({'status':'success'});
            }else{
              res.json({'status':'registryfailed'});
            }
          }else{
            res.json({'status':'registryfailed'});
          }
        });
    }
}
