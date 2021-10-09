const Command = require("../model/Command.model");

class VoteCommand extends Command{
    constructor(prefix,msg){
        super(prefix,msg);

        if(this.command == "vote"){
            this.Vote();
        }
    }

    async Vote(){
        var embed = this.CreateEmbed()
        .setTitle("**Vote for Project Scyll**")
        .setColor("#93CCEA")
        .setDescription("***Vote for project scyll for an extra 50 flips every 12 hours!***")
        .addField("**TopGG**",`**[Click Here](https://top.gg/bot/876833943192764507/vote)**`)

        this.msg.reply({"embeds":[embed]});
    }
}

module.exports = VoteCommand;