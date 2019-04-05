const utils = require("../utils.js");
const Discord = require("discord.js");
const moment = require("moment");

module.exports.run = async (fireboat, message, args, guildConfig, GuildStarboard, FireboatConfig) => {
    const now = new Date()
    const logchannel = fireboat.channels.get(guildConfig.minorlogchannel)
    if(!args[0]){
        return message.channel.send(`Command **selfrole** requires 2 arguments (\`<option:name..>\`) passed 0`)
    }
    var array = guildConfig.selfroles
    if(args[0] === "list"){
        if(array.length < 1 || array == undefined){
            let nosrembed = new Discord.RichEmbed()
            .setAuthor("Self-Assignable Roles")
            .setDescription("No self-assignable roles.")
            return message.channel.send(nosrembed)
        }
        var selfroles = guildConfig.selfroles.map(r => message.guild.roles.get(r))
        var rightselfroles = selfroles.join("\n\n")
        var selfroleembed = new Discord.RichEmbed()
        .setAuthor("Self-Assignable Roles")
        .setDescription(rightselfroles)
        message.channel.send(selfroleembed)
    }
    if(args[0] === "join"){
        if(!args[1]){
            return message.channel.send(`Command **selfrole** requires 2 arguments (\`<option:name..>\`) passed 1`)
        }
        var srole = message.guild.roles.find(`name`, args.slice(1).join(" "))
            if(!srole){
                return message.channel.send(`${utils.fail} Cannot convert ${args[1]} into \`role\``)
            }
            if(!guildConfig.selfroles.includes(srole.id)){
                return message.channel.send(`${utils.fail} That role is not a self-assignable role.`)
            }
            var mmember = message.member
            if(mmember.roles.has(srole.id)){
                return message.channel.send(`${utils.fail} You already have that role assigned to you.`)
            }
            mmember.addRole(srole.id)
            message.channel.send(`${utils.success} You have been assigned the role \`${srole.name}\`.`)
            if(guildConfig.minorlogchannel !== "0"){
                logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
            }
    }
    if(args[0] === "leave"){
        if(!args[1]){
            return message.channel.send(`Command **selfrole** requires 2 arguments (\`<option:name..>\`) passed 1`)
        }
        var srole = message.guild.roles.find(`name`, args.slice(1).join(" "))
            if(!srole){
                return message.channel.send(`${utils.fail} Cannot convert ${args[1]} into \`role\``)
            }
            if(!guildConfig.selfroles.includes(srole.id)){
                return message.channel.send(`${utils.fail} That role is not a self-assignable role.`)
            }
            var mmember = message.member
            if(!mmember.roles.has(srole.id)){
                return message.channel.send(`${utils.fail} You don't have that role assigned to you.`)
            }
            mmember.removeRole(srole.id)
            message.channel.send(`${utils.success} You have been removed from the role \`${srole.name}\`.`)
            if(guildConfig.minorlogchannel !== "0"){
                logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
            }
    }
}

module.exports.help = {
  name: "selfrole"
}