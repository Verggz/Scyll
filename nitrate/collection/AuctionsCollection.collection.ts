import { NitrateCollection } from "./ICollection.collection";


class AuctionsCollection extends NitrateCollection{
    constructor(){
        super("onlyauctions");
    }
}

export default new AuctionsCollection();