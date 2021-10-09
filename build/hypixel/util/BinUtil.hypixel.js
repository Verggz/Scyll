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
exports.BinUtil = void 0;
var AuctionUtil_hypixel_1 = require("./AuctionUtil.hypixel");
var ItemUtil_hypixel_1 = require("./ItemUtil.hypixel");
var storage_1 = require("@google-cloud/storage");
var CacheDatabase_db_1 = __importDefault(require("../../db/CacheDatabase.db"));
var promises_1 = __importDefault(require("fs/promises"));
var fs_extra_1 = __importDefault(require("fs-extra"));
var storage = new storage_1.Storage({ "projectId": "projectscyll", "keyFilename": "./projectscyll-97351f835781.json" });
var BinUtil = /** @class */ (function () {
    function BinUtil() {
    }
    BinUtil.SaveAllBinsToGCS = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ah, trueAuctions, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, AuctionUtil_hypixel_1.AuctionUtil.GetAllItemsFromAh()];
                    case 1:
                        ah = _a.sent();
                        if (ah == undefined) {
                            return [2 /*return*/];
                        }
                        trueAuctions = [];
                        for (i = 0; i < ah.length; i++) {
                            if (ah[i].bin != undefined) {
                                trueAuctions.push(ah[i]);
                            }
                        }
                        return [4 /*yield*/, storage.bucket('projectscyllcache').file("bincache.json").save(JSON.stringify({ "timesincelastcall": Date.now(), auctions: trueAuctions }))];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    BinUtil.SaveAllBinsToFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ah, trueAuctions, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, AuctionUtil_hypixel_1.AuctionUtil.GetAllItemsFromAh()];
                    case 1:
                        ah = _a.sent();
                        if (ah == undefined) {
                            return [2 /*return*/];
                        }
                        trueAuctions = [];
                        for (i = 0; i < ah.length; i++) {
                            if (ah[i].bin != undefined) {
                                trueAuctions.push(ah[i]);
                            }
                        }
                        return [4 /*yield*/, fs_extra_1.default.writeJSON(__dirname + "/../../../cache/bincache.json", { timesincelastcall: Date.now(), auctions: trueAuctions })];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    BinUtil.SaveAllBINItems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ah, itemBuffer, allitems, allitemskeys, saved, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, AuctionUtil_hypixel_1.AuctionUtil.GetAllItemsFromAh()];
                    case 1:
                        ah = _a.sent();
                        return [4 /*yield*/, ItemUtil_hypixel_1.ItemlUtil.GetAllitems()];
                    case 2:
                        itemBuffer = _a.sent();
                        if (itemBuffer == undefined) {
                            return [2 /*return*/];
                        }
                        allitems = JSON.parse(itemBuffer);
                        allitemskeys = Object.keys(allitems);
                        saved = [];
                        for (i = 0; i < allitemskeys.length; i++) {
                            if (allitems[allitemskeys[i]].bazaar) {
                                continue;
                            }
                            saved.push(AuctionUtil_hypixel_1.AuctionUtil.KeepIndex(i).then(function (index) {
                                var check = [];
                                if (ah == undefined) {
                                    return;
                                }
                                for (var j = 0; j < ah.length; i++) {
                                    if (!ah[j].bin) {
                                        continue;
                                    }
                                    if (ah[j].item.toLowerCase().includes(allitems[allitemskeys[index]].name.toLowerCase())) {
                                        check.push(AuctionUtil_hypixel_1.AuctionUtil.KeepIndex(j).then(function (otherindex) {
                                            if (ah == undefined) {
                                                return;
                                            }
                                            return AuctionUtil_hypixel_1.AuctionUtil.GetAuctionItemID(ah[otherindex].item_bytes).then(function (id) {
                                                if (ah == undefined) {
                                                    return;
                                                }
                                                if (id == allitems[index]) {
                                                    return ItemUtil_hypixel_1.ItemlUtil.ConvertItemBytesToItemData(ah[otherindex].item_bytes).then(function (final) {
                                                        if (ah == undefined) {
                                                            return;
                                                        }
                                                        var finalitem = { "id": id, "name": allitems[allitemskeys[index]].name.trim(), "price": ah[otherindex].price, "itembytes": ah[otherindex].item_bytes };
                                                        if (final.value[0].tag.value.display.value.Lore.value.value[final.value[0].tag.value.display.value.Lore.value.value.length - 1].replace(/\u00A7[0-9A-FK-OR]/ig, '').split(" ")[0].trim() == "a") {
                                                            finalitem["rarity"] = final.value[0].tag.value.display.value.Lore.value.value[final.value[0].tag.value.display.value.Lore.value.value.length - 1].replace(/\u00A7[0-9A-FK-OR]/ig, '').split(" ")[1];
                                                        }
                                                        else {
                                                            finalitem["rarity"] = final.value[0].tag.value.display.value.Lore.value.value[final.value[0].tag.value.display.value.Lore.value.value.length - 1].replace(/\u00A7[0-9A-FK-OR]/ig, '').split(" ")[0];
                                                        }
                                                        if (final.value[0].tag.value.ExtraAttributes.value.dungeon_item_level) {
                                                            finalitem["stars"] = final.value[0].tag.value.ExtraAttributes.value.dungeon_item_level.value;
                                                        }
                                                        if (final.value[0].tag.value.ExtraAttributes.value.modifier) {
                                                            finalitem["reforge"] = final.value[0].tag.value.ExtraAttributes.value.modifier.value;
                                                        }
                                                        return finalitem;
                                                    });
                                                }
                                                else {
                                                    return undefined;
                                                }
                                            });
                                        }));
                                    }
                                }
                                return Promise.all(check).then(function (allitems) {
                                    return allitems.sort(function (a, b) {
                                        if (a.price < b.price) {
                                            return -1;
                                        }
                                        else if (a.price > b.price) {
                                            return 1;
                                        }
                                        else {
                                            return 0;
                                        }
                                    })[0];
                                });
                            }));
                        }
                        return [2 /*return*/, Promise.all(saved).then(function (final) {
                                var binfile = {};
                                for (var i = 0; i < final.length; i++) {
                                    if (final[i] == undefined) {
                                        continue;
                                    }
                                    binfile[final[i].id] = final[i];
                                }
                                return binfile;
                            })];
                }
            });
        });
    };
    BinUtil.SaveAllSecondLowestSnipeToFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bin, allitems, _a, _b, endedCache, endedCacheKeys, lowest, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, fs_extra_1.default.readJSON(__dirname + "/../../../cache/bincache.json")];
                    case 1:
                        bin = _c.sent();
                        if (bin.timesincelastcall <= 0 || bin.timesincelastcall + 120000 <= Date.now()) {
                            return [2 /*return*/];
                        }
                        bin.auctions = bin.auctions.sort(function (a, b) {
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
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, promises_1.default.readFile(__dirname + "/../../../cache/hypixelcache/items.json")];
                    case 2:
                        allitems = _b.apply(_a, [(_c.sent()).toString()]);
                        return [4 /*yield*/, CacheDatabase_db_1.default.GetDocumentById("auctionpricesv2")];
                    case 3:
                        endedCache = _c.sent();
                        if (endedCache == undefined || endedCache == false || endedCache instanceof Error)
                            return [2 /*return*/];
                        endedCacheKeys = Object.keys(endedCache);
                        lowest = [];
                        for (i = 0; i < endedCacheKeys.length; i++) {
                            lowest.push(AuctionUtil_hypixel_1.AuctionUtil.KeepIndex(i).then(function (index) {
                                if (endedCache == undefined || endedCache == false || endedCache instanceof Error)
                                    return;
                                var cacheKeyArr = endedCacheKeys[index].split("_");
                                var stars = parseInt(cacheKeyArr.pop());
                                if (endedCache[cacheKeyArr.join("_") + "_" + String(stars + 1)]) {
                                    if (endedCache[cacheKeyArr.join("_") + "_" + String(stars)].price > endedCache[cacheKeyArr.join("_") + "_" + String(stars + 1)]) {
                                        return undefined;
                                    }
                                }
                                return BinUtil.GetLowestAndSecondLowestOfBIN(bin, endedCache[endedCacheKeys[index]], allitems[endedCache[endedCacheKeys[index]].id].name);
                            }));
                        }
                        return [2 /*return*/, Promise.all(lowest).then(function (items) {
                                var viableitems = [];
                                for (var i = 0; i < items.length; i++) {
                                    if (items[i] == undefined) {
                                        continue;
                                    }
                                    if (items[i][1].price - items[i][0].price > 0) {
                                        viableitems.push(items[i]);
                                    }
                                }
                                BinUtil.sniped = { "timesincelastcall": Date.now(), "auctions": viableitems };
                                promises_1.default.writeFile(__dirname + "/../../../cache/result/binresults.json", JSON.stringify({ "timesincelastcall": Date.now(), "auctions": viableitems }));
                                return viableitems;
                            })];
                }
            });
        });
    };
    BinUtil.GetLowestAndSecondLowestOfBIN = function (bin, item, itemname) {
        return __awaiter(this, void 0, void 0, function () {
            var twolowest, i, amountofstars, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        twolowest = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < bin.auctions.length)) return [3 /*break*/, 5];
                        if (twolowest.length >= 2) {
                            return [3 /*break*/, 5];
                        }
                        if (!bin.auctions[i].item.toLowerCase().includes(itemname.toLowerCase())) return [3 /*break*/, 4];
                        return [4 /*yield*/, ItemUtil_hypixel_1.ItemlUtil.getAmountOfStarsOnItem(bin.auctions[i].item.toLowerCase().trim())];
                    case 2:
                        amountofstars = _a.sent();
                        if (amountofstars.stars == undefined) {
                            amountofstars.stars = 0;
                        }
                        if (!(item.stars == amountofstars.stars)) return [3 /*break*/, 4];
                        return [4 /*yield*/, AuctionUtil_hypixel_1.AuctionUtil.GetAuctionItemID(bin.auctions[i].item_bytes)];
                    case 3:
                        id = _a.sent();
                        if (id == "ENCHANTED_BOOK")
                            return [3 /*break*/, 4];
                        twolowest.push({ "id": id, "stars": amountofstars.stars, "aucid": bin.auctions[i].aucid, "price": bin.auctions[i].price, "item": bin.auctions[i].item });
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5:
                        if (twolowest.length < 2) {
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/, twolowest];
                }
            });
        });
    };
    BinUtil.GetAllBINsOfItemWithPrice = function (item, itemid, v2) {
        return __awaiter(this, void 0, void 0, function () {
            var items, v2item, i, amountofstars, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        items = [];
                        v2item = {};
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < BinUtil.bin.auctions.length)) return [3 /*break*/, 5];
                        if (!BinUtil.bin.auctions[i].item.toLowerCase().includes(item.toLowerCase())) return [3 /*break*/, 4];
                        return [4 /*yield*/, ItemUtil_hypixel_1.ItemlUtil.getAmountOfStarsOnItem(BinUtil.bin.auctions[i].item.toLowerCase().trim())];
                    case 2:
                        amountofstars = _a.sent();
                        if (amountofstars.stars == undefined) {
                            amountofstars.stars = 0;
                        }
                        return [4 /*yield*/, AuctionUtil_hypixel_1.AuctionUtil.GetAuctionItemID(BinUtil.bin.auctions[i].item_bytes)];
                    case 3:
                        id = _a.sent();
                        if (id == "ENCHANTED_BOOK")
                            return [3 /*break*/, 4];
                        if (v2[id + "_" + amountofstars.stars]) {
                            if (v2[id + "_" + amountofstars.stars].timestamp + 1800000 > Date.now()) {
                                if (v2[id + "_" + amountofstars.stars + 1]) {
                                    if (v2[id + "_" + amountofstars.stars].price <= v2[id + "_" + amountofstars.stars + 1].price) {
                                        items.push({ "id": id, "stars": amountofstars.stars, "aucid": BinUtil.bin.auctions[i].aucid, "price": BinUtil.bin.auctions[i].price, "item": BinUtil.bin.auctions[i].item });
                                    }
                                }
                                else {
                                    items.push({ "id": id, "stars": amountofstars.stars, "aucid": BinUtil.bin.auctions[i].aucid, "price": BinUtil.bin.auctions[i].price, "item": BinUtil.bin.auctions[i].item });
                                }
                                if (!v2item[id + "_" + amountofstars.stars]) {
                                    v2item[id + "_" + amountofstars.stars] = v2[id + "_" + amountofstars.stars];
                                }
                            }
                        }
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 1];
                    case 5:
                        items = items.sort(function (a, b) {
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
                        return [2 /*return*/, { "allitems": items, "cacheitem": v2item }];
                }
            });
        });
    };
    BinUtil.SaveAllSnipesToFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var endedCache, endedCachev2, endedCacheKeys, allItems, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (BinUtil.bin.lastupdates <= 0 || BinUtil.bin.lastupdates + 120000 <= Date.now() || BinUtil.isupdating) {
                            return [2 /*return*/];
                        }
                        BinUtil.bin.auctions = BinUtil.bin.auctions.sort(function (a, b) {
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
                    case 1:
                        endedCache = _a.sent();
                        return [4 /*yield*/, CacheDatabase_db_1.default.GetDocumentById("auctionpricesv2")];
                    case 2:
                        endedCachev2 = _a.sent();
                        if (!endedCache || endedCache instanceof Error)
                            return [2 /*return*/];
                        endedCacheKeys = Object.keys(endedCache);
                        allItems = [];
                        for (i = 0; i < endedCacheKeys.length; i++) {
                            allItems.push(BinUtil.GetAllBINsOfItemWithPrice(endedCacheKeys[i], "", endedCachev2));
                        }
                        return [2 /*return*/, Promise.all(allItems).then(function (final) {
                                var flipitems = [];
                                console.log(final.length);
                                var none = 0;
                                for (var i = 0; i < final.length; i++) {
                                    if (final[i] == undefined) {
                                        none++;
                                        continue;
                                    }
                                    for (var j = 0; j < final[i].allitems.length; j++) {
                                        flipitems.push({ "item": final[i].allitems[j], "usual": final[i].cacheitem[final[i].allitems[j].id + "_" + final[i].allitems[j].stars] });
                                    }
                                }
                                console.log(none);
                                BinUtil.sniped = { "timesincelastcall": Date.now(), "auctions": flipitems };
                                promises_1.default.writeFile(__dirname + "/../../../cache/result/binresults.json", JSON.stringify({ "timesincelastcall": Date.now(), "auctions": flipitems }));
                                return flipitems;
                            })];
                }
            });
        });
    };
    BinUtil.bin = { "auctions": [], "lastupdates": 0 };
    BinUtil.sniped = { "timesincelastcall": 0, "auctions": [] };
    BinUtil.isupdating = false;
    return BinUtil;
}());
exports.BinUtil = BinUtil;
