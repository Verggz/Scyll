import { NitrateCollection } from "./ICollection.collection";


class WeeklyBazaarCollection extends NitrateCollection{
    constructor(){
        super("weeklynitratebazaar");
    }
}

export default new WeeklyBazaarCollection();