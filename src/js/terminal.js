

// Terminal config
config = {
    shellPrompt: " ➜ "
}

document.getElementById("input_title").innerText = config.shellPrompt;
document.getElementById('input_source').addEventListener('keyup', submit_command);
document.getElementById('input_source').addEventListener('keyup', getLastCommand);
document.getElementById('input_source').addEventListener('keydown', tab_complete);
var current_block;

function new_block() {
    current_block = document.createElement("div");
    current_block.classList.add("log");
    document.getElementById('wrapper').appendChild(current_block);
}

function block_log(message) {
    new_block();
    current_block.innerHTML = "<p>" + message + "</p>";
}

function submit_command(e) {
    if (!(e.keyCode === 13)) return;
    var input = document.getElementById("input_source").value;
    document.getElementById("input_source").value = "";

    command = input.split(" ")[0];
    args = input.replace(command, "")

    if (typeof window[command] === "function") {
        block_log(config.shellPrompt + command + " " + args);
        window[command](args);
        lastCommand = command + args;
    } else if (command != "") {
        block_log("gsh: command not found : " + command);
    }
}

function getLastCommand(e) {
    if (!(e.keyCode === 38)) return;
    if (lastCommand) {
        document.getElementById("input_source").value = lastCommand;
    }
}

function tab_complete(e) {
    if (!(e.keyCode === 9)) return;
    e.preventDefault();
    block_log(Object.values(cmds).filter(c => c.name.startsWith(document.getElementById("input_source").value)).map(c => c.name).join(" "));
    //  var fart = cmds.filter(c => c.name.startsWith(document.getElementById("input_source").value)).map(c => c.name);
    
}   

/// COMMANDS

function google(args) {
    if (args != "") {
        search = args.replace(" ", "+")
        window.open("https://www.google.com/search?q=" + search);
    } else {
        window.open("https://www.google.com");
    }
}

function youtube(args){
    if (args != "") {
        search = args.replace(" ", "+")
        window.open("https://www.youtube.com/results?search_query=" + search);
    } else {
        window.open("https://www.youtube.com");
    }
}

function clock(args) {
    var today = new Date();
    block_log(today.getHours() + ":" + today.getMinutes() + ":" + today.getSeconds());
}

var days = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];
function day(args) {
    block_log(days[ now.getDay() ]);

}

function clear(args) {
    document.getElementById('wrapper').innerHTML = "";
}

function open(args){
    window.open("https://www."+search);
    
}

//ls 
function cmd(args){
    block_log(Object.entries(cmds).filter(([k,v]) => k==v.name).map(c => c.name).join(" "));
}

var cmds = {
    google,
    g:google,
    youtube,
    yt:youtube,
    clock,
    time:clock,
    day,
    open,
    o:open,
    cmd
};

function echo(args){
    block_log(args);
};