const utils = require("../utils.js");
const moment = require("moment");

module.exports.run = async (fireboat, message, args, guildConfig, GuildStarboard, FireboatConfig, db) => {
  var logchannel = fireboat.channels.get(guildConfig.minorlogchannel)
  var now = new Date()
    if(args[0] === "coin"){
  var options = ["heads", "tails"];
  let rand = options[Math.floor(Math.random() * options.length)];
  message.channel.send(rand)
  if(guildConfig.minorlogchannel !== "0"){
    logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
        }
    }
    if(args[0] === "number"){
      if(!args[1]){
        function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      var rn = getRandomInt(0, 10)
      message.channel.send(`${rn}`)
      if(guildConfig.minorlogchannel !== "0"){
        logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
            }
      }

      if(args[1]){
        if(!args[2]){
          return message.channel.send(`Command **random** requires 3 arguments (\`<option:int:int..>\`) passed 2`)
        }
        if(isNaN(args[1])){
          return message.channel.send(`${utils.fail} Cannot convert ${args[1]} into \`integer\``)
        }
        if(isNaN(args[2])){
          return message.channel.send(`${utils.fail} Cannot convert ${args[2]} into \`integer\``)
        }
        var firstInt = parseInt(args[1]);
        var secondInt = parseInt(args[2]);
        function getRandomInt(min, max) {
          return Math.floor(Math.random() * (max - min + 1)) + min;
      }
      var rn = getRandomInt(firstInt, secondInt)
      message.channel.send(`${rn}`)
      if(guildConfig.minorlogchannel !== "0"){
        logchannel.send(`\`[${moment(now).format("HH:mm:ss")}]\` :wrench: ${message.author.tag} (\`${message.author.id}\`) used command in **#${message.channel.name}** \`${message.content}\``)
            }
      }
      }
}

module.exports.help = {
  name: "random"
}