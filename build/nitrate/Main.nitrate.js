"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
var DailyBazaarutil_util_1 = require("./bazaar/DailyBazaarutil.util");
var node_schedule_1 = __importDefault(require("node-schedule"));
console.log("calling nitrate");
var daily = new DailyBazaarutil_util_1.DailyBazaarUtil();
node_schedule_1.default.scheduleJob("0 0 * * *", function () {
    var date = new Date().toString();
    console.log("ran at", date);
    daily.StoreAllBazaarItems();
});
//BazaarGraphCreator.GetDataWithinDayTimespan("BLAZE_ROD","07-08-2021","10-08-2021");
