const Command = require("../../../model/Command.model");

function nFormatter(num, digits) {
    const lookup = [
      { value: 1, symbol: "" },
      { value: 1e3, symbol: "k" },
      { value: 1e6, symbol: "M" },
      { value: 1e9, symbol: "B" },
      { value: 1e12, symbol: "T" },
      { value: 1e15, symbol: "Q" },
      { value: 1e18, symbol: "E" }
    ];
    const rx = /\.0+$|(\.[0-9]*[1-9])0+$/;
    var item = lookup.slice().reverse().find(function(item) {
      return num >= item.value;
    });
    return item ? (num / item.value).toFixed(digits).replace(rx, "$1") + item.symbol : "0";
  }

class MarketMainpulationCommand extends Command{
    constructor(prefix,msg){
        super(prefix,msg);

        if(this.command == "flip" && this.args[0] == "manip" || this.command == "flip" && this.args[0] == "manipulation"){
            //this.msg.channel.send("**This command is currently disabled, please try again later**");
            this.MarketManipulation();
        }
    }

    async MarketManipulation(){

        if(Command.main == true){
            var getlimit = await this.http.get("http://localhost:8080/api/v1/bot/limit?id=" + this.msg.author.id);
  
            if(getlimit.data.amount <= 0){
                var limitembed = this.CreateEmbed()
                .setTitle("**Run out of flips**")
                .setDescription("**You've run out of flips to use.**")
                .addField("**How do I get more flips?**","** do `!vote` for, up to 100 more flips or [join our server for unlimited flips](https://discord.gg/NHSTtG6GrS)**")
                .setFooter("the flips reset every 12 hours")
                this.msg.reply({"embeds":[limitembed]});
                return;
            }   
        }


        var itemstr = "";
        var indexes = [];
        if(!isNaN(parseInt(this.args[1]))){
            this.msg.reply("***Please specify an item first, not a price***");
            return;
        }

       for(var i = 0; i < this.args.length; i++){
           if(i == 0){
               continue;
           }

           if(!isNaN(this.args[i])){
               indexes.push(i);
               
           }else{
               itemstr += this.args[i] + " ";
           }

           
       }

       if(indexes.length !== 2){
        this.msg.reply("***Please enter a start and end price***");
       }

       if(indexes.length === 2){
           let time = Date.now();
           var awaitingEmbed = this.CreateEmbed()
           .setTitle("Finding Flips...")
           .setDescription("**Fetching Data from the API...(can take up to 30 seconds...)**");
            
           var awaitingMsg = await this.msg.reply({embeds:[awaitingEmbed]});
           var res = await this.http.post('http://localhost:8080/api/v1/nitric/manip/advise/',{'startprice':parseInt(this.args[indexes[0]]),"endprice":parseInt(this.args[indexes[1]]),'item': itemstr,"margin":false}).catch(e =>{
            awaitingMsg.edit("***The main server has crashed, please try again in a few seconds (if this continues to happen join the support server to see the current status of the bot by clicking the link on my about me)***");
           });


           if(!res.data.price){
               var errembed = this.CreateEmbed()
               .setTitle("**Couldn't get manip**")
               .setColor("#C70039")
               .setDescription("**Your start price is too low or we couldn't find an item that was 75% higher than your start price (the margin).**")
               
                awaitingMsg.edit({embeds:[errembed]});
               return;
           }


           if(res.data.status == "success"){
               console.log(res.data);
               if(res.data.price == "tooclose"){
                   this.msg.reply("**The item at the start price is the same as the item at the end price**");
                   return;
               }

               if(res.data.price == "starthigherthanend"){
                    this.msg.reply("**The start price is higher than the end price**");
                    return;
               }

               if(res.data.price == "invaliditem"){
                   this.msg.reply("**The item you inputted doesn't exist**");
               }

                var finalembed = this.CreateEmbed()
                .setTitle("**Market Manip: " + itemstr + "**")
                .setColor(this.gold)
                .setDescription(`**Found market manip!\n\nAmount of items required to buy: ${this.backtick}${res.data.price.amountofitems} ${itemstr}${this.backtick}**`,true)
                .addField("**Starting item**", `${this.backtick}${nFormatter(res.data.price.itemstobuy[0])} coins${this.backtick}`,true)
                .addField("**Cost for all items (to the final item)**",`${this.backtick}${nFormatter(res.data.price.totalcost,2)} coins${this.backtick}`,true)
                .addField("**Final item cost**",`${this.backtick}${nFormatter(res.data.price.itemstobuy[res.data.price.itemstobuy.length - 1])} coins${this.backtick}`,true)
                .addField("**Potential Profit**",`${this.backtick}${nFormatter(res.data.price.profit,2)} coins${this.backtick}`,true)

                .setFooter(`flipped in ${((Date.now() - time) / 1000).toFixed(2)}s | Nitrate Engine V1`)

                awaitingMsg.edit({embeds:[finalembed]});
           }
       }
        
    }
}

module.exports = MarketMainpulationCommand;