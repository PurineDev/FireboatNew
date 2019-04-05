const moment = require("moment");
const ms = require("ms");

module.exports.run = async (fireboat, message, args, guildConfig, GuildStarboard, FireboatConfig) => {
    var logchannel = fireboat.channels.get(guildConfig.minorlogchannel)
    var now = new Date()
    if(!args[0]){
        return message.channel.send(`Command **r** requires 3 arguments (\`<opt:time:string..>\`) passed 0`)
    }
    if(args[0] === "add"){
    if(!args[1]){
        return message.channel.send(`Command **r** requires 3 arguments (\`<opt:time:string..>\`) passed 1`)
    }
    if(!args[2]){
        return message.channel.send(`Command **r** requires 3 arguments (\`<opt:time:string..>\`) passed 2`)
    }
    var remindtime = args[1]
    var reason = args.slice(2).join(" ")
    var newtimestamp = message.createdTimestamp + ms(remindtime)
    message.channel.send(`:ok_hand: I'll remind you at ${moment(newtimestamp).format()} (in ${ms(ms(remindtime))})`)
    if(guildConfig.minorlogchannel !== "0"){
      logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
  }
  setTimeout(function(){
    message.channel.send(`${message.author} You asked me at ${moment(message.createdTimestamp).format()} (${moment(message.createdTimestamp).fromNow()}) to remind you about: ${reason}`)
}, ms(remindtime))
    }
}

module.exports.help = {
  name: "r"
}