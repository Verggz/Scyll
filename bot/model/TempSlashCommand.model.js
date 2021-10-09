var axios = require('axios');
var Discord = require('discord.js');

class SlashCommandTemp{
    constructor(client,msg,interaction){
        this.client = client;
        this.msg = msg;
        this.interaction = interaction;
        this.http = axios.default;
        this.backtick = "`";
    }
    static getApplication(client,guildid){
        var app = client.api.applications(client.user.id);
        if(guildid){
            app.guilds(guildid);
        }

        return app;
    }

    static async createCommand(id,guildid,auth,name,desc,options = []){
        return await axios.default.post(`https://discord.com/api/v8/applications/${id}/guilds/${guildid}/commands`,{
            "name":name,
            "description":desc,
            "options": options
        },{"headers":{
            "Authorization": `Bot ${auth}`
        }}).catch(e =>{
            console.log(e);
        })
    }

    static async CreateAPIMessage(client,interaction,content){
        const {data, files}= await Discord.APIMessage.create(client.channels.resolve(interaction.channel_id),content)
        .resolveData()
        .resolveFiles() 

        return {...data,files};
    }

    
}

module.exports = SlashCommandTemp;