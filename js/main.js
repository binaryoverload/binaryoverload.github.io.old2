var commands = {
    "clear": {
        "help": "Clears the terminal",
        "callback": function(terminal) {
            terminal.clear();
        }
    },
    "help": {
        "help": "",
        "callback": helpCommand
    }
    ,
    "helpppppppppp": {
        "help": "",
        "callback": helpCommand
    }
};


jQuery(function($, undefined) {
    $('body').terminal(function(command) {
        if (command !== '') {
            if (commands[command] !== undefined) {
                commands[command].callback(this);
            }
        } else {
           this.echo('');
        }
    }, {
        completion: Object.keys(commands),
        greetings: false,
        name: 'binaryoverload',
        height: 200,
        prompt: '> ',
        clear: false,
        exit: false    
    });
});

function helpCommand(terminal) {
    var commandsArray = Object.keys(commands);
    remove(commandsArray, "help");
    for (var i = 0; i < commandsArray.length; i++) {
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
