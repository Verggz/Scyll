"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var IRouter_router_1 = require("../IRouter.router");
var GetCurrentLimit_endpoint_1 = require("./endpoints/GetCurrentLimit.endpoint");
var GetServerStats_endpoint_1 = require("./endpoints/GetServerStats.endpoint");
var GetWeight_endpoint_1 = require("./endpoints/GetWeight.endpoint");
var LimitFlipUses_endpoint_1 = require("./endpoints/LimitFlipUses.endpoint");
var BotRouter = /** @class */ (function (_super) {
    __extends(BotRouter, _super);
    function BotRouter() {
        return _super.call(this) || this;
    }
    return BotRouter;
}(IRouter_router_1.IRouter));
exports.default = new BotRouter();
LimitFlipUses_endpoint_1.LimitFlipUsesEndpoint.LimitFlipUses();
LimitFlipUses_endpoint_1.LimitFlipUsesEndpoint.RenewLimit();
GetCurrentLimit_endpoint_1.GetCurrentLimitEndpoint.GetCurrentLimit();
GetServerStats_endpoint_1.GetServerStatsEndpoint.GetServerStats();
GetWeight_endpoint_1.GetWeightEndpoint.GetWeight();
