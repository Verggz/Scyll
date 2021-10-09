const Command = require("../../model/Command.model");

class WeightCommand extends Command{
    constructor(prefix,msg){
        super(prefix,msg);

        if(this.command == "weight"){
            if(this.args[0]){
                this.Weight();
            }else{
                this.msg.reply("***Please specify the username and profile by doing `!weight [username] [profile]`***");
            }
        }

    }

    async Weight(){
        var res = await this.http.get(`https://projectscyll.herokuapp.com/api/v1/bot/weight/${this.args[0]}/${this.args[1]}`);

        if(res.data.status == "success"){
            var embed = this.CreateEmbed()
            .setTitle(`**${this.args[0]}'s ${res.data.profile} Profile**`)
            .setColor("#8A2BE2")
            .setDescription(`**Total Weight:⚖️${this.backtick}${res.data.weight.total.toFixed(1)}${this.backtick}**`)
            
            if(res.data.weight.skillapi == false){
                embed.addField("**Skill Weight**","**The Skills API for this profile is currently disabled**",true)
                
            }else{
                embed.addField(`**⏳Skill Weight: ${this.backtick}${res.data.weight.skill.toFixed(1)}${this.backtick}**`,
                `\n**Alchemy: ${this.backtick}${res.data.weight.alchemy.toFixed(1)} weight${this.backtick}**\n` +
                `**Combat: ${this.backtick}${res.data.weight.combat.toFixed(1)} weight${this.backtick}**\n` + 
                `**Enchanting: ${this.backtick}${res.data.weight.enchanting.toFixed(1)} weight${this.backtick}**\n` +
                `**Farming: ${this.backtick}${res.data.weight.farming.toFixed(1)} weight${this.backtick}**\n` +
                `**Fishing: ${this.backtick}${res.data.weight.fishing.toFixed(1)} weight${this.backtick}**\n` +
                `**Foraging: ${this.backtick}${res.data.weight.foraging.toFixed(1)} weight${this.backtick}**\n` +
                `**Mining: ${this.backtick}${res.data.weight.mining.toFixed(1)} weight${this.backtick}**\n` +
                `**Taming: ${this.backtick}${res.data.weight.taming.toFixed(1)} weight${this.backtick}**\n`,true);
            }

            embed.addField(`**⚔️Slayer Weight: ${this.backtick}${res.data.weight.slayer.toFixed(1)}${this.backtick}**`,
            `\n**Revenant: ${this.backtick}${res.data.weight.rev.toFixed(1)} weight${this.backtick}**\n` +
            `**Tarantula: ${this.backtick}${res.data.weight.tara.toFixed(1)} weight${this.backtick}**\n` +
            `**Sven: ${this.backtick}${res.data.weight.sven.toFixed(1)} weight${this.backtick}**\n`,true);

            embed.addField(`**🚪Dungeon Weight: ${this.backtick}${res.data.weight.dungeon.toFixed(1)}${this.backtick}**`,
            `**Dungeon XP: ${this.backtick}${res.data.weight.cata.toFixed(1)}${this.backtick}**\n` +
            `**Classes: ${this.backtick}${res.data.weight.class.toFixed(1)}${this.backtick}**`,true);

            this.msg.reply({embeds:[embed]});
        }else{
            var errEmbed = this.CreateEmbed()
            .setTitle("**Couldn't find Profile**")
            .setColor(this.red)
            .setDescription("**The username or profile doesn't exist");

            this.msg.reply({embeds:[errEmbed]});
        }
    }
}

module.exports = WeightCommand;