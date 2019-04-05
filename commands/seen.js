const utils = require("../utils.js");
const moment = require("moment");

module.exports.run = async (fireboat, message, args, guildConfig, GuildStarboard, FireboatConfig, db) => {
  if(!args[0]){
    return message.channel.send(`Command **seen** requires 1 argument (\`<user|snowflake..>\`) passed 0`)
  }
  var target = message.mentions.members.first() || message.guild.members.get(args[0]);
  if(!target){
    return message.channel.send(`${utils.fail} Cannot convert ${args[0]} into \`user\``)
  }
  var timestamp = target.user.lastMessage.createdTimestamp
  message.channel.send(`I last saw ${target.user.tag} ${moment(timestamp).fromNow()} (${moment(timestamp).format()})`)
}

module.exports.help = {
  name: "seen"
}