import router from '../BotRouter.router';
import userdb from '../../../nitrate/collection/UserCollection.collection';

export class GetCurrentLimitEndpoint{
    public static async GetCurrentLimit(){
        router.GetRouter().get('/limit',async function (req,res,next){
            var user = await userdb.GetDocumentById(req.query.id as string);
            var curtime: number = Date.now();

            if(user && !(user instanceof Error)){
                if(user.limit.lastused + 43200000 <= curtime){
                    res.json({'status':'success',amount:10,voted:user.limit.voted})
                }else{
                    res.json({'status':'success',amount:user.limit.amount,voted:user.limit.voted})
                }
               
            }else{
                res.json({'status':'success','amount':10,'voted':false});
            }
        });
    }
}