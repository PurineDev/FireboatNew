"use strict";
const Discord = require("discord.js");
const fireboat = new Discord.Client();
const config = require("./config.json");
const fs = require("fs");
const Enmap = require("enmap");
const db = require("./sql.js");

fireboat.commands = new Enmap();
fireboat.config = config;

fireboat.configuration = new Enmap({
    name: "config",
    fetchAll: false,
    autoFetch: true,
    cloneLevel: 'deep'
  });

fireboat.starboard = new Enmap({
  name: "starboards",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: "deep"
});

fireboat.boatconfig = new Enmap({
  name: "botconfig",
  fetchAll: false,
  autoFetch: true,
  cloneLevel: "deep"
})

fs.readdir("./commands/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      if (!file.endsWith(".js")) return;
      let props = require(`./commands/${file}`);
      let commandName = file.split(".")[0];
      fireboat.commands.set(commandName, props);
    });
  });

  fs.readdir("./events/", (err, files) => {
    if (err) return console.error(err);
    files.forEach(file => {
      const event = require(`./events/${file}`);
      let eventName = file.split(".")[0];
      fireboat.on(eventName, event.bind(null, fireboat));
    });
  });

  process.on('unhandledRejection', err => {
    console.error(`Uncaught Promise Rejection: \n${err.stack}`)
  });


fireboat.login(fireboat.config.token)
