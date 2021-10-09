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
Object.defineProperty(exports, "__esModule", { value: true });
exports.MarketManipulator = void 0;
var BinUtil_hypixel_1 = require("../util/BinUtil.hypixel");
var storage_1 = require("@google-cloud/storage");
var storage = new storage_1.Storage({ "projectId": "projectscyll", "keyFilename": "./projectscyll-97351f835781.json" });
var isupdating = false;
var MarketManipulator = /** @class */ (function () {
    function MarketManipulator() {
    }
    MarketManipulator.FindManipByNameAndStartPrice = function (name, pricefor1) {
        return __awaiter(this, void 0, void 0, function () {
            var curtime, getBinCache, tempFile, allofitem, allofitemprice, i, closestprice, closestpriceindex, closestflipprice, closestflippriceindex, itemstobuy, total, profit, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        curtime = Date.now();
                        if (!(BinUtil_hypixel_1.BinUtil.bin.lastupdates == undefined && BinUtil_hypixel_1.BinUtil.isupdating == false || BinUtil_hypixel_1.BinUtil.bin.lastupdates == 0 && BinUtil_hypixel_1.BinUtil.isupdating == false || BinUtil_hypixel_1.BinUtil.bin.lastupdates + 6000000 <= curtime && BinUtil_hypixel_1.BinUtil.isupdating == false)) return [3 /*break*/, 3];
                        BinUtil_hypixel_1.BinUtil.isupdating = true;
                        console.log("ooof");
                        return [4 /*yield*/, BinUtil_hypixel_1.BinUtil.SaveAllBinsToGCS()];
                    case 1:
                        _a.sent();
                        getBinCache = function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, new Promise(function (resolve, reject) {
                                        var buf = "";
                                        storage.bucket("projectscyllcache").file("bincache.json")
                                            .createReadStream()
                                            .on('data', function (d) { buf += d; })
                                            .on('end', function () { return resolve(JSON.parse(buf)); });
                                    })];
                            });
                        }); };
                        return [4 /*yield*/, getBinCache()];
                    case 2:
                        tempFile = _a.sent();
                        BinUtil_hypixel_1.BinUtil.bin.lastupdates = tempFile.timesincelastcall;
                        BinUtil_hypixel_1.BinUtil.bin.auctions = tempFile.auctions;
                        BinUtil_hypixel_1.BinUtil.isupdating = false;
                        _a.label = 3;
                    case 3:
                        allofitem = [];
                        allofitemprice = [];
                        for (i = 0; i < BinUtil_hypixel_1.BinUtil.bin.auctions.length; i++) {
                            if (BinUtil_hypixel_1.BinUtil.bin.auctions[i].item.toLowerCase().includes(name)) {
                                allofitem.push(BinUtil_hypixel_1.BinUtil.bin.auctions[i]);
                                allofitemprice.push(BinUtil_hypixel_1.BinUtil.bin.auctions[i].price);
                            }
                        }
                        allofitemprice = allofitemprice.sort(function (a, b) {
                            return a - b;
                        });
                        if (allofitemprice.length == 0) {
                            console.log("length ");
                            return [2 /*return*/, false];
                        }
                        closestprice = allofitemprice.reduce(function (prev, curr) { return Math.abs(curr - pricefor1) < Math.abs(prev - pricefor1) ? curr : prev; });
                        closestpriceindex = allofitemprice.indexOf(closestprice);
                        allofitemprice = allofitemprice.slice(closestpriceindex);
                        if (allofitemprice.length == 0) {
                            return [2 /*return*/, false];
                        }
                        closestflipprice = allofitemprice.reduce(function (prev, curr) { return Math.abs(curr - Math.ceil(pricefor1 * 1.75)) < Math.abs(prev - Math.ceil(pricefor1 * 1.75)) ? curr : prev; });
                        if (closestprice == closestflipprice) {
                            console.log("same");
                            return [2 /*return*/, false];
                        }
                        else {
                            closestflippriceindex = allofitemprice.indexOf(closestflipprice);
                            itemstobuy = [];
                            total = 0;
                            profit = 0;
                            for (i = 0; i < closestflippriceindex; i++) {
                                total += allofitemprice[i];
                                profit += closestflipprice - allofitemprice[i];
                                itemstobuy.push(allofitemprice[i]);
                            }
                            console.log(profit);
                            return [2 /*return*/, { "itemstobuy": itemstobuy, "totalcost": total, "profit": profit, "amountofitems": itemstobuy.length, "margin": 1.75, "final": closestflipprice }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    MarketManipulator.FindManipWithStartAndEndPrice = function (name, startprice, endprice) {
        return __awaiter(this, void 0, void 0, function () {
            var curtime, getBinCache, tempFile, allofitem, allofitemprice, i, closeststartprice, closeststartpriceindex, closestendprice, closestendpriceindex, itemstobuy, total, profit, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        curtime = Date.now();
                        if (!(BinUtil_hypixel_1.BinUtil.bin.lastupdates == undefined && isupdating == false || BinUtil_hypixel_1.BinUtil.bin.lastupdates == 0 && isupdating == false || BinUtil_hypixel_1.BinUtil.bin.lastupdates + 600000 <= curtime && isupdating == false)) return [3 /*break*/, 3];
                        console.log("ooof");
                        return [4 /*yield*/, BinUtil_hypixel_1.BinUtil.SaveAllBinsToGCS()];
                    case 1:
                        _a.sent();
                        getBinCache = function () { return __awaiter(_this, void 0, void 0, function () {
                            return __generator(this, function (_a) {
                                return [2 /*return*/, new Promise(function (resolve, reject) {
                                        var buf = "";
                                        storage.bucket("projectscyllcache").file("bincache.json")
                                            .createReadStream()
                                            .on('data', function (d) { buf += d; })
                                            .on('end', function () { return resolve(JSON.parse(buf)); });
                                    })];
                            });
                        }); };
                        return [4 /*yield*/, getBinCache()];
                    case 2:
                        tempFile = _a.sent();
                        BinUtil_hypixel_1.BinUtil.bin.lastupdates = tempFile.timesincelastcall;
                        BinUtil_hypixel_1.BinUtil.bin.auctions = tempFile.auctions;
                        _a.label = 3;
                    case 3:
                        allofitem = [];
                        allofitemprice = [];
                        for (i = 0; i < BinUtil_hypixel_1.BinUtil.bin.auctions.length; i++) {
                            if (BinUtil_hypixel_1.BinUtil.bin.auctions[i].item.toLowerCase().includes(name)) {
                                allofitem.push(BinUtil_hypixel_1.BinUtil.bin.auctions[i]);
                                allofitemprice.push(BinUtil_hypixel_1.BinUtil.bin.auctions[i].price);
                            }
                        }
                        allofitemprice = allofitemprice.sort(function (a, b) {
                            return a - b;
                        });
                        if (startprice >= endprice) {
                            return [2 /*return*/, "starthigherthanend"];
                        }
                        if (allofitemprice.length == 0) {
                            return [2 /*return*/, "invaliditem"];
                        }
                        closeststartprice = allofitemprice.reduce(function (prev, curr) { return Math.abs(curr - startprice) < Math.abs(prev - startprice) ? curr : prev; });
                        closeststartpriceindex = allofitemprice.indexOf(closeststartprice);
                        allofitemprice = allofitemprice.slice(closeststartpriceindex);
                        if (allofitemprice.length == 0) {
                            console.log("length ");
                            return [2 /*return*/, false];
                        }
                        closestendprice = allofitemprice.reduce(function (prev, curr) { return Math.abs(curr - endprice) < Math.abs(prev - endprice) ? curr : prev; });
                        closestendpriceindex = allofitemprice.indexOf(closestendprice);
                        if (closeststartprice == closestendprice) {
                            return [2 /*return*/, "tooclose"];
                        }
                        allofitemprice = allofitemprice.slice(0, closestendpriceindex);
                        if (allofitemprice.length == 0) {
                            console.log("length ");
                            return [2 /*return*/, false];
                        }
                        itemstobuy = [];
                        total = 0;
                        profit = 0;
                        for (i = 0; i < allofitemprice.length; i++) {
                            total += allofitemprice[i];
                            profit += closestendprice - allofitemprice[i];
                            itemstobuy.push(allofitemprice[i]);
                        }
                        return [2 /*return*/, { "itemstobuy": itemstobuy, "totalcost": total, "profit": profit, "amountofitems": itemstobuy.length }];
                }
            });
        });
    };
    return MarketManipulator;
}());
exports.MarketManipulator = MarketManipulator;
