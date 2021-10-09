"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.IRouter = void 0;
var express_1 = __importDefault(require("express"));
var IRouter = /** @class */ (function () {
    function IRouter() {
        this.router = express_1.default.Router();
    }
    IRouter.prototype.GetRouter = function () {
        return this.router;
    };
    IRouter.prototype.GetRequest = function (endpoint, cb) {
        this.router.get(endpoint, cb);
    };
    IRouter.prototype.PostRequest = function (endpoint, cb) {
        this.router.post(endpoint, cb);
    };
    return IRouter;
}());
exports.IRouter = IRouter;
