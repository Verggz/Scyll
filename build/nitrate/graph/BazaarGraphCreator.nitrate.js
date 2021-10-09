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
exports.BazaarGraphCreator = void 0;
var chartjs_node_canvas_1 = require("chartjs-node-canvas");
var moment_1 = __importDefault(require("moment"));
var DailyBazaarCollection_collection_1 = __importDefault(require("../collection/DailyBazaarCollection.collection"));
var BazaarGraphCreator = /** @class */ (function () {
    function BazaarGraphCreator() {
    }
    BazaarGraphCreator.GetDataWithinDayTimespan = function (item, min, max) {
        return __awaiter(this, void 0, void 0, function () {
            var jsmindate, jsmaxdate, allDocs, allDocsData, i;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        jsmindate = moment_1.default(min, "DD-MM-YYYY").utc().toDate();
                        jsmaxdate = moment_1.default(max, "DD-MM-YYYY").utc().toDate();
                        return [4 /*yield*/, DailyBazaarCollection_collection_1.default.collection.where("id", '==', item).where('timestamp', '>=', jsmindate).where('timestamp', '<=', jsmaxdate).get().then(function (docs) {
                                if (docs.empty) {
                                    return false;
                                }
                                else {
                                    return docs.docs;
                                }
                            }).catch(function (err) {
                                return undefined;
                            })];
                    case 1:
                        allDocs = _a.sent();
                        if (!allDocs) {
                            if (allDocs == undefined) {
                                return [2 /*return*/, false];
                            }
                            console.log("empty");
                            return [2 /*return*/];
                        }
                        allDocsData = [];
                        for (i = 0; i < allDocs.length; i++) {
                            allDocsData.push(allDocs[i].data());
                        }
                        return [2 /*return*/, allDocsData];
                }
            });
        });
    };
    BazaarGraphCreator.prototype.GetDataWithinWeekTimespan = function () {
        return __awaiter(this, void 0, void 0, function () {
            return __generator(this, function (_a) {
                return [2 /*return*/];
            });
        });
    };
    BazaarGraphCreator.Render = function (type, data) {
        return __awaiter(this, void 0, void 0, function () {
            var datalabels, buyorderpricedata, sellofferpricedata, i, config, renderservice;
            return __generator(this, function (_a) {
                switch (_a.label) {
                    case 0:
                        if (!(type == "DAILY")) return [3 /*break*/, 2];
                        datalabels = [];
                        buyorderpricedata = [];
                        sellofferpricedata = [];
                        for (i = 0; i < data.length; i++) {
                            datalabels.push(data[i].date);
                            buyorderpricedata.push(data[i].buyorderprice);
                            sellofferpricedata.push(data[i].sellofferprice);
                        }
                        config = {
                            type: "line",
                            data: {
                                labels: datalabels,
                                datasets: [
                                    {
                                        label: "buy order price",
                                        data: sellofferpricedata,
                                        backgroundColor: "rgba(250,128,114, 1)",
                                        tension: 0.1
                                    },
                                    {
                                        label: "sell offer price",
                                        data: buyorderpricedata,
                                        backgroundColor: "rgba(75, 192, 192,1)",
                                        tension: 0.1
                                    },
                                ]
                            },
                            options: {
                                legend: {
                                    labels: {
                                        fontColor: "white",
                                    }
                                },
                                scales: {
                                    xAxes: [{ stacked: false, scaleLabel: {
                                                display: true,
                                                labelString: "Coins Per",
                                            },
                                            ticks: { fontcolor: "white" }
                                        }],
                                    yAxes: [{
                                            stacked: true,
                                            scaleLabel: {
                                                display: true,
                                                labelString: "Coins Per",
                                            },
                                            ticks: {
                                                beginAtZero: true,
                                                fontcolor: "white"
                                            },
                                        }]
                                }
                            }
                        };
                        renderservice = new chartjs_node_canvas_1.CanvasRenderService(640, 480);
                        return [4 /*yield*/, renderservice.renderToBuffer(config)];
                    case 1: return [2 /*return*/, _a.sent()];
                    case 2: return [2 /*return*/];
                }
            });
        });
    };
    return BazaarGraphCreator;
}());
exports.BazaarGraphCreator = BazaarGraphCreator;
