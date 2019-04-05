const utils = require("../utils.js");
const moment = require("moment");
const Discord = require("discord.js");

module.exports.run = async (fireboat, message, args, guildConfig, GuildStarboard, FireboatConfig) => {
    const now = new Date()
    const logchannel = fireboat.channels.get(guildConfig.minorlogchannel)
    if(!message.member.hasPermission("ADMINISTRATOR")){
        return message.channel.send(`:lock: You do not have the permission to use this command. Required permission: \`ADMINISTRATOR\``)
    }
    if(args[0] === "prefix"){
        if(!args[1]){
            return message.channel.send(`Configuration option **prefix** requires 1 argument (\`<str..>\`) passed 0`)
        }
        if(guildConfig.prefix === args[1]){
            return message.channel.send(`${utils.fail} That is already the prefix.`)
        }
        if(guildConfig.prefix !== args[1]){
            fireboat.configuration.set(message.guild.id, args[1], args[0])
            message.channel.send(`${utils.success} Prefix has been updated to \`${args[1]}\``)
            if(guildConfig.minorlogchannel !== "0"){
                logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
            }
        }
    }
    if(args[0] === "modroles"){
        if(!args[1]){
            return message.channel.send(`Configuration option **modroles** requires 2 arguments (\`<option:role|snowflake..>\`) passed 0`)
        }
        if(args[1] === "add"){
            if(!args[2]){
                return message.channel.send(`Configuration option **modroles** requires 2 arguments (\`<option:role|snowflake..>\`) passed 1`)
            }
            var mrole = message.mentions.roles.first() || message.guild.roles.get(args[2])
            if(!mrole){
                return message.channel.send(`${utils.fail} Cannot convert ${args[2]} into \`role\``)
            }
            if(guildConfig.modroles.includes(mrole.id)){
                return message.channel.send(`${utils.fail} That role is already a mod role.`)
            }
            fireboat.configuration.push(message.guild.id, mrole.id, args[0])
            message.channel.send(`${utils.success} Added a mod role \`${mrole.id}\``)
            if(guildConfig.minorlogchannel !== "0"){
                logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
            }
        }
        if(args[1] === "remove"){
            if(!args[2]){
                return message.channel.send(`Configuration option **modroles** requires 2 arguments (\`<option:role|snowflake..>\`) passed 1`)
            }
            var mrole = message.mentions.roles.first() || message.guild.roles.get(args[2])
            if(!mrole){
                return message.channel.send(`${utils.fail} Cannot convert ${args[2]} into \`role\``)
            }
            if(!guildConfig.modroles.includes(mrole.id)){
                return message.channel.send(`${utils.fail} That role isn't a mod role.`)
            }
            fireboat.configuration.remove(message.guild.id, mrole.id, args[0])
            message.channel.send(`${utils.success} Removed a mod role \`${mrole.id}\``)
            if(guildConfig.minorlogchannel !== "0"){
                logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
            }
        }
    }
    if(args[0] === "muterole"){
        if(!args[1]){
            return message.channel.send(`Configuration option **muterole** requires 1 argument (\`<role|snowflake..>\`) passed 0`)
        }
        var murole = message.mentions.roles.first() || message.guild.roles.get(args[1])
        if(!murole){
            return message.channel.send(`${utils.fail} Cannot convert ${args[1]} into \`role\``)
        }
        if(guildConfig.muterole === murole.id){
            return message.channel.send(`${utils.fail} That is already the muterole.`)
        }
        fireboat.configuration.set(message.guild.id, murole.id, args[0])
        message.channel.send(`${utils.success} Set muterole as \`${murole.id}\``)
        if(guildConfig.minorlogchannel !== "0"){
            logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
        }
    }
    if(args[0] === "filterwords"){
        if(!args[1]){
            return message.channel.send(`Configuration option **filterwords** requires 2 arguments (\`<option:str..>\`) passed 0`)
        }
        if(args[1] === "add"){
            if(!args[2]){
                return message.channel.send(`Configuration option **filterwords** requires 2 arguments (\`<option:str..>\`) passed 1`)
            }
            var word = args[2]
            if(guildConfig.filterwords.includes(word)){
                return message.channel.send(`${utils.fail} That word is already a filter word.`)
            }
            if(word === ""){
                return message.channel.send(`${utils.fail} Cannot convert ${args[2]} into \`str\``)
              }
              if(word === undefined){
                return message.channel.send(`${utils.fail} Cannot convert ${args[2]} into \`str\``)
              }
            fireboat.configuration.push(message.guild.id, word, args[0])
            message.channel.send(`${utils.success} Added \`${word}\` as a filter word.`)
            if(guildConfig.minorlogchannel !== "0"){
                logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
            }
        }
        if(args[1] === "remove"){
            if(!args[2]){
                return message.channel.send(`Configuration option **filterwords** requires 2 arguments (\`<option:str..>\`) passed 1`)
            }
            let word = args[2]
            if(!guildConfig.filterwords.includes(word)){
                return message.channel.send(`${utils.fail} That word is not a filter word.`)
            }
            fireboat.configuration.remove(message.guild.id, word, args[0])
            message.channel.send(`${utils.success} Removed \`${word}\` as a filter word.`)
            if(guildConfig.minorlogchannel !== "0"){
                logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
            }
        }
    }
    if(args[0] === "modlogchannel"){
        if(!args[1]){
            return message.channel.send(`Configuration option **modlogchannel** requires 1 argument (\`<channel|snowflake..>\`) passed 0`)
        }
        let thechannel = message.mentions.channels.first() || fireboat.channels.get(args[1])
        if(!thechannel){
            return message.channel.send(`${utils.fail} Cannot convert ${args[1]} into \`channel\``)
        }
        if(guildConfig.modlogchannel === thechannel.id){
            return message.channel.send(`${utils.fail} That is already the mod log channel.`)
        }
        fireboat.configuration.set(message.guild.id, thechannel.id, args[0])
        message.channel.send(`${utils.success} Set mod log channel to \`${thechannel.id}\``)
        if(guildConfig.minorlogchannel !== "0"){
            logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
        }
    }
    if(args[0] === "censorchannel"){
        if(!args[1]){
            return message.channel.send(`Configuration option **censorchannel** requires 1 argument (\`<channel|snowflake..>\`) passed 0`)
        }
        let thechannel = message.mentions.channels.first() || fireboat.channels.get(args[1])
        if(!thechannel){
            return message.channel.send(`${utils.fail} Cannot convert ${args[1]} into \`channel\``)
        }
        if(guildConfig.censorchannel === thechannel.id){
            return message.channel.send(`${utils.fail} That is already the censor channel.`)
        }
        fireboat.configuration.set(message.guild.id, thechannel.id, args[0])
        message.channel.send(`${utils.success} Set censor log channel to \`${thechannel.id}\``)
        if(guildConfig.minorlogchannel !== "0"){
            logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
        }
    }
    if(args[0] === "minorlogchannel"){
        if(!args[1]){
            return message.channel.send(`Configuration option **minorlogchannel** requires 1 argument (\`<channel|snowflake..>\`) passed 0`)
        }
        let thechannel = message.mentions.channels.first() || fireboat.channels.get(args[1])
        if(!thechannel){
            return message.channel.send(`${utils.fail} Cannot convert ${args[1]} into \`channel\``)
        }
        if(guildConfig.minorlogchannel === thechannel.id){
            return message.channel.send(`${utils.fail} That is already the minor log channel.`)
        }
        fireboat.configuration.set(message.guild.id, thechannel.id, args[0])
        message.channel.send(`${utils.success} Set minor log channel to \`${thechannel.id}\``)
        if(guildConfig.minorlogchannel !== "0"){
            logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
        }
    }
    if(args[0] === "selfroles"){
        if(!args[1]){
            return message.channel.send(`Configuration option **selfroles** requires 2 arguments (\`<option:role|snowflake..>\`) passed 0`) 
        }
        if(args[1] === "add"){
            if(!args[2]){
                return message.channel.send(`Configuration option **selfroles** requires 2 arguments (\`<option:role|snowflake..>\`) passed 1`)
            }
            var srole = message.mentions.roles.first() || message.guild.roles.get(args[2])
            if(!srole){
                return message.channel.send(`${utils.fail} Cannot convert ${args[2]} into \`role\``)
            }
            if(guildConfig.selfroles.includes(srole.id)){
                return message.channel.send(`${utils.fail} That role is already a self-assignable role.`)
            }
            fireboat.configuration.push(message.guild.id, srole.id, args[0])
            message.channel.send(`${utils.success} Added a selfrole \`${srole.id}\``)
            if(guildConfig.minorlogchannel !== "0"){
                logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
            }
        }
        if(args[1] === "remove"){
            if(!args[2]){
                return message.channel.send(`Configuration option **selfroles** requires 2 arguments (\`<option:role|snowflake..>\`) passed 1`)
            }
            var srole = message.mentions.roles.first() || message.guild.roles.get(args[2])
            if(!srole){
                return message.channel.send(`${utils.fail} Cannot convert ${args[2]} into \`role\``)
            }
            if(!guildConfig.selfroles.includes(srole.id)){
                return message.channel.send(`${utils.fail} That role is not a self-assignable role.`)
            }
            fireboat.configuration.remove(message.guild.id, srole.id, args[0])
            message.channel.send(`${utils.success} Removed a selfrole \`${srole.id}\``)
            if(guildConfig.minorlogchannel !== "0"){
                logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
            }
        }
    }
    if(args[0] === "autorole"){
        if(!args[1]){
            return message.channel.send(`Configuration option **autorole** requires 2 arguments (\`<option:role|snowflake..>\`) passed 0`) 
        }
        let arole = message.mentions.roles.first() || message.guild.roles.get(args[1])
        if(!arole){
            return message.channel.send(`${utils.fail} Cannot convert ${args[1]} into \`role\``)
        }
        if(guildConfig.autorole === arole.id){
            return message.channel.send(`${utils.fail} That role is already the autorole.`)
        }
        fireboat.configuration.set(message.guild.id, arole.id, args[0])
        message.channel.send(`${utils.success} Set the autorole as \`${arole.id}\``)
        if(guildConfig.minorlogchannel !== "0"){
            logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
        }
    }
    if(args[0] === "welcomemsg"){
        if(!args[1]){
            return message.channel.send(`Configuration option **welcomemsg** requires 1 argument (\`<string..>\`) passed 0`) 
        }
        let wmessage = args.slice(1).join(" ")
        fireboat.configuration.set(message.guild.id, wmessage, args[0])
        message.channel.send(`${utils.success} Set the welcomemsg as \`${wmessage}\``)
        if(guildConfig.minorlogchannel !== "0"){
            logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
        }
    }
    if(args[0] === "welcomechannel"){
        if(!args[1]){
            return message.channel.send(`Configuration option **welcomechannel** requires 1 argument (\`<channel|snowflake..>\`) passed 0`)
        }
        let thechannel = message.mentions.channels.first() || fireboat.channels.get(args[1])
        if(!thechannel){
            return message.channel.send(`${utils.fail} Cannot convert ${args[1]} into \`channel\``)
        }
        if(guildConfig.welcomechannel === thechannel.id){
            return message.channel.send(`${utils.fail} That is already the welcomechannel.`)
        }
        fireboat.configuration.set(message.guild.id, thechannel.id, args[0])
        message.channel.send(`${utils.success} Set welcomechannel to \`${thechannel.id}\``)
        if(guildConfig.minorlogchannel !== "0"){
            logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
        }
    }
    if(args[0] === "modules"){
        if(!args[1]){
            let modulesembed = new Discord.RichEmbed()
            .setTitle(`Fireboat Moderation Modules`)
            .setDescription(`**swearFilter:** ${guildConfig.swearfilter}\nDoesn't let users swear or say any words you have added as filter words.\n\n**antiSpam:** ${guildConfig.antispam}\nDoesn't let people to spam messages repeatedly.\n`)
            .setColor("#ff6e00")
            .setFooter("Enable/disable any module with the !configure command")
            message.channel.send(modulesembed)
        }
    }
    if(args[0] === "show"){
        let showembed = new Discord.RichEmbed()
        .setTitle(`${message.guild.name}'s Configuration`)
        .setDescription(`\`\`\`ruby\nPrefix: ${guildConfig.prefix}\nModroles: ${guildConfig.modroles}\nMuterole: ${guildConfig.muterole}\nFilterwords: ${guildConfig.filterwords}\nModlogchannel: ${guildConfig.modlogchannel}\nCensorchannel: ${guildConfig.censorchannel}\nMinorlogchannel: ${guildConfig.minorlogchannel}\nSelfroles: ${guildConfig.selfroles}\nAutorole: ${guildConfig.autorole}\nWelcomemsg: ${guildConfig.welcomemsg}\nWelcomechannel: ${guildConfig.welcomechannel}\`\`\``)
        .setColor("#ff6e00")
        .setFooter("Edit any option with the !configure command")
        message.channel.send(showembed)
        if(guildConfig.minorlogchannel !== "0"){
            logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
        }
    }
}

module.exports.help = {
  name: "configure"
}