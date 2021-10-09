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
exports.BookUtil = void 0;
var BinUtil_hypixel_1 = require("./BinUtil.hypixel");
var ItemUtil_hypixel_1 = require("./ItemUtil.hypixel");
var storage_1 = require("@google-cloud/storage");
var storage = new storage_1.Storage({ "projectId": "projectscyll", "keyFilename": "./projectscyll-97351f835781.json" });
var BookUtil = /** @class */ (function () {
    function BookUtil() {
    }
    BookUtil.GetAllBooksFromAh = function () {
        return __awaiter(this, void 0, void 0, function () {
            var curtime, getBinCache, tempFile, allBooks, i;
            var _this = this;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
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
                        allBooks = [];
                        for (i = 0; i < BinUtil_hypixel_1.BinUtil.bin.auctions.length; i++) {
                            if (BinUtil_hypixel_1.BinUtil.bin.auctions[i].item.toLowerCase() == "enchanted book" && BinUtil_hypixel_1.BinUtil.bin.auctions[i].bin) {
                                allBooks.push(BinUtil_hypixel_1.BinUtil.bin.auctions[i]);
                            }
                        }
                        return [2 /*return*/, allBooks];
                }
            });
        });
    };
    BookUtil.GetBookStats = function (book) {
        return __awaiter(this, void 0, void 0, function () {
            var item, name;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, ItemUtil_hypixel_1.ItemlUtil.ConvertItemBytesToItemData(book.item_bytes)];
                    case 1:
                        item = _a.sent();
                        if (item.value[0].tag.value.ExtraAttributes.value.enchantments == undefined) {
                            return [2 /*return*/, undefined];
                        }
                        name = Object.keys(item.value[0].tag.value.ExtraAttributes.value.enchantments.value);
                        return [2 /*return*/, { "level": item.value[0].tag.value.ExtraAttributes.value.enchantments.value[name[0]].value, "enchantment": name[0], "price": book.price }];
                }
            });
        });
    };
    BookUtil.GetAllBooksByLevel = function (books, level) {
        return __awaiter(this, void 0, void 0, function () {
            var finalbooks, i;
            return __generator(this, function (_a) {
                finalbooks = [];
                for (i = 0; i < books.length; i++) {
                    if (books[i] == undefined) {
                        continue;
                    }
                    if (books[i].level == level) {
                        finalbooks.push(books[i]);
                    }
                }
                return [2 /*return*/, finalbooks];
            });
        });
    };
    BookUtil.GetLowestPriceOfEachBook = function (books) {
        return __awaiter(this, void 0, void 0, function () {
            var allbooks, i;
            return __generator(this, function (_a) {
                allbooks = {};
                for (i = 0; i < books.length; i++) {
                    if (!allbooks[books[i].enchantment]) {
                        allbooks[books[i].enchantment] = books[i];
                    }
                    else {
                        if (allbooks[books[i].enchantment].price > books[i].price) {
                            allbooks[books[i].enchantment] = books[i];
                        }
                    }
                }
                return [2 /*return*/, allbooks];
            });
        });
    };
    return BookUtil;
}());
exports.BookUtil = BookUtil;
