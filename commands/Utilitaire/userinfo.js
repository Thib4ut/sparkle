const { RichEmbed } = require('discord.js');
const error = require("../../functions.js");

module.exports.run = async (bot, message, args) => {
  // je défini la variable member pour voir s'il y a eu une mention de faite
  var member = message.mentions.members.first();
  // je vérifi si une mention a été mise

  if (!member) {
    // SI pas de mention
    let embed = new RichEmbed()
    .setAuthor(`${message.author.tag}`, message.author.displayAvatarURL)
    .setColor("#b80754")
    .addField("Nom", message.author)
    .addField("ID", message.author.id)
    .addField("Rôles", `**${message.member.roles.size - 1}** rôle(s).`)
    .addField("Meilleur rôle", message.member.highestRole.name.replace("@everyone", "Aucun."))
    .addField("Statut", `${message.author.presence.status.replace("dnd", "Ne pas déranger.").replace("idle", "Inactif.").replace("offline", "Hors ligne.").replace("online", "En ligne.")}`)
    .setFooter("Effectuée le", message.author.displayAvatarURL)
    .setThumbnail(message.author.displayAvatarURL)
    .setTimestamp();
    message.channel.send(embed);
  } else {
    // Si ça a été mentionné
    let informations = {
      name: member.user,
      tag: member.user.tag,
      id: member.user.id,
      roles: member.roles.size - 1, // -1 car le rôle @everyone est compté;
      highest_role: member.highestRole.name.replace("@everyone", "Aucun."),
      pdp: member.user.displayAvatarURL,
      status: member.presence.status.replace("dnd", "Ne pas déranger.").replace("idle", "Inactif.").replace("offline", "Hors ligne.").replace("online", "En ligne.")
    }
    // SI l'utilisateur est un robot
    if (informations.name.bot) return message.channel.send(error("L'utilisateur mentionné n'est pas humain. Or, vous devez mentionner quelqu'un d'humain.", bot.user.displayAvatarURL, message.author.displayAvatarURL));
    // SINON
    let embed = new RichEmbed()
    .setAuthor(`${informations.tag}`, informations.pdp)
    .setColor("#b80754")
    .addField("Nom", informations.name)
    .addField("ID", informations.id)
    .addField("Rôles", `**${informations.roles}** rôle(s).`)
    .addField("Meilleur rôle", informations.highest_role)
    .addField("Statut", `${informations.status}`)
    .setFooter("Effectuée le", informations.pdp)
    .setThumbnail(informations.pdp)
    .setTimestamp();
    message.channel.send(embed);
  }
}

module.exports.help = {
  name: "userinfo",
  aliases: ["user", "ui"],
  category: "Utilitaire",
  description: "Affiche les informations de l'utilisateur mentiionné (si jamais aucune mentions n'est faite, cela retourne vos informations)",
  usage: "(@membre)"
}
