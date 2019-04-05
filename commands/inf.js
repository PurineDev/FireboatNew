const utils = require("../utils.js");
const moment = require("moment");
const db = require("../sql.js");
const Discord = require("discord.js");

module.exports.run = async (fireboat, message, args, guildConfig, GuildStarboard, FireboatConfig) => {
  const now = new Date()
  const logchannel = fireboat.channels.get(guildConfig.minorlogchannel)
  let array = guildConfig.modroles
    if(array.length < 1 || array == undefined){
        return message.channel.send(`${utils.fail} You have no mod roles configured, configure some to use mod commands.`)
    }
    if(!guildConfig.modroles.some(roles => message.member.roles.get(roles))){
        return message.channel.send(":lock: You do not have the permission to use this command.")
    }
  if(!args[0]){
    return message.channel.send(`Command **inf** requires 2 arguments (\`<option:snowflake|id..>\`) passed 0`)
  }
  if(args[0] === "search"){
    if(!args[1]){
      return message.channel.send(`Command **inf** requires 2 arguments (\`<option:snowflake|id..>\`) passed 1`)
    }
    if(isNaN(args[1])){
      return message.channel.send(`${utils.fail} Cannot convert ${args[1]} into \`integer\``)
    }
  db.all(`SELECT * FROM infractions WHERE snowflake = ? AND guild = ?`, target.id, message.guild.id, async (err, r) => {
    if(err) throw err;
    if(!r){
      return message.channel.send(`${utils.fail} Cannot convert ${args[1]} into \`user\``)
    }

    const embed = new Discord.RichEmbed()
        .setAuthor(`Infractions for ${target.user.tag}`, target.user.displayAvatarURL)
        .setDescription("All of the infractions which have been issued to this user.")
        .setColor("#f45942");
    for (var i = 0; i < r.length; i++) {
        let w = r[i];
        embed.addField(moment(w.time).format("D MMM YYYY, HH:MM:SS a"), `**Reason:** ${w.reason}\n**Moderator:** ${(fireboat.users.get(w.moderator) || await fireboat.fetchUser(w.moderator)).tag}\n**Type:** ${w.type}\n**ID:** ${w.id}`, true)
      }
      message.channel.send(embed)
})
    if(guildConfig.minorlogchannel !== "0"){
      logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
  }
  }
}

module.exports.help = {
  name: "inf"
}