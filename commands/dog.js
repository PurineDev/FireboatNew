const utils = require("../utils.js");
const superagent = require("superagent")
const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (fireboat, message, args, guildConfig, GuildStarboard, FireboatConfig, db) => {
  const now = new Date()
  const logchannel = fireboat.channels.get(guildConfig.minorlogchannel)
    let {body} = await superagent
    .get(`https://dog.ceo/api/breeds/image/random`)
    let embed = new Discord.RichEmbed()
    .setImage(body.message)
    .setColor("RANDOM")
    message.channel.send(embed)
    if(guildConfig.minorlogchannel !== "0"){
      logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
  }
}

module.exports.help = {
  name: "dog"
}