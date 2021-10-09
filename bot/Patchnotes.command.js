const Command = require("./model/Command.model");

class PatchNotesCommand extends Command{
    constructor(prefix,msg){
        super(prefix,msg);
        
        if(this.command == "notes" || this.command == "patchnotes" || this.command == "update" | this.command == "latest"){
            this.PatchNotes();
        }
    }

    async PatchNotes(){
        var embed = this.CreateEmbed()
        .setTitle("**Project Scyll V0.2.0**")
        .setColor("#1616FF")
        .setDescription("***See all the different changes in the newest update of Project Scyll***")
        .addField("**Added a BIN Snipe Command with `!flip bin [amount]`**","`Added a bin snipe command which should be able to find you flips at practically any price range in around 0.5 seconds or so`")
        .addField("**Added Slash Commands**","`For all the people who prefer using slash commands over normal commands`")
        .addField("**Reimplemented Market manipulation**","`you can now do !flip manip [item] [start price] [end price] to find the amount of items and the total cost to get from the start price to the end price of that item`");

        this.msg.reply({embeds:[embed]});
    }
}

module.exports = PatchNotesCommand;