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
exports.BookFlipper = void 0;
var BookUtil_hypixel_1 = require("../util/BookUtil.hypixel");
var CacheDatabase_db_1 = __importDefault(require("../../db/CacheDatabase.db"));
var BookFlipper = /** @class */ (function () {
    function BookFlipper() {
    }
    BookFlipper.FindBestBookToFlipByMarginCache = function () {
        return __awaiter(this, void 0, void 0, function () {
            var bookprices;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, CacheDatabase_db_1.default.GetDocumentById("bookprice")];
                    case 1:
                        bookprices = _a.sent();
                        if (bookprices && !(bookprices instanceof Error)) {
                            return [2 /*return*/, bookprices];
                        }
                        else {
                            return [2 /*return*/, undefined];
                        }
                        return [2 /*return*/];
                }
            });
        });
    };
    BookFlipper.FindBestBookToFlipByMargin = function (ah) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/, BookUtil_hypixel_1.BookUtil.GetAllBooksFromAh().then(function (books) {
                        var allBooks = [];
                        for (var i = 0; i < books.length; i++) {
                            allBooks.push(BookUtil_hypixel_1.BookUtil.GetBookStats(books[i]).then(function (book) {
                                if (book != undefined) {
                                    return book;
                                }
                            }));
                        }
                        return Promise.all(allBooks).then(function (finalbooks) {
                            var actualbooks = [];
                            for (var i = 0; i < finalbooks.length; i++) {
                                if (finalbooks[i] == undefined) {
                                    continue;
                                }
                                actualbooks.push(finalbooks[i]);
                            }
                            var lvl1books = [];
                            var lvl5books = [];
                            for (var i = 0; i < actualbooks.length; i++) {
                                if (actualbooks[i].level == 1) {
                                    lvl1books.push(actualbooks[i]);
                                }
                                if (actualbooks[i].level == 5) {
                                    lvl5books.push(actualbooks[i]);
                                }
                            }
                            return BookUtil_hypixel_1.BookUtil.GetLowestPriceOfEachBook(lvl1books).then(function (lowestlvl1) {
                                return BookUtil_hypixel_1.BookUtil.GetLowestPriceOfEachBook(lvl5books).then(function (lowestlvl5) {
                                    var margin = [];
                                    var bookUtilKeys = Object.keys(lowestlvl5);
                                    for (var i = 0; i < bookUtilKeys.length; i++) {
                                        if (lowestlvl1[bookUtilKeys[i]] == undefined) {
                                            continue;
                                        }
                                        if (lowestlvl1[bookUtilKeys[i]].price * 16 < lowestlvl5[bookUtilKeys[i]].price && lowestlvl5[bookUtilKeys[i]].price >= 500000) {
                                            margin.push({ "book": bookUtilKeys[i], "lvl5price": lowestlvl5[bookUtilKeys[i]].price, "lvl1price": lowestlvl1[bookUtilKeys[i]].price, "totalcraftprice": lowestlvl1[bookUtilKeys[i]].price * 16, "margin": ((lowestlvl5[bookUtilKeys[i]].price - lowestlvl1[bookUtilKeys[i]].price * 16) / (lowestlvl1[bookUtilKeys[i]].price * 16)) * 100 });
                                        }
                                    }
                                    margin = margin.sort(function (a, b) {
                                        if (a.margin > b.margin) {
                                            return -1;
                                        }
                                        else if (a.margin < b.margin) {
                                            return 1;
                                        }
                                        else {
                                            return 0;
                                        }
                                    });
                                    CacheDatabase_db_1.default.SetDocument("bookprice", { "timesincelastcall": Date.now(), books: margin }, { "merge": true });
                                    return margin;
                                });
                            });
                        });
                    })];
            });
        });
    };
    return BookFlipper;
}());
exports.BookFlipper = BookFlipper;
