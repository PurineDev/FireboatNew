    function modlog(logmessage){
        if(guildConfig.modlogchannel !== "0"){
          fireboat.channels.get(guildConfig.modlogchannel).send(logmessage).then().catch(err => console.error(err))
          }
        }
        function minorlog(logmessage){
          if(guildConfig.minorlogchannel !== "0"){
            fireboat.channels.get(guildConfig.minorlogchannel).send(logmessage).then().catch(err => console.error(err))
            }
          }

module.exports = minorlog, modlog