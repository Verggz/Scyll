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
exports.AuctionUtil = void 0;
var axios_1 = __importDefault(require("axios"));
var FlipperUtil_hypixel_1 = require("./FlipperUtil.hypixel");
var ItemUtil_hypixel_1 = require("./ItemUtil.hypixel");
var promises_1 = __importDefault(require("fs/promises"));
var storage_1 = require("@google-cloud/storage");
var CacheDatabase_db_1 = __importDefault(require("../../db/CacheDatabase.db"));
var storage = new storage_1.Storage({ "projectId": "projectscyll", "keyFilename": "./projectscyll-97351f835781.json" });
var AuctionUtil = /** @class */ (function () {
    function AuctionUtil() {
    }
    AuctionUtil.GetAllItemsFromAh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var page, allPages, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(!FlipperUtil_hypixel_1.FlipperUtil.makingrequest || !AuctionUtil.isDerpy)) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios_1.default.get("https://api.hypixel.net/skyblock/auctions?page=0")];
                    case 1:
                        page = _a.sent();
                        allPages = [];
                        for (i = 0; i < page.data.totalPages - 1; i++) {
                            allPages.push(axios_1.default.get("https://api.hypixel.net/skyblock/auctions?page=" + i).then(function (res) {
                                var allAucItems = [];
                                for (var j = 0; j < res.data.auctions.length; j++) {
                                    if (res.data.auctions[j] == undefined) {
                                        continue;
                                    }
                                    if (res.data.auctions[j].highest_bid_amount != 0) {
                                        allAucItems.push({ "aucid": res.data.auctions[j].uuid, "item": res.data.auctions[j].item_name, "price": res.data.auctions[j].highest_bid_amount, "time": res.data.auctions[j].end - Date.now(), "bin": res.data.auctions[j].bin, "lore": res.data.auctions[j].item_lore, "bids": res.data.auctions[j].bids, "item_bytes": res.data.auctions[j].item_bytes, "start": res.data.auctions[j].start, "end": res.data.auctions[j].end });
                                    }
                                    else {
                                        allAucItems.push({ "aucid": res.data.auctions[j].uuid, "item": res.data.auctions[j].item_name, "price": res.data.auctions[j].starting_bid, "time": res.data.auctions[j].end - Date.now(), "bin": res.data.auctions[j].bin, "lore": res.data.auctions[j].item_lore, "bids": res.data.auctions[j].bids, "item_bytes": res.data.auctions[j].item_bytes, "start": res.data.auctions[j].start, "end": res.data.auctions[j].end });
                                    }
                                }
                                return allAucItems;
                            }).catch(function (e) {
                                return undefined;
                            }));
                        }
                        return [2 /*return*/, Promise.all(allPages).then(function (data) {
                                //FlipperUtil.makingrequest = false;
                                var end = Date.now();
                                var allactiveItems = [];
                                //console.log(data);
                                if (data !== []) {
                                    for (var i = 0; i < data.length; i++) {
                                        if (data[i] == undefined) {
                                            continue;
                                        }
                                        if (data[i].length != 0) {
                                            for (var j = 0; j < data[i].length; j++) {
                                                allactiveItems.push({ "item": data[i][j].item, "aucid": data[i][j].aucid, "price": data[i][j].price, "bin": data[i][j].bin, "time": data[i][j].time, "lore": data[i][j].lore, "bids": data[i][j].bids, "item_bytes": data[i][j].item_bytes, "start": data[i][j].start, "end": data[i][j].end });
                                            }
                                        }
                                    }
                                    return allactiveItems;
                                }
                                else {
                                    return undefined;
                                }
                            })];
                    case 2: return [2 /*return*/, undefined];
                }
            });
        });
    };
    AuctionUtil.GetAllAuctionsOfItemWithCache = function (item, auctionFile, v2) {
        return __awaiter(this, void 0, void 0, function () {
            var items, i, prefix, check, amountofstars, id;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (item == "bow" || item == "cake" || item == "stone" || item == "egg" || item == "diamond") {
                            return [2 /*return*/, undefined];
                        }
                        items = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < auctionFile.auctions.length)) return [3 /*break*/, 8];
                        if (auctionFile.auctions[i] == undefined) {
                            return [3 /*break*/, 7];
                        }
                        if (!(auctionFile.auctions[i].item.toLowerCase().includes(item) && !auctionFile.auctions[i].bin)) return [3 /*break*/, 7];
                        //console.log()
                        if (auctionFile.auctions[i].item.toLowerCase() == item.toLowerCase().trim()) {
                            items.push(auctionFile.auctions[i]);
                            return [3 /*break*/, 7];
                        }
                        if (!(auctionFile.auctions[i].item.toLowerCase().trim().indexOf(item.toLowerCase().trim()) == 0)) return [3 /*break*/, 2];
                        items.push(auctionFile.auctions[i]);
                        return [3 /*break*/, 7];
                    case 2: return [4 /*yield*/, ItemUtil_hypixel_1.ItemlUtil.CheckIfPrefixExists(auctionFile.auctions[i].item.toLowerCase().trim(), item.toLowerCase().trim())];
                    case 3:
                        prefix = _a.sent();
                        if (!(prefix != false)) return [3 /*break*/, 7];
                        return [4 /*yield*/, ItemUtil_hypixel_1.ItemlUtil.RemovePrefix(auctionFile.auctions[i].item.toLowerCase().trim(), prefix)];
                    case 4:
                        check = _a.sent();
                        if (!(check.toLowerCase().trim() == item.toLowerCase().trim())) return [3 /*break*/, 7];
                        return [4 /*yield*/, ItemUtil_hypixel_1.ItemlUtil.getAmountOfStarsOnItem(check.toLowerCase().trim())];
                    case 5:
                        amountofstars = _a.sent();
                        if (amountofstars == undefined) {
                            amountofstars = 0;
                        }
                        return [4 /*yield*/, AuctionUtil.GetAuctionItemID(auctionFile.auctions[i].item_bytes)];
                    case 6:
                        id = _a.sent();
                        if (v2[id + "_" + amountofstars]) {
                            items.push(auctionFile.auctions[i]);
                        }
                        _a.label = 7;
                    case 7:
                        i++;
                        return [3 /*break*/, 1];
                    case 8:
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
                        return [2 /*return*/, items];
                }
            });
        });
    };
    AuctionUtil.GetAllAuctionsOfItemWithCacheDiscrete = function (item, auctionFile) {
        return __awaiter(this, void 0, void 0, function () {
            var items, i, prefix, check;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (item == "bow" || item == "cake" || item == "stone" || item == "egg" || item == "diamond") {
                            return [2 /*return*/, undefined];
                        }
                        items = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < auctionFile.auctions.length)) return [3 /*break*/, 6];
                        if (auctionFile.auctions[i] == undefined) {
                            return [3 /*break*/, 5];
                        }
                        if (!(auctionFile.auctions[i].item.toLowerCase().includes(item) && !auctionFile.auctions[i].bin)) return [3 /*break*/, 5];
                        //console.log()
                        if (auctionFile.auctions[i].item.toLowerCase() == item.toLowerCase().trim()) {
                            items.push(auctionFile.auctions[i]);
                            return [3 /*break*/, 5];
                        }
                        if (!(auctionFile.auctions[i].item.toLowerCase().trim().indexOf(item.toLowerCase().trim()) == 0)) return [3 /*break*/, 2];
                        items.push(auctionFile.auctions[i]);
                        return [3 /*break*/, 5];
                    case 2: return [4 /*yield*/, ItemUtil_hypixel_1.ItemlUtil.CheckIfPrefixExists(auctionFile.auctions[i].item.toLowerCase().trim(), item.toLowerCase().trim())];
                    case 3:
                        prefix = _a.sent();
                        if (!(prefix != false)) return [3 /*break*/, 5];
                        return [4 /*yield*/, ItemUtil_hypixel_1.ItemlUtil.RemovePrefix(auctionFile.auctions[i].item.toLowerCase().trim(), prefix)];
                    case 4:
                        check = _a.sent();
                        //var starcheck = check.replace("/✪/","");
                        if (check.toLowerCase().trim() == item.toLowerCase().trim()) {
                            items.push(auctionFile.auctions[i]);
                        }
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 1];
                    case 6:
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
                        return [2 /*return*/, items];
                }
            });
        });
    };
    AuctionUtil.GetAllAuctionsOfItemWithoutAPICall = function (item, auction) {
        return __awaiter(this, void 0, void 0, function () {
            var items, i;
            return __generator(this, function (_a) {
                items = [];
                for (i = 0; i < auction.length; i++) {
                    if (auction[i] == undefined || auction[i].length == 0 || !auction[i]) {
                        continue;
                    }
                    if (auction[i].item.toLowerCase().includes(item) && !auction[i].bin) {
                        items.push(auction[i]);
                    }
                }
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
                return [2 /*return*/, items];
            });
        });
    };
    AuctionUtil.SaveAllAuctionsToGCS = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ah, trueAuctions, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, AuctionUtil.GetAllItemsFromAh()];
                    case 1:
                        ah = _a.sent();
                        if (ah == undefined) {
                            return [2 /*return*/];
                        }
                        trueAuctions = [];
                        for (i = 0; i < ah.length; i++) {
                            if (ah[i].bin == undefined) {
                                trueAuctions.push(ah[i]);
                            }
                        }
                        return [4 /*yield*/, storage.bucket('projectscyllcache').file("auctioncache.json").save(JSON.stringify({ "timesincelastcall": Date.now(), auctions: trueAuctions }))];
                    case 2: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    AuctionUtil.SaveAllAuctionsToFile = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ah, trueAuctions, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, AuctionUtil.GetAllItemsFromAh()];
                    case 1:
                        ah = _a.sent();
                        if (ah == undefined) {
                            return [2 /*return*/];
                        }
                        trueAuctions = [];
                        for (i = 0; i < ah.length; i++) {
                            if (ah[i].bin == undefined) {
                                trueAuctions.push(ah[i]);
                            }
                        }
                        return [4 /*yield*/, promises_1.default.writeFile(__dirname + "/../../../cache/hypixelcache/auction/auctioncache.json", JSON.stringify({ "timesincelastcall": Date.now(), "auctions": trueAuctions }))];
                    case 2:
                        _a.sent();
                        return [2 /*return*/, true];
                }
            });
        });
    };
    //deprecated, use SaveAllAuctionsToGCS instead
    AuctionUtil.KeepIndex = function (index) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, index];
            });
        });
    };
    AuctionUtil.GetAllAuctionsEndedByFirestore = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    AuctionUtil.GetAllAuctionsEnded = function () {
        return __awaiter(this, void 0, void 0, function () {
            var allAuctions, allAucItems, i, itemid;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get("https://api.hypixel.net/skyblock/auctions_ended")];
                    case 1:
                        allAuctions = _a.sent();
                        allAucItems = [];
                        if (!allAuctions.data.success) {
                            return [2 /*return*/, undefined];
                        }
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < allAuctions.data.auctions.length)) return [3 /*break*/, 5];
                        if (!(allAuctions.data.auctions[i].bin == true)) return [3 /*break*/, 4];
                        return [4 /*yield*/, AuctionUtil.GetAuctionItemID(allAuctions.data.auctions[i].item_bytes)];
                    case 3:
                        itemid = _a.sent();
                        allAucItems.push({ "aucid": allAuctions.data.auctions[i].auction_id, "bin": allAuctions.data.auctions[i].bin, "buyer": allAuctions.data.auctions[i].buyer, "item_bytes": allAuctions.data.auctions[i].item_bytes, "price": allAuctions.data.auctions[i].price, "seller": allAuctions.data.auctions[i].seller, "sellerProfile": allAuctions.data.auctions[i].seller_profile, "timestamp": allAuctions.data.auctions[i].timestamp, "itemid": itemid });
                        _a.label = 4;
                    case 4:
                        i++;
                        return [3 /*break*/, 2];
                    case 5:
                        if (allAucItems.length != 0)
                            return [2 /*return*/, allAucItems];
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    AuctionUtil.SaveAllEndedAuctionsToCache = function (auctions) {
        return __awaiter(this, void 0, void 0, function () {
            var saved, allItems, allItemsFile, allItemsKeys, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        saved = [];
                        return [4 /*yield*/, ItemUtil_hypixel_1.ItemlUtil.GetAllitems()];
                    case 1:
                        allItems = _a.sent();
                        if (allItems != undefined) {
                            allItemsFile = JSON.parse(allItems);
                            allItemsKeys = Object.keys(allItemsFile);
                            for (i = 0; i < auctions.length; i++) {
                                saved.push(AuctionUtil.KeepIndex(i).then(function (index) {
                                    return ItemUtil_hypixel_1.ItemlUtil.ConvertItemBytesToItemData(auctions[index].item_bytes).then(function (final) {
                                        var item = final.value[0].tag.value.display.value.Name.value.replace(/\u00A7[0-9A-FK-OR]/ig, '');
                                        var found = false;
                                        for (var j = 0; j < allItemsKeys.length; j++) {
                                            if (item.toLowerCase().includes(allItemsFile[allItemsKeys[j]].name.replace(/✪/g, '').trim().toLowerCase())) {
                                                found = true;
                                                return { "name": allItemsFile[allItemsKeys[j]].name.toLowerCase(), "price": auctions[index].price, timestamp: auctions[index].timestamp };
                                            }
                                            else {
                                            }
                                        }
                                    });
                                }));
                            }
                        }
                        return [2 /*return*/, Promise.all(saved).then(function (all) {
                                return CacheDatabase_db_1.default.GetDocumentById("auctionprices").then(function (actualFile) {
                                    if (!actualFile || actualFile instanceof Error) {
                                        return undefined;
                                    }
                                    for (var i = 0; i < all.length; i++) {
                                        if (all[i] != undefined) {
                                            if (actualFile[all[i].name]) {
                                                actualFile[all[i].name] = { "name": all[i].name, "price": all[i].price, timestamp: all[i].timestamp };
                                            }
                                            else {
                                                actualFile[all[i].name] = all[i];
                                            }
                                        }
                                    }
                                    return actualFile;
                                });
                            })];
                }
            });
        });
    };
    AuctionUtil.SaveAllEndedAuctionsToCachev2 = function (auctions) {
        return __awaiter(this, void 0, void 0, function () {
            var saved, allItems, allItemsFile, allItemsKeys, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        saved = [];
                        return [4 /*yield*/, ItemUtil_hypixel_1.ItemlUtil.GetAllitems()];
                    case 1:
                        allItems = _a.sent();
                        if (allItems != undefined) {
                            allItemsFile = JSON.parse(allItems);
                            allItemsKeys = Object.keys(allItemsFile);
                            for (i = 0; i < auctions.length; i++) {
                                saved.push(AuctionUtil.KeepIndex(i).then(function (index) {
                                    return ItemUtil_hypixel_1.ItemlUtil.ConvertItemBytesToItemData(auctions[index].item_bytes).then(function (final) {
                                        var item = final.value[0].tag.value.display.value.Name.value.replace(/\u00A7[0-9A-FK-OR]/ig, '');
                                        var found = false;
                                        for (var j = 0; j < allItemsKeys.length; j++) {
                                            if (auctions[index].itemid == allItemsKeys[j]) {
                                                var finalitem = { "id": auctions[index].itemid, "name": item, "price": auctions[index].price, timestamp: auctions[index].timestamp, stars: 0 };
                                                found = true;
                                                if (final.value[0].tag.value.display.value.Lore.value.value[final.value[0].tag.value.display.value.Lore.value.value.length - 1].replace(/\u00A7[0-9A-FK-OR]/ig, '').split(" ")[0].trim() == "a") {
                                                    finalitem["rarity"] = final.value[0].tag.value.display.value.Lore.value.value[final.value[0].tag.value.display.value.Lore.value.value.length - 1].replace(/\u00A7[0-9A-FK-OR]/ig, '').split(" ")[1];
                                                }
                                                else {
                                                    finalitem["rarity"] = final.value[0].tag.value.display.value.Lore.value.value[final.value[0].tag.value.display.value.Lore.value.value.length - 1].replace(/\u00A7[0-9A-FK-OR]/ig, '').split(" ")[0];
                                                }
                                                if (final.value[0].tag.value.ExtraAttributes.value.petInfo) {
                                                    finalitem["petinfo"] = JSON.parse(final.value[0].tag.value.ExtraAttributes.value.petInfo.value);
                                                }
                                                if (final.value[0].tag.value.ExtraAttributes.value.dungeon_item_level) {
                                                    finalitem["stars"] = final.value[0].tag.value.ExtraAttributes.value.dungeon_item_level.value;
                                                }
                                                if (final.value[0].tag.value.ExtraAttributes.value.modifier) {
                                                    finalitem["reforge"] = final.value[0].tag.value.ExtraAttributes.value.modifier.value;
                                                }
                                                return finalitem;
                                            }
                                            else {
                                            }
                                        }
                                    });
                                }));
                            }
                        }
                        return [2 /*return*/, Promise.all(saved).then(function (all) {
                                return CacheDatabase_db_1.default.GetDocumentById("auctionpricesv2").then(function (actualFile) {
                                    if (!actualFile || actualFile instanceof Error) {
                                        return undefined;
                                    }
                                    for (var i = 0; i < all.length; i++) {
                                        if (all[i] != undefined) {
                                            if (all[i].petinfo) {
                                                actualFile[all[i].petinfo.type + "_" + all[i].id + "_" + all[i].stars.toString()] = all[i];
                                                continue;
                                            }
                                            actualFile[all[i].id + "_" + all[i].stars.toString()] = all[i];
                                        }
                                    }
                                    return actualFile;
                                });
                            })];
                }
            });
        });
    };
    AuctionUtil.GetAuctionItemID = function (itembytes) {
        return __awaiter(this, void 0, void 0, function () {
            var itemdata;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ItemUtil_hypixel_1.ItemlUtil.ConvertItemBytesToItemData(itembytes)];
                    case 1:
                        itemdata = _a.sent();
                        return [2 /*return*/, itemdata.value[0].tag.value.ExtraAttributes.value.id.value];
                }
            });
        });
    };
    AuctionUtil.auction = { "auctions": [], "lastupdates": 0 };
    AuctionUtil.isDerpy = false;
    return AuctionUtil;
}());
exports.AuctionUtil = AuctionUtil;
