const SlashCommand = require("../../../model/SlashCommand.model");
const Command = require('../../../model/Command.model');

function nFormatter(num, digits) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "G" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "P" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }

class AhFlipSCommand extends SlashCommand{
    constructor(interaction){
        super(interaction);

        if(this.command == "ahflip"){
            this.ahflip();
        }
    }

    async ahflip(){
        var curtime = Date.now();
        var amount = parseInt(this.interaction.options.getString("profit",true).split(",").join(""));
        await this.interaction.deferReply({ephemeral:false});
        if(Command.main == true){
            var getlimit = await this.http.get("https://projectscyll.herokuapp.com/api/v1/bot/limit?id=" + this.interaction.user.id).catch(e =>{
                this.interaction.editReply("***The main server has crashed, please try again in a few seconds (if this continues to happen join the support server to see the current status of the bot by clicking the link on my about me)***");
                return;
            });

            if(!getlimit || !getlimit.data){
                return;
            }

            if(getlimit.data.amount <= 0){
                var limitembed = this.CreateEmbed()
                .setTitle("**Run out of flips**")
                .setDescription("**You've run out of flips to use.**")
                .addField("**How do I get more flips?**","** do `!vote` for, up to 75 more flips.**")
                .setFooter("the flips reset every 12 hours")
                this.interaction.editReply({"embeds":[limitembed]});
                return;
            }    
        }

        var error = false;

        var res = await this.http.post("http://projectscyll.herokuapp.com/api/v1/nitric/auction/advise/profit/rt",{"profit":parseInt(amount)}).catch(e =>{
            this.interaction.editReply("***The main server has crashed, please try again in a few seconds (if this continues to happen join the support server to see the current status of the bot by clicking the link on my about me)***");
            error = true;
        });
        if(error == true || !res){
            return;
        }

        if(res.data.item){
                
            if(res.data.status == "auctionclosed"){
                var errEmbed =  this.CreateEmbed().setTitle("**Derpy is currently mayor**")
                .setColor("#C70039")
                .setDescription("**Auction houses are closed (unfortunately).**");

                this.interaction.editReply({"embeds":[errEmbed]});
                return;
            }
            

            if(res.data.status == "updatingcache"){
                var cacheEmbed = this.CreateEmbed().setTitle("**Updating Cache**")
                .setDescription("Currently Updating Cache (getting the most recent auctions within the past 5 minutes)")
                .setFooter("try this command again in a couple seconds");

                this.msg.channel.send(cacheEmbed);
            }

            if(Command.main){
                var limitflip = await this.http.post("https://projectscyll.herokuapp.com/api/v1/bot/flip/limit",{"id":this.interaction.user.id});
                
                var finalEmbed = this.CreateEmbed()
                .setTitle("Found Profitable Flip!")
                .setColor("#1FC150")
                .setDescription(`***Type:${this.backtick}/viewauction ${res.data.item.aucid}${this.backtick} on hypixel skyblock to view the auction.***`)
                .addField("**Item**",`${this.backtick}${res.data.item.item}${this.backtick}`,true)
                .addField("**Auction ID**",`${this.backtick}${res.data.item.aucid}${this.backtick}`)
                .addField("**Usual Price**",`${this.backtick}${nFormatter(Math.round(res.data.item.normalprice),2)} coins${this.backtick}`,true)
                .addField("**Auction Price**",`${this.backtick}${nFormatter(Math.round(res.data.item.curprice),2)} coins${this.backtick}`,true)
                .addField("**Profit**",`${this.backtick}${nFormatter(Math.round(res.data.item.profit),2)} coins${this.backtick}`,true)
                .setFooter(`flips left: ${limitflip.data.limit.amount} | get more flips by doing !vote or by waiting 12 hours | flipped in ${((Date.now() - curtime) / 1000).toFixed(2)}s`);

                this.interaction.editReply({"embeds":[finalEmbed]});
                return;
            }

            var finalEmbed = this.CreateEmbed()
            .setTitle("Found Profitable Flip!")
            .setColor("#1FC150")
            .setDescription(`***Type:${this.backtick}/viewauction ${res.data.item.aucid}${this.backtick} on hypixel skyblock to view the auction.***`)
            .addField("**Item**",`${this.backtick}${res.data.item.item}${this.backtick}`,true)
            .addField("**Auction ID**",`${this.backtick}${res.data.item.aucid}${this.backtick}`)
            .addField("**Usual Price**",`${this.backtick}${nFormatter(Math.round(res.data.item.normalprice),2)} coins${this.backtick}`,true)
            .addField("**Auction Price**",`${this.backtick}${nFormatter(Math.round(res.data.item.curprice),2)} coins${this.backtick}`,true)
            .addField("**Profit**",`${this.backtick}${nFormatter(Math.round(res.data.item.profit),2)} coins${this.backtick}`,true)
            .setFooter(`flipped in ${((Date.now() - curtime) / 1000).toFixed(2)}s`);

            this.interaction.editReply({"embeds":[finalEmbed]});


            }else{
                if(Command.main){
                    var limitflip = await this.http.post("https://projectscyll.herokuapp.com/api/v1/bot/flip/limit",{"id":this.interaction.user.id});
                    var errorEmbed = this.CreateEmbed()
                    .setTitle("**Couldn't find any flips at this price range**")
                    .setColor("#C70039")
                    .setDescription("**Couldn't find any flips around this price range, choose a different price range or try again in a bit**")
                    .setFooter(`flips left: ${limitflip.data.limit.amount} | get more flips by doing !vote, or by waiting 12 hours`);
                    this.interaction.editReply({"embeds":[errorEmbed]});
                    return;
                }

                var errorEmbed = this.CreateEmbed()
                .setTitle("**Couldn't find any flips at this price range**")
                .setColor("#C70039")
                .setDescription("**Couldn't find any flips around this price range, choose a different price range or try again in a bit**")

                this.interaction.editReply({"embeds":[errorEmbed]});


            }
    }
}

module.exports = AhFlipSCommand;