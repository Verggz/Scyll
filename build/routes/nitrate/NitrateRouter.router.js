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
var CreateGraph_endpoint_1 = require("./endpoints/CreateGraph.endpoint");
var GetItemDayInfo_endpoint_1 = require("./endpoints/GetItemDayInfo.endpoint");
var GetItemDaysInfo_endpoint_1 = require("./endpoints/GetItemDaysInfo.endpoint");
var NitrateRouter = /** @class */ (function (_super) {
    __extends(NitrateRouter, _super);
    function NitrateRouter() {
        return _super.call(this) || this;
    }
    return NitrateRouter;
}(IRouter_router_1.IRouter));
exports.default = new NitrateRouter();
CreateGraph_endpoint_1.CreateGraphEndpoint.CreateGraph();
GetItemDayInfo_endpoint_1.GetItemDayInfoEndpoint.GetItemDayInfo();
GetItemDaysInfo_endpoint_1.GetItemDaysInfoEndpoint.GetItemDaysInfo();
