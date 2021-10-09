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
exports.CraftFlipper = void 0;
var FlipperUtil_hypixel_1 = require("../util/FlipperUtil.hypixel");
var CraftFlipperCalculator_hypixel_1 = require("./CraftFlipperCalculator.hypixel");
var promises_1 = __importDefault(require("fs/promises"));
var axios_1 = __importDefault(require("axios"));
var CraftFlipper = /** @class */ (function () {
    function CraftFlipper() {
    }
    CraftFlipper.CraftFlipBasedOnItemprice = function (budget) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    CraftFlipper.CompareLowestBinToCraftPrice = function (item) {
        return __awaiter(this, void 0, void 0, function () {
            var lowestbin, resources, allItems, _a, _b, finalobj, idKeys, profit, totalcost, i;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0: return [4 /*yield*/, axios_1.default.get("https://moulberry.codes/lowestbin.json")];
                    case 1:
                        lowestbin = (_c.sent()).data;
                        return [4 /*yield*/, CraftFlipperCalculator_hypixel_1.CraftFlipperCalculator.CalculateAllResourcePricesOfItem(lowestbin, item)];
                    case 2:
                        resources = _c.sent();
                        if (resources == "notcraftable") {
                            return [2 /*return*/, { "status": "notcraftable" }];
                        }
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, promises_1.default.readFile(__dirname + "/../../../cache/hypixelcache/items.json")];
                    case 3:
                        allItems = _b.apply(_a, [(_c.sent()).toString()]);
                        finalobj = [];
                        idKeys = Object.keys(resources.amount.recipe);
                        console.log(resources);
                        profit = 0;
                        totalcost = 0;
                        for (i = 0; i < idKeys.length; i++) {
                            totalcost += resources.price[idKeys[i]];
                            finalobj.push({ "id": idKeys[i], "price": resources.price[idKeys[i]], "name": allItems[idKeys[i]].name, amount: resources.amount.recipe[idKeys[i]] });
                        }
                        profit = lowestbin[resources.final] - totalcost;
                        console.log(resources.final);
                        if (allItems[resources.final]) {
                            return [2 /*return*/, { "status": "success", "finalitem": { "id": resources.final, "price": lowestbin[resources.final], "name": allItems[resources.final].name, "materials": finalobj, "totalcost": totalcost, "profit": profit } }];
                        }
                        else {
                            return [2 /*return*/, { "status": "success", "finalitem": { "id": resources.final, "price": lowestbin[resources.final], "name": resources.final, "materials": finalobj, "totalcost": totalcost, "profit": profit } }];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CraftFlipper.CraftFlipBasedOnProfit = function (lowestPrice, highestprice) {
        return __awaiter(this, void 0, void 0, function () {
            var file, _a, _b, fileKeys, remainingItems, i, flipIndex;
            return __generator(this, function (_c) {
                switch (_c.label) {
                    case 0:
                        _b = (_a = JSON).parse;
                        return [4 /*yield*/, promises_1.default.readFile(__dirname + "/../../../cache/hypixelcache/craftcache.json")];
                    case 1: return [4 /*yield*/, _b.apply(_a, [(_c.sent()).toString()])];
                    case 2:
                        file = _c.sent();
                        fileKeys = Object.keys(file);
                        remainingItems = [];
                        for (i = 0; i < fileKeys.length; i++) {
                            if (lowestPrice <= file[fileKeys[i]].profit && file[fileKeys[i]].profit <= highestprice) {
                                remainingItems.push(file[fileKeys[i]]);
                            }
                        }
                        if (remainingItems.length > 0) {
                            flipIndex = Math.floor(Math.random() * (remainingItems.length));
                            return [2 /*return*/, remainingItems[flipIndex]];
                        }
                        else {
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CraftFlipper.CompareItemPriceToRecipeAhAverage = function (recipe, prices, amountOfStars) {
        if (amountOfStars === void 0) { amountOfStars = 0; }
        return __awaiter(this, void 0, void 0, function () {
            var total;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CraftFlipperCalculator_hypixel_1.CraftFlipperCalculator.getTotalCostOfRecipe(recipe, prices)];
                    case 1:
                        total = _a.sent();
                        if (recipe.finalItem.dungeonItem == true) {
                            return [2 /*return*/, FlipperUtil_hypixel_1.FlipperUtil.GetAveragePriceOfDungeonItem(recipe.finalItem, 0).then(function (res) {
                                    if (res != undefined) {
                                        if (total.amountOfItems > total.items.length) {
                                            if (res.amount - total.total > 0) {
                                                return { "flip": true, "profit": res.amount - total.total, itemcost: res.amount, matcost: total.total, items: total.items };
                                            }
                                            else {
                                                return { "flip": false, "profit": res.amount - total.total, itemcost: res.amount, matcost: total.total, items: total.items };
                                            }
                                        }
                                        else {
                                            return { 'status': "itemisntavailable", "message": "One of the items required in a craft flip currently isn't available on the auction house." };
                                        }
                                    }
                                    else {
                                        return undefined;
                                    }
                                })];
                        }
                        else {
                            return [2 /*return*/, FlipperUtil_hypixel_1.FlipperUtil.GetAveragePriceOfItem(recipe.finalItem).then(function (res) {
                                    if (res != undefined) {
                                        if (res.amount - total.total > 0) {
                                            return { "flip": true, "profit": res.amount - total.total, itemcost: res.amount, matcost: total.total, items: total.items };
                                        }
                                        else {
                                            return { "flip": false, "profit": res.amount - total.total, itemcost: res.amount, matcost: total.total, items: total.items };
                                        }
                                    }
                                    else {
                                        return undefined;
                                    }
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    CraftFlipper.CompareItemPriceToRecipeAhLowest = function (ah, recipe, prices, amountOfStars) {
        return __awaiter(this, void 0, void 0, function () {
            var total;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CraftFlipperCalculator_hypixel_1.CraftFlipperCalculator.getTotalCostOfRecipe(recipe, prices)];
                    case 1:
                        total = _a.sent();
                        if (recipe.finalItem.dungeonItem == true) {
                            return [2 /*return*/, FlipperUtil_hypixel_1.FlipperUtil.GetLowestPriceOfDungeonItemWithoutAPICall(ah, recipe.finalItem, amountOfStars).then(function (res) {
                                    if (res != undefined) {
                                        if (total.amountOfItems >= total.items.length) {
                                            if (res.amount - total.total > 0) {
                                                var newFinalItem = recipe.finalItem;
                                                newFinalItem.name = recipe.finalItem.name + " " + "✪".repeat(amountOfStars);
                                                return { "flip": true, "profit": res.amount - total.total, itemcost: res.amount, matcost: total.total, items: total.items, finalitem: newFinalItem };
                                            }
                                            else {
                                                var newFinalItem = recipe.finalItem;
                                                newFinalItem.name = recipe.finalItem.name + " " + "✪".repeat(amountOfStars);
                                                return { "flip": false, "profit": res.amount - total.total, itemcost: res.amount, matcost: total.total, items: total.items, finalitem: newFinalItem };
                                            }
                                        }
                                        else {
                                            return { 'status': "itemisntavailable", "message": "One of the items required in a craft flip currently isn't available on the auction house." };
                                        }
                                    }
                                    else {
                                        return undefined;
                                    }
                                })];
                        }
                        else {
                            return [2 /*return*/, FlipperUtil_hypixel_1.FlipperUtil.GetLowestPriceOfItemWithoutAPICall(ah, recipe.finalItem).then(function (res) {
                                    if (res != undefined) {
                                        if (total.amountOfItems >= total.items.length) {
                                            if (res.amount - total.total > 0) {
                                                return { "flip": true, "profit": res.amount - total.total, itemcost: res.amount, matcost: total.total, items: total.items, finalitem: recipe.finalItem };
                                            }
                                            else {
                                                return { "flip": false, "profit": res.amount - total.total, itemcost: res.amount, matcost: total.total, items: total.items, finalitem: recipe.finalItem };
                                            }
                                        }
                                        else {
                                            return { 'status': "itemisntavailable", "message": "One of the items required in a craft flip currently isn't available on the auction house." };
                                        }
                                    }
                                    else {
                                        return undefined;
                                    }
                                })];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    return CraftFlipper;
}());
exports.CraftFlipper = CraftFlipper;
