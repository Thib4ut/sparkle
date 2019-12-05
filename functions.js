function error (msg) {
  let { RichEmbed } = require('discord.js')
  let ErrorEmbeding = new RichEmbed()
  .setAuthor("Une erreur est survenue")
  .setColor("#ff0000")
  .setFooter("Envoyée le")
  .setTimestamp()
  .setDescription(msg)
  return ErrorEmbeding;
}

module.exports = error;
