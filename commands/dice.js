module.exports = {
	name: 'dice',
	description: 'roll a dice based on input',
	execute(message, args, command) {
		var diceRegex = /[a-zA-Z]+|[0-9]+/g;
		var total = 0;
		var result = '';
		match = command.match(diceRegex);
		if (isNaN(match[0])) {
			var random = Math.floor(Math.random() * match[1]) + 1;
			message.channel.send('```roll: ' + random + '```');
		} else {
			for (let i = 0; i < match[0]; i++) {
				var random = Math.floor(Math.random() * match[2]) + 1;
				total = total + random;
				var result = result + random + '\n';
			}
			message.channel.send('```# ' + total + '\ndetails: ' + command + '\n' + result + '```');
		}
	}
};
