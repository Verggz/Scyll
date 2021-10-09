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
exports.BinSniper = void 0;
var BinUtil_hypixel_1 = require("../util/BinUtil.hypixel");
var storage_1 = require("@google-cloud/storage");
var CacheDatabase_db_1 = __importDefault(require("../../db/CacheDatabase.db"));
var AuctionUtil_hypixel_1 = require("../util/AuctionUtil.hypixel");
var promises_1 = __importDefault(require("fs/promises"));
var storage = new storage_1.Storage({ "projectId": "projectscyll", "keyFilename": "./projectscyll-97351f835781.json" });
var BinSniper = /** @class */ (function () {
    function BinSniper() {
    }
    BinSniper.FindSnipeByProfitWithFile = function (profit) {
        return __awaiter(this, void 0, void 0, function () {
            var file, _a, _b, viable, i, viable, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(BinUtil_hypixel_1.BinUtil.sniped.timesincelastcall <= 0)) return [3 /*break*/, 2];
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, promises_1.default.readFile(__dirname + "/../../../cache/result/binresults.json")];
                    case 1:
                        file = _b.apply(_a, [(_c.sent()).toString()]);
                        viable = [];
                        console.log(file.auctions.length);
                        for (i = 0; i < file.auctions.length; i++) {
                            if (file.auctions[i].item.price < profit) {
                                continue;
                            }
                            if (file.auctions[i].usual.price - file.auctions[i].item.price >= profit && file.auctions[i].usual.price - file.auctions[i].item.price <= profit * 1.5) {
                                viable.push({ "item": file.auctions[i].item, "usual": file.auctions[i].usual });
                            }
                        }
                        return [2 /*return*/, { "random": viable[Math.floor(Math.random() * viable.length)], all: viable }];
                    case 2:
                        viable = [];
                        for (i = 0; i < BinUtil_hypixel_1.BinUtil.sniped.auctions.length; i++) {
                            if (BinUtil_hypixel_1.BinUtil.sniped.auctions[i].item.price < profit) {
                                continue;
                            }
                            if (BinUtil_hypixel_1.BinUtil.sniped.auctions[i].usual.price - BinUtil_hypixel_1.BinUtil.sniped.auctions[i].item.price >= profit && BinUtil_hypixel_1.BinUtil.sniped.auctions[i].usual.price - BinUtil_hypixel_1.BinUtil.sniped.auctions[i].item.price <= profit * 1.5) {
                                viable.push({ "item": BinUtil_hypixel_1.BinUtil.sniped.auctions[i].item, "usual": BinUtil_hypixel_1.BinUtil.sniped.auctions[i].usual });
                            }
                        }
                        return [2 /*return*/, { "random": viable[Math.floor(Math.random() * viable.length)], all: viable }];
                }
            });
        });
    };
    BinSniper.FindAllSnipesWithTwoLowestFile = function (profit) {
        return __awaiter(this, void 0, void 0, function () {
            var file, _a, _b, viable, i, viable, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (!(BinUtil_hypixel_1.BinUtil.sniped.timesincelastcall <= 0)) return [3 /*break*/, 2];
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, promises_1.default.readFile(__dirname + "/../../../cache/result/binresults.json")];
                    case 1:
                        file = _b.apply(_a, [(_c.sent()).toString()]);
                        viable = [];
                        console.log(file.auctions.length);
                        for (i = 0; i < file.auctions.length; i++) {
                            if (file.auctions[i][0] < profit) {
                                continue;
                            }
                            if (file.auctions[i][1].price - file.auctions[i][0].price >= profit && file.auctions[i][1].price - file.auctions[i][0].price <= profit * 1.4) {
                                viable.push({ "item": file.auctions[i][0], "usual": file.auctions[i][1] });
                            }
                        }
                        return [2 /*return*/, { "random": viable[Math.floor(Math.random() * viable.length)], all: viable }];
                    case 2:
                        viable = [];
                        for (i = 0; i < BinUtil_hypixel_1.BinUtil.sniped.auctions.length; i++) {
                            if (BinUtil_hypixel_1.BinUtil.sniped.auctions[i][0].price < profit) {
                                continue;
                            }
                            if (BinUtil_hypixel_1.BinUtil.sniped.auctions[i][1].price - BinUtil_hypixel_1.BinUtil.sniped.auctions[i][0].price >= profit && BinUtil_hypixel_1.BinUtil.sniped.auctions[i][1].price - BinUtil_hypixel_1.BinUtil.sniped.auctions[i][0].price <= profit * 1.5) {
                                viable.push({ "item": BinUtil_hypixel_1.BinUtil.sniped.auctions[i][0], "usual": BinUtil_hypixel_1.BinUtil.sniped.auctions[i][1] });
                            }
                        }
                        return [2 /*return*/, { "random": viable[Math.floor(Math.random() * viable.length)], all: viable }];
                }
            });
        });
    };
    BinSniper.FindSnipeByProfit = function (profit) {
        return __awaiter(this, void 0, void 0, function () {
            var curtime, getBinCache, tempFile, endedCache, endedCachev2, endedCacheKeys, allItems, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        curtime = Date.now();
                        if (!(BinUtil_hypixel_1.BinUtil.bin.lastupdates == undefined && BinUtil_hypixel_1.BinUtil.isupdating == false || BinUtil_hypixel_1.BinUtil.bin.lastupdates == 0 && BinUtil_hypixel_1.BinUtil.isupdating == false || BinUtil_hypixel_1.BinUtil.bin.lastupdates + 120000 <= curtime && BinUtil_hypixel_1.BinUtil.isupdating == false)) return [3 /*break*/, 3];
                        console.log("ooof");
                        BinUtil_hypixel_1.BinUtil.isupdating = true;
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
                        console.log("done");
                        BinUtil_hypixel_1.BinUtil.bin.auctions = BinUtil_hypixel_1.BinUtil.bin.auctions.sort(function (a, b) {
                            if (a.price < b.price) {
                                return -1;
                            }
                            else if (a.price > b.price) {
                                return 1;
                            }
                            else {
                                return 0;
                            }
                        });
                        return [4 /*yield*/, CacheDatabase_db_1.default.GetDocumentById("auctionprices")];
                    case 4:
                        endedCache = _a.sent();
                        return [4 /*yield*/, CacheDatabase_db_1.default.GetDocumentById("auctionpricesv2")];
                    case 5:
                        endedCachev2 = _a.sent();
                        if (!endedCache || endedCache instanceof Error)
                            return [2 /*return*/];
                        endedCacheKeys = Object.keys(endedCache);
                        allItems = [];
                        for (i = 0; i < endedCacheKeys.length; i++) {
                            if (endedCache[endedCacheKeys[i]].price < profit) {
                                continue;
                            }
                            allItems.push(AuctionUtil_hypixel_1.AuctionUtil.KeepIndex(i).then(function (index) {
                                return BinUtil_hypixel_1.BinUtil.GetAllBINsOfItemWithPrice(endedCacheKeys[index], "", endedCachev2).then(function (items) {
                                    var viable = [];
                                    if (items == undefined) {
                                        return undefined;
                                    }
                                    if (items.allitems.length == 0) {
                                        return undefined;
                                    }
                                    if (!endedCache || endedCache instanceof Error) {
                                        return;
                                    }
                                    //console.log(items);
                                    for (var j = 0; j < items.allitems.length; j++) {
                                        if (items.allitems[j] == undefined) {
                                            console.log("yes1");
                                            continue;
                                        }
                                        //console.log("price",items.allitems[j].price,"profit",profit,"yes",items.allitems[j].price < profit);
                                        if (items.allitems[j].price < profit) {
                                            //console.log("yes2");
                                            continue;
                                        }
                                        if (items.allitems[j].id == undefined) {
                                            console.log("yes3");
                                            continue;
                                        }
                                        if (items.allitems[j].stars == undefined) {
                                            console.log("yes4");
                                            continue;
                                        }
                                        if (items.cacheitem[items.allitems[j].id + "_" + items.allitems[j].stars].price - items.allitems[j].price >= profit && items.cacheitem[items.allitems[j].id + "_" + items.allitems[j].stars].price - items.allitems[j].price <= profit * 1.5) {
                                            viable.push({ "aucid": items.allitems[j].aucid, "item": items.allitems[j].item, "curprice": items.allitems[j].price, "profit": items.cacheitem[items.allitems[j].id + "_" + items.allitems[j].stars].price - items.allitems[j].price, "normalprice": items.cacheitem[items.allitems[j].id + "_" + items.allitems[j].stars].price });
                                        }
                                    }
                                    return viable;
                                });
                            }));
                        }
                        return [2 /*return*/, Promise.all(allItems).then(function (final) {
                                var finalItems = [];
                                for (var i = 0; i < final.length; i++) {
                                    if (final[i] != undefined) {
                                        for (var j = 0; j < final[i].length; j++) {
                                            finalItems.push(final[i][j]);
                                        }
                                    }
                                }
                                finalItems = finalItems.sort(function (a, b) {
                                    if (a.price < b.price) {
                                        return -1;
                                    }
                                    else if (a.price > b.price) {
                                        return 1;
                                    }
                                    else {
                                        return 0;
                                    }
                                });
                                return { "item": finalItems[Math.floor(Math.random() * finalItems.length)], "allitems": finalItems };
                            })];
                }
            });
        });
    };
    return BinSniper;
}());
exports.BinSniper = BinSniper;
