import { NitrateCollection } from "./ICollection.collection";


class UserCollection extends NitrateCollection{
    constructor(){
        super("scylluserdb");
    }
}

export default new UserCollection();