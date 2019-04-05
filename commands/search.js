const utils = require("../utils.js");
const moment = require("moment");

module.exports.run = async (fireboat, message, args, guildConfig, GuildStarboard, FireboatConfig, db) => {
    var logchannel = fireboat.channels.get(guildConfig.minorlogchannel)
    var now = new Date()
  if(!args[0]){
    return message.channel.send(`Command **search** requires 1 argument (\`<query..>\`) passed 0`)
  }
  var query = args.slice(0).join(" ");
  var queries = fireboat.users.filter(m => m.username.toLowerCase().includes(query.toLowerCase()));
  var msgquery = queries.map(m => `${m.username}#${m.discriminator} (${m.id})`)
  var queryresults = msgquery.join("\n");
  if(queryresults.length >= 2000){
      let amount = queryresults.length - 2000;
      let content = queryresults.slice(0, amount);
      message.channel.send(`Found the following users for your query:\n\`\`\`${content}\`\`\``)
  }
  message.channel.send(`Found the following users for your query:\n\`\`\`${queryresults}\`\`\``)
  if(guildConfig.minorlogchannel !== "0"){
    logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
}
}

module.exports.help = {
  name: "search"
}