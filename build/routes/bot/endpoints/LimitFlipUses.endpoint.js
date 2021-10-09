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
exports.LimitFlipUsesEndpoint = void 0;
var BotRouter_router_1 = __importDefault(require("../BotRouter.router"));
var UserCollection_collection_1 = __importDefault(require("../../../nitrate/collection/UserCollection.collection"));
var LimitFlipUsesEndpoint = /** @class */ (function () {
    function LimitFlipUsesEndpoint() {
    }
    LimitFlipUsesEndpoint.LimitFlipUses = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                BotRouter_router_1.default.GetRouter().post("/flip/limit", function (req, res, next) {
                    return __awaiter(this, void 0, void 0, function () {
                        var curtime, user, voted;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    curtime = Date.now();
                                    return [4 /*yield*/, UserCollection_collection_1.default.GetDocumentById(req.body.id)];
                                case 1:
                                    user = _a.sent();
                                    if (user && !(user instanceof Error)) {
                                        voted = !(user.limit.votetime + 43200000 <= curtime);
                                        if (user.limit.lastused + 43200000 <= curtime) {
                                            UserCollection_collection_1.default.SetDocument(req.body.id, { "id": req.body.id, "limit": { "lastused": curtime, "amount": 14, "voted": voted, "votetime": user.limit.votetime } }, { "merge": true });
                                            res.json({ "status": "success", "id": req.body.id, "limit": { "lastused": curtime, "amount": 14, "voted": voted, "votetime": user.limit.votetime } });
                                        }
                                        else {
                                            UserCollection_collection_1.default.SetDocument(req.body.id, { "id": req.body.id, "limit": { "lastused": user.limit.lastused, "amount": user.limit.amount - 1, "voted": voted, "votetime": user.limit.votetime } }, { "merge": true });
                                            res.json({ "status": "success", "id": req.body.id, "limit": { "lastused": user.limit.lastused, "amount": user.limit.amount - 1, "voted": voted, "votetime": user.limit.votetime } });
                                        }
                                    }
                                    else {
                                        UserCollection_collection_1.default.SetDocument(req.body.id, { "id": req.body.id, "limit": { "lastused": curtime, "amount": 14, "voted": false, "votetime": 0 } }, { "merge": true });
                                        res.json({ "status": "success", "id": req.body.id, "limit": { "lastused": curtime, "amount": 14, "voted": false } });
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    LimitFlipUsesEndpoint.RenewLimit = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                BotRouter_router_1.default.GetRouter().post('/flip/vote', function (req, res, next) {
                    return __awaiter(this, void 0, void 0, function () {
                        var curtime, user;
                        return __generator(this, function (_a) {
                            switch (_a.label) {
                                case 0:
                                    curtime = Date.now();
                                    return [4 /*yield*/, UserCollection_collection_1.default.GetDocumentById(req.body.user)];
                                case 1:
                                    user = _a.sent();
                                    if (user && !(user instanceof Error)) {
                                        if (user.limit.votetime + 43200000 <= curtime) {
                                            UserCollection_collection_1.default.SetDocument(req.body.user, { "id": req.body.user, "limit": { "lastused": curtime, "amount": user.limit.amount + 75, "voted": true, "votetime": curtime } }, { "merge": true });
                                            res.json({ 'status': 'success' });
                                            return [2 /*return*/];
                                        }
                                        res.json({ 'status': 'success' });
                                    }
                                    else {
                                        UserCollection_collection_1.default.SetDocument(req.body.user, { "id": req.body.user, "limit": { "lastused": 0, "amount": 50, "voted": true, "votetime": curtime } }, { "merge": true });
                                        res.json({ 'status': 'success' });
                                    }
                                    return [2 /*return*/];
                            }
                        });
                    });
                });
                return [2 /*return*/];
            });
        });
    };
    return LimitFlipUsesEndpoint;
}());
exports.LimitFlipUsesEndpoint = LimitFlipUsesEndpoint;
