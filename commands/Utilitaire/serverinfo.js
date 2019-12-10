const { RichEmbed } = require('discord.js');

module.exports.run = (bot, message, args, functions) => {
  // define informations
  var info = {
    name: message.guild.name,
    id: message.guild.id,
    members: message.guild.members.size,
    bots: message.guild.members.filter(m => m.user.bot).size,
    humans: message.guild.members.size - message.guild.members.filter(m => m.user.bot).size,
    onlines: message.guild.members.filter(m => m.presence.status !== "offline").size,
    roles: message.guild.roles.size - 1,
    textuals: message.guild.channels.filter(c => c.type === "text").size,
    voices: message.guild.channels.filter(c => c.type === "voice").size,
    channels: message.guild.channels.filter(c => c.type === "voice").size + message.guild.channels.filter(c => c.type === "text").size,
    region: functions.capital(message.guild.region),
    pdp: message.guild.iconURL
  };

  // RichEmbed

  var embed = new RichEmbed()
  .setAuthor(info.name, info.pdp)
  .setColor("#b80754")
  .addField("Nom", info.name, true)
  .addField("ID", info.id, true)
  .addField("Membre(s)", info.members, true)
  .addField("Bot(s)", info.bots, true)
  .addField("Humain(s)", info.humans, true)
  .addField("En ligne(s)", info.onlines, true)
  .addField("Rôle(s)", info.roles, true)
  .addField("Salon(s) textuel(s)", info.textuals, true)
  .addField("Salon(s) vocal(aux)", info.voices, true)
  .addField("Salon(s)", info.channels, true)
  .addField("Région", info.region)
  .setThumbnail(info.pdp)
  .setFooter("Effectuée le", message.author.displayAvatarURL)
  .setTimestamp();
  message.channel.send(embed);
}

module.exports.help = {
  name: "serverinfo",
  category: "Utilitaire",
  aliases: ["si", "server"],
  description: "Affiche les informations concernant le serveur courant."
}
