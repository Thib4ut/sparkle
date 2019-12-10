const { Client, Collection } = require('discord.js');
const { readdirSync } = require("fs");
const { sep } = require("path");
const { success, error, warning } = require("log-symbols");
const functions = require('./functions');
const low = require('lowdb');
const FileSync = require('lowdb/adapters/FileSync');
const adapt = new FileSync("database.json");
const db = low(adapt);

const config = require("./config/config");

const bot = new Client();

bot.config = config;

["commands", "aliases"].forEach(x => bot[x] = new Collection());

const loading = (dir = "./commands/") => {
  readdirSync(dir).forEach(dirs => {
    const commands = readdirSync(`${dir}${sep}${dirs}${sep}`).filter(files => files.endsWith('.js'));

    for (const file of commands) {
      const pull = require(`${dir}/${dirs}/${file}`);

      if (pull.help && typeof (pull.help.name) === "string" && typeof (pull.help.category) === "string") {
        if (bot.commands.get(pull.help.name)) return console.warn(`${warning} | Deux commandes ont le même noms, or deux commandes ne peuvent avoir le même nom.`);
        bot.commands.set(pull.help.name, pull);
        console.log(`${success} | La commande ${pull.help.name} a bien été lancée.`);
      } else {
        console.error(`${error} | Impossibilité de lancer cette commande provenant de ${dir}/${dirs}/${file} puisque cette commande n'a pas eu de nom ou de catégorie définie au préalable.`)
        continue;
      }

      if (pull.help.aliases && typeof (pull.help.aliases) === "object") {
        pull.help.aliases.forEach(alias => {
          if (bot.aliases.get(alias)) return console.warn(`${warning} | Deux commandes ont un alias commun, or deux commandes ne peuvent avoir le même alias.`);
          bot.aliases.set(alias, pull.help.name);
        });
      }
    }
  })
}

loading();

bot.on('ready', () => {
  setInterval(() => {
    bot.user.setActivity(`${bot.guilds.size} serveur(s).`, { type: "WATCHING" });
    setTimeout(() => {
      bot.user.setActivity(`${bot.users.size} utilisateur, puis bessoin d'aide ? Faite ${bot.config.prefix}help.`, { type: "WATCHING" })
    }, 30000)
  }, 60000)
  console.log(`Je suis lancé! Mon prefix est ${bot.config.prefix}.`);
});

bot.on('message', async message => {
  const prefix = bot.config.prefix;
  const args = message.content.slice(prefix.length).trim().split(/ +/g);
  const cmd = args.shift().toLowerCase();

  let command;

  if (!message.guild || message.author.bot) return;

  if (!message.member) message.member = await message.guild.fetchMember(message.author);

  if (!message.content.startsWith(prefix)) return;

  if (cmd.length === 0) return;
  if (bot.commands.has(cmd)) command = bot.commands.get(cmd);
  else if (bot.aliases.has(cmd)) command = bot.commands.get(bot.aliases.get(cmd));

  if (command) command.run(bot, message, args, functions, db);
});

bot.login(bot.config.token).catch(console.error());
