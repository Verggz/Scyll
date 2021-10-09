import { BazaarGraphCreator } from '../../../nitrate/graph/BazaarGraphCreator.nitrate';
import router from '../NitrateRouter.router';

export class CreateGraphEndpoint{
    static async CreateGraph(){
        router.GetRouter().get("/graph/:item",async function(req,res,next){
            if(req.query.type == "DAILY"){
                if(req.query.min && req.query.max){
                    BazaarGraphCreator.GetDataWithinDayTimespan(req.params.item,req.query.min as string, req.query.max as string).then(data =>{
                        if(data){
                            BazaarGraphCreator.Render("DAILY",data).then(final =>{
                                if(final == undefined){
                                    res.json({'status':'couldntcreategraph'});
                                    return;
                                }
                                res.type("image/png");
                                res.send(final);
                            });
                        }else{
                            res.json({'status':'couldntfinddatainrage'});
                        }
                    });
                }else{
                    res.json({'status':'invalidminmax'});
                }
            }
        });
    }
}