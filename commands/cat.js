const utils = require("../utils.js");
const superagent = require("superagent")
const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (fireboat, message, args, guildConfig, GuildStarboard, FireboatConfig) => {
  const now = new Date()
  const logchannel = fireboat.channels.get(guildConfig.minorlogchannel)
    let {body} = await superagent
    .get(`http://aws.random.cat//meow`)
    let embed = new Discord.RichEmbed()
    .setImage(body.file)
    .setColor("RANDOM")
    message.channel.send(embed)
    if(guildConfig.minorlogchannel !== "0"){
      logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
  }
}

module.exports.help = {
  name: "cat"
}