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

function setCapitalize (word) {
  let split = word.split("");
  // récup la première lettre
  let firstLetter = split[0];

  return split.join('').replace(firstLetter, firstLetter.toUpperCase());
}

module.exports = {
  err: error,
  capital: setCapitalize
}
