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
exports.AuctionManager = void 0;
var AuctionUtil_hypixel_1 = require("../../hypixel/util/AuctionUtil.hypixel");
var AuctionsCollection_collection_1 = __importDefault(require("../collection/AuctionsCollection.collection"));
var AuctionManager = /** @class */ (function () {
    function AuctionManager() {
    }
    //Saves 1 auction of an item that is within 30 minutes
    AuctionManager.SaveAllAuctionsToFirestore = function () {
        return __awaiter(this, void 0, void 0, function () {
            var ah, j, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0: return [4 /*yield*/, AuctionUtil_hypixel_1.AuctionUtil.GetAllItemsFromAh()];
                    case 1:
                        ah = _a.sent();
                        if (ah == undefined) {
                            return [2 /*return*/];
                        }
                        j = 0;
                        for (i = 0; i < ah.length; i++) {
                            if (ah[i] == undefined) {
                                continue;
                            }
                            if (ah[i].bin == undefined && ah[i].time >= 1200000 && ah[i].time <= 2400000 && ah[i].price > 25000) {
                                j++;
                                AuctionsCollection_collection_1.default.SetDocument(ah[i].item, { "aucid": ah[i].aucid, "bids": ah[i].bids, "bin": false, "item": ah[i].item, "item_bytes": ah[i].item_bytes, "lore": ah[i].lore, "price": ah[i].price, "time": ah[i].time, "start": ah[i].start, "end": ah[i].end }, { "merge": true });
                            }
                        }
                        console.log(j);
                        return [2 /*return*/];
                }
            });
        });
    };
    AuctionManager.ResetHourlyCache = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    AuctionManager.AddToDailyCache = function (hourlydata) {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    return AuctionManager;
}());
exports.AuctionManager = AuctionManager;
