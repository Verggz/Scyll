let Command = require('../../../model/Command.model');

var characters = {
    1:"1️⃣",
    2:"2️⃣",
    3:"3️⃣",
    4:"4️⃣"
}

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

class CraftFlipCommand extends Command{
    constructor(prefix,msg){
        super(prefix,msg);
        console.log(this.command);
        if(this.command == "flip"){
            if(!this.args[0]){
                this.msg.channel.send("***Please specify the type of flip that you would like to do (You can find the different types by doing !flip)***");
                return;
            }

            if(this.args[0] == "craft"){
                this.CraftFlip();
            }
            

        }
    }

    async CraftFlip(){
        var item = [];

        if(!this.args[1]){
            this.msg.reply("***Please specify an item to craft flip***");
            return;
        }

        for(var i = 1; i < this.args.length; i++){
            
            item.push(this.args[i]);
        }

        var actualitem = item.join(" ");

        var awaitingEmbed = this.CreateEmbed()
        .setTitle("Finding Flips...")
        .setDescription("**Fetching Data from the API...(can take up to 30 seconds...)**");

        var awaitingMsg = await this.msg.reply({'embeds':[awaitingEmbed]});

        var res = await this.http.post("http://localhost:8080/api/v1/nitric/flip/craft",{"item":actualitem}).catch(e =>{
            awaitingMsg.edit("***An error has occurred, please try again later***");
            return;
        });

        if(!res || !res.data){
            return;
        }

        if(res.data.status == "success"){
            var finalEmbed = this.CreateEmbed().setFooter("Keep in mind that these are ESTIMATES based on the lowest BIN and buy orders of the items. you make more or less money from the price depicted.");
            if(res.data.finalitem.profit > 0){
                finalEmbed
                .setTitle("**Successful Craft Flip!**")
                .setColor("#1FC150");
            }else{
                finalEmbed
                .setTitle("**Unsuccessful Craft Flip!**")
                .setColor("#C70039")
            }

            finalEmbed.addField(`**Current Lowest cost of ${this.backtick}${res.data.finalitem.name}${this.backtick}** on BIN`,`**${nFormatter(res.data.finalitem.price,2)}**`,true);
            finalEmbed.addField(`**Cost to craft ${this.backtick}${res.data.finalitem.name}${this.backtick}**`,`**${nFormatter(res.data.finalitem.totalcost,2)}**`,true)
            finalEmbed.addField(`**Total Profit**`,`**${nFormatter(res.data.finalitem.profit,2)}**`,true)
            finalEmbed.addField("**Materials required to craft**","***The list of required materials to craft the item***")

            for(var i = 0; i < res.data.finalitem.materials.length; i++){
                finalEmbed.addField(`**${res.data.finalitem.materials[i].name}**`,`**Amount required:** ${this.backtick}${res.data.finalitem.materials[i].amount}${this.backtick}\n**Total cost:** ${this.backtick}${nFormatter(res.data.finalitem.materials[i].price,2)}${this.backtick}`,true);
            }

            awaitingMsg.edit({embeds:[finalEmbed]});

            
        }else{
            var errEmbed = this.CreateEmbed()
            .setTitle("**Couldn't find craft flip**")
            .setColor(this.red)
            .setDescription("**The item either doesn't exist or cannot be crafted**");

            awaitingMsg.edit({embeds:[errEmbed]})
        }
    }

