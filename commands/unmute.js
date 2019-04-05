const utils = require("../utils.js");
const moment = require("moment");
const db = require("../sql.js");

module.exports.run = async (fireboat, message, args, guildConfig, GuildStarboard, FireboatConfig) => {
    const logchannel = fireboat.channels.get(guildConfig.minorlogchannel)
    let array = guildConfig.modroles
    if(array.length < 1 || array == undefined){
        return message.channel.send(`${utils.fail} You have no mod roles configured, configure some to use mod commands.`)
    }
    if(!guildConfig.modroles.some(roles => message.member.roles.get(roles))){
        return message.channel.send(":lock: You do not have the permission to use this command.")
    }
    if(!args[0]){
        return message.channel.send(`Command **unmute** requires 1 argument (\`<user|snowflake..>\`) passed 0`)
    }
    var user = message.mentions.members.first() || message.guild.members.get(args[0])
    var now = new Date()
    if(!user.roles.has(guildConfig.muterole)){
        return message.channel.send(`${utils.fail} That user isn't muted.`)
    }
        let mrole = message.guild.roles.get(guildConfig.muterole)
        if(!mrole){
            return message.channel.send(`${utils.fail} The mute role doesn't seem to exist, or one isn't configured.`)
        }
        if(!user){
            return message.channel.send(`${utils.fail} Cannot convert ${args[0]} into user`)
        }
        let unmutefunc = user.removeRole(mrole.id).catch(err => {
            console.log(err)
            return false;
        })
        if(unmutefunc === false){
            return message.channel.send(`${utils.fail} Something went wrong, perhaps try again later`)
        }
  db.run(`INSERT INTO infractions (snowflake, reason, moderator, guild, time, type) VALUES (?, ?, ?, ?, ?, ?)`, user.id, "N/A", message.author.id, message.guild.id, now, "Unmute", (err) => {
            if(err) throw err;
            console.log("Infraction push successful.")
        })
        message.channel.send(`:ok_hand: Unmuted ${user.user.tag}`)
        if(guildConfig.modlogchannel !== "0"){
            let modchannel = fireboat.channels.get(guildConfig.modlogchannel)
            modchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :open_mouth: ${user.user.tag} (\`${user.user.id}\`) has been unmuted by **${message.author.tag}**`)
        }
        if(guildConfig.minorlogchannel !== "0"){
            logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
        }
    }

module.exports.help = {
  name: "unmute"
}