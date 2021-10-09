import router from '../BotRouter.router';
import userdb from '../../../nitrate/collection/UserCollection.collection';

export class LimitFlipUsesEndpoint{
    public static async LimitFlipUses(){
        router.GetRouter().post("/flip/limit",async function(req,res,next){
            var curtime : number = Date.now();
            var user = await userdb.GetDocumentById(req.body.id);

            if(user && !(user instanceof Error)){
                var voted : boolean = !(user.limit.votetime + 43200000 <= curtime)

                if(user.limit.lastused + 43200000 <= curtime){
                    userdb.SetDocument(req.body.id,{"id":req.body.id,"limit":{"lastused":curtime,"amount":14,"voted":voted,"votetime":user.limit.votetime}},{"merge":true});
                    res.json({"status":"success","id":req.body.id,"limit":{"lastused":curtime,"amount":14,"voted":voted,"votetime":user.limit.votetime}});
                }else{
                    userdb.SetDocument(req.body.id,{"id":req.body.id,"limit":{"lastused":user.limit.lastused,"amount":user.limit.amount - 1,"voted":voted,"votetime":user.limit.votetime}},{"merge":true});
                    res.json({"status":"success","id":req.body.id,"limit":{"lastused":user.limit.lastused,"amount":user.limit.amount - 1,"voted":voted,"votetime":user.limit.votetime}});
                }
            }else{
                userdb.SetDocument(req.body.id,{"id":req.body.id,"limit":{"lastused":curtime,"amount":14,"voted":false,"votetime":0}},{"merge":true});
                res.json({"status":"success","id":req.body.id,"limit":{"lastused":curtime,"amount":14,"voted":false}});
            }
            
        });
    }

    public static async RenewLimit(){
        router.GetRouter().post('/flip/vote',async function(req,res,next){
            var curtime: number = Date.now();
            var user = await userdb.GetDocumentById(req.body.user);

            if(user && !(user instanceof Error)){
                if(user.limit.votetime + 43200000 <= curtime){
                    userdb.SetDocument(req.body.user,{"id":req.body.user,"limit":{"lastused":curtime,"amount":user.limit.amount + 75,"voted":true,"votetime":curtime}},{"merge":true});
                    res.json({'status':'success'});
                    return;
                }

                res.json({'status':'success'});
               
                
            }else{
                userdb.SetDocument(req.body.user,{"id":req.body.user,"limit":{"lastused":0,"amount":50,"voted":true,"votetime":curtime}},{"merge":true});
                res.json({'status':'success'});
            }
        });
    }
}