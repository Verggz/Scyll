import cachedb from '../db/CacheDatabase.db';

export class ServerStatsUtil{
    public static async incrementprofit(profit: number):Promise<boolean>{
        var actualdoc = await cachedb.GetDocumentById("serverstats");

        if(actualdoc && !(actualdoc instanceof Error)){
            actualdoc["totalprofit"] += profit;

            cachedb.SetDocument("serverstats",actualdoc,{"merge":true});

            return true;
        }else{
            console.log("no1");
            return false;
        }
        
    }

    public static async incrementflips(): Promise<boolean>{
        var actualdoc = await cachedb.GetDocumentById("serverstats");

        if(actualdoc && !(actualdoc instanceof Error)){
            actualdoc["totalflips"] += 1;

            cachedb.SetDocument("serverstats",actualdoc,{"merge":true});

            return true;
        }else{
            console.log("no2");
            return false;
        }
    }

    public static async getstats(){
        var stats = await cachedb.GetDocumentById("serverstats");

        if(stats && !(stats instanceof Error)){
            return stats;
        }else{
            return false;
        }
    }
}