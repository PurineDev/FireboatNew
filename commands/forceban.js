const utils = require("../utils.js");
const Discord = require("discord.js");
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
        return message.channel.send(`Command **forceban** requires 1 argument (\`<snowflake:[reason]..>\`) passed 0`)
    }
    var reason = args.slice(1).join(" ");
    var person = args[0]
    var now = new Date()
    if(!reason){
        message.guild.fetchBans()
        .then(bans => {
            if (bans.has(person)){
                return message.channel.send(`${utils.fail} That user is already banned.`)
            }
            message.guild.ban(person, reason)
                .then( async (member) => {
                  let user;
                if( member instanceof Discord.GuildMember ){
                    user = member.user;
                }
                else if( member instanceof Discord.User ){
                    user = member;
                }
                else{
                    user = await fireboat.fetchUser(member);
                }
              db.run(`INSERT INTO infractions (snowflake, reason, moderator, guild, time, type) VALUES (?, ?, ?, ?, ?, ?)`, user.id, "No reason provided.", message.author.id, message.guild.id, now, "Forceban", (err) => {
            if(err) throw err;
            console.log("Infraction push successful.")
        })
                    message.channel.send(`:ok_hand: Forcebanned ${user.tag} (\`No reason provided.\`)`);
                    if(guildConfig.modlogchannel !== "0"){
                        let modchannel = fireboat.channels.get(guildConfig.modlogchannel);
                        modchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :rotating_light: ${user.tag} (\`${user.id}\`) has been forcebanned by **${message.author.tag}**: \`No reason provided.\``)
                    }
                    if(guildConfig.minorlogchannel !== "0"){
                        logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
                    }
    
                })
                .catch(error => {
                    message.channel.send(`${utils.fail} Something went wrong, perhaps try again later`);
                    console.error('Something went wrong:', error);
                });
        });
    } else {
        message.guild.fetchBans()
        .then(bans => {
            if (bans.has(person)){
                return message.channel.send(`${utils.fail} They are already banned.`)
            }
            message.guild.ban(person, reason)
                .then( async (member) => {
                  let user;
                if( member instanceof Discord.GuildMember ){
                    user = member.user;
                }
                else if( member instanceof Discord.User ){
                    user = member;
                }
                else{
                    user = await fireboat.fetchUser(member);
                }
              db.run(`INSERT INTO infractions (snowflake, reason, moderator, guild, time, type) VALUES (?, ?, ?, ?, ?, ?)`, user.id, reason, message.author.id, message.guild.id, now, "Forceban", (err) => {
            if(err) throw err;
            console.log("Infraction push successful.")
        })
                    message.channel.send(`:ok_hand: Forcebanned ${user.tag} (\`${reason}\`)`);
                    if(guildConfig.modlogchannel !== "0"){
                        let modchannel = fireboat.channels.get(guildConfig.modlogchannel);
                        modchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :rotating_light: ${user.tag} (\`${user.id}\`) has been forcebanned by **${message.author.tag}**: \`${reason}\``)
                    }
                    if(guildConfig.minorlogchannel !== "0"){
                        logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
                    }
    
                })
                .catch(error => {
                    message.channel.send(`${utils.fail} Something went wrong, perhaps try again later`);
                    console.error('Something went wrong:', error);
                });
        });
    }
        
}

module.exports.help = {
  name: "forceban"
}