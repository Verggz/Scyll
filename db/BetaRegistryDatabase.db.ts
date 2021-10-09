import { IDatabase } from "./IDatabase.db";

class BetaRegistryDatabase extends IDatabase{
    constructor(){
        super("scyllbetaregistry");
    }
}

export default new BetaRegistryDatabase();