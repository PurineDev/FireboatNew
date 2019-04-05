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

module.exports = (fireboat, oldMember, newMember) => {
const guildConfig = fireboat.configuration.ensure(oldMember.guild.id, defaultConfig)
var logchannel = fireboat.channels.get(guildConfig.minorlogchannel)
var now = new Date()
if(guildConfig.minorlogchannel !== "0"){
    if(oldMember.tag !== newMember.tag){
        logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :name_badge: ${newMember.user.tag} (\`${newMember.user.id}\`) changed username from \`${oldMember.user.tag}\` to \`${newMember.user.tag}\``)
    }
    if(oldMember.nickname === newMember.nickname){
        return
    }
    if(newMember.nickname === null){
        logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :name_badge: ${newMember.user.tag} (\`${newMember.user.id}\`) reset their nickname`)
    }
    if(oldMember.nickname === null){
        logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :name_badge: ${newMember.user.tag} (\`${newMember.user.id}\`) added nickname \`${newMember.nickname}\``)
    }
    if(oldMember.nickname !== null){
        if(newMember.nickname === null){
            return
        }
        logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :name_badge: ${newMember.user.tag} (\`${newMember.user.id}\`) changed nick from \`${oldMember.nickname}\` to \`${newMember.nickname}\``)
    }
}
}