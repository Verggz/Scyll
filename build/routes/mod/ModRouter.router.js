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
var DownloadMod_endpoint_1 = require("./endpoints/DownloadMod.endpoint");
var GetKey_endpoint_1 = require("./endpoints/GetKey.endpoint");
var GetSettings_endpoint_1 = require("./endpoints/GetSettings.endpoint");
var SetSettings_endpoint_1 = require("./endpoints/SetSettings.endpoint");
var VerifyKey_endpoint_1 = require("./endpoints/VerifyKey.endpoint");
var ModRouter = /** @class */ (function (_super) {
    __extends(ModRouter, _super);
    function ModRouter() {
        return _super.call(this) || this;
    }
    return ModRouter;
}(IRouter_router_1.IRouter));
exports.default = new ModRouter();
DownloadMod_endpoint_1.DownloadModEndpoint.DownloadMod();
VerifyKey_endpoint_1.VerifyKeyEndpoint.VerifyKey();
SetSettings_endpoint_1.SetSettingsEndpoint.SetSettings();
GetSettings_endpoint_1.GetSettingsEndpoint.GetSettings();
GetKey_endpoint_1.GetKeyEndpoint.GetKey();
