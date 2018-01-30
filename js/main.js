var commands = {
    clear: {
        help: "Clears the terminal",
        callback: function(terminal) {
            terminal.clear();
            terminal.greetings();
        },
        display: true
    },
    help: {
        help: "",
        callback: helpCommand
    },
    flarebot: {
        help: "Super cool thing ;)",
        callback: echoFile,
        display: true
    },
    whoami: {
        help: "Displays some information about me!",
        callback: echoFile,
        display: true
    },
    contact: {
        help: "Here thar be my contact information!",
        callback: echoFile,
        display: true
    }
};

jQuery(function($, undefined) {
    var term = $('#terminal').terminal(function(command) {
        localStorage.term = this;
        if (command !== '') {
            command = command.trim();
            if (commands[command] !== undefined) {
                commands[command].callback(this, command);
            } else {
                switch(true) {
                    case /sudo rm -rf (--no-preserve-root )?\/\*?/.test(command): 
                        swal("Excuse me!", "Nice try ;) Good thing this is only a static webpage...", "error");
                        break;
                    default: this.error("That is not a command!");
                }
                
            }
        } else {
            this.echo('');
        }
    }, {
        completion: Object.keys(commands),
        greetings: getHeader() + 
            "[[b;;]Full-time student, programmer and tech enthusiast. Currently working on [[b!;;;;https://github.com/FlareBot/FlareBot]FlareBot]!]\n\n" +
            "Type [[b;lightblue;]whoami] or [[b;lightblue;]contact] to get information about me or [[b;lightblue;]help] to see all the commands you can do!",
        name: 'binaryoverload',
        height: "100%",
        width: "100%",
        prompt: '> ',
        clear: false,
        exit: false
    });
    if (isMobile.any() || $(window).width() <= 739) {
        swal("Mobile Device", "It looks like you are using a mobile device which might not work on this site!", "warning"
        ,{
            buttons: {
                confirm: "Proceed",
                cancel: "Exit",
            }
        }).then(function(value) {
            if (value === null) {
                window.location = "https://google.com";
            }
        });
    }
});

function helpCommand(terminal) {
    terminal.echo("[[bu;aqua;]Oooo look a handy dandy help menu!]")
    var commandsArray = Object.keys(commands);
    for (var i = 0; i < commandsArray.length; i++) {
        if (!commands[commandsArray[i]].display) continue;
        terminal.echo(formatCommand(maxCommandLength(), commandsArray[i], commands[commandsArray[i]].help));
    }
}

function whoamiCommand(terminal) {
    var string = "[[b;#17BEBB;]Hi there!]";
    terminal.echo(string);
}

function unimplemented(terminal) {
    terminal.echo("[[bi;red;]This has yet to be implemented!!]");
}

function echoFile(terminal, command) {
    terminal.pause();
    var xhr;

    xhr = new XMLHttpRequest();
    xhr.onreadystatechange = handleStateChange;
    xhr.open("GET", "commands/" + command + ".ansi", true);
    xhr.send();

    function handleStateChange() {
        if (xhr.readyState === 4) {
            if (xhr.status == 200) {
                terminal.echo(xhr.responseText);
            }
            terminal.resume();
        }
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
    return "[[;#6BBAEC;]" + command + "]" + " ".repeat((maxLength - command.length) + 5) + help;
}

var isMobile = {
    Android: function() {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function() {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function() {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function() {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function() {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function() {
        return (isMobile.Android() || isMobile.BlackBerry() || isMobile.iOS() || isMobile.Opera() || isMobile.Windows());
    }
};

function getHeader() {
    if (window.innerWidth < 600) {
        return "[[bu;lightblue;]BinaryOverload]\n\n";
    } else {
        return " ____  _                         ____                 _                 _ \n" +
        "|  _ \\(_)                       / __ \\               | |               | |\n" +
        "| |_) |_ _ __   __ _ _ __ _   _| |  | __   _____ _ __| | ___   __ _  __| |\n" +
        "|  _ <| | '_ \\ / _` | '__| | | | |  | \\ \\ / / _ | '__| |/ _ \\ / _` |/ _` |\n" +
        "| |_) | | | | | (_| | |  | |_| | |__| |\\ V |  __| |  | | (_) | (_| | (_| |\n" +
        "|____/|_|_| |_|\\__,_|_|   \\__, |\\____/  \\_/ \\___|_|  |_|\\___/ \\__,_|\\__,_|\n" +
        "                           __/ |                                          \n" +
        "                          |___/                                           \n";
    }
}