module.exports = {
	name: 'author',
	description: 'this command returns info on the bot author',
	execute(message, args) {
		message.channel.send('My Website: https://treyphillip.github.io');
	}
};
