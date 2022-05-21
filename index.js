require('dotenv').config();

const Discord = require('discord.js');
const {Intents} = require("discord.js");
const marmitonBot = new Discord.Client({ intents: [Intents.FLAGS.GUILDS, Intents.FLAGS.GUILD_MESSAGES] });
const recipe = require('./commands/recipe');


const commands = [recipe];

marmitonBot.on('ready', () => console.info('MarmitonBot has booted up!'));
marmitonBot.on('message', (message) => {
    if (message.author.id === marmitonBot.user.id) {
        return;
    }

    commands.some(function(command) {
        return command.parse(message);
    });
});

marmitonBot.login(process.env.KEY)
    .then(() => console.info('MarmitonBot logged in to server.'))
    .catch(console.error);