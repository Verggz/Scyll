import { SkyblockProfile } from "hypixel-api-reborn";
import { ProfileUtil } from "../util/ProfileUtil.util";

export interface PlayerWeight{
    mining:number;
    foraging:number;
    enchanting:number;
    farming:number;
    combat:number;
    fishing:number;
    alchemy:number;
    taming:number;
    skill:number;
    skillapi:boolean;

    rev:number;
    tara:number;
    sven:number;
    void:number;
    slayer:number;
    slayerapi:boolean;

    cata:number;
    class:number;
    dungeon:number;
    dungeonapi:boolean;

    total: number;

}

export class WeightCalculator{
    public static async CalculateWeightByProfile(username:string,profile:string){
        var mainprofile: SkyblockProfile | undefined = await ProfileUtil.GetProfileByUsername(username,profile);
        var weight: PlayerWeight = {"alchemy":0,"cata":0,"class":0,"combat":0,"enchanting":0,"farming":0,"fishing":0,"foraging":0,"mining":0,"rev":0,"sven":0,"taming":0,"tara":0,"void":0,"total":0,"skill":0,"slayer":0,"dungeon":0,"dungeonapi":true,"skillapi":true,"slayerapi":true};

        if(mainprofile == undefined){
            return "noprofile";
        }
        if(mainprofile.me.skills){
            weight.mining = (mainprofile.me.skills.mining.level*10)**(1.64207448+mainprofile.me.skills.mining.level/100) / 1250;
            weight.foraging = (mainprofile.me.skills.foraging.level *10)**(1.732826+mainprofile.me.skills.foraging.level/100) / 1250;
            weight.enchanting = (mainprofile.me.skills.enchanting.level*10)**(1.46976583+mainprofile.me.skills.enchanting.level/100) / 1250;
            weight.farming =  (mainprofile.me.skills.farming.level*10)**(1.717848139+mainprofile.me.skills.farming.level/100) / 1250;
            weight.combat = (mainprofile.me.skills.combat.level*10)**(1.65797687265+mainprofile.me.skills.combat.level/100) / 1250;
            weight.fishing = (mainprofile.me.skills.fishing.level*10)^(1.906418+mainprofile.me.skills.fishing.level/100) / 1250;
            weight.alchemy = (mainprofile.me.skills.alchemy.level*10)^(1.5+mainprofile.me.skills.alchemy.level/100) / 1250;
            weight.taming = (mainprofile.me.skills.taming.level*10)^(1.64744+mainprofile.me.skills.taming.level/100) / 1250;

            weight.skill = weight.mining + weight.foraging + weight.enchanting + weight.farming + weight.combat + weight.fishing + weight.alchemy + weight.taming;
        }else{
            weight.skillapi = false;
        }
        
        //slayer weight
        if(mainprofile.me.slayer){
            weight.rev = mainprofile.me.slayer.zombie.xp / 2208;
            weight.tara = mainprofile.me.slayer.spider.xp / 2118;
            weight.sven = mainprofile.me.slayer.wolf.xp /1962;
            
            weight.slayer = weight.rev + weight.tara + weight.sven;
        }else{
            weight.slayerapi = false;
        }

        //dungeon weight
        if(mainprofile.me.dungeons){
            weight.cata = mainprofile.me.dungeons.types.catacombs.level ** 4.5 * 0.0002149604615;
            weight.class = (mainprofile.me.dungeons.classes.archer.level ** 4.5 *  0.0000045254834) + (mainprofile.me.dungeons.classes.berserk.level ** 4.5 * 0.0000045254834) + (mainprofile.me.dungeons.classes.healer.level ** 4.5 *  0.0000045254834) + (mainprofile.me.dungeons.classes.mage.level ** 4.5 *  0.0000045254834) + (mainprofile.me.dungeons.classes.tank.level ** 4.5 *  0.0000045254834);

            weight.dungeon = weight.cata + weight.class;
        }else{
            weight.dungeonapi = false;
        }

        weight.total = weight.skill + weight.slayer + weight.dungeon;

        return {"status": "success","profile":mainprofile.profileName,"username":mainprofile.me.player?.nickname,"weight":weight};
    }
}