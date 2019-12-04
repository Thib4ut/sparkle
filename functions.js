function error (msg, bot, command) {
  let { RichEmbed } = require('discord.js')
  let ErrorEmbeding = new RichEmbed()
  .setAuthor("Une erreur est survenue", bot)
  .setColor("#ff0000")
  .setFooter("Envoyée le", command)
  .setTimestamp()
  .setDescription(msg)
  return ErrorEmbeding;
}

module.exports = error;
