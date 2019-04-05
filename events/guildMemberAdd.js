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
    "autorole": "0",
    "welcomemsg": "none",
    "welcomechannel": "0"
  };

module.exports = (fireboat, member) => {
    const guildConfig = fireboat.configuration.ensure(member.guild.id, defaultConfig)
    var logchannel = fireboat.channels.get(guildConfig.minorlogchannel)
    var now = new Date()
    if(guildConfig.autorole !== "0"){
        let autorole = member.guild.roles.get(guildConfig.autorole)
        member.addRole(autorole.id)
    }
    if(guildConfig.minorlogchannel !== "0"){
        logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :inbox_tray: ${member.user.tag} (\`${member.user.id}\`) has joined (created ${moment(member.user.createdAt).fromNow()})`)
    }
    if(guildConfig.welcomemsg !== "none"){
        if(guildConfig.welcomechannel !== "0"){
        let thechannel = fireboat.channels.get(guildConfig.welcomechannel)
        let themsg = guildConfig.welcomemsg.replace("{user}", member.user)
        thechannel.send(themsg)
        }
    }
  }