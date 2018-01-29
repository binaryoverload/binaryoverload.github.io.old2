var commands = {
    clear: {
        help: "Clears the terminal",
        callback: function(terminal) {
            terminal.clear();
        },
        display: true
    },
    help: {
        help: "",
        callback: helpCommand
    },
    flarebot: {
        help: "Super cool thing ;)",
        callback: function(terminal) {
            terminal.echo("FlareBot is some super cool shit, check it out here: https://flarebot.stream");
        },
        display: true
    }
};


jQuery(function($, undefined) {
    $('#terminal').terminal(function(command) {
        if (command !== '') {
            if (commands[command] !== undefined) {
                commands[command].callback(this);
            }
        } else {
           this.echo('');
        }
    }, {
        completion: Object.keys(commands),
        greetings: " ____  _                         ____                 _                 _ \n" +
                   "|  _ \\(_)                       / __ \\               | |               | |\n" + 
                   "| |_) |_ _ __   __ _ _ __ _   _| |  | __   _____ _ __| | ___   __ _  __| |\n" +
        "|  _ <| | '_ \\ / _` | '__| | | | |  | \\ \\ / / _ | '__| |/ _ \\ / _` |/ _` |\n" + 
        "| |_) | | | | | (_| | |  | |_| | |__| |\\ V |  __| |  | | (_) | (_| | (_| |\n" +
        "|____/|_|_| |_|\\__,_|_|   \\__, |\\____/  \\_/ \\___|_|  |_|\\___/ \\__,_|\\__,_|\n" +
        "                           __/ |                                          \n" +
        "                          |___/                                           \n" +
        "[[b;;]Full-time student, programmer and tech enthusiast. Currently working on FlareBot]\n\n" + 
        "Type [[b;lightblue;]whoami] to get information about me or [[b;lightblue;]help] to see all the commands you can do!",
        name: 'binaryoverload',
        height: "100%",
        width: "100%",
        prompt: '> ',
        clear: false,
        exit: false    
    });
});

function helpCommand(terminal) {
    var commandsArray = Object.keys(commands);
    for (var i = 0; i < commandsArray.length; i++) {
        if (!commands[commandsArray[i]].display) continue;
        terminal.echo(formatCommand(maxCommandLength(), commandsArray[i], commands[commandsArray[i]].help));
    }
}

function remove(array, element) {
    var index = array.indexOf(element);
    
    if (index !== -1) {
        array.splice(index, 1);
    }
}

function maxCommandLength() {
    var maxLength = 0;
    for (var i = 0; i < Object.keys(commands).length; i++) {
        var command = Object.keys(commands)[i];
        maxLength = Math.max(command.length, maxLength);
    }
    return maxLength;
}

function formatCommand(maxLength, command, help) {
    return "[[;green;]" + command + "]" + " ".repeat((maxLength - command.length) + 5) + help;
}
