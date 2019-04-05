const utils = require("../utils.js");
const moment = require("moment");
const fs = require("fs");

module.exports.run = async (fireboat, message, args, guildConfig, GuildStarboard, FireboatConfig, db) => {
    var logchannel = fireboat.channels.get(guildConfig.minorlogchannel)
    var now = new Date();
    if(!args[0]){
        return message.channel.send(`Command **archive** requires 3 arguments (\`<opt:snowflake:integer..>\`) passed 0`)
    }
    if(args[0] === "channel"){
        if(!args[1]){
            return message.channel.send(`Command **archive** requires 3 arguments (\`<opt:snowflake:integer..>\`) passed 1`)
        }
        if(!args[2]){
            return message.channel.send(`Command **archive** requires 3 arguments (\`<opt:snowflake:integer..>\`) passed 2`)
        }
        if(isNaN(args[2])){
            return message.channel.send(`${utils.fail} Cannot convert ${args[1]} into \`integer\``)
        }
    let chn = message.mentions.channels.first() || message.guild.channels.find("id", args[1])
    if(!chn){
        return message.channel.send(`${utils.fail} Cannot convert ${args[1]} into \`channel\``)
    }
    let amount = parseInt(args[2])
    if(amount > 100){
        return message.channel.send(`${utils.fail} Cannot archive more than 100 messages`)
    }
    let fetchedmessages = await chn.fetchMessages({ limit: amount })
    let msgs = fetchedmessages.map(m => `[${moment(m.createdAt).format("HH:MM:ss a")}] ${m.author.tag}: ${m.content}`)
    let txtmsgs = msgs.join("\n")
    let attachment = fs.writeFileSync("archive.txt", txtmsgs)
    message.channel.send(`:ok_hand: I archived ${args[2]} messages.`, {file: "archive.txt"})
    if(guildConfig.minorlogchannel !== "0"){
        logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
    }
}
    if(args[0] === "user"){
        if(!args[1]){
            return message.channel.send(`Command **archive** requires 3 arguments (\`<opt:snowflake:integer..>\`) passed 1`)
        }
        if(!args[2]){
            return message.channel.send(`Command **archive** requires 3 arguments (\`<opt:snowflake:integer..>\`) passed 2`)
        }
        if(isNaN(args[2])){
            return message.channel.send(`${utils.fail} Cannot convert ${args[2]} into \`integer\``)
        }
        let amount = parseInt(args[2])
        if(amount > 100){
            return message.channel.send(`${utils.fail} Cannot archive more than 100 messages`)
        }
        let ffetchedmessages = await message.channel.fetchMessages({ limit: amount });
        let ffiltered = ffetchedmessages.filter(m => m.author.id === args[1]);
        let mmsgs = ffiltered.map(m => `[${moment(m.createdAt).format("HH:MM:ss a")}] ${m.author.tag}: ${m.content}`);
        let ttxtmsgs = mmsgs.join("\n");
        let attachment = fs.writeFileSync("archive.txt", ttxtmsgs)
        message.channel.send(`:ok_hand: I archived ${args[2]} messages.`, {file: "archive.txt"})
    if(guildConfig.minorlogchannel !== "0"){
        logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
    }
    }
}

module.exports.help = {
  name: "archive"
}