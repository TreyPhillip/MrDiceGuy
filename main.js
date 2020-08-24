const Discord = require('discord.js');
const client = new Discord.Client();
const prefix = '!';
const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

client.once('ready', () => {
	console.log('MrDiceGuy is online!');
});

client.on('message', (message) => {
	if (!message.content.startsWith(prefix) || message.author.bot) {
		return;
	}
	const args = message.content.slice(prefix.length).split(/ +/);
	const command = args.shift().toLowerCase();
	var diceRegex = /[1-9]?[1-9]?[1-9]?d[1-9][1-9]?[1-9]?/;
	if (command === 'ping') {
		client.commands.get('ping').execute(message, args);
	} else if (command == 'youtube') {
		client.commands.get('youtube').execute(message, args);
	} else if (diceRegex.exec(command)) {
		client.commands.get('dice').execute(message, args, command);
	}
});

client.login('NzQ2ODI4NzAzMDM1ODE4MDY4.X0GAbg.IAqEoJWaYkus3VYMSXvKRvm3dTA');
