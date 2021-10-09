const Command = require("../../model/Command.model");

class FindDayBazaarCommand extends Command{
    constructor(prefix,msg){
        super(prefix,msg);

        if(this.command == "find" && this.args[0] == "day"){
            
            this.FindDayBazaar();
        }

        if(this.command == "find" && this.args[0] == "days"){
            
            this.FindDaysBazaar();
        }
    }

    async FindDaysBazaar(){
        if(this.args[1] && this.args[2]){
            if(this.args[1].includes("_")){
                if(!this.args[2].includes("-") && isNaN(parseInt(this.args[2])) || !this.args[2].includes("-")){
                    this.msg.channel.send("**Enter a valid date**");
                    return;
                }

                var itemdata = await this.http.get(`https://projectscyllapi.herokuapp.com/api/v1/nitrate/days/${this.args[1]}?min=${this.args[2]}&max=${this.args[3]}`).catch(e => {
                    this.msg.channel.send("***Please specify what type of bazaar item that you would like to see information on (we've only started storing data from 08-08-2021)***");
                });

                if(itemdata == undefined){
                    return;
                }    

                if(itemdata.data.status == "success"){
                    var buypricesStr = "";
                    var sellpricesStr = "";

                    for(var i = 0; i < itemdata.data.items.length; i++){
                        buypricesStr += `**${itemdata.data.items[i].date}: **${this.backtick}${itemdata.data.items[i].sellofferprice} coins${this.backtick}\n`;
                        sellpricesStr += `**${itemdata.data.items[i].date}: **${this.backtick}${itemdata.data.items[i].buyorderprice} coins${this.backtick}\n`;
                    }

                    var embed = this.CreateEmbed()
                    .setTitle(`**${this.backtick}${itemdata.data.items[0].name}${this.backtick} (${this.args[2]} - ${this.args[3]})**`)
                    .setColor("#228B22")
                    .setDescription(`**ID: ** ${this.backtick}${itemdata.data.items[0].id}${this.backtick}\n **(MOST RECENT)DATE: **${this.backtick}${itemdata.data.items[itemdata.data.items.length -1].date}${this.backtick}\n\n**AMOUNT OF BUYS (PER WEEK): **${this.backtick}${itemdata.data.items[itemdata.data.items.length - 1].amountofbuys}${this.backtick}\n**AMOUNT OF SALES (PER WEEK): ${this.backtick}${itemdata.data.items[itemdata.data.items.length - 1].amountofsales}${this.backtick}\n**`)
                    .addField("**BUY PRICES**",buypricesStr,true)
                    .addField("**SELL PRICES**",sellpricesStr,true)
                    .setImage(`https://projectscyllapi.herokuapp.com/api/v1/nitrate/graph/${itemdata.data.items[0].id}?type=DAILY&min=${this.args[2]}&max=${this.args[3]}`)

                    this.msg.channel.send(embed);
                    
                }else{
                    var errembed = this.CreateEmbed()
                    .setTitle("**Couldn't find the item at the specified date**")
                    .setDescription("**The item you inputted either doesnt exist, or there is no data for the date that you specified**")
                    .setFooter("the dates are formatted in the form day-month-year");

                    this.msg.channel.send(errembed);   
                }

            }else{
                var itemstr = "";
                var offset = 1;
                for(var i = 0; i < this.args.length; i++){
                    if(this.args[i] == this.args[0]){
                        continue;
                    }
                    if(this.args[i].includes("-")){
                        break;
                    }else{
                        itemstr += this.args[i] + " ";
                        offset++;
                    }
                }

                var newOffset = offset;
                itemstr = itemstr.trimEnd();
                if(this.args[offset] == undefined || isNaN(parseInt(this.args[offset]))  || this.args[newOffset + 1] == undefined || isNaN(parseInt(this.args[newOffset + 1]))){
                    this.msg.channel.send("**Enter valid dates**");
                }

                var itemdata = await this.http.get(`https://projectscyllapi.herokuapp.com/api/v1/nitrate/days/${itemstr}?min=${this.args[offset]}&max=${this.args[newOffset + 1]}`).catch(e => {
                    this.msg.channel.send("***Please specify what type of bazaar item that you would like to see information on (we've only started storing data from 08-08-2021)***");
                    return undefined;
                });;

                if(itemdata == undefined){
                    return;
                }                

                if(itemdata.data.status == "success"){
                    var buypricesStr = "";
                    var sellpricesStr = "";

                    for(var i = 0; i < itemdata.data.items.length; i++){
                        buypricesStr += `**${itemdata.data.items[i].date}: **${this.backtick}${itemdata.data.items[i].sellofferprice} coins${this.backtick}\n`;
                        sellpricesStr += `**${itemdata.data.items[i].date}: **${this.backtick}${itemdata.data.items[i].buyorderprice} coins${this.backtick}\n`;
                    }

                    var embed = this.CreateEmbed()
                    .setTitle(`**${this.backtick}${itemdata.data.items[0].name}${this.backtick} (${this.args[offset]} - ${this.args[newOffset + 1]})**`)
                    .setColor("#228B22")
                    .setDescription(`**ID: ** ${this.backtick}${itemdata.data.items[0].id}${this.backtick}\n **(MOST RECENT)DATE: **${this.backtick}${itemdata.data.items[itemdata.data.items.length -1].date}${this.backtick}\n\n**AMOUNT OF BUYS (PER WEEK): **${this.backtick}${itemdata.data.items[itemdata.data.items.length - 1].amountofbuys}${this.backtick}\n**AMOUNT OF SALES (PER WEEK): ${this.backtick}${itemdata.data.items[itemdata.data.items.length - 1].amountofsales}${this.backtick}\n**`)
                    .addField("**BUY PRICES**",buypricesStr,true)
                    .addField("**SELL PRICES**",sellpricesStr,true)
                    .setImage(`https://projectscyllapi.herokuapp.com/api/v1/nitrate/graph/${itemdata.data.items[0].id}?type=DAILY&min=${this.args[offset]}&max=${this.args[newOffset + 1]}`)

                    this.msg.channel.send(embed);
                    
                }else{
                    var errembed = this.CreateEmbed()
                    .setTitle("**Couldn't find the item at the specified date**")
                    .setDescription("**The item you inputted either doesnt exist, or there is no data for the date that you specified**")
                    .setFooter("the dates are formatted in the form day-month-year");

                    this.msg.channel.send(errembed);   
                }

            }

        }
    }

