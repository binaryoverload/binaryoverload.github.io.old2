"use strict";function helpCommand(o){o.echo("[[bu;aqua;]Oooo look a handy dandy help menu!]");for(var e=Object.keys(commands),n=[],a=0;a<e.length;a++)commands[e[a]].display&&(commands[e[a]].admin?n.push(e[a]):o.echo(formatCommand(maxLength(Object.keys(commands)),e[a],commands[e[a]].help)));0<n.length&&o.echo(" "),n.forEach(function(e){o.echo(formatCommand(maxLength(Object.keys(commands)),e,commands[e].help)+" [[i;red;](Admins Only!)]")})}function jokesCommand(n){Object.keys(jokes).forEach(function(e){var o="[[;#6BBAEC;]"+padding(maxLength(Object.keys(jokes))+5,e)+"]";n.echo(o+jokes[e])})}function evalCommand(a){a.echo("Use [[b;lightblue;]exit] to quit eval mode! \n[[;orange;]With great power comes great responsibility!"),a.push(function(e,o){if("exit"!==e.toLowerCase()){var n=window.eval(e);null!=n&&a.echo(String(n))}else a.pop()},{prompt:"==> ",name:"js"})}function elevateCommand(e){e.push(function(e,o){if(""!==e)if("exit"==(e=e.trim().toLowerCase()))o.pop();else if(e.startsWith("sudo")&&void 0!==commands[e.substring(5)]){var n=e.substring(5);commands[n].callback(this,e)}else void 0!==commands[e]?commands[e].callback(this,e):void 0!==jokes["sudo "+e]?this.echo(jokes["sudo "+e]):void 0!==jokes[e]?this.echo(jokes[e]):this.error("That is not a command!");else this.echo("")},{prompt:"root@binaryoverload:~# ",name:"root"})}function adminLogin(n,a,t,i){var s=1;n.push(function(e,o){md5(e)===i?(o.pop(),a(n,t)):s<3?(o.error("Incorrect password!"),s++):(o.error("You have tried too many times!"),o.pop())},{prompt:"Enter Password: ",name:"adminLogin"})}function padding(e,o){return o.length>=e?o:o+" ".repeat(e-o.length)}function whoamiCommand(e){e.echo("[[b;#17BEBB;]Hi there!]")}function unimplemented(e){e.echo("[[bi;red;]This has yet to be implemented!!]")}function echoFile(e,o){var n;e.pause(),(n=new XMLHttpRequest).onreadystatechange=function(){4===n.readyState&&(200==n.status&&e.echo(n.responseText),e.resume())},n.open("GET","commands/"+o+".ansi",!0),n.send()}function remove(e,o){var n=e.indexOf(o);-1!==n&&e.splice(n,1)}function maxLength(e){for(var o=0,n=0;n<e.length;n++){var a=e[n];o=Math.max(a.length,o)}return o}function formatCommand(e,o,n){return"[[;#6BBAEC;]"+o+"]"+" ".repeat(e-o.length+5)+n}function getHeader(){return window.innerWidth<600?"[[bu;lightblue;]BinaryOverload]\n\n":" ____  _                         ____                 _                 _ \n|  _ \\(_)                       / __ \\               | |               | |\n| |_) |_ _ __   __ _ _ __ _   _| |  | __   _____ _ __| | ___   __ _  __| |\n|  _ <| | '_ \\ / _` | '__| | | | |  | \\ \\ / / _ | '__| |/ _ \\ / _` |/ _` |\n| |_) | | | | | (_| | |  | |_| | |__| |\\ V |  __| |  | | (_) | (_| | (_| |\n|____/|_|_| |_|\\__,_|_|   \\__, |\\____/  \\_/ \\___|_|  |_|\\___/ \\__,_|\\__,_|\n                           __/ |                                          \n                          |___/                                           \n"}var commands={clear:{help:"Clears the terminal",callback:function(e){e.clear(),e.greetings()},display:!0},help:{help:"",callback:helpCommand},flarebot:{help:"Super cool thing ;)",callback:echoFile,display:!0},whoami:{help:"Displays some information about me!",callback:echoFile,display:!0},contact:{help:"Here thar be my contact information!",callback:echoFile,display:!0},credits:{help:"That thing noone really looks at...",callback:echoFile,display:!0},jokes:{help:"Displays all jokes",callback:jokesCommand,display:!0,admin:!0},node:{help:"Hmmmm I wonder...",callback:evalCommand,display:!0,admin:!0},"-i":{help:"",callback:elevateCommand,admin:!0},su:{help:"",callback:elevateCommand,admin:!0}},userPassword="9cc2ae8a1ba7a93da39b46fc1019c481";$.getJSON("jokes.json","",function(e){window.jokes=e}),jQuery(function(e,n){e("#terminal").terminal(function(e){if(""!==e)if((e=e.trim().toLowerCase()).startsWith("sudo")&&commands[e.substring(5)]!==n){var o=e.substring(5);commands[o].admin?adminLogin(this,commands[o].callback,e,userPassword):commands[o].callback(this,e)}else commands[e]!==n?commands[e].admin?this.error("You do not have permission to use this command!"):commands[e].callback(this,e):jokes[e]!==n?this.echo(jokes[e]):this.error("That is not a command!");else this.echo("")},{completion:Object.keys(commands),greetings:getHeader()+"[[b;;]Full-time student, programmer and tech enthusiast.\n\nType [[b;lightblue;]whoami] or [[b;lightblue;]contact] to get information about me or [[b;lightblue;]help] to see all the commands you can do!",name:"binaryoverload",height:"100%",width:"100%",prompt:"guest@binaryoverload:~$ ",clear:!1,exit:!1}),(isMobile.any()||e(window).width()<=739)&&swal("Mobile Device","It looks like you are using a mobile device which might not work on this site!","warning",{buttons:{confirm:"Proceed",cancel:"Exit"}}).then(function(e){null===e&&(window.location="https://google.com")})});var isMobile={Android:function(){return navigator.userAgent.match(/Android/i)},BlackBerry:function(){return navigator.userAgent.match(/BlackBerry/i)},iOS:function(){return navigator.userAgent.match(/iPhone|iPad|iPod/i)},Opera:function(){return navigator.userAgent.match(/Opera Mini/i)},Windows:function(){return navigator.userAgent.match(/IEMobile/i)},any:function(){return isMobile.Android()||isMobile.BlackBerry()||isMobile.iOS()||isMobile.Opera()||isMobile.Windows()}};