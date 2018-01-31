var commands = {
    clear: {
        help: "Clears the terminal",
        callback: function (terminal) {
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
    },
    credits: {
        help: "That thing noone really looks at...",
        callback: echoFile,
        display: true
    },
    jokes: {
        help: "Displays all jokes",
        callback: jokesCommand,
        display: true,
        admin: true,
        password: "5f4dcc3b5aa765d61d8327deb882cf99"
    },
    node: {
        help: "Hmmmm I wonder...",
        callback: evalCommand,
        display: true,
        admin: true,
        password: "5f4dcc3b5aa765d61d8327deb882cf99"
    }
};

$.getJSON("jokes.json", "", function (data) {
    window.jokes = data;
});

jQuery(function ($, undefined) {
    var term = $('#terminal').terminal(function (command) {
        localStorage.term = this;
        if (command !== '') {
            command = command.trim().toLowerCase();
            if (commands[command] !== undefined) {
                if (commands[command].admin) {
                    adminLogin(this, commands[command].callback, command, commands[command].password);
                } else {
                    commands[command].callback(this, command);
                }
            } else if (jokes[command] !== undefined) {
                this.echo(jokes[command]);
            } else {
                this.error("That is not a command!");
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
        swal("Mobile Device", "It looks like you are using a mobile device which might not work on this site!", "warning", {
            buttons: {
                confirm: "Proceed",
                cancel: "Exit",
            }
        }).then(function (value) {
            if (value === null) {
                window.location = "https://google.com";
            }
        });
    }
});

function helpCommand(terminal) {
    terminal.echo("[[bu;aqua;]Oooo look a handy dandy help menu!]")
    var commandsArray = Object.keys(commands);
    var adminCommands = [];
    for (var i = 0; i < commandsArray.length; i++) {
        if (!commands[commandsArray[i]].display) continue;
        if (commands[commandsArray[i]].admin) {
            adminCommands.push(commandsArray[i]);
            continue;
        }
        terminal.echo(formatCommand(maxLength(Object.keys(commands)), commandsArray[i], commands[commandsArray[i]].help));
    }
    if (adminCommands.length > 0) {
        terminal.echo(" ");
    }
    adminCommands.forEach(function (command) {
        terminal.echo(formatCommand(maxLength(Object.keys(commands)), command, commands[command].help) + " [[i;red;](Admins Only!)]");
    });
}

function jokesCommand(terminal) {
    Object.keys(jokes).forEach(function (joke) {
        var formatJoke = "[[;#6BBAEC;]" + padding(maxLength(Object.keys(jokes)) + 5, joke) + "]";
        terminal.echo(formatJoke + jokes[joke]);
    })
}

function evalCommand(terminal) {
    terminal.echo("Use [[b;lightblue;]exit] to quit eval mode! \n[[;orange;]With great power comes great responsibility!");
    terminal.push(function (command, term) {
        if (command.toLowerCase() === "exit") {
            terminal.pop();
            return;
        }
        var result = window.eval(command);
        if (result != undefined) {
            terminal.echo(String(result));
        }
    }, {
        name: 'js'
    });
}

function adminLogin(terminal, callback, command, password) {
    var passwordTries = 1;
    terminal.push(function (cmd, term) {
        if (md5(cmd) === password) {
            term.pop();
            callback(terminal, command);
        } else {
            if (passwordTries < 3) {
                term.error("Incorrect password!");
                passwordTries++;
            } else {
                term.error("You have tried too many times!");
                term.pop();
            }
        }
    }, {
        prompt: 'Enter Password: ',
        name: 'adminLogin'
    });
}

function padding(length, item) {
    if (item.length >= length) {
        return item;
    } else {
        return item + " ".repeat(length - item.length);
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

function maxLength(array) {
    var maxLength = 0;
    for (var i = 0; i < array.length; i++) {
        var item = array[i];
        maxLength = Math.max(item.length, maxLength);
    }
    return maxLength;
}

function formatCommand(maxLength, command, help) {
    return "[[;#6BBAEC;]" + command + "]" + " ".repeat((maxLength - command.length) + 5) + help;
}

var isMobile = {
    Android: function () {
        return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
        return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
        return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
        return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
        return navigator.userAgent.match(/IEMobile/i);
    },
    any: function () {
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