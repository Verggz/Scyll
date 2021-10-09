var Discord = require('discord.js');
var {SlashCommandBuilder} = require('@discordjs/builders');
//var topgg = require('@top-gg/sdk');

const RegisterCommand = require('./commands/slash/RegisterCommand.slash');
const CraftFlipCommand = require('./commands/flip/craft/CraftFlipCommand.command');
const AhFlipCommand = require('./commands/flip/ah/AhFlipCommand.command');
const RTBazaar = require('./commands/flip/bazaar/RTBazaar');
const FindDayBazaarCommand = require('./commands/nitrate/FindDayBazaar.command');
const MarginBookFlipCommand = require('./commands/flip/bin/MarginBookFlip.command');
const HelpCommand = require('./commands/HelpCommand.command');
const BazaarCommand = require('./commands/flip/bazaar/BazaarCommand.command');
const MarketMainpulationCommand = require('./commands/flip/bin/MarketManipulation.command');
const Command = require('./model/Command.model');
const VoteCommand = require('./commands/VoteCommand.command');
const ModCommand = require('./commands/slash/ModCommand.slash');
const SlashCommand = require('./model/SlashCommand.model');
const HelpSCommand = require('./commands/slash/HelpSCommand.slash');
const SlashCommandTemp = require('./model/TempSlashCommand.model');
const { AutoPoster } = require('topgg-autoposter');
const AhFlipSCommand = require('./commands/slash/flip/AhFlipSCommand.slash');
const StatsCommand = require('./commands/StatsCommand.command');
const BinSnipeCommand = require('./commands/flip/bin/BinSnipe.command');
const PatchNotesCommand = require('./Patchnotes.command');
const WeightCommand = require('./commands/calc/WeightCommand.command');

var client = new Discord.Client({"intents":[Discord.Intents.FLAGS.GUILDS,Discord.Intents.FLAGS.DIRECT_MESSAGES,Discord.Intents.FLAGS.GUILD_MESSAGES,Discord.Intents.FLAGS.GUILD_MESSAGE_REACTIONS,Discord.Intents.FLAGS.GUILD_MESSAGE_TYPING]});

var main = false;
Command.main = false;

var count = 0;

if(main == true){
  setInterval(() =>{

  },1800000)
}

client.on('ready',async ()=>{
    console.log(client.api.applications)

    if(main){

      var helpcommandbuilder = new SlashCommandBuilder().setName("help")
      .setDescription("gets the list of commands that project scyll has to offer.");
      var ahflipcommandbuilder = new SlashCommandBuilder().setName("ahflip")
      .setDescription("Finds an ah flip by the profit you would like to make.")
      .addStringOption(option => option.setName("profit")
      .setDescription("The amount of profit you would like to make.")
      .setRequired(true));

      SlashCommand.CreateSlashCommands([helpcommandbuilder,ahflipcommandbuilder])

        client.guilds.cache.forEach(guild =>{
            count += guild.memberCount;
            console.log(`${guild.name},${guild.id} | ${guild.memberCount}`);
        });
            //const poster = AutoPoster('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6Ijg3NjgzMzk0MzE5Mjc2NDUwNyIsImJvdCI6dHJ1ZSwiaWF0IjoxNjI5OTU5NzEzfQ.C5Vp-pBa3u9cUzZw73yBwhxlwqQiDgG4WVv2Y0bZhHQ', client);
            //poster.on("posted",(stats) =>{
            //  console.log(`Posted stats to Top.gg | ${stats.serverCount} servers and ${stats.shardCount} shards`)
            //}) // your discord.js or eris client

            //eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0IjoxLCJpZCI6IjgxNDcwMjQ3MTk2NDEzMTMyOCIsImlhdCI6MTYxODcxNDEyNn0.sljwmHIFTLvZ7ELB7sGKjZeAEjZZE2580umb9uWDmUQ
            await client.user.setActivity({"type":"STREAMING",name:`!help`,"url":"https://www.twitch.tv/penguindetox"})
            console.log(`Logged in as ${client.user.tag}`);
            console.log(client.guilds.cache.size);
            //console.log(client.guilds.cache.size);


    }else{
      var modcommandbuilder = new SlashCommandBuilder().setName("mod")
      .setDescription("Get personal instructions in downloading the mod.")
      var registercommandbuilder = new SlashCommandBuilder().setName("register")
      .setDescription("Register for open beta access to Project: Scyll.")
      .addStringOption(option =>option.setName("ign")
      .setDescription("Your minecraft username")
      .setRequired(true));

      var helpcommandbuilder = new SlashCommandBuilder().setName("help")
      .setDescription("Gets the list of commands that project scyll has to offer.");

      var ahflipcommandbuilder = new SlashCommandBuilder().setName("ahflip")
      .setDescription("Finds an ah flip by the profit you would like to make.")
      .addStringOption(option => option.setName("profit")
      .setDescription("The amount of profit you would like to make.")
      .setRequired(true));
      
      SlashCommand.CreateSlashCommands([registercommandbuilder,helpcommandbuilder,ahflipcommandbuilder,modcommandbuilder])

     // SlashCommandTemp.createCommand("866485769748348968","866485146600341505","ODY2NDg1NzY5NzQ4MzQ4OTY4.YPTPwg.u8mIz8YIKfIDgfPSjlcXMf6CjHo","register","Register for open beta access to Project: Hyperion.",[
        //{
        //    "name":"ign",
        //    "description":"Your minecraft username.",
        //    "type":3,
        //    "required":true
        //}
    //]);
        await client.user.setActivity({"type":"STREAMING",name:"/register","url":"https://www.twitch.tv/penguindetox"})
    }

    //client.channels.cache.get("872024626253938728").send("**Bazaar: **")

    //console.log(commands)
    //axios.default.delete("https://discord.com/api/v8/applications/866485769748348968/guilds/866485146600341505/commands/866486711932813332",{"headers":{
    //    "Authorization": "Bot ODY2NDg1NzY5NzQ4MzQ4OTY4.YPTPwg.u8mIz8YIKfIDgfPSjlcXMf6CjHo"
    //}}).then(res =>{
    //    console.log(res.data);
    //})




});

