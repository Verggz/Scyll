"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __generator = (this && this.__generator) || function (thisArg, body) {
    var _ = { label: 0, sent: function() { if (t[0] & 1) throw t[1]; return t[1]; }, trys: [], ops: [] }, f, y, t, g;
    return g = { next: verb(0), "throw": verb(1), "return": verb(2) }, typeof Symbol === "function" && (g[Symbol.iterator] = function() { return this; }), g;
    function verb(n) { return function (v) { return step([n, v]); }; }
    function step(op) {
        if (f) throw new TypeError("Generator is already executing.");
        while (_) try {
            if (f = 1, y && (t = op[0] & 2 ? y["return"] : op[0] ? y["throw"] || ((t = y["return"]) && t.call(y), 0) : y.next) && !(t = t.call(y, op[1])).done) return t;
            if (y = 0, t) op = [op[0] & 2, t.value];
            switch (op[0]) {
                case 0: case 1: t = op; break;
                case 4: _.label++; return { value: op[1], done: false };
                case 5: _.label++; y = op[1]; op = [0]; continue;
                case 7: op = _.ops.pop(); _.trys.pop(); continue;
                default:
                    if (!(t = _.trys, t = t.length > 0 && t[t.length - 1]) && (op[0] === 6 || op[0] === 2)) { _ = 0; continue; }
                    if (op[0] === 3 && (!t || (op[1] > t[0] && op[1] < t[3]))) { _.label = op[1]; break; }
                    if (op[0] === 6 && _.label < t[1]) { _.label = t[1]; t = op; break; }
                    if (t && _.label < t[2]) { _.label = t[2]; _.ops.push(op); break; }
                    if (t[2]) _.ops.pop();
                    _.trys.pop(); continue;
            }
            op = body.call(thisArg, _);
        } catch (e) { op = [6, e]; y = 0; } finally { f = t = 0; }
        if (op[0] & 5) throw op[1]; return { value: op[0] ? op[1] : void 0, done: true };
    }
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DailyBazaarUtil = void 0;
var DailyBazaarCollection_collection_1 = __importDefault(require("../collection/DailyBazaarCollection.collection"));
var WeeklyBazaarCollection_collection_1 = __importDefault(require("../collection/WeeklyBazaarCollection.collection"));
var promises_1 = __importDefault(require("fs/promises"));
var moment_1 = __importDefault(require("moment"));
var axios_1 = __importDefault(require("axios"));
var firestore_1 = require("@google-cloud/firestore");
var DailyBazaarUtil = /** @class */ (function () {
    function DailyBazaarUtil() {
        this.allItemsPromise = promises_1.default.readFile(__dirname + "/../../../cache/hypixelcache/items.json").then(function (buffer) {
            return JSON.parse(buffer.toString());
        });
        this.allBazaarPromise = promises_1.default.readFile(__dirname + "/../../../cache/hypixelcache/bazaar.json").then(function (buffer) {
            return JSON.parse(buffer.toString());
        });
    }
    DailyBazaarUtil.GetTimestampFromDate = function (ms) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, firestore_1.Timestamp.fromMillis(ms)];
            });
        });
    };
    //specify the bazaar 
    DailyBazaarUtil.prototype.StoreDailyBazaarItemById = function (allItems, bazaar, id) {
        if (bazaar === void 0) { bazaar = undefined; }
        return __awaiter(this, void 0, void 0, function () {
            var newbazaar, time, weeknum, timestamp, bazaarItem, buyorderprice, sellofferprice, dailybazaar, newbazaar, time, weeknum, timestamp, bazaarItem, buyorderprice, sellofferprice, dailybazaar;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(bazaar == undefined)) return [3 /*break*/, 5];
                        return [4 /*yield*/, this.allBazaarPromise];
                    case 1:
                        newbazaar = _a.sent();
                        if (!(allItems[id] != undefined || allItems[id] != null && allItems[id].bazaar)) return [3 /*break*/, 3];
                        time = moment_1.default().utc(false).startOf('day').format("DD-MM-YYYY");
                        weeknum = moment_1.default(time, "DD-MM-YYYY").utc(false).isoWeek();
                        return [4 /*yield*/, DailyBazaarUtil.GetTimestampFromDate(moment_1.default().utc(false).startOf('day').valueOf())];
                    case 2:
                        timestamp = _a.sent();
                        bazaarItem = newbazaar.products[id];
                        if (!bazaarItem.sell_summary[0] || !bazaarItem.buy_summary[0]) {
                            return [2 /*return*/];
                        }
                        buyorderprice = bazaarItem.sell_summary[0];
                        sellofferprice = bazaarItem.buy_summary[0];
                        dailybazaar = { "id": id, "name": allItems[id].name, "date": time, "buyorderprice": buyorderprice.pricePerUnit, "sellofferprice": sellofferprice.pricePerUnit, "amountofbuys": bazaarItem.quick_status.buyMovingWeek, "amountofsales": bazaarItem.quick_status.sellMovingWeek, "weeknum": weeknum, "timestamp": timestamp };
                        DailyBazaarCollection_collection_1.default.SetDocument(id + "-" + time, dailybazaar, { "merge": true });
                        return [2 /*return*/, dailybazaar];
                    case 3: return [2 /*return*/, undefined];
                    case 4: return [3 /*break*/, 8];
                    case 5:
                        newbazaar = bazaar;
                        if (!(allItems[id] != undefined || allItems[id] != null && allItems[id].bazaar)) return [3 /*break*/, 7];
                        time = moment_1.default().utc(false).startOf('day').format("DD-MM-YYYY");
                        weeknum = moment_1.default(time, "DD-MM-YYYY").utc(false).startOf('day').isoWeek();
                        return [4 /*yield*/, DailyBazaarUtil.GetTimestampFromDate(moment_1.default().utc(false).startOf('day').valueOf())];
                    case 6:
                        timestamp = _a.sent();
                        bazaarItem = newbazaar.products[id];
                        if (!bazaarItem.sell_summary[0] || !bazaarItem.buy_summary[0]) {
                            return [2 /*return*/];
                        }
                        buyorderprice = bazaarItem.sell_summary[0];
                        sellofferprice = bazaarItem.buy_summary[0];
                        dailybazaar = { "id": id, "name": allItems[id].name, "date": time, "buyorderprice": buyorderprice.pricePerUnit, "sellofferprice": sellofferprice.pricePerUnit, "amountofbuys": bazaarItem.quick_status.buyMovingWeek, "amountofsales": bazaarItem.quick_status.sellMovingWeek, "weeknum": weeknum, "timestamp": timestamp };
                        DailyBazaarCollection_collection_1.default.SetDocument(id + "-" + time + "-" + "daily", dailybazaar, { "merge": true });
                        WeeklyBazaarCollection_collection_1.default.GetDocumentById(id + "-" + weeknum + "-" + moment_1.default().year() + "-" + "weekly").then(function (doc) {
                            if (doc) {
                                if (doc instanceof Error) {
                                    return;
                                }
                                var newDoc = doc;
                                for (var i = 0; i < newDoc.days.length; i++) {
                                    if (newDoc.days[i].date == time) {
                                        return;
                                    }
                                }
                                newDoc.days.push(dailybazaar);
                                WeeklyBazaarCollection_collection_1.default.SetDocument(id + "-" + weeknum + "-" + moment_1.default().year() + "-" + "weekly", newDoc, { "merge": true });
                                return;
                            }
                            else {
                                var weeklyBazaar = { "id": id, "name": allItems[id].name, "weeknum": weeknum, "monthnum": moment_1.default().month(), days: [dailybazaar] };
                                WeeklyBazaarCollection_collection_1.default.SetDocument(id + "-" + weeknum + "-" + moment_1.default().year() + "-" + "weekly", weeklyBazaar, { "merge": true });
                                return;
                            }
                        });
                        return [2 /*return*/, dailybazaar];
                    case 7: return [2 /*return*/, undefined];
                    case 8: return [2 /*return*/];
                }
            });
        });
    };
    DailyBazaarUtil.prototype.StoreAllBazaarItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bz, bzKeys, allItems, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get("https://api.hypixel.net/skyblock/bazaar")];
                    case 1:
                        bz = (_a.sent()).data;
                        bzKeys = Object.keys(bz.products);
                        return [4 /*yield*/, this.allItemsPromise];
                    case 2:
                        allItems = _a.sent();
                        if (bz != undefined) {
                            for (i = 0; i < bzKeys.length; i++) {
                                this.StoreDailyBazaarItemById(allItems, bz, bzKeys[i]);
                            }
                        }
                        else {
                            console.log("store all undefined");
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return DailyBazaarUtil;
}());
exports.DailyBazaarUtil = DailyBazaarUtil;
