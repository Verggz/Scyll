import { IRouter } from "../IRouter.router";
import { CreateGraphEndpoint } from "./endpoints/CreateGraph.endpoint";
import { GetItemDayInfoEndpoint } from "./endpoints/GetItemDayInfo.endpoint";
import { GetItemDaysInfoEndpoint } from "./endpoints/GetItemDaysInfo.endpoint";

class NitrateRouter extends IRouter{
    constructor(){
        super();
    }
}

export default new NitrateRouter();

CreateGraphEndpoint.CreateGraph();
GetItemDayInfoEndpoint.GetItemDayInfo();
GetItemDaysInfoEndpoint.GetItemDaysInfo();