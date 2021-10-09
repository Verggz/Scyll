import router from '../BotRouter.router';
import cachedb from '../../../db/CacheDatabase.db';
import { ServerStatsUtil } from '../../../util/ServerStatsUtil.util';

export class GetServerStatsEndpoint{
    public static async GetServerStats(){
        router.GetRouter().get("/server/stats",async function(req,res,next){
            var stats = await ServerStatsUtil.getstats();

            res.json(stats);
        });
    }
}