client.on('interactionCreate',async interaction =>{
  if(!interaction.isCommand()) return;

  interaction.user.send({"embeds":[]}).catch(console.log);
  new ModCommand(client,interaction);
  new HelpSCommand(interaction);
  new AhFlipSCommand(interaction);
  if(Command.main == false){

    new RegisterCommand(client,interaction);
  }
});

client.on('guildCreate',async (guild) =>{
    var found = false;
    //console.log(guild.members.cache.size);
    //guild.members.fetch().then(cache =>{
    //  cache.forEach(function(user,id){
    //    console.log(user);
    //    http.post('http://localhost:3000/api/v1/users/signup',{id:user.id,username:user.user.username})
    //    .then(res =>{
    //      if(res.data.status == 'success'){
    //        console.log("yes");
    //      }
    //    });
    //  });
    //client.user.setActivity({type:"STREAMING",name:`pn help | ${count + 530} Penguins Building Their Penguin Paradise 🏝️`,url:'https://www.twitch.tv/geticebergbot'});
    //});


    //await client.user.setActivity({"type":"STREAMING",name:`!help | !update`,"url":"https://www.twitch.tv/penguindetox"})
    guild.channels.cache.forEach(function(channel, id) {
      // If a channel is already found, nothing more needs to be done
      if(found == true || channel.type != "text") {
        return;
      }
      // If the channel isn't found and the bot has permission to
      // send and read messages in the channel, send a welcome message there
      if(guild.me.permissionsIn(channel).has("SEND_MESSAGES") && guild.me.permissionsIn(channel).has("VIEW_CHANNEL")) {
        found = true;
        count += guild.memberCount;
        //client.users.cache.get(316543513087180811).createDM().then(msg =>{
        //
        //  msg.send(`**New Server**\n id:**${guild.id}**\n name:**${guild.name}** \n server count: **${client.guilds.cache.size}**`);
        //});
        //http.post()
        //{count + 530} Penguins Building Their Penguin Paradise 🏝️`

        //client.user.setActivity({type:"STREAMING",name:`pn help | v0.0.3-04 🏝️`,url:'https://www.twitch.tv/geticebergbot'});



      }else{
        console.log("rip");
      }
  });
});
client.on('messageCreate',async function(msg){
    var mainprefix = "!";
    var devprefix = "ps ";

    if (msg.content.includes("@here") || msg.content.includes("@everyone")) return;
    if(msg.author.bot) return;

    if(msg.mentions.has(client.user.id) && !msg.author.bot){
        msg.channel.send("please use the prefix: `!` instead.").catch(e =>{
            console.log(e);
          });
    }

    if(!msg.guild) return;

    if(!msg.content.startsWith(mainprefix)) return;


    if(msg.author.id == "316543513087180811"){

    }
    if(msg.channel.id != "866578903610032138" && msg.guild.me.permissionsIn(msg.channel).has("SEND_MESSAGES") && msg.guild.me.permissionsIn(msg.channel).has("VIEW_CHANNEL")){
      new MarketMainpulationCommand(mainprefix,msg);
      new FindDayBazaarCommand(mainprefix,msg);
      new MarginBookFlipCommand(mainprefix,msg);

      new CraftFlipCommand(mainprefix,msg);
      new AhFlipCommand(mainprefix,msg);
      new HelpCommand(mainprefix,msg);
      new BazaarCommand(mainprefix,msg);
      new VoteCommand(mainprefix,msg);
      new StatsCommand(mainprefix,msg);
      new BinSnipeCommand(mainprefix,msg);
      new PatchNotesCommand(mainprefix,msg);
      //new WeightCommand(mainprefix,msg);

    }



});
if(main == true){
  //main
  client.login("mainbottoken");
}else{
  client.login("serverbottoken");
}
