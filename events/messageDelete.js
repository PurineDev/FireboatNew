const moment = require("moment");

const defaultConfig = {
    "modroles": [],
    "prefix": "!",
    "muterole": "0",
    "filterwords": [],
    "modlogchannel": "0",
    "minorlogchannel": "0",
    "censorchannel": "0",
    "selfroles": [],
    "noncensors": [],
    "adminroles": []
  };

module.exports = (fireboat, message) => {
    const guildConfig = fireboat.configuration.ensure(message.guild.id, defaultConfig)
    var logchannel = fireboat.channels.get(guildConfig.minorlogchannel)
    var now = new Date()
    if(guildConfig.minorlogchannel !== "0"){
        if(message.author.bot) return;
        if(message.isMentioned(message.guild.id)){
            let rightcontent = message.content.slice("@everyone")
            logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wastebasket: ${message.author.tag} (\`${message.author.id}\`) message deleted in **#${message.channel.name}**:\n${rightcontent}`)
        }
        logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wastebasket: ${message.author.tag} (\`${message.author.id}\`) message deleted in **#${message.channel.name}**:\n${message.content}`)
    }
  }