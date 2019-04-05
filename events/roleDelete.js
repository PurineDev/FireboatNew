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

module.exports = (fireboat, role) => {
    const guildConfig = fireboat.configuration.ensure(role.guild.id, defaultConfig)
    var logchannel = fireboat.channels.get(guildConfig.minorlogchannel)
    var now = new Date()
    if(guildConfig.minorlogchannel !== "0"){
        logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wastebasket: Role ${role.name} was deleted`)
    }
  }