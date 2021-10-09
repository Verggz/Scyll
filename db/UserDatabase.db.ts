import { IDatabase } from "./IDatabase.db";

class UserDatabase extends IDatabase{
    constructor(){
        super("scylluserdb");
    }
}

export default new UserDatabase();