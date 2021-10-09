var SlashCommand = require('../../model/SlashCommand.model');

class VoteSCommand extends SlashCommand{
    constructor(interaction){
        super(interaction);

        if(this.command == "vote"){
            this.VoteS();
        }
    }

    async VoteS(){

    }
}