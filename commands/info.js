const utils = require("../utils.js");
const Discord = require("discord.js")
const moment = require("moment");
const vibrant = require("node-vibrant");

const presences = ["online", "idle", "dnd", "offline"],
  status = ["<:online2:494861622909730816>", "<:away2:494861622628581387>", "<:dnd2:494861622557540363>", "<:offline2:494861622842621983>"];


module.exports.run = async (fireboat, message, args, guildConfig, GuildStarboard, FireboatConfig) => {
  const now = new Date()
  const logchannel = fireboat.channels.get(guildConfig.minorlogchannel)
  if(!args[0]){
    let mmroles = message.member.roles.map(r => r)
    let usercolor = await vibrant.from(message.author.avatarURL).getPalette()
    let rightroles = mmroles.join(" ")
    let userembed = new Discord.RichEmbed()
    .setAuthor(message.author.tag, message.author.avatarURL)
    .setThumbnail(message.author.avatarURL)
    .setColor(usercolor.Vibrant._rgb)
    .setDescription(`**❯ User Information**\nID: ${message.author.id}\nProfile: ${message.author}\nStatus: ${message.member.presence.status} ${status[presences.indexOf(message.member.presence.status)]}\nCreated: ${moment(message.author.createdAt).fromNow()} (${moment(message.author.createdTimestamp).format()})\n\n**❯ Member Information**\nNickname: ${(message.member.nickname ? message.member.nickname : "None")}\nJoined: ${moment(message.member.joinedAt).fromNow()} (${moment(message.member.joinedTimestamp).format()})\nRoles (${message.member.roles.size}): ${rightroles}\n\n**❯ Infractions**\nInfraction Count: 0`)
    message.channel.send(userembed)
    if(guildConfig.minorlogchannel !== "0"){
      logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
  }
} else {
  let mmember = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!mmember){
    return message.channel.send(`${utils.fail} Cannot convert ${args[0]} into \`user\``)
  }
  let mmemberroles = mmember.roles.map(r => r);
  let ousercolor = await vibrant.from(mmember.user.avatarURL).getPalette()
  let mrightroles = mmemberroles.join(" ")
    let userembed = new Discord.RichEmbed()
    .setAuthor(mmember.user.tag, mmember.user.avatarURL)
    .setThumbnail(mmember.user.avatarURL)
    .setColor(ousercolor.Vibrant._rgb)
    .setDescription(`**❯ User Information**\nID: ${mmember.user.id}\nProfile: ${mmember.user}\nStatus: ${message.member.presence.status} ${status[presences.indexOf(message.member.presence.status)]}\nCreated: ${moment(mmember.user.createdAt).fromNow()} (${moment(mmember.user.createdTimestamp).format()})\n\n**❯ Member Information**\nNickname: ${(message.member.nickname ? message.member.nickname : "None")}\nJoined: ${moment(mmember.joinedAt).fromNow()} (${moment(message.member.joinedTimestamp).format()})\nRoles (${mmember.roles.size}): ${mrightroles}\n\n**❯ Infractions**\nInfraction Count: 0`)
    message.channel.send(userembed)
    if(guildConfig.minorlogchannel !== "0"){
      logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
  }
}
}

module.exports.help = {
  name: "info"
}