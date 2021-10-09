const {REST} = require('@discordjs/rest');
const { Routes } = require('discord-api-types/v9');
const Command = require('./Command.model');
var axios = require('axios');
let Discord = require('discord.js');

class SlashCommand{
    static rest = new REST({"version":"9"}).setToken("bottoken");

    static async CreateSlashCommands(commands){
        let token = "";
        var clientid = "mainbotclientid";

        if(main == false){
            clientid = "serverbotclientid"
            await this.rest.put(
                Routes.applicationGuildCommands(clientid,"testserverid"),
                {"body":commands}
            )
        }else{
            await this.rest.put(
                Routes.applicationCommands(clientid),
                {"body":commands}
            )
        }
    }

    constructor(interaction){
        this.interaction = interaction;
        this.command = interaction.commandName;
        this.backtick = "`";
        this.gold = "#d4af37";
        this.http = axios.default;
    }

    CreateEmbed(){
        return new Discord.MessageEmbed().setAuthor("Project Scyll Hyper").setFooter("Project Scyll Alpha V1").setTimestamp();
    }
}

module.exports = SlashCommand;
