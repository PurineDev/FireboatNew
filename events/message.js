const moment = require("moment")

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
  "autorole": "0"
};

const DefaultStarboard = {
  "starboardchannel": "0",
  "starboardblocked": [],
  "starboardmessages": [],
  "starboardstatus": "locked",
  "starcount": "0"
};

const DefaultBotconfig = {
  "whitelist": []
}

module.exports = async (fireboat, message, db) => {
  let now = new Date()
  const FireboatConfig = fireboat.boatconfig.ensure("fireboat", DefaultBotconfig)
 // if(!FireboatConfig.whitelist.includes(message.guild.id)){
 //   message.guild.leave()
 //}
  const guildConfig = fireboat.configuration.ensure(message.guild.id, defaultConfig)
  const GuildStarboard = fireboat.starboard.ensure(message.guild.id, DefaultStarboard)
  if(message.author.bot) return;
  if(message.content.includes("https://discord.gg/" || "http://discord.gg/")){
    if(!guildConfig.modroles.some(roles => message.member.roles.has(roles))){
      message.delete()
      if(guildConfig.censorchannel === "0"){
        return
      }
      if(guildConfig.censorchannel !== "0"){
        let censorc = fireboat.channels.get(guildConfig.censorchannel)
        censorc.send(`\`[${moment(now).format("HH:mm:ss")}]\` :no_entry_sign: Censored message by ${message.author.tag} (\`${message.author.id}\`) in ${message.channel} (\`${message.channel.id}\`) found invite link:\n\`\`\`${message.content}\`\`\``)
      }
    }
  }
  if(guildConfig.filterwords.some(word => message.content.toLowerCase().includes(word))){
    if(guildConfig.modroles.some(roles => message.member.roles.has(roles))){
      let prefix = guildConfig.prefix
    if(message.content.indexOf(prefix) !== 0) return;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0];
    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    let commandfile = fireboat.commands.get(cmd.slice(prefix.length));
    if(commandfile) commandfile.run(fireboat, message, args, guildConfig, GuildStarboard, FireboatConfig, modlog, minorlog)
    return;
    }
    if(!guildConfig.modroles.some(roles => message.member.roles.has(roles))){
      message.delete()
      if(guildConfig.censorchannel === "0"){
        return
      }
      if(guildConfig.censorchannel !== "0"){
        let censorc = fireboat.channels.get(guildConfig.censorchannel)
        censorc.send(`\`[${moment(now).format("HH:mm:ss")}]\` :no_entry_sign: Censored message by ${message.author.tag} (\`${message.author.id}\`) in ${message.channel} (\`${message.channel.id}\`) found blacklisted words:\n\`\`\`${message.content}\`\`\``)
      }
    }
  }
  let prefix = guildConfig.prefix
  if(message.content.indexOf(prefix) !== 0) return;
  let messageArray = message.content.split(" ");
  let cmd = messageArray[0];

  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const command = args.shift().toLowerCase();

  let commandfile = fireboat.commands.get(cmd.toLowerCase().slice(prefix.length));
  if(commandfile) commandfile.run(fireboat, message, args, guildConfig, GuildStarboard, FireboatConfig)
  }