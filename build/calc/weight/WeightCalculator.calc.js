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
exports.WeightCalculator = void 0;
var ProfileUtil_util_1 = require("../util/ProfileUtil.util");
var WeightCalculator = /** @class */ (function () {
    function WeightCalculator() {
    }
    WeightCalculator.CalculateWeightByProfile = function (username, profile) {
        var _a;
        return __awaiter(this, void 0, void 0, function () {
            var mainprofile, weight;
            return __generator(this, function (_b) {
                switch (_b.label) {
                    case 0: return [4 /*yield*/, ProfileUtil_util_1.ProfileUtil.GetProfileByUsername(username, profile)];
                    case 1:
                        mainprofile = _b.sent();
                        weight = { "alchemy": 0, "cata": 0, "class": 0, "combat": 0, "enchanting": 0, "farming": 0, "fishing": 0, "foraging": 0, "mining": 0, "rev": 0, "sven": 0, "taming": 0, "tara": 0, "void": 0, "total": 0, "skill": 0, "slayer": 0, "dungeon": 0, "dungeonapi": true, "skillapi": true, "slayerapi": true };
                        if (mainprofile == undefined) {
                            return [2 /*return*/, "noprofile"];
                        }
                        if (mainprofile.me.skills) {
                            weight.mining = Math.pow((mainprofile.me.skills.mining.level * 10), (1.64207448 + mainprofile.me.skills.mining.level / 100)) / 1250;
                            weight.foraging = Math.pow((mainprofile.me.skills.foraging.level * 10), (1.732826 + mainprofile.me.skills.foraging.level / 100)) / 1250;
                            weight.enchanting = Math.pow((mainprofile.me.skills.enchanting.level * 10), (1.46976583 + mainprofile.me.skills.enchanting.level / 100)) / 1250;
                            weight.farming = Math.pow((mainprofile.me.skills.farming.level * 10), (1.717848139 + mainprofile.me.skills.farming.level / 100)) / 1250;
                            weight.combat = Math.pow((mainprofile.me.skills.combat.level * 10), (1.65797687265 + mainprofile.me.skills.combat.level / 100)) / 1250;
                            weight.fishing = (mainprofile.me.skills.fishing.level * 10) ^ (1.906418 + mainprofile.me.skills.fishing.level / 100) / 1250;
                            weight.alchemy = (mainprofile.me.skills.alchemy.level * 10) ^ (1.5 + mainprofile.me.skills.alchemy.level / 100) / 1250;
                            weight.taming = (mainprofile.me.skills.taming.level * 10) ^ (1.64744 + mainprofile.me.skills.taming.level / 100) / 1250;
                            weight.skill = weight.mining + weight.foraging + weight.enchanting + weight.farming + weight.combat + weight.fishing + weight.alchemy + weight.taming;
                        }
                        else {
                            weight.skillapi = false;
                        }
                        //slayer weight
                        if (mainprofile.me.slayer) {
                            weight.rev = mainprofile.me.slayer.zombie.xp / 2208;
                            weight.tara = mainprofile.me.slayer.spider.xp / 2118;
                            weight.sven = mainprofile.me.slayer.wolf.xp / 1962;
                            weight.slayer = weight.rev + weight.tara + weight.sven;
                        }
                        else {
                            weight.slayerapi = false;
                        }
                        //dungeon weight
                        if (mainprofile.me.dungeons) {
                            weight.cata = Math.pow(mainprofile.me.dungeons.types.catacombs.level, 4.5) * 0.0002149604615;
                            weight.class = (Math.pow(mainprofile.me.dungeons.classes.archer.level, 4.5) * 0.0000045254834) + (Math.pow(mainprofile.me.dungeons.classes.berserk.level, 4.5) * 0.0000045254834) + (Math.pow(mainprofile.me.dungeons.classes.healer.level, 4.5) * 0.0000045254834) + (Math.pow(mainprofile.me.dungeons.classes.mage.level, 4.5) * 0.0000045254834) + (Math.pow(mainprofile.me.dungeons.classes.tank.level, 4.5) * 0.0000045254834);
                            weight.dungeon = weight.cata + weight.class;
                        }
                        else {
                            weight.dungeonapi = false;
                        }
                        weight.total = weight.skill + weight.slayer + weight.dungeon;
                        return [2 /*return*/, { "status": "success", "profile": mainprofile.profileName, "username": (_a = mainprofile.me.player) === null || _a === void 0 ? void 0 : _a.nickname, "weight": weight }];
                }
            });
        });
    };
    return WeightCalculator;
}());
exports.WeightCalculator = WeightCalculator;
