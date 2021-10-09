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
var __spreadArray = (this && this.__spreadArray) || function (to, from) {
    for (var i = 0, il = from.length, j = to.length; i < il; i++, j++)
        to[j] = from[i];
    return to;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuctionFlipper = void 0;
var AuctionUtil_hypixel_1 = require("../util/AuctionUtil.hypixel");
var FlipperUtil_hypixel_1 = require("../util/FlipperUtil.hypixel");
var ItemUtil_hypixel_1 = require("../util/ItemUtil.hypixel");
var promises_1 = __importDefault(require("fs/promises"));
var CacheDatabase_db_1 = __importDefault(require("../../db/CacheDatabase.db"));
var AuctionsCollection_collection_1 = __importDefault(require("../../nitrate/collection/AuctionsCollection.collection"));
var storage_1 = require("@google-cloud/storage");
var storage = new storage_1.Storage({ "projectId": "projectscyll", "keyFilename": "./projectscyll-97351f835781.json" });
var AuctionFlipper = /** @class */ (function () {
    function AuctionFlipper() {
    }
    AuctionFlipper.GetAllItemsFromAuctionsWithinTimeFrame = function (time, items) {
        return __awaiter(this, void 0, void 0, function () {
            var newItems, i;
            return __generator(this, function (_a) {
                newItems = [];
                for (i = 0; i < items.length; i++) {
                    if (items[i].time <= time && items[i].time > 0) {
                        newItems.push(items[i]);
                    }
                }
                newItems = newItems.sort(function (a, b) {
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
                return [2 /*return*/, newItems];
            });
        });
    };
    AuctionFlipper.FindBestAuctionFlipByProfitRangeFirestore = function (profitrange) {
        return __awaiter(this, void 0, void 0, function () {
            var allDocs, allDocsData, endedCache, i, auctions, foundItems, amount, endedCacheKeys, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, AuctionsCollection_collection_1.default.collection.where("end", ">=", Date.now() - 1800000).get()];
                    case 1:
                        allDocs = _a.sent();
                        allDocsData = [];
                        return [4 /*yield*/, CacheDatabase_db_1.default.GetDocumentById("auctionprices")];
                    case 2:
                        endedCache = _a.sent();
                        if (allDocs.empty == true) {
                            return [2 /*return*/, undefined];
                        }
                        for (i = 0; i < allDocs.docs.length; i++) {
                            allDocsData.push(allDocs.docs[i].data());
                        }
                        auctions = { "auctions": allDocsData };
                        if (!endedCache || endedCache instanceof Error) {
                            return [2 /*return*/];
                        }
                        foundItems = [];
                        amount = 0;
                        endedCacheKeys = Object.keys(endedCache);
                        for (i = 0; i < endedCacheKeys.length; i++) {
                            if (endedCacheKeys[i] == "enchanted book" || endedCacheKeys[i] == "hopper" || endedCacheKeys[i] == "book") {
                                continue;
                            }
                            if (endedCache[endedCacheKeys[i]].price < profitrange) {
                                continue;
                            }
                            foundItems.push(AuctionUtil_hypixel_1.AuctionUtil.KeepIndex(i).then(function (index) {
                                return AuctionUtil_hypixel_1.AuctionUtil.GetAllAuctionsOfItemWithCache(endedCacheKeys[index], auctions, null).then(function (items) {
                                    amount++;
                                    if (items == undefined) {
                                        return undefined;
                                    }
                                    if (items.length == 0) {
                                        return undefined;
                                    }
                                    if (!endedCache || endedCache instanceof Error) {
                                        return;
                                    }
                                    //if()
                                    for (var j = 0; j < items.length; j++) {
                                        if (items[j] == undefined) {
                                            console.log("yes");
                                            return undefined;
                                        }
                                        if (endedCache[endedCacheKeys[index]].price - items[j].price >= profitrange && endedCache[endedCacheKeys[index]].price - items[j].price <= profitrange + (Math.round(profitrange * 1.5))) {
                                            return { "aucid": items[j].aucid, "item": items[j].item, "curprice": items[j].price, "profit": endedCache[endedCacheKeys[index]].price - items[j].price, "normalprice": endedCache[endedCacheKeys[index]].price };
                                        }
                                    }
                                });
                            }));
                        }
                        return [2 /*return*/, Promise.all(foundItems).then(function (found) {
                                var finalItems = [];
                                for (var i = 0; i < found.length; i++) {
                                    if (found[i] != undefined) {
                                        finalItems.push(found[i]);
                                    }
                                }
                                console.log(finalItems.length);
                                return { "item": finalItems[Math.floor(Math.random() * finalItems.length)] };
                            })];
                }
            });
        });
    };
    AuctionFlipper.FindBestAuctionFlipByProfitRange = function (profitrange) {
        return __awaiter(this, void 0, void 0, function () {
            var foundItems, AhCache, curtime, tempFile, _a, _b, endedCache, endedCachev2, endedCacheKeys, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        foundItems = [];
                        AhCache = false;
                        curtime = Date.now();
                        if (!(AuctionFlipper.currentlycaching == false && AuctionUtil_hypixel_1.AuctionUtil.auction.lastupdates == undefined || AuctionFlipper.currentlycaching == false && AuctionUtil_hypixel_1.AuctionUtil.auction.lastupdates == 0 || AuctionFlipper.currentlycaching == false && AuctionUtil_hypixel_1.AuctionUtil.auction.lastupdates + 600000 <= curtime)) return [3 /*break*/, 3];
                        AuctionFlipper.currentlycaching = true;
                        console.log("ooof");
                        // await AuctionUtil.SaveAllAuctionsToGCS().then(final =>{
                        // });
                        // var getAhCache = async  () => new Promise((resolve,reject) =>{
                        //     let buf = "";
                        //     storage.bucket("projectscyllcache").file("auctioncache.json")
                        //     .createReadStream()
                        //     .on('data', d=> {buf += d})
                        //     .on('end',() => resolve(JSON.parse(buf)));
                        // });
                        // var tempFile: any = await getAhCache();
                        return [4 /*yield*/, AuctionUtil_hypixel_1.AuctionUtil.SaveAllAuctionsToFile()];
                    case 1:
                        // await AuctionUtil.SaveAllAuctionsToGCS().then(final =>{
                        // });
                        // var getAhCache = async  () => new Promise((resolve,reject) =>{
                        //     let buf = "";
                        //     storage.bucket("projectscyllcache").file("auctioncache.json")
                        //     .createReadStream()
                        //     .on('data', d=> {buf += d})
                        //     .on('end',() => resolve(JSON.parse(buf)));
                        // });
                        // var tempFile: any = await getAhCache();
                        _c.sent();
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, promises_1.default.readFile(__dirname + "/../../../cache/hypixelcache/auction/auctioncache.json")];
                    case 2:
                        tempFile = _b.apply(_a, [(_c.sent()).toString()]);
                        AuctionFlipper.currentlycaching = false;
                        AuctionUtil_hypixel_1.AuctionUtil.auction.lastupdates = tempFile.timesincelastcall;
                        AuctionUtil_hypixel_1.AuctionUtil.auction.auctions = tempFile.auctions;
                        _c.label = 3;
                    case 3: return [4 /*yield*/, CacheDatabase_db_1.default.GetDocumentById("auctionprices")];
                    case 4:
                        endedCache = _c.sent();
                        return [4 /*yield*/, CacheDatabase_db_1.default.GetDocumentById("auctionpricesv2")];
                    case 5:
                        endedCachev2 = _c.sent();
                        if (!endedCache || endedCache instanceof Error) {
                            return [2 /*return*/];
                        }
                        endedCacheKeys = Object.keys(endedCache);
                        for (i = 0; i < endedCacheKeys.length; i++) {
                            if (endedCacheKeys[i] == "enchanted book" || endedCacheKeys[i] == "hopper" || endedCacheKeys[i] == "book") {
                                continue;
                            }
                            if (endedCache[endedCacheKeys[i]].price < profitrange) {
                                continue;
                            }
                            foundItems.push(AuctionUtil_hypixel_1.AuctionUtil.KeepIndex(i).then(function (index) {
                                return AuctionUtil_hypixel_1.AuctionUtil.GetAllAuctionsOfItemWithCache(endedCacheKeys[index], AuctionUtil_hypixel_1.AuctionUtil.auction, endedCachev2).then(function (items) {
                                    if (items == undefined) {
                                        return undefined;
                                    }
                                    if (items.length == 0) {
                                        return undefined;
                                    }
                                    if (!endedCache || endedCache instanceof Error) {
                                        return;
                                    }
                                    //if()
                                    for (var j = 0; j < items.length; j++) {
                                        if (items[j] == undefined) {
                                            return undefined;
                                        }
                                        if (endedCache[endedCacheKeys[index]].price - items[j].price >= profitrange && endedCache[endedCacheKeys[index]].price - items[j].price <= profitrange + (Math.round(profitrange * 1.5)) && items[j].price > endedCache[endedCacheKeys[index]].price * 0.1 && items[j].time < 2700000) {
                                            return { "aucid": items[j].aucid, "item": items[j].item, "curprice": items[j].price, "profit": endedCache[endedCacheKeys[index]].price - items[j].price, "normalprice": endedCache[endedCacheKeys[index]].price };
                                        }
                                    }
                                });
                            }));
                        }
                        return [2 /*return*/, Promise.all(foundItems).then(function (found) {
                                var finalItemstemp = [];
                                var finalItems = [];
                                for (var i = 0; i < found.length; i++) {
                                    if (found[i] != undefined) {
                                        finalItemstemp.push(found[i]);
                                    }
                                }
                                finalItems = ItemUtil_hypixel_1.ItemlUtil.RemoveAllDuplicatesAuction(finalItemstemp);
                                return { "item": finalItems[Math.floor(Math.random() * finalItems.length)], "allitems": finalItems, "ahcache": AhCache };
                            })];
                }
            });
        });
    };
    AuctionFlipper.CompareAuctionsToLowestBIN = function (item, auc) {
        return __awaiter(this, void 0, void 0, function () {
            var flippable, i;
            return __generator(this, function (_a) {
                if (item.dungeonItem == true) {
                    flippable = [];
                    for (i = 0; i < auc.length - 1; i++) {
                        flippable.push(ItemUtil_hypixel_1.ItemlUtil.getAmountOfStarsOnItemWithIndex(auc[i].item, i).then(function (amountOfStars) {
                            if (amountOfStars != undefined) {
                                //console.log(auc);
                                var newAuc = __spreadArray([], auc);
                                return FlipperUtil_hypixel_1.FlipperUtil.GetLowestPriceOfDungeonItem(item, amountOfStars).then(function (itemamount) {
                                    if (itemamount != undefined) {
                                        if (itemamount.amount >= newAuc[i].price) {
                                            return { "flip": true, "auction": newAuc[i], item: itemamount };
                                        }
                                        else {
                                            return { "flip": false, "auction": newAuc[i], item: itemamount };
                                        }
                                    }
                                });
                            }
                            else {
                                return undefined;
                            }
                        }));
                    }
                    return [2 /*return*/, Promise.all(flippable)];
                }
                else {
                    // var itemamount = await FlipperUtil.GetLowestPriceOfItem(item);
                    // if(itemamount != undefined){
                    //     for(var i = 0; i < auc.length; i++){
                    //         if(itemamount.amount >= auc[i].price){
                    //             flippable.push({"flip":true,"auction":auc[i],item:itemamount});
                    //         }else{
                    //             flippable.push({"flip":false,"auction":auc[i],item:itemamount});
                    //         }
                    //     }
                    //
                    //     return flippable;
                    // }
                }
                return [2 /*return*/, undefined];
            });
        });
    };
    AuctionFlipper.CompareAuctionsToLowestBINWithoutAPICall = function (ah, item, specific) {
        return __awaiter(this, void 0, void 0, function () {
            var flippable, i, flippable, i;
            return __generator(this, function (_a) {
                item.dungeonItem = true;
                if (item.dungeonItem == true) {
                    flippable = [];
                    //console.log(specific[specific.length - 2]);
                    for (i = 0; i < specific.length; i++) {
                        flippable.push(ItemUtil_hypixel_1.ItemlUtil.getAmountOfStarsOnItemWithIndex(specific[i].item, i).then(function (amountOfStars) {
                            //console.log("amount of stars",amountOfStars,"specific item",amountOfStars.item)
                            var amount = amountOfStars.index;
                            var specificItem = specific[amount];
                            if (amountOfStars.stars != undefined) {
                                return FlipperUtil_hypixel_1.FlipperUtil.GetLowestPriceOfDungeonItemWithoutAPICall(ah, item, amountOfStars.stars).then(function (itemamount) {
                                    //console.log(`amount of stars:${amountOfStars},  itemamount: ${itemamount?.item}, newSpef: ${ amountOfStars.item}`)
                                    if (itemamount != undefined) {
                                        if (itemamount.amount >= specificItem.price) {
                                            var auctionItem = { "item": amountOfStars.item, "aucid": specificItem.aucid, "bids": specificItem.bids, "bin": specificItem.bin, "item_bytes": specificItem.item_bytes, "lore": specificItem.lore, "price": specificItem.price, "time": specificItem.time, "start": specificItem.start, "end": specificItem.end };
                                            return { "flip": true, "auction": auctionItem, item: itemamount };
                                        }
                                        else {
                                            var auctionItem = { "item": amountOfStars.item, "aucid": specificItem.aucid, "bids": specificItem.bids, "bin": specificItem.bin, "item_bytes": specificItem.item_bytes, "lore": specificItem.lore, "price": specificItem.price, "time": specificItem.time, "start": specificItem.start, "end": specificItem.end };
                                            return { "flip": false, "auction": auctionItem, item: itemamount };
                                        }
                                    }
                                });
                            }
                            else {
                                var newSpef = __spreadArray([], specific);
                                return FlipperUtil_hypixel_1.FlipperUtil.GetLowestPriceOfDungeonItemWithoutAPICall(ah, item, 0).then(function (itemamount) {
                                    if (itemamount != undefined) {
                                        if (itemamount.amount >= specificItem.price) {
                                            var auctionItem = { "item": amountOfStars.item, "aucid": specificItem.aucid, "bids": specificItem.bids, "bin": specificItem.bin, "item_bytes": specificItem.item_bytes, "lore": specificItem.lore, "price": specificItem.price, "time": specificItem.time, "start": specificItem.start, "end": specificItem.end };
                                            return { "flip": true, "auction": auctionItem, item: itemamount };
                                        }
                                        else {
                                            var auctionItem = { "item": amountOfStars.item, "aucid": specificItem.aucid, "bids": specificItem.bids, "bin": specificItem.bin, "item_bytes": specificItem.item_bytes, "lore": specificItem.lore, "price": specificItem.price, "time": specificItem.time, "start": specificItem.start, "end": specificItem.end };
                                            return { "flip": false, "auction": auctionItem, item: itemamount };
                                        }
                                    }
                                });
                            }
                        }));
                    }
                    return [2 /*return*/, Promise.all(flippable).then(function (flipped) {
                            return flipped;
                        })];
                }
                else {
                    flippable = [];
                    for (i = 0; i < specific.length; i++) {
                        flippable.push(AuctionUtil_hypixel_1.AuctionUtil.KeepIndex(i).then(function (index) {
                            FlipperUtil_hypixel_1.FlipperUtil.GetLowestPriceOfItemWithoutAPICall(ah, item).then(function (itemamount) {
                                var specificItem = specific[index];
                                if (itemamount != undefined) {
                                    if (itemamount.amount >= specificItem.price) {
                                        return { "flip": true, "auction": specificItem, item: itemamount };
                                    }
                                    else {
                                        return { "flip": false, "auction": specificItem, item: itemamount };
                                    }
                                }
                            });
                        }));
                    }
                    return [2 /*return*/, Promise.all(flippable)];
                }
                return [2 /*return*/];
            });
        });
    };
    AuctionFlipper.CompareAuctionToAverageBIN = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    AuctionFlipper.currentlycaching = false;
    return AuctionFlipper;
}());
exports.AuctionFlipper = AuctionFlipper;
