const utils = require("../utils.js");
const moment = require("moment");

module.exports.run = async (fireboat, message, args, guildConfig, GuildStarboard, FireboatConfig) => {
    const now = new Date()
    const logchannel = fireboat.channels.get(guildConfig.minorlogchannel)
    let array = guildConfig.modroles
    if(array.length < 1 || array == undefined){
        return message.channel.send(`${utils.fail} You have no mod roles configured, configure some to use mod commands.`)
    }
    if(!guildConfig.modroles.some(roles => message.member.roles.get(roles))){
        return message.channel.send(":lock: You do not have the permission to use this command.")
    }
    if(!args[0]){
        return message.channel.send(`Command **role** requires 3 arguments (\`<option:user|snowflake:role..>\`) passed 0`)
    }
    if(args[0] === "add"){
        if(!args[1]){
            return message.channel.send(`Command **role** requires 3 arguments (\`<option:user|snowflake:role..>\`) passed 1`)
        }
        if(!args[2]){
            return message.channel.send(`Command **role** requires 3 arguments (\`<option:user|snowflake:role..>\`) passed 2`)
        }
        let user = message.mentions.members.first() || message.guild.members.get(args[1])
        if(!user){
            return message.channel.send(`${utils.fail} Cannot convert ${args[1]} into \`user\``)
        }
        let role = args.slice(2).join(" ")
        let findrole = message.guild.roles.find(`name`, role)
        if(user.roles.has(findrole.id)){
            return message.channel.send(`${utils.fail} They already have that role.`)
        }
        if(!findrole){
            return message.channel.send(`${utils.fail} Cannot convert ${role} into \`role\``)
        }
        let addfunc = user.addRole(findrole.id).catch(err => {
            console.log(err)
            return false;
        })
        if(addfunc === false){
            return message.channel.send(`${utils.fail} Something went wrong, perhaps try again later`)
        }
        message.channel.send(`:ok_hand: Added role \`${role}\` to ${user.user.tag}`)
        if(guildConfig.minorlogchannel !== "0"){
            logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
        }
    }
    if(args[0] === "remove"){
        if(!args[1]){
            return message.channel.send(`Command **role** requires 3 arguments (\`<option:user|snowflake:role..>\`) passed 1`)
        }
        if(!args[2]){
            return message.channel.send(`Command **role** requires 3 arguments (\`<option:user|snowflake:role..>\`) passed 2`)
        }
        let user = message.mentions.members.first() || message.guild.members.get(args[1])
        if(!user){
            return message.channel.send(`${utils.fail} Cannot convert ${args[1]} into \`user\``)
        }
        let role = args.slice(2).join(" ")
        let findrole = message.guild.roles.find(`name`, role)
        if(!user.roles.has(findrole.id)){
           return message.channel.send(`${utils.fail} They don't have that role.`)
       }
        if(!findrole){
            return message.channel.send(`${utils.fail} Cannot convert ${role} into \`role\``)
        }
        let removefunc = await user.removeRole(findrole.id).catch(err => {
            console.log(err)
            return false;
        })
        if(removefunc === false){
            return message.channel.send(`${utils.fail} Something went wrong, perhaps try again later`)
        }
        message.channel.send(`:ok_hand: Removed role \`${role}\` from ${user.user.tag}`)
        if(guildConfig.minorlogchannel !== "0"){
            logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
        }
    }
    if(args[0] === "list"){
        let roles = message.guild.roles.map(r => `${r.name} - ${r.id}`)
        let arr = roles.join("\n")
        message.channel.send(`\`\`\`${arr}\`\`\``)
        if(guildConfig.minorlogchannel !== "0"){
            logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
        }
    }
}

module.exports.help = {
  name: "role"
}