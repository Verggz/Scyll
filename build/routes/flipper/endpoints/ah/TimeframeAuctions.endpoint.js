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
exports.TimeFramedAuctionsEndpoint = void 0;
var AuctionFlipper_hypixel_1 = require("../../../../hypixel/auctionflipping/AuctionFlipper.hypixel");
var AuctionUtil_hypixel_1 = require("../../../../hypixel/util/AuctionUtil.hypixel");
var ItemUtil_hypixel_1 = require("../../../../hypixel/util/ItemUtil.hypixel");
var FlipperRouter_router_1 = __importDefault(require("../../FlipperRouter.router"));
var TimeFramedAuctionsEndpoint = /** @class */ (function () {
    function TimeFramedAuctionsEndpoint() {
    }
    TimeFramedAuctionsEndpoint.TimeFramedAuctions = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                FlipperRouter_router_1.default.GetRouter().get("/auctions/timeframe", function (req, res, next) {
                    return __awaiter(this, void 0, void 0, function () {
                        var item, ah, allAucItems, timeFramedAuc, item, ah, allAucItems, timeFramedAuc;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    if (!(req.query.id == undefined && req.query.name != undefined)) return [3 /*break*/, 11];
                                    if (req.query.timeframe == undefined || isNaN(parseInt(req.query.timeframe))) {
                                        res.json({ 'status': 'invalidtimeframe' });
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, ItemUtil_hypixel_1.ItemlUtil.getItemByName(decodeURI(req.query.name))];
                                case 1:
                                    item = _a.sent();
                                    if (!(item != undefined)) return [3 /*break*/, 9];
                                    return [4 /*yield*/, AuctionUtil_hypixel_1.AuctionUtil.GetAllItemsFromAh()];
                                case 2:
                                    ah = _a.sent();
                                    if (!(ah != undefined)) return [3 /*break*/, 7];
                                    return [4 /*yield*/, AuctionUtil_hypixel_1.AuctionUtil.GetAllAuctionsOfItemWithoutAPICall(item.name.toLowerCase(), ah)];
                                case 3:
                                    allAucItems = _a.sent();
                                    if (!(allAucItems != undefined)) return [3 /*break*/, 5];
                                    return [4 /*yield*/, AuctionFlipper_hypixel_1.AuctionFlipper.GetAllItemsFromAuctionsWithinTimeFrame(parseInt(req.query.timeframe), allAucItems)];
                                case 4:
                                    timeFramedAuc = _a.sent();
                                    //var bs64 = Base64.encode(JSON.stringify(timeFramedAuc));
                                    res.json({ 'status': 'success', 'item': item, 'auctions': timeFramedAuc });
                                    return [3 /*break*/, 6];
                                case 5:
                                    res.json({ 'status': 'noauctionsofitem' });
                                    _a.label = 6;
                                case 6: return [3 /*break*/, 8];
                                case 7:
                                    res.json({ 'status': "couldntgetah" });
                                    _a.label = 8;
                                case 8: return [3 /*break*/, 10];
                                case 9:
                                    res.json({ "status": "invaliditem" });
                                    _a.label = 10;
                                case 10: return [3 /*break*/, 23];
                                case 11:
                                    if (!(req.query.id != undefined && req.query.name == undefined)) return [3 /*break*/, 22];
                                    if (req.query.timeframe == undefined || isNaN(parseInt(req.query.timeframe))) {
                                        res.json({ 'status': 'invalidtimeframe' });
                                        return [2 /*return*/];
                                    }
                                    return [4 /*yield*/, ItemUtil_hypixel_1.ItemlUtil.getItemById(req.query.id)];
                                case 12:
                                    item = _a.sent();
                                    if (!(item != undefined)) return [3 /*break*/, 20];
                                    return [4 /*yield*/, AuctionUtil_hypixel_1.AuctionUtil.GetAllItemsFromAh()];
                                case 13:
                                    ah = _a.sent();
                                    if (!(ah != undefined)) return [3 /*break*/, 18];
                                    return [4 /*yield*/, AuctionUtil_hypixel_1.AuctionUtil.GetAllAuctionsOfItemWithoutAPICall(item.name.toLowerCase(), ah)];
                                case 14:
                                    allAucItems = _a.sent();
                                    if (!(allAucItems != undefined)) return [3 /*break*/, 16];
                                    return [4 /*yield*/, AuctionFlipper_hypixel_1.AuctionFlipper.GetAllItemsFromAuctionsWithinTimeFrame(parseInt(req.query.timeframe), allAucItems)];
                                case 15:
                                    timeFramedAuc = _a.sent();
                                    res.json({ 'status': 'success', 'item': item, 'auctions': timeFramedAuc });
                                    return [3 /*break*/, 17];
                                case 16:
                                    res.json({ 'status': 'noauctionsofitem' });
                                    _a.label = 17;
                                case 17: return [3 /*break*/, 19];
                                case 18:
                                    res.json({ 'status': "couldntgetah" });
                                    _a.label = 19;
                                case 19: return [3 /*break*/, 21];
                                case 20:
                                    res.json({ "status": "invaliditem" });
                                    _a.label = 21;
                                case 21: return [3 /*break*/, 23];
                                case 22:
                                    res.json({ 'status': 'invalidparams', 'message': 'you had not put the required parameters, [id] or [name] for this endpoint.' });
                                    _a.label = 23;
                                case 23: return [2 /*return*/];
                            }
                        });
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    return TimeFramedAuctionsEndpoint;
}());
exports.TimeFramedAuctionsEndpoint = TimeFramedAuctionsEndpoint;
