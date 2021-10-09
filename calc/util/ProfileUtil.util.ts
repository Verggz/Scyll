import { SkyblockProfile } from 'hypixel-api-reborn';
import client from '../../hypixel/main.hypixel';

export class ProfileUtil{
    public static async GetProfileByUsername(username:string,profile:string): Promise<SkyblockProfile | undefined>{
        var profiles = await client.getSkyblockProfiles(username).catch(e =>{
            return undefined;
        });

        if(profiles == undefined){
            return undefined;
        }

        for(var i = 0; i < profiles.length; i++){
            if(profiles[i].profileName.toLowerCase() == profile.toLowerCase()){
                return profiles[i];
            }
        }

        return profiles[0];

    }
}