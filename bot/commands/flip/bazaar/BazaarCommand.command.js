let Command = require('../../../model/Command.model');
let Discord = require('discord.js');

class BazaarCommand extends Command{
    constructor(prefix,msg){
        super(prefix,msg);

        if(this.command == "flip" && this.args[0] == "bazaar"){
            this.Bazaar();
        }
    }

    async Bazaar(){
        var curtime = Date.now();
        var backtick = "`";
        if(Command.main == true){
            var getlimit = await this.http.get("http://localhost:8080/api/v1/bot/limit?id=" + this.msg.author.id).catch(e =>{
                this.msg.reply("***The main server has crashed, please try again in a few seconds (if this continues to happen join the support server to see the current status of the bot by clicking the link on my about me)***");
            });
  
            if(getlimit.data.amount <= 0){
                var limitembed = this.CreateEmbed()
                .setTitle("**Run out of flips**")
                .setDescription("**You've run out of flips to use.**")
                .addField("**How do I get more flips?**","** do `!vote` for, up to 75 more flips.**")
                .setFooter("the flips reset every 12 hours")
                this.msg.reply({"embeds":[limitembed]});
                return;
            }    
        }

        
        var res = await this.http.get("http://localhost:8080/api/v1/nitric/bazaar/best").catch(e =>{this.msg.reply("***The main server has crashed, please try again in a few seconds (if this continues to happen join the support server to see the current status of the bot by clicking the link on my about me)***");});

        if(!res){
            this.msg.reply(new Discord.MessageEmbed()
            .setTitle("**Realtime Bazaar is Currently Unvailable**")
            .setDescription("**The realtime bazaar system is currently unavailable**")
            .setColor("#FFA500"));
            return;
        }

        if(!res.data.status){
            this.msg.reply(Discord.MessageEmbed()
            .setTitle("**Realtime Bazaar is Currently Unvailable**")
            .setDescription("**The realtime bazaar system is currently unavailable**")
            .setColor("#FFA500"));
            return;
        }

        if(res.data.status == "success"){
            
            this.msg.reply({embeds:[new Discord.MessageEmbed()
            .setTitle("**Most Profitable Flips**")
            .setColor("#FFA500")
            .addField(`${backtick}1: ${res.data.items[0].id}${backtick}`,`**Buy Order Price: **${backtick}${res.data.items[0].sellsummary[0].pricePerUnit.toFixed(1)}${backtick}\n**Sell Offer Price: **${backtick}${res.data.items[0].buysummary[0].pricePerUnit.toFixed(1)}${backtick}\n**% Margin: **${backtick}${(((res.data.items[0].buysummary[0].pricePerUnit - res.data.items[0].sellsummary[0].pricePerUnit) / res.data.items[0].sellsummary[0].pricePerUnit) * 100).toFixed(1)}%${backtick}`,true)
            .addField(`${backtick}2: ${res.data.items[1].id}${backtick}`,`**Buy Order Price: **${backtick}${res.data.items[1].sellsummary[0].pricePerUnit.toFixed(1)}${backtick}\n**Sell Offer Price: **${backtick}${res.data.items[1].buysummary[0].pricePerUnit.toFixed(1)}${backtick}\n**% Margin: **${backtick}${(((res.data.items[1].buysummary[0].pricePerUnit - res.data.items[1].sellsummary[0].pricePerUnit) / res.data.items[1].sellsummary[0].pricePerUnit) * 100).toFixed(1)}%${backtick}`,true)
            .addField(`${backtick}3: ${res.data.items[2].id}${backtick}`,`**Buy Order Price: **${backtick}${res.data.items[2].sellsummary[0].pricePerUnit.toFixed(1)}${backtick}\n**Sell Offer Price: **${backtick}${res.data.items[2].buysummary[0].pricePerUnit.toFixed(1)}${backtick}\n**% Margin: **${backtick}${(((res.data.items[2].buysummary[0].pricePerUnit - res.data.items[2].sellsummary[0].pricePerUnit) / res.data.items[2].sellsummary[0].pricePerUnit) * 100).toFixed(1)}%${backtick}`,true)
            .addField(`${backtick}4: ${res.data.items[3].id}${backtick}`,`**Buy Order Price: **${backtick}${res.data.items[3].sellsummary[0].pricePerUnit.toFixed(1)}${backtick}\n**Sell Offer Price: **${backtick}${res.data.items[3].buysummary[0].pricePerUnit.toFixed(1)}${backtick}\n**% Margin: **${backtick}${(((res.data.items[3].buysummary[0].pricePerUnit - res.data.items[3].sellsummary[0].pricePerUnit) / res.data.items[3].sellsummary[0].pricePerUnit) * 100).toFixed(1)}%${backtick}`,true)
            .addField(`${backtick}5: ${res.data.items[4].id}${backtick}`,`**Buy Order Price: **${backtick}${res.data.items[4].sellsummary[0].pricePerUnit.toFixed(1)}${backtick}\n**Sell Offer Price: **${backtick}${res.data.items[4].buysummary[0].pricePerUnit.toFixed(1)}${backtick}\n**% Margin: **${backtick}${(((res.data.items[4].buysummary[0].pricePerUnit - res.data.items[4].sellsummary[0].pricePerUnit) / res.data.items[4].sellsummary[0].pricePerUnit) * 100).toFixed(1)}%${backtick}`,true)
            .setFooter(`flipped in ${((Date.now() - curtime) / 1000).toFixed(2)}s | Nitrate Engine V1`)
            .setTimestamp()]});
        }
    }
}

module.exports = BazaarCommand;