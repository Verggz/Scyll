let SlashCommand = require('../../model/SlashCommand.model');

class HelpSCommand extends SlashCommand{
    constructor(interaction){
        super(interaction);

        if(this.command == "help"){
            this.Help();
        }
    }

    async Help(){
        var embed = this.CreateEmbed()
        .setTitle("Project Scyll Help")
        .setColor("29B0E2")
        .setDescription("***[Join the server for more info about the bot](https://discord.gg/NHSTtG6GrS)***")
        .addField("`!flip ah`","**finds the best flip on auction, based on the amount of profit you would like to make**",true)
        .addField("`!flip bazaar`","**finds the 5 best bazaar items, based on the %margin**",true)
        .addField("`!flip book`","**finds the 5 best books to flip by the margin**",true)
        .addField("`!flip craft lowest`","**calculates the craft price of the item compared to the the lowest BIN**",true)
        .addField("`!flip manip [item] [start price of item]`","**finds the amount of items needed to be bought to buy the item that is 75% more expensive than the start price**",true)
        .addField("`!find days [bazaar item] [start date] [end date]`","**gets the buy price and sell price of the bazaar item within the specified days (Uses the format d-m-y)**",true);

        this.interaction.reply({embeds:[embed]});
    }
}

module.exports = HelpSCommand;