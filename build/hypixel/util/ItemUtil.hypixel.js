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
exports.ItemlUtil = void 0;
var WebScraperMicroservice_webscraper_1 = require("../../webscraper/WebScraperMicroservice.webscraper");
var promises_1 = __importDefault(require("fs/promises"));
var prismarine_nbt_1 = __importDefault(require("prismarine-nbt"));
var ItemlUtil = /** @class */ (function () {
    function ItemlUtil() {
    }
    ItemlUtil.getItemById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            var file, parsedFile;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promises_1.default.readFile(__dirname + "/../../../cache/hypixelcache/items.json").catch(function (e) { console.log(e); })];
                    case 1:
                        file = _a.sent();
                        if (file) {
                            parsedFile = JSON.parse(file.toString())[id];
                            if (parsedFile == undefined) {
                                return [2 /*return*/, undefined];
                            }
                            if (parsedFile.category.includes("dungeon")) {
                                return [2 /*return*/, { "amount": 1, "bazaar": (parsedFile.bazaar) ? true : false, "category": parsedFile.category, "id": id, "numid": parsedFile.item_id, "rarity": parsedFile.tier, "name": parsedFile.name.slice(0, parsedFile.name.indexOf("✪") - 1), "dungeonItem": true, "numberOfStars": 0 }];
                            }
                            else {
                                return [2 /*return*/, { "amount": 1, "bazaar": (parsedFile.bazaar) ? true : false, "category": parsedFile.category, "id": id, "numid": parsedFile.item_id, "rarity": parsedFile.tier, "name": parsedFile.name, "dungeonItem": false, "numberOfStars": 0 }];
                            }
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    ItemlUtil.GetAllitems = function () {
        return __awaiter(this, void 0, void 0, function () {
            var file;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promises_1.default.readFile(__dirname + "/../../../cache/hypixelcache/items.json").catch(function (e) { console.log(e); })];
                    case 1:
                        file = _a.sent();
                        if (file) {
                            return [2 /*return*/, file.toString()];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    ItemlUtil.getItemRecipeById = function (id) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, undefined];
            });
        });
    };
    ItemlUtil.getItemByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var file, parsedFile, fileKeys, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promises_1.default.readFile(__dirname + "/../../../cache/hypixelcache/items.json").catch(function (e) { console.log(e); })];
                    case 1:
                        file = _a.sent();
                        if (file) {
                            parsedFile = JSON.parse(file.toString());
                            if (parsedFile == undefined) {
                                return [2 /*return*/, undefined];
                            }
                            fileKeys = Object.keys(parsedFile);
                            for (i = 0; i < fileKeys.length; i++) {
                                if (parsedFile[fileKeys[i]].name.toLowerCase().includes(name.toLowerCase())) {
                                    if (parsedFile[fileKeys[i]].category.includes("dungeon")) {
                                        if (parsedFile[fileKeys[i]].name.indexOf("✪") < 0) {
                                            return [2 /*return*/, { "amount": 1, "bazaar": (parsedFile[fileKeys[i]].bazaar) ? true : false, "category": parsedFile[fileKeys[i]].category, "id": fileKeys[i], "numid": parsedFile[fileKeys[i]].item_id, "rarity": parsedFile[fileKeys[i]].tier, "name": parsedFile[fileKeys[i]].name, "dungeonItem": true, "numberOfStars": 0 }];
                                        }
                                        else {
                                            return [2 /*return*/, { "amount": 1, "bazaar": (parsedFile[fileKeys[i]].bazaar) ? true : false, "category": parsedFile[fileKeys[i]].category, "id": fileKeys[i], "numid": parsedFile[fileKeys[i]].item_id, "rarity": parsedFile[fileKeys[i]].tier, "name": parsedFile[fileKeys[i]].name.slice(0, parsedFile[fileKeys[i]].name.indexOf("✪") - 1), "dungeonItem": true, "numberOfStars": 0 }];
                                        }
                                    }
                                    else {
                                        return [2 /*return*/, { "amount": 1, "bazaar": (parsedFile[fileKeys[i]].bazaar) ? true : false, "category": parsedFile[fileKeys[i]].category, "id": fileKeys[i], "numid": parsedFile[fileKeys[i]].item_id, "rarity": parsedFile[fileKeys[i]].tier, "name": parsedFile[fileKeys[i]].name, "dungeonItem": false, "numberOfStars": 0 }];
                                    }
                                }
                            }
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    ItemlUtil.getItemIDByName = function (name) {
        return __awaiter(this, void 0, void 0, function () {
            var file, parsedFile, fileKeys, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, promises_1.default.readFile(__dirname + "/../../../cache/hypixelcache/items.json").catch(function (e) { console.log(e); })];
                    case 1:
                        file = _a.sent();
                        if (file) {
                            parsedFile = JSON.parse(file.toString());
                            if (parsedFile == undefined) {
                                return [2 /*return*/, undefined];
                            }
                            fileKeys = Object.keys(parsedFile);
                            for (i = 0; i < fileKeys.length; i++) {
                                if (parsedFile[fileKeys[i]].name.toLowerCase().includes(name.toLowerCase())) {
                                    if (parsedFile[fileKeys[i]].category.includes("dungeon")) {
                                        if (parsedFile[fileKeys[i]].name.indexOf("✪") < 0) {
                                            return [2 /*return*/, fileKeys[i]];
                                        }
                                        else {
                                            return [2 /*return*/, fileKeys[i]];
                                        }
                                    }
                                    else {
                                        return [2 /*return*/, fileKeys[i]];
                                    }
                                }
                            }
                        }
                        return [2 /*return*/, undefined];
                }
            });
        });
    };
    ItemlUtil.getItemByUrl = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, undefined];
            });
        });
    };
    ItemlUtil.getAmountOfStarsOnItemWithIndex = function (name, index) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, { "item": name, "stars": (_a = name.match(new RegExp("✪", "g") || [])) === null || _a === void 0 ? void 0 : _a.length, "index": index }];
            });
        });
    };
    ItemlUtil.getAmountOfStarsOnItem = function (name) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_b) {
                return [2 /*return*/, { "item": name, "stars": (_a = name.match(new RegExp("✪", "g") || [])) === null || _a === void 0 ? void 0 : _a.length }];
            });
        });
    };
    ItemlUtil.getItemRecipeByUrl = function (url) {
        return __awaiter(this, void 0, void 0, function () {
            var scraped, finalItem, craft, allItems, i, item, recipe, recipes, i, allItems, craft, finalItem, j, item, finalItem, recipe, end;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, WebScraperMicroservice_webscraper_1.WebScraperMicroservice.WebScrapeByUrl(url)];
                    case 1:
                        scraped = _a.sent();
                        if (scraped.status == "itemdoesntexist") {
                            return [2 /*return*/, { "status": "invaliditem" }];
                        }
                        if (!(scraped.set == false)) return [3 /*break*/, 7];
                        return [4 /*yield*/, ItemlUtil.getItemByName(scraped.item.toLowerCase())];
                    case 2:
                        finalItem = _a.sent();
                        if (finalItem !== undefined) {
                            if (finalItem.id.includes("PET_ITEM")) {
                                return [2 /*return*/, { "status": "petitemsnotsupported" }];
                            }
                        }
                        else {
                            return [2 /*return*/, { "status": "invaliditem" }];
                        }
                        craft = scraped.recipe;
                        allItems = [];
                        i = 0;
                        _a.label = 3;
                    case 3:
                        if (!(i < craft.length)) return [3 /*break*/, 6];
                        if (craft[i].name == 'none') {
                            allItems.push({ "id": "NONE", "name": "none", "numid": 999999, "category": "misc", "dungeonItem": false, "rarity": "common", "numberOfStars": 0, "bazaar": false, amount: 1 });
                            return [3 /*break*/, 5];
                        }
                        return [4 /*yield*/, ItemlUtil.getItemByName(craft[i].name.toLowerCase())];
                    case 4:
                        item = _a.sent();
                        if (item != undefined) {
                            allItems.push({ "amount": craft[i].amount, "bazaar": item.bazaar, "category": item.category, "dungeonItem": item.dungeonItem, "id": item.id, "name": item.name, "numberOfStars": item.numberOfStars, "numid": item.numid, "rarity": item.rarity });
                        }
                        _a.label = 5;
                    case 5:
                        i++;
                        return [3 /*break*/, 3];
                    case 6:
                        //console.log(finalItem)
                        if (finalItem != undefined) {
                            recipe = { "finalItem": finalItem, "slot1": allItems[0], "slot2": allItems[1], "slot3": allItems[2], "slot4": allItems[3], "slot5": allItems[4], "slot6": allItems[5], "slot7": allItems[6], "slot8": allItems[7], "slot9": allItems[8], "slots": allItems };
                            return [2 /*return*/, recipe];
                        }
                        return [3 /*break*/, 16];
                    case 7:
                        recipes = [];
                        i = 0;
                        _a.label = 8;
                    case 8:
                        if (!(i < scraped.recipes.length)) return [3 /*break*/, 15];
                        allItems = [];
                        craft = scraped.recipes[i].recipe;
                        finalItem = undefined;
                        j = 0;
                        _a.label = 9;
                    case 9:
                        if (!(j < craft.length)) return [3 /*break*/, 12];
                        if (craft[j].name == 'none') {
                            allItems.push({ "id": "NONE", "name": "none", "numid": 999999, "category": "misc", "dungeonItem": false, "rarity": "common", "numberOfStars": 0, "bazaar": false, "amount": 1 });
                            return [3 /*break*/, 11];
                        }
                        return [4 /*yield*/, ItemlUtil.getItemByName(craft[j].name.toLowerCase())];
                    case 10:
                        item = _a.sent();
                        if (item != undefined) {
                            allItems.push({ "amount": craft[j].amount, "bazaar": item.bazaar, "category": item.category, "dungeonItem": item.dungeonItem, "id": item.id, "name": item.name, "numberOfStars": item.numberOfStars, "numid": item.numid, "rarity": item.rarity });
                        }
                        _a.label = 11;
                    case 11:
                        j++;
                        return [3 /*break*/, 9];
                    case 12: return [4 /*yield*/, ItemlUtil.getItemByName(scraped.recipes[i].item)];
                    case 13:
                        finalItem = _a.sent();
                        if (finalItem !== undefined) {
                            recipe = { "finalItem": finalItem, "slot1": allItems[0], "slot2": allItems[1], "slot3": allItems[2], "slot4": allItems[3], "slot5": allItems[4], "slot6": allItems[5], "slot7": allItems[6], "slot8": allItems[7], "slot9": allItems[8], "slots": allItems };
                            recipes.push(recipe);
                            //console.log(recipes);
                            //console.log(allItems);
                        }
                        else {
                            return [2 /*return*/, { "status": "invaliditem" }];
                        }
                        _a.label = 14;
                    case 14:
                        i++;
                        return [3 /*break*/, 8];
                    case 15:
                        end = Date.now();
                        if (recipes.length != 0) {
                            return [2 /*return*/, recipes];
                        }
                        _a.label = 16;
                    case 16: return [2 /*return*/];
                }
            });
        });
    };
    ItemlUtil.RemoveAllDuplicates = function (arr) {
        var m = new Map();
        var newarr = [];
        for (var i = 0; i < arr.length; i++) {
            var v = arr[i];
            if (!m.get(v.id)) {
                newarr.push(v);
                m.set(v.id, true);
            }
        }
        return newarr;
    };
    ItemlUtil.RemoveAllDuplicatesAuction = function (arr) {
        var m = new Map();
        var newarr = [];
        for (var i = 0; i < arr.length; i++) {
            var v = arr[i];
            if (!m.get(v.item)) {
                newarr.push(v);
                m.set(v.item, true);
            }
        }
        return newarr;
    };
    ItemlUtil.GetPrefixOfItem = function (item, prefix) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, item.slice(0, item.indexOf(prefix))];
            });
        });
    };
    ItemlUtil.CheckIfPrefixExists = function (fullitem, item) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                if (fullitem.toLowerCase().indexOf(item.toLowerCase()) <= 0) {
                    return [2 /*return*/, false];
                }
                return [2 /*return*/, fullitem.toLowerCase().indexOf(item.toLowerCase())];
            });
        });
    };
    ItemlUtil.RemovePrefix = function (item, index) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, item.substring(index, item.split('').length)];
            });
        });
    };
    ItemlUtil.ConvertItemBytesToItemData = function (itemBytes) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var item;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, prismarine_nbt_1.default.parse(Buffer.from(itemBytes, 'base64'))];
                    case 1:
                        item = _b.sent();
                        return [2 /*return*/, (_a = item.parsed.value.i) === null || _a === void 0 ? void 0 : _a.value];
                }
            });
        });
    };
    ItemlUtil.ConvertNBTDataIntoObject = function (data) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    ItemlUtil.RemoveSpecialCharactersFromItem = function (item) {
        return item.replace(/\u00A7[0-9A-FK-OR]/ig, '');
    };
    return ItemlUtil;
}());
exports.ItemlUtil = ItemlUtil;
