const Command = require("../model/Command.model");

class HelpCommand extends Command{
    constructor(prefix,msg){
        super(prefix,msg);

        if(this.command == "help"){
            this.MainHelp();
        }
    }

    async MainHelp(){
        var embed = this.CreateEmbed()
        .setTitle("Project Scyll Help")
        .setColor("#29B0E2")
        .setDescription("***[Invite the bot to your own server!](https://discord.com/oauth2/authorize?client_id=876833943192764507&permissions=2147748864&scope=bot%20applications.commands)***")
        .addField("`!flip ah, [amount]`","**finds the best flip on auction, based on the amount of profit you would like to make**",true)
        .addField("`!flip bin [amount]`","**finds the best BIN snipe on auction, based on the amount of profit you would like to make**",true)
        .addField("`!flip bazaar`","**finds the 5 best bazaar items, based on the %margin**",true)
        .addField("`!flip book`","**finds the 5 best books to flip by the margin**",true)
        .addField("`!flip craft lowest`","**calculates the craft price of the item compared to the the lowest BIN**",true)
        .addField("`!flip manip [item] [start price] [end price]`","**finds the amount of items needed to be bought to buy the item that is 75% more expensive than the start price**",true)
        .addField("`!find days [bazaar item] [start date] [end date]`","**gets the buy price and sell price of the bazaar item within the specified days (Uses the format d-m-y)**",true);

        this.msg.reply({'embeds':[embed]});
    }
}

module.exports = HelpCommand;