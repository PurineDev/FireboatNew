

module.exports.run = async(fireboat, message, args, guildConfig) => {

    fireboat.guilds.forEach(guild => {
        fireboat.configuration.set(guild.id, "Off", "antispam")
    })
    message.channel.send(`Initialised \`antispam\` configuration option, edited database: \`added\` for ${fireboat.guilds.size} guilds!`)
}

module.exports.help = {
    name: "init"
}