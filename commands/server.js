const utils = require("../utils.js");
const Discord = require("discord.js");
const moment = require("moment");
const vibrant = require("node-vibrant");

module.exports.run = async (fireboat, message, args, guildConfig, GuildStarboard, FireboatConfig) => {
    const now = new Date()
    const logchannel = fireboat.channels.get(guildConfig.minorlogchannel)
    let array = message.guild.features
    var arr = message.guild.presences
    var offlinemembers = await message.guild.fetchMembers().then(guil => guil.members.filter(m => m.presence.status === "offline"))
    var servercolor = await vibrant.from(message.guild.iconURL).getPalette()
    let vchannels = message.guild.channels.filter(c => c.type === "voice");
    let categories = message.guild.channels.filter(c => c.type === "category");
    let onlinemembers = message.guild.presences.filter(p => p.status === "online");
    let dndmembers = message.guild.presences.filter(p => p.status === "dnd");
    let awaymembers = message.guild.presences.filter(p => p.status === "idle");
    if(array.length < 1 || array == undefined){
        let serverembed = new Discord.RichEmbed()
    .setDescription(`**❯ Server Information**\nCreated: ${moment(message.guild.createdAt).fromNow()} (${moment(message.guild.createdTimestamp).format()})\nID: ${message.guild.id}\nMembers: ${message.guild.memberCount}\nFeatures: None\n\n**❯ Counts**\nRoles: ${message.guild.roles.size}\nCategories: ${categories.size}\nText channels: ${message.guild.channels.size}\nVoice channels: ${vchannels.size}\n\n**❯ Members**\n<:online2:494861622909730816> - ${onlinemembers.size}\n<:dnd2:494861622557540363> - ${dndmembers.size}\n<:away2:494861622628581387> - ${awaymembers.size}\n<:offline2:494861622842621983> - ${offlinemembers.size}`)
    .setThumbnail(message.guild.iconURL)
    .setColor(servercolor.Vibrant._rgb)
    message.channel.send(serverembed)
    if(guildConfig.minorlogchannel !== "0"){
        logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
    }
    } else {
        let serverembed = new Discord.RichEmbed()
    .setDescription(`**❯ Server Information**\nCreated: ${moment(message.guild.createdAt).fromNow()} (${moment(message.guild.createdTimestamp).format()})\nID: ${message.guild.id}\nMembers: ${message.guild.memberCount}\nFeatures: ${message.guild.features}\n\n**❯ Counts**\nRoles: ${message.guild.roles.size}\nCategories: ${categories.size}\nText channels: ${message.guild.channels.size}\nVoice channels: ${vchannels.size}\n\n**❯ Members**\n<:online2:494861622909730816> - ${onlinemembers.size}\n<:dnd2:494861622557540363> - ${dndmembers.size}\n<:away2:494861622628581387> - ${awaymembers.size}\n<:offline2:494861622842621983> - ${offlinemembers.size}`)
    .setThumbnail(message.guild.iconURL)
    .setColor(servercolor.Vibrant._rgb)
    message.channel.send(serverembed)
    if(guildConfig.minorlogchannel !== "0"){
        logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
    }
    }
}

module.exports.help = {
  name: "server"
}