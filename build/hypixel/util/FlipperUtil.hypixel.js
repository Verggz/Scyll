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
exports.FlipperUtil = void 0;
var axios_1 = __importDefault(require("axios"));
var AuctionUtil_hypixel_1 = require("./AuctionUtil.hypixel");
var FlipperUtil = /** @class */ (function () {
    function FlipperUtil() {
    }
    FlipperUtil.GetLowestPriceOfItem = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var items, lowest;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (item.id == "NONE") {
                            return [2 /*return*/, undefined];
                        }
                        return [4 /*yield*/, FlipperUtil.GetAllBINListingsOfItem(item)];
                    case 1:
                        items = _a.sent();
                        if (items !== undefined) {
                            if (items.length == 0) {
                                return [2 /*return*/, { "item": item.name, "amount": 1 }];
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
                            lowest = 0;
                            return [2 /*return*/, { "item": item.name, "amount": items[0].price }];
                        }
                        else {
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FlipperUtil.GetLowestPriceOfDungeonItem = function (item, amountOfStars) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var items, lowest, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (item.id == "NONE") {
                            return [2 /*return*/, undefined];
                        }
                        return [4 /*yield*/, FlipperUtil.GetAllBINListingsOfItem(item)];
                    case 1:
                        items = _c.sent();
                        if (item.dungeonItem == true) {
                            if (items !== undefined) {
                                lowest = 0;
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
                                //console.log(items);
                                if (items.length == 0) {
                                    return [2 /*return*/, { "item": item.name, "amount": 1 }];
                                }
                                for (i = 0; i < items.length; i++) {
                                    if (((_a = items[i].item.match(new RegExp("✪", "g") || [])) === null || _a === void 0 ? void 0 : _a.length) == amountOfStars) {
                                        //console.log(items[i]);
                                        if (items[i].bin == true) {
                                            lowest = items[i].price;
                                            break;
                                        }
                                    }
                                    else if (((_b = items[i].item.match(new RegExp("✪", "g") || [])) === null || _b === void 0 ? void 0 : _b.length) == undefined && amountOfStars == 0) {
                                        if (items[i].bin == true) {
                                            lowest = items[i].price;
                                            break;
                                        }
                                    }
                                }
                                return [2 /*return*/, { "item": "" + item.name + "✪".repeat(amountOfStars), amount: lowest }];
                            }
                            else {
                                return [2 /*return*/, undefined];
                            }
                        }
                        else {
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    FlipperUtil.GetAveragePriceOfDungeonItem = function (item, amountOfStars) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var items, averagePrice, amount, i, i, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        if (item.id == "NONE") {
                            return [2 /*return*/, undefined];
                        }
                        return [4 /*yield*/, FlipperUtil.GetAllBINListingsOfItem(item)];
                    case 1:
                        items = _c.sent();
                        if (items !== undefined) {
                            averagePrice = 0;
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
                            amount = 0;
                            for (i = 0; i < items.length; i++) {
                                //console.log("Item: ",items[i].item)
                                if (((_a = items[i].item.match(new RegExp("✪", "g") || [])) === null || _a === void 0 ? void 0 : _a.length) == amountOfStars) {
                                    if (items[i].bin == true) {
                                        amount++;
                                    }
                                }
                                else if (((_b = items[i].item.match(new RegExp("✪", "g") || [])) === null || _b === void 0 ? void 0 : _b.length) == undefined && amountOfStars == 0) {
                                    if (items[i].bin == true) {
                                        amount++;
                                    }
                                }
                            }
                            if (amount < 10) {
                                for (i = 0; i < amount; i++) {
                                    averagePrice += items[i].price;
                                }
                                return [2 /*return*/, { "item": "" + item.name + "✪".repeat(amountOfStars), amount: Math.round(averagePrice / amount) }];
                            }
                            else {
                                for (i = 0; i < 10; i++) {
                                    averagePrice += items[i].price;
                                }
                                return [2 /*return*/, { "item": "" + item.name + "✪".repeat(amountOfStars), amount: Math.round(averagePrice / 10) }];
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
    //Get's average price of first 5 items
    FlipperUtil.GetAveragePriceOfItem = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var items, averagePrice, i, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (item.id == "NONE") {
                            return [2 /*return*/, undefined];
                        }
                        return [4 /*yield*/, FlipperUtil.GetAllBINListingsOfItem(item)];
                    case 1:
                        items = _a.sent();
                        if (items !== undefined) {
                            if (items.length == 0) {
                                return [2 /*return*/, { "item": item.name, "amount": 1 }];
                            }
                            averagePrice = 0;
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
                            if (items.length < 10) {
                                for (i = 0; i < items.length; i++) {
                                    if (items[i].bin == true) {
                                        averagePrice += items[i].price;
                                    }
                                }
                                return [2 /*return*/, { item: item.name, amount: Math.round(averagePrice / items.length) }];
                            }
                            else {
                                for (i = 0; i < 10; i++) {
                                    if (items[i].bin == true) {
                                        averagePrice += items[i].price;
                                    }
                                }
                                return [2 /*return*/, { item: item.name, amount: Math.round(averagePrice / 10) }];
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
    FlipperUtil.GetAveragePriceOfItemWithoutAPICall = function (items) {
        return __awaiter(this, void 0, void 0, function () {
            var averagePrice, i, i;
            return __generator(this, function (_a) {
                if (items !== undefined) {
                    averagePrice = 0;
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
                    if (items.length < 5) {
                        for (i = 0; i < items.length; i++) {
                            if (items[i].bin == true) {
                                averagePrice += items[i].price;
                            }
                        }
                        return [2 /*return*/, Math.round(averagePrice / items.length)];
                    }
                    else {
                        for (i = 0; i < 5; i++) {
                            if (items[i].bin == true) {
                                averagePrice += items[i].price;
                            }
                        }
                        return [2 /*return*/, Math.round(averagePrice / 5)];
                    }
                }
                else {
                    return [2 /*return*/, undefined];
                }
                return [2 /*return*/];
            });
        });
    };
    FlipperUtil.GetAllBINListingsOfItem = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var page, allPages, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!!FlipperUtil.makingrequest) return [3 /*break*/, 2];
                        return [4 /*yield*/, axios_1.default.get("https://api.hypixel.net/skyblock/auctions?page=0")];
                    case 1:
                        page = _a.sent();
                        allPages = [];
                        //console.log(page.data.auctions[10]);
                        for (i = 0; i < page.data.totalPages - 1; i++) {
                            allPages.push(AuctionUtil_hypixel_1.AuctionUtil.KeepIndex(i).then(function (index) {
                                return axios_1.default.get("https://api.hypixel.net/skyblock/auctions?page=" + index).then(function (res) {
                                    var allAucItems = [];
                                    for (var j = 0; j < res.data.auctions.length; j++) {
                                        if (res.data.auctions[j].item_name.toLowerCase().includes(item.name.toLowerCase()) && res.data.auctions[j].bin == true) {
                                            allAucItems.push({ "aucid": res.data.auctions[j].uuid, "item": res.data.auctions[j].item_name, "price": res.data.auctions[j].starting_bid, "time": res.data.auctions[j].end - Date.now(), "bin": res.data.auctions[j].bin, "lore": res.data.auctions[j].item_lore, "bids": res.data.auctions[j].bids, "item_bytes": res.data.auctions[j].item_bytes, "start": res.data.auctions[j].start, "end": res.data.auctions[j].end });
                                        }
                                    }
                                    return allAucItems;
                                });
                            }));
                        }
                        return [2 /*return*/, Promise.all(allPages).then(function (data) {
                                //FlipperUtil.makingrequest = false;
                                var end = Date.now();
                                var allactiveItems = [];
                                if (data !== []) {
                                    for (var i = 0; i < data.length; i++) {
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
                    case 2:
                        console.log("still making request");
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    FlipperUtil.GetLowestPriceOfItemWithoutAPICall = function (ah, item) {
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_a) {
                ah = ah.sort(function (a, b) {
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
                for (i = 0; i < ah.length; i++) {
                    if (ah[i].item.includes(item.name) && ah[i].bin == true) {
                        return [2 /*return*/, { "item": ah[i].item, "amount": ah[i].price }];
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    FlipperUtil.GetLowestPriceOfDungeonItemWithoutAPICall = function (ah, item, amountOfStars) {
        var _a, _b;
        return __awaiter(this, void 0, void 0, function () {
            var i;
            return __generator(this, function (_c) {
                ah = ah.sort(function (a, b) {
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
                for (i = 0; i < ah.length; i++) {
                    //console.log(ah[i]);
                    if (ah[i].item.includes(item.name) && ah[i].bin == true) {
                        //console.log(ah[i])
                        if (((_a = ah[i].item.match(new RegExp("✪", "g") || [])) === null || _a === void 0 ? void 0 : _a.length) == amountOfStars) {
                            return [2 /*return*/, { "item": ah[i].item, "amount": ah[i].price }];
                        }
                        else if (((_b = ah[i].item.match(new RegExp("✪", "g") || [])) === null || _b === void 0 ? void 0 : _b.length) == undefined && amountOfStars == 0) {
                            return [2 /*return*/, { "item": ah[i].item, "amount": ah[i].price }];
                        }
                    }
                }
                return [2 /*return*/];
            });
        });
    };
    FlipperUtil.makingrequest = false;
    return FlipperUtil;
}());
exports.FlipperUtil = FlipperUtil;
