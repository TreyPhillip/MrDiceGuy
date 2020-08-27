module.exports = {
	name: 'dice',
	description: 'roll a dice based on input',
	execute(message, args, command) {
		var diceRegex = /[a-zA-Z]+|[0-9]+|[+-]/g;
		var total = 0;
		var diceModified = 0;
		var result = '';
		match = command.match(diceRegex);
		//if the first entry in the match array is NOT a number
		//then the format must be d? where ? is what kind of
		//dice the user would like to roll.
		if (isNaN(match[0])) {
			if (match[2] == '+') {
				var random = Math.floor(Math.random() * match[1]) + 1;
				total = parseFloat(random) + parseFloat(match[3]);
				message.channel.send('```# ' + total + '\ndetails: ' + command + '(' + random + ')```');
			} else if (match[2] == '-') {
				var random = Math.floor(Math.random() * match[1]) + 1;
				total = parseFloat(random) - parseFloat(match[3]);
				message.channel.send('```# ' + total + '\ndetails: ' + command + '(' + random + ')```');
			} else {
				var random = Math.floor(Math.random() * match[1]) + 1;
				message.channel.send('```# ' + random + '\ndetails: ' + command + '```');
			}
			//if the first entry in the match array IS a number
			//then the format must be ?d? where the first ? is the
			//number of dice to roll and the second is what kind of
			//dice the user would like to roll.
		} else {
			if (match[3] == '+') {
				for (let i = 0; i < match[0]; i++) {
					var random = Math.floor(Math.random() * match[2]) + 1;
					diceModified = parseFloat(random) + parseFloat(match[4]);
					total += diceModified;
					result += random + '(' + match[3] + match[4] + ') ';
				}
				message.channel.send('```# ' + total + '\ndetails: ' + command + '\n' + result + '```');
			} else if (match[3] == '-') {
				for (let i = 0; i < match[0]; i++) {
					var random = Math.floor(Math.random() * match[2]) + 1;
					diceModified = parseFloat(random) - parseFloat(match[4]);
					total += diceModified;
					result += random + '(' + match[3] + match[4] + ') ';
				}
				message.channel.send('```# ' + total + '\ndetails: ' + command + '\n' + result + '```');
			} else {
				for (let i = 0; i < match[0]; i++) {
					var random = Math.floor(Math.random() * match[2]) + 1;
					total += random;
					var result = result + random + ' ';
				}
				message.channel.send('```# ' + total + '\ndetails: ' + command + '\n' + result + '```');
			}
		}
	}
};