    async LowestCraftFlip(){
        var confirmed = false;
        var item = "";
        var confirmEmbed = this.CreateEmbed().setTitle("**Write below the type of item you would like to craft**")
        .setColor(this.gold = "#d4af37")
        .setDescription("**If you would like to choose an armor piece, write the armor set here instead. e.g. if you would like to craft flip necron's boots, type necron's armor here.\n\nYou can also put the [hypixel skyblock wiki](https://hypixel-skyblock.fandom.com/wiki/) url of the item, instead of the name.\n (In fact, some items, such as The [Flower of Truth](https://hypixel-skyblock.fandom.com/wiki/Flower_of_Truth) currently require you to put the url in instead of the name.) **")
        .setFooter("you can cancel this at anytime by typing cancel");

        this.msg.reply(confirmEmbed);
        var result = await this.msg.channel.awaitMessages((c) =>{
            if(c.author.id == this.msg.author.id){
                if(c.content.toLowerCase() == "cancel"){
                    this.msg.reply("**Stopped finding a craft flip**");
                    return true;
                    
                }else if(c.content.toLowerCase().includes("minion")){
                    this.msg.reply("**We currently don't support craft flipping minions**");
                    return true;
                }else{
                    item = c.content;
                    confirmed = true;
                    return true;
                }
            }else{
                return false;
            }
        },{"max":1,"idle":60000});

        if(confirmed == true){
            var recipe = null;
            this.msg.channel.startTyping();
            if(item.includes("https://hypixel-skyblock.fandom.com/")){
                recipe = await this.http.get('http://localhost:8080/api/v1/nitric/recipe/get?url=' + item).catch(e =>{this.msg.channel.send("***The server took to long to respond. try again in a bit***")});
            }else{
                recipe = await this.http.get('http://localhost:8080/api/v1/nitric/recipe/get?name=' + item).catch(e =>{this.msg.channel.send("***The server took to long to respond. try again in a bit***")});
            }

            if(!recipe){
                return;
            }
            
            this.msg.channel.stopTyping();
            if(!recipe.data){
                return;
            }
            if(recipe.data.status == "success"){
                if(recipe.data.recipe.length == undefined || recipe.data.recipe.length == 0){
                    //this.msg.channel.startTyping();
                    var awaitingApiEmbed = this.CreateEmbed()
                    .setDescription("**Fetching Data from the API...(can take up to 20 seconds...)**");
                    var awaitingApiMsg = await this.msg.channel.send(awaitingApiEmbed);

                    var res = await this.http.post("http://localhost:8080/api/v1/nitric/craft/lowest",{"index":false,"recipe":recipe.data.recipe,"amountOfStars":0}).catch(e =>{
                        awaitingApiMsg.edit("***The server took too long to respond, please try again later.***");
                    });
                    this.msg.channel.stopTyping(true);
                    if(!res){
                        return;
                    }
                    if(!res.data){
                        return;
                    }
                    
                    var finalEmbed = this.CreateEmbed().setFooter("Keep in mind that these are ESTIMATES based on the lowest BIN of the items. you make more or less money from the price depicted.");
                    if(res.data.flip == true){
                        finalEmbed.setTitle("**Successful Craft Flip!**")
                        .setColor("#1FC150")
                        
                    }else{
                        finalEmbed.setTitle("**Unsuccessful Craft Flip**")
                        .setColor("#C70039")
                    }
                    finalEmbed.addField(`**Current Lowest cost of ${this.backtick}${res.data.finalitem.name}${this.backtick}** on BIN`,`**${nFormatter(res.data.itemcost,2)}**`,true);
                    finalEmbed.addField(`**Cost to craft ${this.backtick}${res.data.finalitem.name}${this.backtick}**`,`**${nFormatter(res.data.matcost,2)}**`,true)
                    finalEmbed.addField(`**Total Profit**`,`**${nFormatter(res.data.profit,2)}**`,true)
                    finalEmbed.addField("**Materials required to craft**","***The list of required materials to craft the item***")
                    
                    for(var i = 0; i < res.data.items.length; i++){
                        finalEmbed.addField(`**${res.data.items[i].item}**`,`**Amount required:** ${this.backtick}${res.data.items[i].amount}${this.backtick}\n**Cost for one:** ${this.backtick}${nFormatter(res.data.items[i].costfor1,2)}${this.backtick}\n**Total cost:** ${this.backtick}${nFormatter(res.data.items[i].totalcost,2)}${this.backtick}`,true);
                    }
                    
                    awaitingApiMsg.edit(finalEmbed);
                }else{
                    var pieceStr = "";
                    
                    for(var i = 0; i < recipe.data.recipe.length; i++){
                        pieceStr += `**${i + 1}: **${this.backtick}${recipe.data.recipe[i].finalItem.name}${this.backtick} \n`;
                    }
                    var choiceEmbed = this.CreateEmbed()
                    .setTitle("**Choose what piece you would like to flip**")
                    .setColor("#0096FF")
                    .setDescription(pieceStr);

                    var choiceMsg = await this.msg.channel.send(choiceEmbed);
                    for(var i = 1; i <= recipe.data.recipe.length; i++){
                        await choiceMsg.react(characters[i]);
                    }
                    var index = 0;
                    await choiceMsg.awaitReactions((reaction,user) =>{
                        if(user.id == this.msg.author.id){
                            if(reaction.emoji.name == characters[1]){
                                index = 0;
                                return true;
                            }else if(reaction.emoji.name == characters[2]){
                                index = 1;
                                return true;
                            }else if(reaction.emoji.name == characters[3]){
                                index = 2;

                                return true;
                            }else if(reaction.emoji.name == characters[4]){
                                index = 3;

                                return true;
                            }else{
                                return false;
                            }
                        }

                    },{"max":1,"idle":60000});
                    this.msg.channel.startTyping();
                    var awaitingApiEmbed = this.CreateEmbed()
                    .setDescription("**Fetching Data from the API...(can take up to 20 seconds...)**");
                    var awaitingApiMsg = await this.msg.channel.send(awaitingApiEmbed);

                    var res = await this.http.post("http://localhost:8080/api/v1/nitric/craft/lowest",{"index":index,"recipe":recipe.data.recipe,"amountOfStars":0}).catch(e =>{console.log(e)});
                    
                    console.log("data",res);

                    if(!res.data || res.data == ""){
                        this.msg.channel.send("**There was an error in finding this flip, please try again later**");
                        this.msg.channel.stopTyping(true);
                        return;
                        
                    }

                    var finalEmbed = this.CreateEmbed();
                    if(res.data.flip == true){
                        finalEmbed.setTitle("**Successful Craft Flip!**")
                        .setColor("#1FC150")
                        
                    }else{
                        finalEmbed.setTitle("**Unsuccessful Craft Flip**")
                        .setColor("#C70039")
                    }
                    
                    finalEmbed.addField(`**Current Lowest cost of ${this.backtick}${res.data.finalitem.name}${this.backtick}** on BIN`,`**${nFormatter(res.data.itemcost,2)}**`,true);
                    finalEmbed.addField(`**Cost to craft ${this.backtick}${res.data.finalitem.name}${this.backtick}**`,`**${nFormatter(res.data.matcost,2)}**`,true)
                    finalEmbed.addField(`**Total Profit**`,`**${nFormatter(res.data.profit,2)}**`,true)
                    finalEmbed.addField("**Materials required to craft**","***The list of required materials to craft the item***")
                    
                    for(var i = 0; i < res.data.items.length; i++){
                        finalEmbed.addField(`**${res.data.items[i].item}**`,`**Amount required:** ${this.backtick}${res.data.items[i].amount}${this.backtick}\n**Cost for one:** ${this.backtick}${nFormatter(res.data.items[i].costfor1,2)}${this.backtick}\n**Total cost:** ${this.backtick}${nFormatter(res.data.items[i].totalcost,2)}${this.backtick}`,true);
                    }
                    awaitingApiMsg.edit(finalEmbed);
                    this.msg.channel.stopTyping(true);
                }
            }else if(recipe.data.status == "unavailable"){
                this.msg.channel.send("***Pet items are currently unable to be flipped (Im applying a fix for this later on)***")
            }else if(recipe.data.status == "invaliditem"){
                this.msg.channel.send("***The item you entered was invalid or there is no crafting recipe for that item.\n`(for armor sets, make sure that you add an ' for the first word, such as necron's armor or storm's armor)`***")
            }
        }else{
            return;
        }
        
        //var res = await this.http.get('https://projecthyperionapi.herokuapp.com/api/v1/lithium/recipe/get');
    }

    async AverageCraftFlip(){

    }

}

module.exports = CraftFlipCommand;