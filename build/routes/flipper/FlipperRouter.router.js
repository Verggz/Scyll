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
var CompareAuctionToBIN_endpoint_1 = require("./endpoints/ah/CompareAuctionToBIN.endpoint");
var GetAh_endpoint_1 = require("./endpoints/ah/GetAh.endpoint");
var TimeframeAuctions_endpoint_1 = require("./endpoints/ah/TimeframeAuctions.endpoint");
var GetBestBazaaritems_endpoint_1 = require("./endpoints/bazaar/GetBestBazaaritems.endpoint");
var AverageCraftFlip_endpoint_1 = require("./endpoints/craft/AverageCraftFlip.endpoint");
var CraftFlip_endpoint_1 = require("./endpoints/craft/CraftFlip.endpoint");
var GetCraftingRecipe_endpoint_1 = require("./endpoints/craft/GetCraftingRecipe.endpoint");
var LowestCraftFlip_endpoint_1 = require("./endpoints/craft/LowestCraftFlip.endpoint");
var BestAhFlipByProfit_endpoint_1 = require("./endpoints/find/BestAhFlipByProfit.endpoint");
var BestBookFlipByMargin_endpoint_1 = require("./endpoints/find/BestBookFlipByMargin.endpoint");
var FindBinSnipe_endpoint_1 = require("./endpoints/find/FindBinSnipe.endpoint");
var MarketManipByStartPrice_endpoint_1 = require("./endpoints/find/MarketManipByStartPrice.endpoint");
var SmartCraftFlip_endpoint_1 = require("./endpoints/find/SmartCraftFlip.endpoint");
var FlipperRouter = /** @class */ (function (_super) {
    __extends(FlipperRouter, _super);
    function FlipperRouter() {
        return _super.call(this) || this;
    }
    return FlipperRouter;
}(IRouter_router_1.IRouter));
exports.default = new FlipperRouter();
GetCraftingRecipe_endpoint_1.GetCraftingRecipeEndpoint.GetCraftingRecipe();
LowestCraftFlip_endpoint_1.LowestCraftFlipEndpoint.LowestCraftFlip();
AverageCraftFlip_endpoint_1.AverageCraftFlipEndpoint.AverageCraftFlip();
TimeframeAuctions_endpoint_1.TimeFramedAuctionsEndpoint.TimeFramedAuctions();
CompareAuctionToBIN_endpoint_1.CompareAuctionToBINEndpoint.CompareAuctionToBIN();
SmartCraftFlip_endpoint_1.SmartCraftFlipEndpoint.SmartCraftFlip();
BestAhFlipByProfit_endpoint_1.BestAhFlipByProfitEndpoint.BestAhFlipByProfit();
BestAhFlipByProfit_endpoint_1.BestAhFlipByProfitEndpoint.BestAhFlipByProfitRT();
GetBestBazaaritems_endpoint_1.GetBestBazaarItemsEndpoint.GetBestBazaarItems();
GetAh_endpoint_1.GetAhEndpoint.GetAh();
BestBookFlipByMargin_endpoint_1.BestBookFlipByMarginEndpoint.BestBookFlipByMargin();
FindBinSnipe_endpoint_1.FindBinSnipeEndpoint.FindBinSnipe();
MarketManipByStartPrice_endpoint_1.MarketManipByStartPriceEndpoint.MarketManipByStartPrice();
CraftFlip_endpoint_1.CraftFlipEndpoint.CraftFlip();
