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
var express_1 = __importDefault(require("express"));
var AuctionUtil_hypixel_1 = require("./hypixel/util/AuctionUtil.hypixel");
var FlipperRouter_router_1 = __importDefault(require("./routes/flipper/FlipperRouter.router"));
var UserRouter_router_1 = __importDefault(require("./routes/users/UserRouter.router"));
var dynamic_1 = require("set-interval-async/dynamic");
var CacheDatabase_db_1 = __importDefault(require("./db/CacheDatabase.db"));
var express_rate_limit_1 = __importDefault(require("express-rate-limit"));
var compression_1 = __importDefault(require("compression"));
var NitrateRouter_router_1 = __importDefault(require("./routes/nitrate/NitrateRouter.router"));
var ModRouter_router_1 = __importDefault(require("./routes/mod/ModRouter.router"));
var BotRouter_router_1 = __importDefault(require("./routes/bot/BotRouter.router"));
var BinUtil_hypixel_1 = require("./hypixel/util/BinUtil.hypixel");
var app = express_1.default();
app.use(express_rate_limit_1.default({ "windowMs": 5 * 60 * 1000, "max": 75 }));
app.use(express_1.default.json({ 'limit': '5mb' }));
app.use(express_1.default.urlencoded({ 'extended': true, 'limit': '5mb', 'parameterLimit': 500000 }));
app.use(compression_1.default());
app.use('/api/v1/nitric', FlipperRouter_router_1.default.GetRouter());
app.use('/api/v1/users', UserRouter_router_1.default.GetRouter());
app.use('/api/v1/nitrate', NitrateRouter_router_1.default.GetRouter());
app.use('/api/v1/bot', BotRouter_router_1.default.GetRouter());
app.use('/api/v1/mod', ModRouter_router_1.default.GetRouter());
app.get("/", function (req, res, next) {
    return __awaiter(this, void 0, void 0, function () {
        return __generator(this, function (_a) {
            res.send("Scyll server API");
            return [2 /*return*/];
        });
    });
});
app.listen(process.env.PORT || '8080', function () {
    if (process.env.PORT) {
        console.log("listening on port: " + process.env.PORT);
    }
    else {
        console.log("listening on port: " + '8080');
    }
});
var start = Date.now();
BinUtil_hypixel_1.BinUtil.SaveAllBinsToFile().then(function (file) {
    BinUtil_hypixel_1.BinUtil.SaveAllSecondLowestSnipeToFile().then(function (final) {
        console.log((Date.now() - start) / 1000 + "s");
    });
});
var isCalling = false;
dynamic_1.setIntervalAsync(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        switch (_a.label) {
            case 0:
                console.log("called");
                if (isCalling == true) {
                    console.log("still calling");
                    return [2 /*return*/];
                }
                isCalling = true;
                return [4 /*yield*/, BinUtil_hypixel_1.BinUtil.SaveAllBinsToFile().then(function (file) {
                    })];
            case 1:
                _a.sent();
                return [4 /*yield*/, BinUtil_hypixel_1.BinUtil.SaveAllSecondLowestSnipeToFile().then(function (final) {
                        console.log((Date.now() - start) / 1000 + "s");
                    })];
            case 2:
                _a.sent();
                isCalling = false;
                return [2 /*return*/];
        }
    });
}); }, 120000);
// console.log("not main");
dynamic_1.setIntervalAsync(function () { return __awaiter(void 0, void 0, void 0, function () {
    return __generator(this, function (_a) {
        AuctionUtil_hypixel_1.AuctionUtil.GetAllAuctionsEnded().then(function (res) {
            if (res == undefined) {
                return undefined;
            }
            AuctionUtil_hypixel_1.AuctionUtil.SaveAllEndedAuctionsToCache(res).then(function (file) {
                CacheDatabase_db_1.default.SetDocument("auctionprices", file, { "merge": true });
            });
            AuctionUtil_hypixel_1.AuctionUtil.SaveAllEndedAuctionsToCachev2(res).then(function (file) {
                CacheDatabase_db_1.default.SetDocument("auctionpricesv2", file, { "merge": true });
            });
        });
        return [2 /*return*/];
    });
}); }, 60000);
AuctionUtil_hypixel_1.AuctionUtil.GetAllAuctionsEnded().then(function (res) {
    if (res == undefined) {
        return undefined;
    }
    AuctionUtil_hypixel_1.AuctionUtil.SaveAllEndedAuctionsToCache(res).then(function (file) {
        CacheDatabase_db_1.default.SetDocument("auctionprices", file, { "merge": true });
    });
    AuctionUtil_hypixel_1.AuctionUtil.SaveAllEndedAuctionsToCachev2(res).then(function (file) {
        CacheDatabase_db_1.default.SetDocument("auctionpricesv2", file, { "merge": true });
    });
    //console.log(res);
});
