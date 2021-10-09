const Command = require("../model/Command.model");

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

class StatsCommand extends Command{
    constructor(prefix,msg){
        super(prefix,msg);

        if(this.command == "stats"){
            this.Stats();
        }
    }
    
    async Stats(){
        var res = await this.http.get("http://localhost:8080/api/v1/bot/server/stats");

        var embed = this.CreateEmbed()
        .setTitle("**Current Bot Stats**")
        .setColor(this.gold)
        .addField("**Current version**",`${this.backtick}${res.data.version}${this.backtick}`,true)
        .addField("**Total flips done**",`${this.backtick}${nFormatter(res.data.totalflips,2)} flips${this.backtick}`,true)
        .addField("**Total profit**",`${this.backtick}${nFormatter(res.data.totalprofit,2)} coins${this.backtick}`,true);

        this.msg.reply({'embeds':[embed]});
    }
}

module.exports = StatsCommand;