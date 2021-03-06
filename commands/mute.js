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
        return message.channel.send(`Command **mute** requires 1 argument (\`<user|snowflake:[reason]..>\`) passed 0`)
    }
    var reason = args.slice(1).join(" ");
    let user = message.mentions.members.first() || message.guild.members.get(args[0])
    var now = new Date()
    if(user.roles.has(guildConfig.muterole)){
        return message.channel.send(`${utils.fail} That user is already muted.`)
    }
    if(!reason){
        let mrole = message.guild.roles.get(guildConfig.muterole)
        if(!mrole){
            return message.channel.send(`${utils.fail} The mute role doesn't seem to exist, or one isn't configured.`)
        }
        let user = message.mentions.members.first() || message.guild.members.get(args[0])
        if(!user){
            return message.channel.send(`${utils.fail} Cannot convert ${args[0]} into \`user\``)
        }
      if(user.id === message.author.id){
            return message.channel.send(`${utils.fail} Cannot execute action on yourself.`)
        }
        let wrmutefunc = user.addRole(mrole.id).catch(err => {
            console.log(err)
            return false;
        })
        if(wrmutefunc === false){
            return message.channel.send(`${utils.fail} Something went wrong, perhaps try again later`)
        }
      db.run(`INSERT INTO infractions (snowflake, reason, moderator, guild, time, type) VALUES (?, ?, ?, ?, ?, ?)`, user.id, "No reason provided.", message.author.id, message.guild.id, now, "Mute", (err) => {
            if(err) throw err;
            console.log("Infraction push successful.")
        })
        message.channel.send(`:ok_hand: Muted ${user.user.tag} (\`No reason provided.\`)`)
        if(guildConfig.modlogchannel !== "0"){
            let modchannel = fireboat.channels.get(guildConfig.modlogchannel)
            modchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :no_mouth: ${user.user.tag} (\`${user.user.id}\`) has been permanently muted by **${message.author.tag}**: \`No reason provided.\``)
        }
        if(guildConfig.minorlogchannel !== "0"){
            logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
        }
    } else {
        let mrole = message.guild.roles.get(guildConfig.muterole)
        if(!mrole){
            return message.channel.send(`${utils.fail} The mute role doesn't seem to exist, or one isn't configured.`)
        }
        let user = message.mentions.members.first() || message.guild.members.get(args[0])
        if(!user){
            return message.channel.send(`${utils.fail} Cannot convert ${args[0]} into \`user\``)
        }
      if(user.id === message.author.id){
            return message.channel.send(`${utils.fail} Cannot execute action on yourself.`)
        }
        let wrmutefunc = user.addRole(mrole.id).catch(err => {
            console.log(err)
            return false;
        })
        if(wrmutefunc === false){
            return message.channel.send(`${utils.fail} Something went wrong, perhaps try again later`)
        }
      db.run(`INSERT INTO infractions (snowflake, reason, moderator, guild, time, type) VALUES (?, ?, ?, ?, ?, ?)`, user.id, reason, message.author.id, message.guild.id, now, "Mute", (err) => {
            if(err) throw err;
            console.log("Infraction push successful.")
        })
        message.channel.send(`:ok_hand: Muted ${user.user.tag} (\`${reason}\`)`)
        if(guildConfig.modlogchannel !== "0"){
            let modchannel = fireboat.channels.get(guildConfig.modlogchannel)
            modchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :no_mouth: ${user.user.tag} (\`${user.user.id}\`) has been permanently muted by **${message.author.tag}**: \`${reason}\``)
        }
        if(guildConfig.minorlogchannel !== "0"){
            logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
        }
    }
}

module.exports.help = {
  name: "mute"
}