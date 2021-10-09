import router from '../ModRouter.router';
import registrydb from '../../../db/BetaRegistryDatabase.db';
import { string } from 'prismarine-nbt';

export class DownloadModEndpoint{
    public static async DownloadMod(){

        router.GetRouter().get('/download',async function(req,res,next){
            if(!req.query.id){
                res.json({'status':'invalidid'});
                return;
            }
            var user = await registrydb.GetDocumentByParams("discordid",'==',req.query.id as string);

            if(user != false){
                res.download("./ProjectScyllMod.zip");
            }else{
                res.json({'status':'invalidid'});
            }
        })
    }
}