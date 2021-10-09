import { IRouter } from "../IRouter.router";
import { GetCurrentLimitEndpoint } from "./endpoints/GetCurrentLimit.endpoint";
import { GetServerStatsEndpoint } from "./endpoints/GetServerStats.endpoint";
import { GetWeightEndpoint } from "./endpoints/GetWeight.endpoint";
import { LimitFlipUsesEndpoint } from "./endpoints/LimitFlipUses.endpoint";

class BotRouter extends IRouter{
    constructor(){
        super();
    }
}

export default new BotRouter();

LimitFlipUsesEndpoint.LimitFlipUses();
LimitFlipUsesEndpoint.RenewLimit();
GetCurrentLimitEndpoint.GetCurrentLimit();
GetServerStatsEndpoint.GetServerStats();
GetWeightEndpoint.GetWeight();
