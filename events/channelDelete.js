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

module.exports = (fireboat, channel) => {
    const guildConfig = fireboat.configuration.ensure(channel.guild.id, defaultConfig)
    var logchannel = fireboat.channels.get(guildConfig.minorlogchannel)
    var now = new Date()
    if(guildConfig.minorlogchannel !== "0"){
        if(channel.type === "category"){
            let caname = channel.name.slice("#")
            return logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wastebasket: Category ${caname} was deleted`)
        }
        if(channel.type === "text"){
            return logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wastebasket: Channel ${channel.name} was deleted`)
        }
        if(channel.type === "voice"){
            let vname = channel.name.slice("#")
            return logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wastebasket: Voice channel ${vname} was deleted`)
        }
    }
  }