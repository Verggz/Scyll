const SlashCommand = require("../../model/SlashCommand.model");
const client = require('../../../build/hypixel/main.hypixel');
const Discord = require('discord.js');
const Command = require("../../model/Command.model");

class RegisterCommand extends SlashCommand{
    constructor(client,interaction){
        super(interaction);
        this.client = client;
        if(this.command == "register"){
            this.NewRegister();
        }
    }
    async NewRegister(){
        var origin = this;
        await this.interaction.deferReply();
        var player = await client.default.getPlayer(this.interaction.options.getString('ign',true)).catch(async e =>{
            var errorEmbed = new Discord.MessageEmbed()
            .setTitle("**Username doesn't exist**")
            .setColor("#ff3333")
            .setDescription(`**The minecraft username: ${origin.backtick}${origin.interaction.options.getString('ign',true)}${origin.backtick} doesn't exist, or has never logged onto hypixel.**`);

            origin.interaction.editReply({'embeds':[errorEmbed]}).catch(console.log);
        });

        if(player != undefined){
            if(player.socialMedia.length == 0){
                var noDiscordEmbed = new Discord.MessageEmbed()
                .setTitle("**Discord Account not linked**")
                .setColor("#ffcc00")
                .setDescription(`**You currently do not have your ${origin.backtick}discord account${origin.backtick} linked to hypixel. (If you have changed your discord username since you've linked it to hypixel, relink the discord account on hypixel with your current username)**`)

                this.interaction.editReply({'embeds':[noDiscordEmbed]});
            }

            for(var i = 0; i < player.socialMedia.length; i++){

                if(player.socialMedia[i].id == "DISCORD"){
                    if(player.socialMedia[i].link != `${this.interaction.member.user.username}#${this.interaction.member.user.discriminator}`){
                        var noDiscordEmbed = new Discord.MessageEmbed()
                        .setTitle("**Discord Account not linked**")
                        .setColor("#ffcc00")
                        .setDescription(`**You currently do not have your ${origin.backtick}discord account${origin.backtick} linked to hypixel. (If you have changed your discord username since you've linked it to hypixel, relink the discord account on hypixel with your current username)**`)
        
                        this.interaction.editReply({'embeds':[noDiscordEmbed]});
                        return;
                    }
                    var res = await this.http.get(`http://localhost:8080/api/v1/users/beta/getregistry?registry=${player.uuid}`);
                    if(res.data.status == "registrydoesntexist"){
                        await this.http.post(`http://localhost:8080/api/v1/users/beta/register`,{"id":player.uuid,"name":player.nickname,"discordid":this.interaction.member.user.id});
                        this.client.guilds.cache.get("guildid").members.cache.get(this.interaction.member.user.id).roles.add(this.client.guilds.cache.get("guildid").roles.cache.find(r => r.name === "Beta Tester"));
                        var embed = new Discord.MessageEmbed()
                        .setTitle("**Signed Up!**")
                        .setThumbnail(this.client.user.avatarURL())
                        .setColor("#9932CC")
                        .setDescription(`**Successfully signed up to the ${origin.backtick}Project: Hyperion${origin.backtick} Open Beta!**`);
                        
                        this.interaction.editReply({'embeds':[embed]});
                        return;
                    }else{
                        var embed = new Discord.MessageEmbed()
                        .setTitle("**Account Already Exists**")
                        .setThumbnail(this.client.user.avatarURL())
                        .setColor("#ffcc00")
                        .setDescription(`**You have already signed up to the ${this.backtick}Project: Hyperion${this.backtick} Beta.**`);
                        
                        this.interaction.editReply({'embeds':[embed]});
                    }

                }




            }
        }




    }

}

module.exports = RegisterCommand;