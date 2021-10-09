const SlashCommand = require("../../../model/SlashCommand.model");

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

class BinSnipeSCommand extends SlashCommand{
    constructor(interaction){
        super(interaction);

        if(this.command == "binsnipe"){
            this.BinSnipe();
        }
    }

    async BinSnipe(){
        var curtime = Date.now();
        var amount = parseInt(this.interaction.options.getString("profit",true).split(",").join(""));
        await this.interaction.deferReply();
        var origin = this;

        if(Command.main == true){
            var getlimit = await this.http.get("https://projectscyll.herokuapp.com/api/v1/bot/limit?id=" + this.msg.author.id).catch(e =>{
                origin.editReply("***The main server has crashed, please try again in a few seconds (if this continues to happen join the support server to see the current status of the bot by clicking the link on my about me)***");
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
                this.interaction.editReply({"embeds":[limitembed]}).catch(e =>{""})
                return;
            } 
        }


        
    }
}

module.exports = BinSnipeSCommand;