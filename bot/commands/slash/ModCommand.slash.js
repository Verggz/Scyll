let SlashCommand = require('../../model/SlashCommand.model');

class ModCommand extends SlashCommand{
  constructor(client,interaction){
    super(interaction);
    this.client = client;

    if(this.command == "mod"){
      this.Mod();
    }
  }

  async Mod(){
    await this.interaction.deferReply();
    var res = await this.http.get("http://localhost:8080/api/v1/mod/key?id=" + this.interaction.member.user.id)
    if(res.data.status == "success"){
      this.client.guilds.cache.get("866485146600341505").members.cache.get(this.interaction.member.user.id).roles.add(this.client.guilds.cache.get("866485146600341505").roles.cache.find(r => r.name === "mod enjoyer"));
      await this.interaction.editReply("***Instructions on downloading the mod sent to your DMs.✅***");

      var instructionembed = this.CreateEmbed()
      .setTitle("**Instructions on installing and using the Project Scyll mod**")
      .setDescription(`**Your API Key is:${this.backtick}${res.data.key}${this.backtick} (this will become more useful later)**`)
      .addField("**1: Install ChatTriggers**","The mod is a **ChatTriggers** module so if you don't have **ChatTriggers** installed, then you can **install it here: https://www.chattriggers.com **")
      .addField("**2: Install The Mod**",`You can download the zip file to this mod by typing /ct import ProjectScyll or by cloning the [**github repo.**](https://github.com/Verggz/ProjectScyllMod)`)
      .addField("**3: Using The Mod**","Unzip the file *(if you used the download link)* and place the folder in **config/ChatTriggers/modules** from the **.minecraft** folder [**(Here is a video that explains how to find your .minecraft folder.)**](https://www.youtube.com/watch?v=mfWzrgS4dc4)")
      .addField("**4: Edit your settings (optional)**","You can edit your ah and bin flips settings by typing **/settings** ingame to bring up the settings UI and **edit the different settings.**");
      this.interaction.user.send({"embeds":[instructionembed]}).catch(console.log);
    }else{
      this.interaction.editReply("***The mod is currently only available to Beta Testers***");
    }

   

  }
}


module.exports = ModCommand;
