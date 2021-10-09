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

class MarginBookFlipCommand extends Command{
    constructor(prefix,msg){
        super(prefix,msg);

        if(this.command == "flip" && this.args[0] == "book"){
            this.MarginBookFlip();
        }
    }

    async MarginBookFlip(){
        if(Command.main == true){
          var getlimit = await this.http.get("http://localhost:8080/api/v1/bot/limit?id=" + this.msg.author.id).catch(e =>{
            this.msg.reply("***The main server has crashed, please try again in a few seconds (if this continues to happen join the support server to see the current status of the bot by clicking the link on my about me)***");
            return;
        });
          if(!getlimit || !getlimit.data){
            return;
          }

          if(getlimit.data.amount <= 0){
              var limitembed = this.CreateEmbed()
              .setTitle("**Run out of flips**")
              .setDescription("**You've run out of flips to use.**")
              .addField("**How do I get more flips?**","** do `!vote` for, up to 75 more flips**")
              .setFooter("the flips reset every 12 hours")
              this.msg.reply({"embeds":[limitembed]});
              return;
          }    
        }
        var res = await this.http.post("http://localhost:8080/api/v1/nitric/book/advise/margin").catch(e =>{
          this.msg.reply("***The main server has crashed, please try again in a few seconds (if this continues to happen join the support server to see the current status of the bot by clicking the link on my about me)***");
          return;
      });

      if(!res){
        return;
      }

        if(res.data.status == "success"){
          if(Command.main){
            var limitflip = await this.http.post("https://projectscyll.herokuapp.com/api/v1/bot/flip/limit",{"id":this.msg.author.id});
            var embed = this.CreateEmbed()
            .setTitle("**Top 5 Book Flips (By Margin)**")
            .setColor("#32CD32")
            .addField(`**1#**${this.backtick}${res.data.books[0].book} (${res.data.books[0].margin}%)${this.backtick}`,`**LVL 5 book: **${this.backtick}${nFormatter(res.data.books[0].lvl5price,2)} coins${this.backtick}\n**Profit: **${this.backtick}${nFormatter(res.data.books[0].lvl5price - res.data.books[0].totalcraftprice,2)} coins${this.backtick}\n**Craft price: **${this.backtick}${nFormatter(res.data.books[0].totalcraftprice)} coins${this.backtick}`,true)
            .addField(`**2#**${this.backtick}${res.data.books[1].book} (${res.data.books[1].margin}%)${this.backtick}`,`**LVL 5 book: **${this.backtick}${nFormatter(res.data.books[1].lvl5price,2)} coins${this.backtick}\n**Profit: **${this.backtick}${nFormatter(res.data.books[1].lvl5price - res.data.books[1].totalcraftprice,2)} coins${this.backtick}\n**Craft price: **${this.backtick}${nFormatter(res.data.books[1].totalcraftprice)} coins${this.backtick}`,true)
            .addField(`**3#**${this.backtick}${res.data.books[2].book} (${res.data.books[2].margin}%)${this.backtick}`,`**LVL 5 book: **${this.backtick}${nFormatter(res.data.books[2].lvl5price,2)} coins${this.backtick}\n**Profit: **${this.backtick}${nFormatter(res.data.books[2].lvl5price - res.data.books[2].totalcraftprice,2)} coins${this.backtick}\n**Craft price: **${this.backtick}${nFormatter(res.data.books[2].totalcraftprice)} coins${this.backtick}`,true)
            .addField(`**4#**${this.backtick}${res.data.books[3].book} (${res.data.books[3].margin}%)${this.backtick}`,`**LVL 5 book: **${this.backtick}${nFormatter(res.data.books[3].lvl5price,2)} coins${this.backtick}\n**Profit: **${this.backtick}${nFormatter(res.data.books[3].lvl5price - res.data.books[3].totalcraftprice,2)} coins${this.backtick}\n**Craft price: **${this.backtick}${nFormatter(res.data.books[3].totalcraftprice)} coins${this.backtick}`,true)
            .addField(`**5#**${this.backtick}${res.data.books[4].book} (${res.data.books[4].margin}%)${this.backtick}`,`**LVL 5 book: **${this.backtick}${nFormatter(res.data.books[4].lvl5price,2)} coins${this.backtick}\n**Profit: **${this.backtick}${nFormatter(res.data.books[4].lvl5price - res.data.books[4].totalcraftprice,2)} coins${this.backtick}\n**Craft price: **${this.backtick}${nFormatter(res.data.books[4].totalcraftprice)} coins${this.backtick}`,true)
            .setFooter(`flips left: ${limitflip.data.limit.amount}`);

            this.msg.reply({"embeds":[embed]});
            return;
          }

          var embed = this.CreateEmbed()
          .setTitle("**Top 5 Book Flips (By Margin)**")
          .setColor("#32CD32")
          .addField(`**1#**${this.backtick}${res.data.books[0].book} (${res.data.books[0].margin}%)${this.backtick}`,`**LVL 5 book: **${this.backtick}${nFormatter(res.data.books[0].lvl5price,2)} coins${this.backtick}\n**Profit: **${this.backtick}${nFormatter(res.data.books[0].lvl5price - res.data.books[0].totalcraftprice,2)} coins${this.backtick}\n**Craft price: **${this.backtick}${nFormatter(res.data.books[0].totalcraftprice)} coins${this.backtick}`,true)
          .addField(`**2#**${this.backtick}${res.data.books[1].book} (${res.data.books[1].margin}%)${this.backtick}`,`**LVL 5 book: **${this.backtick}${nFormatter(res.data.books[1].lvl5price,2)} coins${this.backtick}\n**Profit: **${this.backtick}${nFormatter(res.data.books[1].lvl5price - res.data.books[1].totalcraftprice,2)} coins${this.backtick}\n**Craft price: **${this.backtick}${nFormatter(res.data.books[1].totalcraftprice)} coins${this.backtick}`,true)
          .addField(`**3#**${this.backtick}${res.data.books[2].book} (${res.data.books[2].margin}%)${this.backtick}`,`**LVL 5 book: **${this.backtick}${nFormatter(res.data.books[2].lvl5price,2)} coins${this.backtick}\n**Profit: **${this.backtick}${nFormatter(res.data.books[2].lvl5price - res.data.books[2].totalcraftprice,2)} coins${this.backtick}\n**Craft price: **${this.backtick}${nFormatter(res.data.books[2].totalcraftprice)} coins${this.backtick}`,true)
          .addField(`**4#**${this.backtick}${res.data.books[3].book} (${res.data.books[3].margin}%)${this.backtick}`,`**LVL 5 book: **${this.backtick}${nFormatter(res.data.books[3].lvl5price,2)} coins${this.backtick}\n**Profit: **${this.backtick}${nFormatter(res.data.books[3].lvl5price - res.data.books[3].totalcraftprice,2)} coins${this.backtick}\n**Craft price: **${this.backtick}${nFormatter(res.data.books[3].totalcraftprice)} coins${this.backtick}`,true)
          .addField(`**5#**${this.backtick}${res.data.books[4].book} (${res.data.books[4].margin}%)${this.backtick}`,`**LVL 5 book: **${this.backtick}${nFormatter(res.data.books[4].lvl5price,2)} coins${this.backtick}\n**Profit: **${this.backtick}${nFormatter(res.data.books[4].lvl5price - res.data.books[4].totalcraftprice,2)} coins${this.backtick}\n**Craft price: **${this.backtick}${nFormatter(res.data.books[4].totalcraftprice)} coins${this.backtick}`,true);

          this.msg.reply({"embeds":[embed]});

        }
    }
}

module.exports = MarginBookFlipCommand;