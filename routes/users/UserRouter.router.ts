import { IRouter } from "../IRouter.router";
import { GetRegistryEndpoint } from "./endpoints/GetRegistryEndpoint.endpoint";
import { RegisterEndpoint } from "./endpoints/RegisterEndpoint.endpoint";

export class UserRouter extends IRouter{
    constructor(){
        super();
    }
}

export default new UserRouter();


RegisterEndpoint.Register();
GetRegistryEndpoint.GetRegistry();