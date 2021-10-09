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
exports.BazaarUtil = void 0;
var main_hypixel_1 = __importDefault(require("../main.hypixel"));
var axios_1 = __importDefault(require("axios"));
var promises_1 = __importDefault(require("fs/promises"));
var BazaarUtil = /** @class */ (function () {
    function BazaarUtil() {
    }
    BazaarUtil.GetBuyInstantlyPriceOfItemInBazaar = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var allProducts, buyPrice, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, main_hypixel_1.default.getSkyblockBazaar()];
                    case 1:
                        allProducts = _a.sent();
                        buyPrice = 0;
                        for (i = 0; i < allProducts.length; i++) {
                            if (allProducts[i].productId == item.id) {
                                buyPrice = allProducts[i].status.buyPrice;
                                break;
                            }
                        }
                        return [2 /*return*/, { "item": item.name, "amount": buyPrice }];
                }
            });
        });
    };
    BazaarUtil.GetBuyOrderPriceOfItemInBazaarById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var allProducts, buyPrice, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, main_hypixel_1.default.getSkyblockBazaar()];
                    case 1:
                        allProducts = _a.sent();
                        buyPrice = 0;
                        for (i = 0; i < allProducts.length; i++) {
                            if (allProducts[i].productId == id) {
                                buyPrice = allProducts[i].sellSummary[0].pricePerUnit;
                                break;
                            }
                        }
                        return [2 /*return*/, { "item": id, "amount": buyPrice }];
                }
            });
        });
    };
    BazaarUtil.GetAllitemsFromBazaarRT = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bazaar, fullBazaar, productkeys, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get("https://api.hypixel.net/skyblock/bazaar").catch(function (e) { console.log(e); })];
                    case 1:
                        bazaar = _a.sent();
                        if (bazaar) {
                            if (bazaar.data) {
                                fullBazaar = [];
                                productkeys = Object.keys(bazaar.data.products);
                                //console.log(bazaar.data.products);
                                for (i = 0; i < productkeys.length; i++) {
                                    if (productkeys[i] == "ENCHANTED_CARROT") {
                                        continue;
                                    }
                                    if (productkeys[i].includes("GEM")) {
                                        continue;
                                    }
                                    if (productkeys[i] == "SNOW_BALL") {
                                        continue;
                                    }
                                    if (bazaar.data.products[productkeys[i]].buy_summary[0] == undefined || bazaar.data.products[productkeys[i]].sell_summary[0] == undefined) {
                                        continue;
                                    }
                                    fullBazaar.push({ "id": productkeys[i], "quickstatus": {
                                            "buyorders": bazaar.data.products[productkeys[i]].quick_status.buyOrders, "buyprice": bazaar.data.products[productkeys[i]].quick_status.buyPrice, "buyvolume": bazaar.data.products[productkeys[i]].quick_status.buyVolume, "weeklybuys": bazaar.data.products[productkeys[i]].quick_status.buyMovingWeek, "dailybuys": bazaar.data.products[productkeys[i]].quick_status.buyMovingWeek / 7,
                                            "dailysales": bazaar.data.products[productkeys[i]].quick_status.buyMovingWeek / 7, "sellorders": bazaar.data.products[productkeys[i]].quick_status.sellOrders, "sellprice": bazaar.data.products[productkeys[i]].quick_status.sellPrice, "sellvolume": bazaar.data.products[productkeys[i]].quick_status.sellVolume, "weeklysales": bazaar.data.products[productkeys[i]].quick_status.sellMovingWeek
                                        },
                                        "buysummary": bazaar.data.products[productkeys[i]].buy_summary, "sellsummary": bazaar.data.products[productkeys[i]].sell_summary });
                                }
                                return [2 /*return*/, fullBazaar];
                            }
                            else {
                                return [2 /*return*/, undefined];
                            }
                        }
                        else {
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BazaarUtil.GetAllItemsFromBazaar = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bazaarFileBuffer, file, now, bazaar, fullBazaar, productkeys, i, fullBazaar, productkeys, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promises_1.default.readFile(__dirname + "/../../../cache/hypixelcache/bazaar.json")];
                    case 1:
                        bazaarFileBuffer = _a.sent();
                        file = JSON.parse(bazaarFileBuffer.toString());
                        now = Date.now();
                        if (!(now - file.lastcall >= 1000 * 60 * 60 * 12)) return [3 /*break*/, 3];
                        return [4 /*yield*/, axios_1.default.get("https://api.hypixel.net/skyblock/bazaar").catch(function (e) { console.log(e); })];
                    case 2:
                        bazaar = _a.sent();
                        console.log("calling api");
                        if (bazaar) {
                            if (bazaar.data) {
                                promises_1.default.writeFile(__dirname + "/../../../cache/hypixelcache/bazaar.json", JSON.stringify({ "lastcall": now, "products": bazaar.data.products }));
                                fullBazaar = [];
                                productkeys = Object.keys(bazaar.data.products);
                                for (i = 0; i < productkeys.length; i++) {
                                    fullBazaar.push({ "id": productkeys[i], "quickstatus": {
                                            "buyorders": bazaar.data.products[productkeys[i]].quick_status.buyOrders, "buyprice": bazaar.data.products[productkeys[i]].quick_status.buyPrice, "buyvolume": bazaar.data.products[productkeys[i]].quick_status.buyVolume, "weeklybuys": bazaar.data.products[productkeys[i]].quick_status.buyMovingWeek, "dailybuys": bazaar.data.products[productkeys[i]].quick_status.buyMovingWeek / 7,
                                            "dailysales": bazaar.data.products[productkeys[i]].quick_status.buyMovingWeek / 7, "sellorders": bazaar.data.products[productkeys[i]].quick_status.sellOrders, "sellprice": bazaar.data.products[productkeys[i]].quick_status.sellPrice, "sellvolume": bazaar.data.products[productkeys[i]].quick_status.sellVolume, "weeklysales": bazaar.data.products[productkeys[i]].quick_status.sellMovingWeek
                                        },
                                        "buysummary": bazaar.data.products[productkeys[i]].buy_summary, "sellsummary": bazaar.data.products[productkeys[i]].sell_summary });
                                }
                                return [2 /*return*/, fullBazaar];
                            }
                            else {
                                return [2 /*return*/, undefined];
                            }
                        }
                        else {
                            return [2 /*return*/, undefined];
                        }
                        return [3 /*break*/, 4];
                    case 3:
                        console.log("calling cache");
                        fullBazaar = [];
                        productkeys = Object.keys(file.products);
                        for (i = 0; i < productkeys.length; i++) {
                            fullBazaar.push({ "id": productkeys[i], "quickstatus": {
                                    "buyorders": file.products[productkeys[i]].quick_status.buyOrders, "buyprice": file.products[productkeys[i]].quick_status.buyPrice, "buyvolume": file.products[productkeys[i]].quick_status.buyVolume, "weeklybuys": file.products[productkeys[i]].quick_status.buyMovingWeek, "dailybuys": file.products[productkeys[i]].quick_status.buyMovingWeek / 7,
                                    "dailysales": file.products[productkeys[i]].quick_status.buyMovingWeek / 7, "sellorders": file.products[productkeys[i]].quick_status.sellOrders, "sellprice": file.products[productkeys[i]].quick_status.sellPrice, "sellvolume": file.products[productkeys[i]].quick_status.sellVolume, "weeklysales": file.products[productkeys[i]].quick_status.sellMovingWeek
                                },
                                "buysummary": file.products[productkeys[i]].buy_summary, "sellsummary": file.products[productkeys[i]].sell_summary });
                        }
                        return [2 /*return*/, fullBazaar];
                    case 4: return [2 /*return*/];
                }
            });
        });
    };
    return BazaarUtil;
}());
exports.BazaarUtil = BazaarUtil;
