import { IRouter } from "../IRouter.router";
import { DownloadModEndpoint } from "./endpoints/DownloadMod.endpoint";
import { GetKeyEndpoint } from "./endpoints/GetKey.endpoint";
import { GetSettingsEndpoint } from "./endpoints/GetSettings.endpoint";
import { SetSettingsEndpoint } from "./endpoints/SetSettings.endpoint";
import { VerifyKeyEndpoint } from "./endpoints/VerifyKey.endpoint";

class ModRouter extends IRouter{
    constructor(){
        super();
    }
}

export default new ModRouter();

DownloadModEndpoint.DownloadMod();
VerifyKeyEndpoint.VerifyKey();
SetSettingsEndpoint.SetSettings();
GetSettingsEndpoint.GetSettings();
GetKeyEndpoint.GetKey();