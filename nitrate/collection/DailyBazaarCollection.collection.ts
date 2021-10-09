import { NitrateCollection } from "./ICollection.collection";


class DailyBazaarCollection extends NitrateCollection{
    constructor(){
        super("dailynitratebazaar");
    }
}

export default new DailyBazaarCollection();