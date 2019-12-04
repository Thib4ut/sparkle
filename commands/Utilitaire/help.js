const { RichEmbed } = require('discord.js');
const { readdirSync } = require("fs");

module.exports.run = (bot, message, args) => {

  const embed = new RichEmbed()
  .setAuthor(`Commande \`help\` effectuée.`, message.author.displayAvatarURL)
  .setColor("#5a83c4")
  .setFooter(`Effectuée le`, message.author.displayAvatarURL)
  .setTimestamp()
  if (args[0]) {
  let command = args[0];
  let cmd;
  if (bot.commands.has(command)) {
    cmd = bot.commands.get(command);
  }
  else if (bot.aliases.has(command)) {
    cmd = bot.commands.get(bot.aliases.get(command));
  }
  if(!cmd) return message.channel.send(embed.setTitle("Commande invalide").setDescription(`Fait \`${bot.config.prefix}help\` pour la liste des commandes.`));
  command = cmd.help;
  embed.setTitle(`${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)} command help`);
  embed.setDescription([
    `❯ **Commande:** ${command.name.slice(0, 1).toUpperCase() + command.name.slice(1)}`,
    `❯ **Description:** ${command.description || "Aucune description."}`,
    `❯ **Usage:** ${command.usage ? `\`${bot.config.prefix}${command.name} ${command.usage}\`` : "Pas d'usage"} `,
    `❯ **Aliases:** ${command.aliases ? command.aliases.join(", ") : "Aucuns"}`,
    `❯ **Categories:** ${command.category ? command.category : "Autres"}`,
  ].join("\n"));

  return message.channel.send(embed);
}
const categories = readdirSync("./commands/");
embed.setDescription([
  `Commandes disponibles pour ${bot.user.username}.`,
  `Le prefix du bot est **${bot.config.prefix}**`,
  "`<>` est une options obligatoire () est une option facultative",
].join("\n"));
categories.forEach(category => {
  const dir = bot.commands.filter(c => c.help.category.toLowerCase() === category.toLowerCase());
  const capitalise = category.slice(0, 1).toUpperCase() + category.slice(1);

  try {
    if (dir.size === 0) return;
    if (bot.config.owners.includes(message.author.id)) embed.addField(`❯ ${capitalise}`, dir.map(c => `\`${c.help.name}\``).join(", "));
    else if (category !== "Développeur") embed.addField(`❯ ${capitalise}`, dir.map(c => `\`${c.help.name}\``).join(", "));
  }
  catch (e) {
    console.log(e);
  }
});
return message.channel.send(embed);


}

module.exports.help = {
  name: "help",
  category: "Utilitaire",
  aliases: ['h', 'aide'],
  description: "Affiche la liste des commandes du bot."
}
