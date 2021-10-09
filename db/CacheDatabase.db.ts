import { IDatabase } from "./IDatabase.db";

class CacheDatabase extends IDatabase{
    constructor(){
        super("projectscyllcache");
    }
}

export default new CacheDatabase();