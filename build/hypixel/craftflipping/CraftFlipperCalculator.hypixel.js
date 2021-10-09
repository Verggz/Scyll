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
exports.CraftFlipperCalculator = void 0;
var AuctionUtil_hypixel_1 = require("../util/AuctionUtil.hypixel");
var BazaarUtil_hypixel_1 = require("../util/BazaarUtil.hypixel");
var FlipperUtil_hypixel_1 = require("../util/FlipperUtil.hypixel");
var ItemUtil_hypixel_1 = require("../util/ItemUtil.hypixel");
var storage_1 = require("@google-cloud/storage");
var CraftUtil_hypixel_1 = require("../util/CraftUtil.hypixel");
var storage = new storage_1.Storage({ "projectId": "projectscyll", "keyFilename": "./projectscyll-97351f835781.json" });
var CraftFlipperCalculator = /** @class */ (function () {
    function CraftFlipperCalculator() {
    }
    CraftFlipperCalculator.CalculateAllResourcePricesOfItem = function (lowestbin, item) {
        return __awaiter(this, void 0, void 0, function () {
            var materials, materialKeys, materialprices, i, bzitem;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CraftUtil_hypixel_1.CraftUtil.FindAllMaterialsByItemNameOrId(item)];
                    case 1:
                        materials = _a.sent();
                        if (materials == undefined) {
                            return [2 /*return*/, "notcraftable"];
                        }
                        materialKeys = Object.keys(materials.recipe);
                        materialprices = {};
                        i = 0;
                        _a.label = 2;
                    case 2:
                        if (!(i < materialKeys.length)) return [3 /*break*/, 6];
                        if (!!lowestbin[materialKeys[i]]) return [3 /*break*/, 4];
                        return [4 /*yield*/, BazaarUtil_hypixel_1.BazaarUtil.GetBuyOrderPriceOfItemInBazaarById(materialKeys[i])];
                    case 3:
                        bzitem = _a.sent();
                        materialprices[materialKeys[i]] = bzitem.amount * materials.recipe[materialKeys[i]];
                        return [3 /*break*/, 5];
                    case 4:
                        materialprices[materialKeys[i]] = lowestbin[materialKeys[i]] * materials.recipe[materialKeys[i]];
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 2];
                    case 6: return [2 /*return*/, { amount: materials, price: materialprices, final: materials.final }];
                }
            });
        });
    };
    //CHANGE THIS TO USE THE BIN CACHE INSTEAD OF AH
    CraftFlipperCalculator.CalculateAllLowestResourcePricesOfItem = function (ah, itemrecipe, amountOfStars) {
        return __awaiter(this, void 0, void 0, function () {
            var allPrices, nondupedList, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        allPrices = [];
                        nondupedList = ItemUtil_hypixel_1.ItemlUtil.RemoveAllDuplicates(itemrecipe.slots);
                        for (i = 0; i < nondupedList.length; i++) {
                            allPrices.push(AuctionUtil_hypixel_1.AuctionUtil.KeepIndex(i).then(function (index) {
                                if (nondupedList[index].id == "NONE")
                                    return undefined;
                                //console.log(nondupedList[index]);
                                //console.log(nondupedList[index]);
                                if (nondupedList[index].bazaar == false) {
                                    if (ah == undefined) {
                                        return undefined;
                                    }
                                    if (nondupedList[index].dungeonItem == true) {
                                        //console.log(nondupedList[index]);
                                        //console.log("list2", nondupedList[index]);
                                        if (nondupedList[index].category.includes("item")) {
                                            return FlipperUtil_hypixel_1.FlipperUtil.GetLowestPriceOfDungeonItemWithoutAPICall(ah, nondupedList[index], 0).then(function (price) {
                                                if (price != undefined) {
                                                    return { "item": price.item, price: price.amount, "totalamount": nondupedList.length };
                                                }
                                                else {
                                                    return undefined;
                                                }
                                            });
                                        }
                                        else {
                                            //console.log("list3", nondupedList[index]);
                                            return FlipperUtil_hypixel_1.FlipperUtil.GetLowestPriceOfDungeonItemWithoutAPICall(ah, nondupedList[index], amountOfStars).then(function (price) {
                                                if (price != undefined) {
                                                    return { "item": price.item, price: price.amount, "totalamount": nondupedList.length };
                                                }
                                                else {
                                                    return undefined;
                                                }
                                            });
                                        }
                                    }
                                    else {
                                        return FlipperUtil_hypixel_1.FlipperUtil.GetLowestPriceOfItemWithoutAPICall(ah, nondupedList[index]).then(function (price) {
                                            if (price != undefined) {
                                                if (price.item.includes("✪")) {
                                                }
                                                return { "item": price.item, price: price.amount, "totalamount": nondupedList.length };
                                            }
                                            else {
                                                return undefined;
                                            }
                                        });
                                    }
                                }
                                else {
                                    return BazaarUtil_hypixel_1.BazaarUtil.GetBuyInstantlyPriceOfItemInBazaar(nondupedList[index]).then(function (price) {
                                        if (price != undefined) {
                                            return { "item": price.item, price: price.amount, "totalamount": nondupedList.length };
                                        }
                                        else {
                                            return undefined;
                                        }
                                    });
                                }
                            }));
                        }
                        return [4 /*yield*/, Promise.all(allPrices)];
                    case 1: return [2 /*return*/, _a.sent()];
                }
            });
        });
    };
    CraftFlipperCalculator.CalculateAllAverageResourcePricesOfItem = function (itemrecipe) {
        return __awaiter(this, void 0, void 0, function () {
            var allPrices, nondupedList, i;
            return __generator(this, function (_a) {
                allPrices = [];
                nondupedList = ItemUtil_hypixel_1.ItemlUtil.RemoveAllDuplicates(itemrecipe.slots);
                for (i = 0; i < nondupedList.length; i++) {
                    if (nondupedList[i].id == "NONE")
                        continue;
                    if (nondupedList[i].bazaar == undefined) {
                        if (nondupedList[i].dungeonItem == false) {
                            allPrices.push(FlipperUtil_hypixel_1.FlipperUtil.GetAveragePriceOfItem(nondupedList[i]).then(function (price) {
                                if (price != undefined) {
                                    return { "item": price.item, price: price.amount };
                                }
                                else {
                                    return undefined;
                                }
                            }));
                        }
                        else {
                            allPrices.push(FlipperUtil_hypixel_1.FlipperUtil.GetAveragePriceOfDungeonItem(nondupedList[i], nondupedList[i].numberOfStars).then(function (price) {
                                if (price != undefined) {
                                    return { "item": price === null || price === void 0 ? void 0 : price.item, price: price === null || price === void 0 ? void 0 : price.amount };
                                }
                                else {
                                    return undefined;
                                }
                            }));
                        }
                    }
                    else {
                        allPrices.push(BazaarUtil_hypixel_1.BazaarUtil.GetBuyInstantlyPriceOfItemInBazaar(nondupedList[i]).then(function (price) {
                            if (price != undefined) {
                                return { "item": price.item, price: price.amount };
                            }
                        }));
                    }
                    //
                }
                return [2 /*return*/, Promise.all(allPrices)];
            });
        });
    };
    CraftFlipperCalculator.CompareItemPriceToCraftPrice = function (item1, item2) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    CraftFlipperCalculator.getTotalCostOfRecipe = function (recipe, prices) {
        return __awaiter(this, void 0, void 0, function () {
            var amounts, i, total, costOfItem, i, itemPrice, amountsKeys, j, prefixCheck, starsCheck, newItem, amount, amount, amount, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        amounts = new Map();
                        for (i = 0; i < recipe.slots.length; i++) {
                            //console.log(recipe.slots[i].name);
                            if (amounts.get(recipe.slots[i].name.toLowerCase()) == undefined) {
                                amounts.set(recipe.slots[i].name.toLowerCase(), recipe.slots[i].amount);
                            }
                            else {
                                amounts.set(recipe.slots[i].name.toLowerCase(), amounts.get(recipe.slots[i].name.toLowerCase()) + recipe.slots[i].amount);
                            }
                        }
                        total = 0;
                        costOfItem = [];
                        i = 0;
                        _a.label = 1;
                    case 1:
                        if (!(i < prices.length)) return [3 /*break*/, 9];
                        if (prices[i] === undefined) {
                            return [3 /*break*/, 8];
                        }
                        itemPrice = prices[i].item;
                        amountsKeys = Array.from(amounts.keys());
                        j = 0;
                        _a.label = 2;
                    case 2:
                        if (!(j < amountsKeys.length)) return [3 /*break*/, 7];
                        return [4 /*yield*/, ItemUtil_hypixel_1.ItemlUtil.CheckIfPrefixExists(prices[i].item.toLowerCase(), amountsKeys[j])];
                    case 3:
                        prefixCheck = _a.sent();
                        starsCheck = prices[i].item.includes("✪");
                        if (!(prefixCheck != false)) return [3 /*break*/, 5];
                        return [4 /*yield*/, ItemUtil_hypixel_1.ItemlUtil.RemovePrefix(prices[i].item.toLowerCase(), prefixCheck)];
                    case 4:
                        newItem = _a.sent();
                        if (newItem.includes("✪")) {
                            itemPrice = newItem.replace(/✪/g, '').trim();
                        }
                        else {
                            itemPrice = newItem;
                        }
                        if (amountsKeys[j].includes(itemPrice)) {
                            amount = amounts.get(amountsKeys[j]);
                            costOfItem.push({ "item": amountsKeys[j], "amount": amount, "costfor1": prices[i].price, "totalcost": prices[i].price * amount });
                            total += prices[i].price * amount;
                            return [3 /*break*/, 7];
                        }
                        return [3 /*break*/, 6];
                    case 5:
                        if (starsCheck != false) {
                            itemPrice = prices[i].item.replace(/✪/g, '').trim().toLowerCase();
                            if (amountsKeys[j].includes(itemPrice)) {
                                amount = amounts.get(amountsKeys[j]);
                                costOfItem.push({ "item": prices[i].item, "amount": amount, "costfor1": prices[i].price, "totalcost": prices[i].price * amount });
                                total += prices[i].price * amount;
                                return [3 /*break*/, 7];
                            }
                        }
                        _a.label = 6;
                    case 6:
                        j++;
                        return [3 /*break*/, 2];
                    case 7:
                        if (amounts.get(prices[i].item.toLowerCase()) != undefined) {
                            amount = amounts.get(itemPrice.toLowerCase());
                            costOfItem.push({ "item": prices[i].item, "amount": amount, "costfor1": prices[i].price, "totalcost": prices[i].price * amount });
                            total += prices[i].price * amount;
                            //console.log(`${e[i].item.toLowerCase()}: ${e[i].price * amount}`);
                        }
                        _a.label = 8;
                    case 8:
                        i++;
                        return [3 /*break*/, 1];
                    case 9:
                        for (i = 0; i < prices.length; i++) {
                            if (prices[i] != undefined) {
                                return [2 /*return*/, { "total": total, items: costOfItem, "amountOfItems": prices[i].totalamount }];
                            }
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return CraftFlipperCalculator;
}());
exports.CraftFlipperCalculator = CraftFlipperCalculator;
