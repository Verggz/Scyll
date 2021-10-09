let Discord = require('discord.js');
let axios = require('axios');

class Command{
    static main = false;
    constructor(prefix,msg){
        this.prefix = prefix;
        this.msg = msg;
        this.args = msg.content.slice(prefix.length).split(' ');
        this.command = this.args.shift().toLowerCase();
        this.http = axios.default;
        this.backtick = "`";
        this.gold = "#d4af37";
        this.red = "#C70039";
    }

    CreateEmbed(){
        return new Discord.MessageEmbed().setAuthor("Project Scyll Hyper",this.msg.client.user.avatarURL()).setFooter("Project Scyll Alpha V1").setTimestamp();
    }
}

module.exports = Command;