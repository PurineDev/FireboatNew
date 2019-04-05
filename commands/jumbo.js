const jimp = require("jimp");
const twemoji = require("twemoji");
const snek = require("snekfetch");
const mg = require("merge-img");
const resizeImg = require("resize-img");
const moment = require("moment");

const discordJumbo = async (emoji, type) => {
  let url = `https://cdn.discordapp.com/emojis/${emoji}.${type}`
  var { body: buffer } = await snek.get(`${url}`)
  if(type === "png") {
   return {
     buffer: await resizeImg(buffer, {width: 72, height: 72}),
     type
   }
  } else {
   return {
     buffer,
     type
   }
  }
 }
 
 const twemojiJumbo = async (emoji) => {
     var twemote = twemoji.parse(emoji);
     let twregex = /src="(.+)"/g;
     var regtwemote = twregex.exec(twemote)[1];
     var { body: buffer } = await snek.get(`${regtwemote}`);
     return buffer
 }

module.exports.run = async (fireboat, message, args, guildConfig, GuildStarboard, FireboatConfig) => {
  const now = new Date()
  const logchannel = fireboat.channels.get(guildConfig.minorlogchannel)
  if(args.length === 1){
    if(args[0].startsWith("<")){
      let type
      let id = args[0].split(":")[2].slice(0, -1)
      if(args[0].split(":")[0].endsWith("a")) {
        type = "gif"
      } else {
        type = "png"
      }
      let jumbo = await discordJumbo(id, type)
      message.channel.send(jumbo.buffer)
    } else {
      let buffer = await twemojiJumbo(args[0])
      message.channel.send(buffer)
    }
  } else {
    var buf = []
  for (emoji of args) {
    if(emoji.startsWith("<")) {
          let id = emoji.split(":")[2].slice(0, -1)
          let buffer = await discordJumbo(id, "png")
          buf.push(buffer.buffer)
        } else {
          let buffer = await twemojiJumbo(emoji)
          buf.push(buffer)
        }
  }

   mg(buf).then((img) => {
     img.getBuffer("image/png", (err, buf) => {
       if(err) {
         message.channel.send(err)
         throw err
       }
       message.channel.send(buf)
     })
   })
  }
}

module.exports.help = {
  name: "jumbo"
}