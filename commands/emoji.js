const Discord = require("discord.js");
const snek = require("snekfetch");
const fs = require("fs");
const utils = require("../utils.js");
const moment = require("moment");

module.exports.run = async (fireboat, message, args, guildConfig, GuildStarboard, FireboatConfig, db) => {
    var logchannel = fireboat.channels.get(guildConfig.minorlogchannel)
    var now = new Date()
    if(!args[0]){
        return message.channel.send(`Command **emoji** requires 1 argument (\`<emoji..>\`) passed 0`)
    }
    try {
        var emote = Discord.Util.parseEmoji(args[0]);
        if(!emote){
            message.channel.send(`${utils.fail} Cannot convert ${args[0]} into \`emoji\``)
        }
        if(emote.animated === true){
            const URL = `https://cdn.discordapp.com/emojis/${emote.id}.gif?v=1`;
            const { body: buffer } = await snek.get(`${URL}`);
            const toSend = fs.writeFileSync('emote.gif', buffer);
            message.channel.send(`**ID:** ${emote.id}\n**Name:** ${emote.name}\n**Animated:** Yes`, { file: 'emote.gif' })
            if(guildConfig.minorlogchannel !== "0"){
                logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
            }
        } else {
                const URL = `https://cdn.discordapp.com/emojis/${emote.id}.png`;
                const { body: buffer } = await snek.get(`${URL}`);
                const toSend = fs.writeFileSync('emote.png', buffer);
                message.channel.send(`**ID:** ${emote.id}\n**Name:** ${emote.name}\n**Animated:** No`, { file: 'emote.png' })
                if(guildConfig.minorlogchannel !== "0"){
                    logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
                }
        }
    } catch (error) {
    if (error.message === 'TypeError: Cannot read property \'1\' of null') {
            message.channel.send(`${utils.fail} Cannot convert ${args[0]} into \`emoji\``)
          }
    }
 
}

module.exports.help = {
    name: "emoji"
}