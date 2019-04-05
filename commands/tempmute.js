const utils = require("../utils.js");
const moment = require("moment");
const ms = require("ms");
const db = require("../sql.js");

module.exports.run = async (fireboat, message, args, guildConfig, GuildStarboard, FireboatConfig) => {
    const now = new Date()
    const logchannel = fireboat.channels.get(guildConfig.minorlogchannel)
    let array = guildConfig.modroles
    var modchannel = fireboat.channels.get(guildConfig.modlogchannel)
    if(array.length < 1 || array == undefined){
        return message.channel.send(`${utils.fail} You have no mod roles configured, configure some to use mod commands.`)
    }
    if(!guildConfig.modroles.some(roles => message.member.roles.get(roles))){
        return message.channel.send(":lock: You do not have the permission to use this command.")
    }
    if(!args[0]){
        return message.channel.send(`Command **tempmute** requires 2 arguments (\`<user|snowflake:time:[reason]..>\`) passed 0`)
    }
    let user = message.mentions.members.first() || message.guild.members.get(args[0])
    if(user.roles.has(guildConfig.muterole)){
        return message.channel.send(`${utils.fail} They are already muted.`)
    }
    var reason = args.slice(2).join(" ");
    if(!reason){
        let mrole = message.guild.roles.get(guildConfig.muterole)
        if(!mrole){
            return message.channel.send(`${utils.fail} The mute role doesn't seem to exist, or one isn't configured.`)
        }
        var mutetime = args[1]
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
      db.run(`INSERT INTO infractions (snowflake, reason, moderator, guild, time, type) VALUES (?, ?, ?, ?, ?, ?)`, user.id, "No reason provided.", message.author.id, message.guild.id, now, "Tempmute", (err) => {
            if(err) throw err;
            console.log("Infraction push successful.")
        })
        message.channel.send(`:ok_hand: Tempmuted ${user.user.tag} for ${ms(ms(mutetime))} (\`No reason provided.\`)`)
        if(guildConfig.modlogchannel !== "0"){
            modchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :no_mouth: ${user.user.tag} (\`${user.user.id}\`) has been tempmuted by **${message.author.tag}** for ${ms(ms(mutetime))}: \`No reason provided.\``)
        }
        if(guildConfig.minorlogchannel !== "0"){
            logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
        }
        setTimeout(function(){
            user.removeRole(mrole.id)
            if(guildConfig.modlogchannel !== "0"){
                var modchannel = fireboat.channels.get(guildConfig.modlogchannel)
                modchannel.send(`\`[${moment(message.createdTimestamp + ms(mutetime)).format("HH:mm:ss")}]\` :open_mouth: ${user.user.tag} (\`${user.user.id}\`) has been unmuted (mute expired)`)
            }
        }, ms(mutetime))
    } else {
        let now = new Date()
        let mrole = message.guild.roles.get(guildConfig.muterole)
        if(!mrole){
            return message.channel.send(`${utils.fail} The mute role doesn't seem to exist, or one isn't configured.`)
        }
        var mutetime = args[1]
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
      db.run(`INSERT INTO infractions (snowflake, reason, moderator, guild, time, type) VALUES (?, ?, ?, ?, ?, ?)`, user.id, reason, message.author.id, message.guild.id, now, "Tempmute", (err) => {
            if(err) throw err;
            console.log("Infraction push successful.")
        })
        message.channel.send(`:ok_hand: Tempmuted ${user.user.tag} for ${ms(ms(mutetime))} (\`${reason}\`)`)
        if(guildConfig.modlogchannel !== "0"){
            modchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :no_mouth: ${user.user.tag} (\`${user.user.id}\`) has been tempmuted by **${message.author.tag}** for ${ms(ms(mutetime))}: \`${reason}\``)
        }
        if(guildConfig.minorlogchannel !== "0"){
            logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
        }
        setTimeout(function(){
            user.removeRole(mrole.id)
            if(guildConfig.modlogchannel !== "0"){
                var modchannel = fireboat.channels.get(guildConfig.modlogchannel)
                modchannel.send(`\`[${moment(message.createdTimestamp + ms(mutetime)).format("HH:mm:ss")}]\` :open_mouth: ${user.user.tag} (\`${user.user.id}\`) has been unmuted (mute expired)`)
            }
        }, ms(mutetime))
    }

}

module.exports.help = {
  name: "tempmute"
}