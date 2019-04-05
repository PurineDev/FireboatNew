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

module.exports = (fireboat, oldMessage, newMessage) => {
    const guildConfig = fireboat.configuration.ensure(oldMessage.guild.id, defaultConfig)
    var logchannel = fireboat.channels.get(guildConfig.minorlogchannel)
    var now = new Date()
    if(guildConfig.minorlogchannel !== "0"){
        if(oldMessage.content === newMessage.content){
            return;
        }
        if(oldMessage.author.bot) return;
        var oldie = oldMessage.cleanContent
        var newie = newMessage.cleanContent
        logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :pencil: ${oldMessage.author.tag} (\`${oldMessage.author.id}\`) message edited in **#${oldMessage.channel.name}**:\n**A:** ${oldie}\n**B:** ${newie}`)
    }
  }