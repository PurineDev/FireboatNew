const config = require("../config.json");
const utils = require("../utils.js");
const Discord = require("discord.js")
const moment = require("moment");

function convertMS(ms) {
    var d, h, m, s;
    s = Math.floor(ms / 1000);
    m = Math.floor(s / 60);
    s = s % 60;
    h = Math.floor(m / 60);
    m = m % 60;
    d = Math.floor(h / 24);
    h = h % 24;
    return {
        d: d
        , h: h
        , m: m
        , s: s
    };
};

module.exports.run = async (fireboat, message, args, guildConfig, GuildStarboard, FireboatConfig) => {
    if(message.author.id !== config.ownerID){
        return;
    }
    if(args[0] === "whitelist"){
        if(args[1] === "add"){
            let guildID = args[2]
            if(FireboatConfig.whitelist.includes(guildID)){
                return message.channel.send(`${utils.fail} That server is already on my whitelist.`)
            } 
                fireboat.boatconfig.push("fireboat", guildID, "whitelist")
                return message.channel.send(`${utils.success} Added \`${guildID}\` to my whitelist.`)
        }
        if(args[1] === "remove"){
            let guildID = args[2]
            if(!FireboatConfig.whitelist.includes(guildID)){
                return message.channel.send(`${utils.fail} That server isn't whitelisted.`)
            }
            fireboat.boatconfig.remove("fireboat", guildID, "whitelist")
            return message.channel.send(`${utils.success} Removed \`${guildID}\` from my whitelist.`)
        }
        if(args[1] === "show"){
            return message.channel.send(`Whitelist: \`\`\`js\n${FireboatConfig.whitelist}\`\`\``)
        }
    }
    if(args[0] === "status"){
        fireboat.user.setActivity(args.slice(1).join(" "), { type: "WATCHING" })
        return message.channel.send(`${utils.success} Set status to \`${args.slice(1).join(" ")}\``)
    }
    if(args[0] === "uptime"){
        let u = convertMS(fireboat.uptime);
        let uptime = u.d + " days, " + u.h + " hours, " + u.m + " minutes, " + u.s + " seconds"
        const duration = moment.duration(fireboat.uptime)
        let embed = new Discord.RichEmbed()
        .addField("Uptime", `${uptime}`, true)
        .setColor("#ad0f0f")

        return message.channel.send(embed)
    }
}

module.exports.help = {
  name: "owner"
}