    async FindDayBazaar(){
        if(this.args[1] && this.args[2]){
            if(this.args[1].includes("_")){
                if(!this.args[2].includes("-") && isNaN(parseInt(this.args[2])) || !this.args[2].includes("-")){
                    this.msg.channel.send("**Enter a valid date**");
                    return;
                }
                var itemdata = await this.http.get(`https://projectscyllapi.herokuapp.com/api/v1/nitrate/day/${this.args[1]}?day=${this.args[2]}`).catch(e => {
                    this.msg.channel.send("***Please specify what type of bazaar item that you would like to see information on (we've only started storing data from 08-08-2021)***");
                });

                if(itemdata == undefined){
                    return;
                }    
                if(itemdata.data.status == "success"){
                    var theDate = itemdata.data.item.date;

                    var embed = this.CreateEmbed()
                    .setTitle(`**${this.backtick}${itemdata.data.item.name}${this.backtick} (${theDate})**`)
                    .setColor("#228B22")
                    .setDescription(`**ID: ** ${this.backtick}${itemdata.data.item.id}${this.backtick}\n **DATE: **${this.backtick}${theDate}${this.backtick}\n\n**AMOUNT OF BUYS (PER WEEK): **${this.backtick}${itemdata.data.item.amountofbuys}${this.backtick}\n**AMOUNT OF SALES (PER WEEK): ${this.backtick}${itemdata.data.item.amountofsales}${this.backtick}**`)
                    .addField("**BUY PRICE**",`${this.backtick}${itemdata.data.item.sellofferprice}${this.backtick}`,true)
                    .addField("**SELL PRICE**",`${this.backtick}${itemdata.data.item.buyorderprice}${this.backtick}`,true)

                    this.msg.channel.send(embed);
                    
                }else{
                    var errembed = this.CreateEmbed()
                    .setTitle("**Couldn't find the item at the specified date**")
                    .setDescription("**The item you inputted either doesnt exist, or there is no data for the date that you specified**")
                    .setFooter("the dates are formatted in the form day-month-year");

                    this.msg.channel.send(errembed);
                }
            }else{
                var itemstr = "";
                var offset = 1;
                for(var i = 0; i < this.args.length; i++){
                    if(this.args[i] == this.args[0]){
                        continue;
                    }
                    if(this.args[i].includes("-")){
                        break;
                    }else{
                        itemstr += this.args[i] + " ";
                        offset++;
                    }
                }
                itemstr = itemstr.trimEnd();
                if(this.args[offset] == undefined || isNaN(parseInt(this.args[offset])) ){
                    this.msg.channel.send("**Enter a valid date**");
                    return;
                }
                var itemdata = await this.http.get(`https://projectscyllapi.herokuapp.com/api/v1/nitrate/day/${itemstr}?day=${this.args[offset]}`).catch(e => {
                    this.msg.channel.send("***Please specify what type of bazaar item that you would like to see information on (we've only started storing data from 08-08-2021)***");
                });

                if(itemdata == undefined){
                    return;
                }    

                if(itemdata.data.status == "success"){
                    var theDate = itemdata.data.item.date;

                    var embed = this.CreateEmbed()
                    .setTitle(`**${this.backtick}${itemdata.data.item.name}${this.backtick} (${theDate})**`)
                    .setColor("#228B22")
                    .setDescription(`**ID: ** ${this.backtick}${itemdata.data.item.id}${this.backtick}\n **DATE: **${this.backtick}${theDate}${this.backtick}\n\n**AMOUNT OF BUYS (PER WEEK): **${this.backtick}${itemdata.data.item.amountofbuys}${this.backtick}\n**AMOUNT OF SALES (PER WEEK): ${this.backtick}${itemdata.data.item.amountofsales}${this.backtick}**`)
                    .addField("**BUY PRICE**",`${this.backtick}${itemdata.data.item.sellofferprice} coins${this.backtick}`,true)
                    .addField("**SELL PRICE**",`${this.backtick}${itemdata.data.item.buyorderprice} coins${this.backtick}`,true)

                     this.msg.channel.send(embed);
                    
                }else{
                    var errembed = this.CreateEmbed()
                    .setTitle("**Couldn't find the item at the specified date**")
                    .setDescription("**The item you inputted either doesnt exist, or there is no data for the date that you specified**")
                    .setFooter("the dates are formatted in the form day-month-year");

                    this.msg.channel.send(errembed);
                }

            }

        }
       
    }
}

module.exports = FindDayBazaarCommand;