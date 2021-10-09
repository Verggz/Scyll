const { default: axios } = require("axios");
const Discord = require("discord.js");

class RTBazaar{
    static async ConvertBazaarDataToMsg(){
        var backtick = "`";
        var res = await axios.get("http://localhost:8080/api/v1/nitric/bazaar/best").catch(e =>{console.log(e)});

        if(!res){
            return new Discord.MessageEmbed()
            .setTitle("**Realtime Bazaar is Currently Unvailable**")
            .setDescription("**The realtime bazaar system is currently unavailable**")
            .setColor("#FFA500");
        }

        if(!res.data.status){
            return new Discord.MessageEmbed()
            .setTitle("**Realtime Bazaar is Currently Unvailable**")
            .setDescription("**The realtime bazaar system is currently unavailable**")
            .setColor("#FFA500");
        }

        if(res.data.status == "success"){
            
            return new Discord.MessageEmbed()
            .setTitle("**Most Profitable Flips**")
            .setColor("#FFA500")
            .addField(`${backtick}1: ${res.data.items[0].id}${backtick}`,`**Buy Order Price: **${backtick}${res.data.items[0].sellsummary[0].pricePerUnit.toFixed(1)}${backtick}\n**Sell Offer Price: **${backtick}${res.data.items[0].buysummary[0].pricePerUnit.toFixed(1)}${backtick}\n**% Margin: **${backtick}${(((res.data.items[0].buysummary[0].pricePerUnit - res.data.items[0].sellsummary[0].pricePerUnit) / res.data.items[0].sellsummary[0].pricePerUnit) * 100).toFixed(1)}%${backtick}`,true)
            .addField(`${backtick}2: ${res.data.items[1].id}${backtick}`,`**Buy Order Price: **${backtick}${res.data.items[1].sellsummary[0].pricePerUnit.toFixed(1)}${backtick}\n**Sell Offer Price: **${backtick}${res.data.items[1].buysummary[0].pricePerUnit.toFixed(1)}${backtick}\n**% Margin: **${backtick}${(((res.data.items[1].buysummary[0].pricePerUnit - res.data.items[1].sellsummary[0].pricePerUnit) / res.data.items[1].sellsummary[0].pricePerUnit) * 100).toFixed(1)}%${backtick}`,true)
            .addField(`${backtick}3: ${res.data.items[2].id}${backtick}`,`**Buy Order Price: **${backtick}${res.data.items[2].sellsummary[0].pricePerUnit.toFixed(1)}${backtick}\n**Sell Offer Price: **${backtick}${res.data.items[2].buysummary[0].pricePerUnit.toFixed(1)}${backtick}\n**% Margin: **${backtick}${(((res.data.items[2].buysummary[0].pricePerUnit - res.data.items[2].sellsummary[0].pricePerUnit) / res.data.items[2].sellsummary[0].pricePerUnit) * 100).toFixed(1)}%${backtick}`,true)
            .addField(`${backtick}4: ${res.data.items[3].id}${backtick}`,`**Buy Order Price: **${backtick}${res.data.items[3].sellsummary[0].pricePerUnit.toFixed(1)}${backtick}\n**Sell Offer Price: **${backtick}${res.data.items[3].buysummary[0].pricePerUnit.toFixed(1)}${backtick}\n**% Margin: **${backtick}${(((res.data.items[3].buysummary[0].pricePerUnit - res.data.items[3].sellsummary[0].pricePerUnit) / res.data.items[3].sellsummary[0].pricePerUnit) * 100).toFixed(1)}%${backtick}`,true)
            .addField(`${backtick}5: ${res.data.items[4].id}${backtick}`,`**Buy Order Price: **${backtick}${res.data.items[4].sellsummary[0].pricePerUnit.toFixed(1)}${backtick}\n**Sell Offer Price: **${backtick}${res.data.items[4].buysummary[0].pricePerUnit.toFixed(1)}${backtick}\n**% Margin: **${backtick}${(((res.data.items[4].buysummary[0].pricePerUnit - res.data.items[4].sellsummary[0].pricePerUnit) / res.data.items[4].sellsummary[0].pricePerUnit) * 100).toFixed(1)}%${backtick}`,true)
            .setFooter("These items are updated every minute")
            .setTimestamp()
        }
    }
}

module.exports = RTBazaar;