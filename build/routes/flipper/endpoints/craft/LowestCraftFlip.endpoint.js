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
exports.LowestCraftFlipEndpoint = void 0;
var CraftFlipper_hypixel_1 = require("../../../../hypixel/craftflipping/CraftFlipper.hypixel");
var CraftFlipperCalculator_hypixel_1 = require("../../../../hypixel/craftflipping/CraftFlipperCalculator.hypixel");
var FlipperRouter_router_1 = __importDefault(require("../../FlipperRouter.router"));
var promises_1 = __importDefault(require("fs/promises"));
var BinUtil_hypixel_1 = require("../../../../hypixel/util/BinUtil.hypixel");
var storage_1 = require("@google-cloud/storage");
var storage = new storage_1.Storage({ "projectId": "projectscyll", "keyFilename": "./projectscyll-97351f835781.json" });
var LowestCraftFlipEndpoint = /** @class */ (function () {
    function LowestCraftFlipEndpoint() {
    }
    LowestCraftFlipEndpoint.LowestCraftFlip = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                FlipperRouter_router_1.default.GetRouter().post('/craft/lowest', function (req, res, next) {
                    return __awaiter(this, void 0, void 0, function () {
                        var curtime, getBinCache, tempFile, ah, curtime, getBinCache, tempFile, ah;
                        var _this = this;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(req.body.index === false)) return [3 /*break*/, 4];
                                    curtime = Date.now();
                                    if (!(BinUtil_hypixel_1.BinUtil.bin.lastupdates == undefined && BinUtil_hypixel_1.BinUtil.isupdating == false || BinUtil_hypixel_1.BinUtil.bin.lastupdates == 0 && BinUtil_hypixel_1.BinUtil.isupdating == false || BinUtil_hypixel_1.BinUtil.bin.lastupdates + 600000 <= curtime && BinUtil_hypixel_1.BinUtil.isupdating == false)) return [3 /*break*/, 3];
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
                                    ah = BinUtil_hypixel_1.BinUtil.bin.auctions;
                                    if (req.body.amountOfStars != undefined && parseInt(req.body.amountOfStars) >= 0) {
                                        if (req.body.amountOfStars > 5) {
                                            req.body.amountOfStars = 5;
                                        }
                                        CraftFlipperCalculator_hypixel_1.CraftFlipperCalculator.CalculateAllLowestResourcePricesOfItem(ah, req.body.recipe, req.body.amountOfStars).then(function (e) {
                                            CraftFlipper_hypixel_1.CraftFlipper.CompareItemPriceToRecipeAhLowest(ah, req.body.recipe, e, req.body.amountOfStars).then(function (flipped) {
                                                promises_1.default.readFile(__dirname + "/../../../../../cache/hypixelcache/craftcache.json", { "encoding": "utf-8" }).then(function (file) {
                                                    if (file == "{}" || !file) {
                                                        var finalfile = {};
                                                        finalfile[flipped.finalitem.name.toLowerCase()] = { "name": flipped.finalitem.name, "id": flipped.finalitem.id, "profit": flipped.profit, "itemcost": flipped.itemcost, "matcost": flipped.matcost };
                                                        promises_1.default.writeFile(__dirname + "/../../../../../cache/hypixelcache/craftcache.json", JSON.stringify(finalfile));
                                                        return;
                                                    }
                                                    var oldfile = JSON.parse(file);
                                                    if (oldfile[flipped.finalitem.name.toLowerCase()] != undefined || oldfile[flipped.finalitem.name.toLowerCase()] != null) {
                                                        oldfile[flipped.finalitem.name.toLowerCase()] = { "name": flipped.finalitem.name, "id": flipped.finalitem.id, "profit": (flipped.profit + oldfile[flipped.finalitem.name.toLowerCase()].profit) / 2, "itemcost": (flipped.itemcost + oldfile[flipped.finalitem.name.toLowerCase()].itemcost) / 2, "matcost": (flipped.matcost + oldfile[flipped.finalitem.name.toLowerCase()].matcost) / 2 };
                                                        promises_1.default.writeFile(__dirname + "/../../../../../cache/hypixelcache/craftcache.json", JSON.stringify(oldfile));
                                                    }
                                                    else {
                                                        oldfile[flipped.finalitem.name.toLowerCase()] = { "name": flipped.finalitem.name, "id": flipped.finalitem.id, "profit": flipped.profit, "itemcost": flipped.itemcost, "matcost": flipped.matcost };
                                                        promises_1.default.writeFile(__dirname + "/../../../../../cache/hypixelcache/craftcache.json", JSON.stringify(oldfile));
                                                    }
                                                });
                                                res.json(flipped);
                                            });
                                        });
                                    }
                                    else {
                                        res.json({ 'status': 'invalidamountofstars' });
                                    }
                                    return [3 /*break*/, 8];
                                case 4:
                                    curtime = Date.now();
                                    if (!(BinUtil_hypixel_1.BinUtil.bin.lastupdates == undefined && BinUtil_hypixel_1.BinUtil.isupdating == false || BinUtil_hypixel_1.BinUtil.bin.lastupdates == 0 && BinUtil_hypixel_1.BinUtil.isupdating == false || BinUtil_hypixel_1.BinUtil.bin.lastupdates + 600000 <= curtime && BinUtil_hypixel_1.BinUtil.isupdating == false)) return [3 /*break*/, 7];
                                    console.log("ooof");
                                    BinUtil_hypixel_1.BinUtil.isupdating = true;
                                    return [4 /*yield*/, BinUtil_hypixel_1.BinUtil.SaveAllBinsToGCS()];
                                case 5:
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
                                case 6:
                                    tempFile = _a.sent();
                                    BinUtil_hypixel_1.BinUtil.bin.lastupdates = tempFile.timesincelastcall;
                                    BinUtil_hypixel_1.BinUtil.bin.auctions = tempFile.auctions;
                                    BinUtil_hypixel_1.BinUtil.isupdating = false;
                                    _a.label = 7;
                                case 7:
                                    ah = BinUtil_hypixel_1.BinUtil.bin.auctions;
                                    if (ah == undefined) {
                                        res.json({ 'status': 'auctioncrashed' });
                                        return [2 /*return*/];
                                    }
                                    if (req.body.recipe.length - 1 >= parseInt(req.body.index)) {
                                        if (req.body.amountOfStars != undefined && parseInt(req.body.amountOfStars) >= 0 && parseInt(req.body.amountOfStars) < 6) {
                                            CraftFlipperCalculator_hypixel_1.CraftFlipperCalculator.CalculateAllLowestResourcePricesOfItem(ah, req.body.recipe[parseInt(req.body.index)], req.body.amountOfStars).then(function (e) {
                                                CraftFlipper_hypixel_1.CraftFlipper.CompareItemPriceToRecipeAhLowest(ah, req.body.recipe[parseInt(req.body.index)], e, req.body.amountOfStars).then(function (flipped) {
                                                    promises_1.default.readFile(__dirname + "/../../../../../cache/hypixelcache/craftcache.json", { "encoding": "utf-8" }).then(function (file) {
                                                        //console.log(file);
                                                        if (file == "{}" || !file) {
                                                            var finalfile = {};
                                                            finalfile[flipped.finalitem.name.toLowerCase()] = { "name": flipped.finalitem.name, "id": flipped.finalitem.id, "profit": flipped.profit, "itemcost": flipped.itemcost, "matcost": flipped.matcost };
                                                            promises_1.default.writeFile(__dirname + "/../../../../../cache/hypixelcache/craftcache.json", JSON.stringify(finalfile));
                                                            return;
                                                        }
                                                        var oldfile = JSON.parse(file);
                                                        console.log(oldfile[flipped.finalitem.name.toLowerCase()]);
                                                        if (oldfile[flipped.finalitem.name.toLowerCase()] != undefined || oldfile[flipped.finalitem.name.toLowerCase()] != null) {
                                                            oldfile[flipped.finalitem.name.toLowerCase()] = { "name": flipped.finalitem.name, "id": flipped.finalitem.id, "profit": (flipped.profit + oldfile[flipped.finalitem.name.toLowerCase()].profit) / 2, "itemcost": (flipped.itemcost + oldfile[flipped.finalitem.name.toLowerCase()].itemcost) / 2, "matcost": (flipped.matcost + oldfile[flipped.finalitem.name.toLowerCase()].matcost) / 2 };
                                                            promises_1.default.writeFile(__dirname + "/../../../../../cache/hypixelcache/craftcache.json", JSON.stringify(oldfile));
                                                        }
                                                        else {
                                                            oldfile[flipped.finalitem.name.toLowerCase()] = { "name": flipped.finalitem.name, "id": flipped.finalitem.id, "profit": flipped.profit, "itemcost": flipped.itemcost, "matcost": flipped.matcost };
                                                            promises_1.default.writeFile(__dirname + "/../../../../../cache/hypixelcache/craftcache.json", JSON.stringify(oldfile));
                                                        }
                                                    });
                                                    res.json(flipped);
                                                });
                                            });
                                        }
                                        else {
                                            res.json({ 'status': 'invalidamountofstars' });
                                        }
                                    }
                                    else {
                                        res.json({ 'status': "invalidindex" });
                                    }
                                    _a.label = 8;
                                case 8: return [2 /*return*/];
                            }
                        });
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    return LowestCraftFlipEndpoint;
}());
exports.LowestCraftFlipEndpoint = LowestCraftFlipEndpoint;
