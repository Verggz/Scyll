const Command = require("../../../model/Command.model");

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

class BinSnipeCommand extends Command{
    constructor(prefix,msg){
        super(prefix,msg);

        if(this.command == "flip" && this.args[0] == "bin" || this.command == "flip" && this.args[0] == "binsnipe" || this.command == "flip" && this.args[0] == "snipe"){
            this.BinSnipe();
        }
    }

    async BinSnipe(){
        var curtime = Date.now();
        var amount = 0;
        if(!isNaN(parseInt(this.args[1]))){
            var error = false;
            amount = parseInt(this.args[1].split(",").join(""));
            var awaitingEmbed = this.CreateEmbed()
            .setTitle("Finding Flips...")
            .setDescription("**Fetching Data from the API...(can take up to 30 seconds...)**");

            var finalMsg = await this.msg.reply({"embeds":[awaitingEmbed]});

            if(Command.main == true){
                var getlimit = await this.http.get("http://localhost:8080/api/v1/bot/limit?id=" + this.msg.author.id).catch(e =>{
                    finalMsg.edit("***The main server has crashed, please try again in a few seconds (if this continues to happen join the support server to see the current status of the bot by clicking the link on my about me)***");
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
                    finalMsg.edit({"embeds":[limitembed]}).catch(e =>{""})
                    return;
                }    
            }
            //this.msg.channel.startTyping();
            var res = await this.http.post("http://localhost:8080/api/v1/nitric/binsnipe/advise",{"profit":parseInt(amount)}).catch(e =>{
                finalMsg.edit("***The main server has crashed, please try again in a few seconds (if this continues to happen join the support server to see the current status of the bot by clicking the link on my about me)***");
                error = true;
            });
            if(error == true || !res){
                return;
            }



            if(res.data.random){
                
                if(res.data.status == "auctionclosed"){
                    var errEmbed =  this.CreateEmbed().setTitle("**Derpy is currently mayor**")
                    .setColor("#C70039")
                    .setDescription("**Auction houses are closed (unfortunately).**");

                    finalMsg.edit({"embeds":[errEmbed]});
                    return;
                }


                

                if(res.data.status == "updatingcache"){
                    var cacheEmbed = this.CreateEmbed().setTitle("**Updating Cache**")
                    .setDescription("Currently Updating Cache (getting the most recent auctions within the past 5 minutes)")
                    .setFooter("try this command again in a couple seconds");

                    this.msg.channel.send(cacheEmbed);
                }

                if(Command.main){
                    var limitflip = await this.http.post("http://localhost:8080/api/v1/bot/flip/limit",{"id":this.msg.author.id});
                    
                    var finalEmbed = this.CreateEmbed()
                    .setColor("#29B0E2")
                    .setDescription(`***Type:${this.backtick}/viewauction ${res.data.random.item.aucid}${this.backtick} on hypixel skyblock to view the auction.***`)
                    .addField("**Item**",`${this.backtick}${res.data.random.item.item}${this.backtick}`,true)
                    .addField("**BIN ID**",`${this.backtick}${res.data.random.item.aucid}${this.backtick}`)
                    .addField("**Usual Price**",`${this.backtick}${nFormatter(Math.round(res.data.random.usual.price),2)} coins${this.backtick}`,true)
                    .addField("**BIN Flip Price**",`${this.backtick}${nFormatter(Math.round(res.data.random.item.price),2)} coins${this.backtick}`,true)
                    .addField("**Profit**",`${this.backtick}${nFormatter((res.data.random.usual.price - res.data.random.item.price),2)} coins${this.backtick}`,true)
                    .setFooter(`flips left: ${limitflip.data.limit.amount} | get more flips by doing !vote or by waiting 12 hours | flipped in ${((Date.now() - curtime) / 1000).toFixed(2)}s | ${res.data.all.length} other BIN flips`);

                    finalMsg.edit({"embeds":[finalEmbed]});
                    return;
                }

                var finalEmbed = this.CreateEmbed()
                .setTitle("Found Profitable BIN Flip!")
                .setColor("#29B0E2")
                .setDescription(`***Type:${this.backtick}/viewauction ${res.data.random.item.aucid}${this.backtick} on hypixel skyblock to view the auction.***`)
                .addField("**Item**",`${this.backtick}${res.data.random.item.item}${this.backtick}`,true)
                .addField("**BIN ID**",`${this.backtick}${res.data.random.item.aucid}${this.backtick}`)
                .addField("**Usual Price**",`${this.backtick}${nFormatter(Math.round(res.data.random.usual.price),2)} coins${this.backtick}`,true)
                .addField("**BIN Flip Price**",`${this.backtick}${nFormatter(Math.round(res.data.random.item.price),2)} coins${this.backtick}`,true)
                .addField("**Profit**",`${this.backtick}${nFormatter((res.data.random.usual.price - res.data.random.item.price),2)} coins${this.backtick}`,true)
                .setFooter(`flipped in ${((Date.now() - curtime) / 1000).toFixed(2)}s | ${res.data.all.length} other BIN flips`);

                finalMsg.edit({"embeds":[finalEmbed]});


                }else{
                    if(Command.main){
                        var limitflip = await this.http.post("http://localhost:8080/api/v1/bot/flip/limit",{"id":this.msg.author.id});
                        var errorEmbed = this.CreateEmbed()
                        .setTitle("**Couldn't find any flips at this price range**")
                        .setColor("#C70039")
                        .setDescription("**Couldn't find any flips around this price range, choose a different price range or try again in a bit**")
                        .setFooter(`flips left: ${limitflip.data.limit.amount} | get more flips by doing !vote, or by waiting 12 hours`);
                        finalMsg.edit({"embeds":[errorEmbed]});
                        return;
                    }

                    var errorEmbed = this.CreateEmbed()
                    .setTitle("**Couldn't find any flips at this price range**")
                    .setColor("#C70039")
                    .setDescription("**Couldn't find any flips around this price range, choose a different price range or try again in a bit**")

                    finalMsg.edit({"embeds":[errorEmbed]});


                }
                return;
        }

        await this.msg.reply("**Do `!flip bin [amount]` instead**");

        return;
    }
}

module.exports = BinSnipeCommand;