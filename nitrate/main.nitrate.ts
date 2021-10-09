import { DailyBazaarUtil } from "./bazaar/DailyBazaarutil.util";
import nodeschedule from 'node-schedule';
import { AuctionManager } from "./auction/AuctionManagerutil.util";

console.log("calling nitrate");

var daily = new DailyBazaarUtil();

nodeschedule.scheduleJob("0 0 * * *",() =>{
    var date = new Date().toString();
    console.log("ran at",date);
    daily.StoreAllBazaarItems();
});



//BazaarGraphCreator.GetDataWithinDayTimespan("BLAZE_ROD","07-08-2021","10-08-2021");