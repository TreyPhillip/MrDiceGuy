const Discord = require('discord.js');
const client = new Discord.Client();
const { token, prefix } = require('./config.json');
const fs = require('fs');

client.commands = new Discord.Collection();

const commandFiles = fs.readdirSync('./commands/').filter((file) => file.endsWith('.js'));
for (const file of commandFiles) {
	const command = require(`./commands/${file}`);
	client.commands.set(command.name, command);
}

// once the bot is ready, send a confirmation to the console
client.once('ready', () => {
	console.log('MrDiceGuy is online!');
});

// triggers when a message is sent
client.on('message', (message) => {
	// check for the prefix at the beginning of the message
	// if the prefix is not there, do nothing
	if (!message.content.startsWith(prefix) || message.author.bot) {
		return;
	}
	// where to splice the messageto get the arguments.
	// Currently a Space
	const args = message.content.slice(prefix.length).split(/ +/);
	// put all args to lowercase then into a const.
	const command = args.shift().toLowerCase();
	// regex for the dice functionality.
	var diceRegex = /[1-9]?[1-9]?[1-9]?d[1-9][1-9]?[1-9]?/;

	// if the command matches the regex, execute the dice command
	if (diceRegex.exec(command)) {
		client.commands.get('dice').execute(message, args, command);
	} else {
		// if the command does not exist, do nothing
		if (!client.commands.has(command)) {
			return;
		}
		// attempt to execute the command and return an error if it fails
		try {
			client.commands.get(command).execute(message, args);
		} catch (error) {
			console.error(error);
			message.reply('there was an error trying to execute that command!');
		}
	}
});

client.login(token);
