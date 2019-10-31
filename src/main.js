// The folliwing 3 lines are just grabbing necassary things for discord bots.
var Discord = require('discord.io');   // This is grabbing a reference to the Discord API object (I assume)
var logger = require('winston');       // This is grabbing a logging library called 'winston' (that's what those logger.info() lines are from)
var auth = require('../../auth.json'); // This is grabbing the file with the bot token in it. It is cleverly placed outside of the repo so people can't control my bot (I will have to give this to you)

/*
    This is winston (the logging library) getting setup.
    I don't know anything about winston so I don't real-
    ly know what the purpose of these lines are, but it 
    would probably be pretty easy to figure out just by 
    googling about winston.
*/
// Configure logger settings
logger.remove(logger.transports.Console);
logger.add(new logger.transports.Console, {
    colorize: true
});
logger.level = 'debug';

/*
    This is the discord bot getting setup. I'm also
    not very versed on how this works, but I'm sure
    that with a cursory google search it'd be pret-
    ty easy to figure out what this is doing.
*/
// Initialize Discord Bot
var bot = new Discord.Client({
   token: auth.token,
   autorun: true
});

/*
    This is the ready event for the discord bot. Looks like
    it just prints some info so we know it gets connected.
    I'm sure a list of available events for discord bots is
    probably available online somewhere.
*/
bot.on('ready', function (evt) {
    logger.info('Connected');
    logger.info('Logged in as: ');
    logger.info(bot.username + ' - (' + bot.id + ')');
});

/*
    This is the message event for the bot. This is where the meat of
    the code will probably live. Don't be afraid to define code in
    seperate functions and then call those in this method to try and
    keep it tidy!
*/
bot.on('message', function (user, userID, channelID, message, evt) {
    // Our bot needs to know if it will execute a command
    // It will listen for messages that will start with `!`
    if (message.substring(0, 1) == '!') {
        var args = message.substring(1).split(' ');
        var cmd = args[0];
       
        args = args.splice(1);
        switch(cmd) {
            // !ping
            case 'ping':
                /*
                    This is JSON. That's just a fancy acronym to say this is how you make an object in JavaScript.
                    A JS object is basically just a map. If sendMessage returns a Message object you would
                    extract the message property by doing Message.message very similar to C# or Java, the
                    class creation just looks different. If you search about JSON you'll learn all sorts of stuff.
                */
                bot.sendMessage({
                    to: channelID,
                    message: 'Pong!'
                });
            break;
            // Just add any case commands if you want to..
         }
     }
});