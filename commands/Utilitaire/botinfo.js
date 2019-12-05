const { RichEmbed } = require('discord.js');

module.exports.run = (bot, message, args) => {
  // informations
  let infos {
    name: bot.user,
    id: bot.user.id,
    servers: bot.guilds.size,
    users: bot.users.size,
    ping: Math.floor(bot.ping),
    pdp: bot.user.displayAvatarURL
  }

  // embed

  let embed = new RichEmbed()
  .setAuthor(`${infos.name.tag}`, infos.pdp)
  .setColor("#b80754")
  .addField("Nom", infos.name)
  .addField("ID", infos.id)
  .addField("Serveur(s)", `**${infos.servers}** serveur(s).`)
  .addField("Utilisateur(s)", `**${infos.users}** utilisateur(s).`)
  .addField("Ping", `🏓 Pong ! **${infos.ping} ms**`)
  .setThumbnail(infos.pdp)
  .setFooter("Effectuée le", message.author.displayAvatarURL)
  .setTimestamp();
  message.channel.send(embed);
}

module.exports.help = {
  name: "botinfo",
  category: "Utilitaire",
  aliases: ["bot", "bi"],
  description: "Affiche les informations me concernant."
}
