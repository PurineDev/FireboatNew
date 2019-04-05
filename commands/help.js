const moment = require("moment");
const Discord = require("discord.js");

module.exports.run = async (fireboat, message, args, guildConfig, GuildStarboard, FireboatConfig) => {
  const now = new Date()
  const logchannel = fireboat.channels.get(guildConfig.minorlogchannel)
    var helpembed = new Discord.RichEmbed()
    .setAuthor(`${fireboat.user.username}`, fireboat.user.avatarURL)
    .setDescription(`Fireboat is a super-utilitarian and a heavily configurable assistant in auto-moderation and normal moderation for your server.\n\nCurrently operating in ${fireboat.guilds.size} servers.\nAny help for commands or the bot can be found below.`)
    .setThumbnail(fireboat.user.avatarURL)
    .setColor("#ad0f0f")
    .addField("Server", `[Click Here](https://discord.gg/p4WQysk)`, true)
    .addField("Docs", `[Click Here](https://fireboat.gitbook.io/project/)`, true)
    message.channel.send(helpembed)
    if(guildConfig.minorlogchannel !== "0"){
      logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
  }
}

module.exports.help = {
  name: "help"
}