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
exports.UserRouter = void 0;
var IRouter_router_1 = require("../IRouter.router");
var GetRegistryEndpoint_endpoint_1 = require("./endpoints/GetRegistryEndpoint.endpoint");
var RegisterEndpoint_endpoint_1 = require("./endpoints/RegisterEndpoint.endpoint");
var UserRouter = /** @class */ (function (_super) {
    __extends(UserRouter, _super);
    function UserRouter() {
        return _super.call(this) || this;
    }
    return UserRouter;
}(IRouter_router_1.IRouter));
exports.UserRouter = UserRouter;
exports.default = new UserRouter();
RegisterEndpoint_endpoint_1.RegisterEndpoint.Register();
GetRegistryEndpoint_endpoint_1.GetRegistryEndpoint.GetRegistry();
