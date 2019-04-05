const DefaultBotconfig = {
    "whitelist": []
  }

module.exports = (fireboat, guild) => {
    const FireboatConfig = fireboat.boatconfig.ensure("fireboat", DefaultBotconfig)
   // if(!FireboatConfig.whitelist.includes(guild.id)){
   //    guild.leave() 
   // }
  }