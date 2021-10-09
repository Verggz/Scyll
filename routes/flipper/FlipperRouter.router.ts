import { IRouter } from "../IRouter.router";
import { CompareAuctionToBINEndpoint } from "./endpoints/ah/CompareAuctionToBIN.endpoint";
import { GetAhEndpoint } from "./endpoints/ah/GetAh.endpoint";
import { TimeFramedAuctionsEndpoint } from "./endpoints/ah/TimeframeAuctions.endpoint";
import { GetBestBazaarItemsEndpoint } from "./endpoints/bazaar/GetBestBazaaritems.endpoint";
import { AverageCraftFlipEndpoint } from "./endpoints/craft/AverageCraftFlip.endpoint";
import { CraftFlipEndpoint } from "./endpoints/craft/CraftFlip.endpoint";
import { GetCraftingRecipeEndpoint } from "./endpoints/craft/GetCraftingRecipe.endpoint";
import { LowestCraftFlipEndpoint } from "./endpoints/craft/LowestCraftFlip.endpoint";
import { BestAhFlipByProfitEndpoint } from "./endpoints/find/BestAhFlipByProfit.endpoint";
import { BestBookFlipByMarginEndpoint } from "./endpoints/find/BestBookFlipByMargin.endpoint";
import { FindBinSnipeEndpoint } from "./endpoints/find/FindBinSnipe.endpoint";
import { MarketManipByStartPriceEndpoint } from "./endpoints/find/MarketManipByStartPrice.endpoint";
import { SmartCraftFlipEndpoint } from "./endpoints/find/SmartCraftFlip.endpoint";

class FlipperRouter extends IRouter{
    constructor(){
        super();
    }
}

export default new FlipperRouter();


GetCraftingRecipeEndpoint.GetCraftingRecipe();
LowestCraftFlipEndpoint.LowestCraftFlip();
AverageCraftFlipEndpoint.AverageCraftFlip();
TimeFramedAuctionsEndpoint.TimeFramedAuctions();
CompareAuctionToBINEndpoint.CompareAuctionToBIN();
SmartCraftFlipEndpoint.SmartCraftFlip();
BestAhFlipByProfitEndpoint.BestAhFlipByProfit();
BestAhFlipByProfitEndpoint.BestAhFlipByProfitRT();
GetBestBazaarItemsEndpoint.GetBestBazaarItems();
GetAhEndpoint.GetAh();
BestBookFlipByMarginEndpoint.BestBookFlipByMargin();
FindBinSnipeEndpoint.FindBinSnipe();
MarketManipByStartPriceEndpoint.MarketManipByStartPrice();
CraftFlipEndpoint.CraftFlip();
