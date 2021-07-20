const Config = require("./config.js");


GenerateCommandList = ()=>{
    const prefix = Config.PREFIX;
    var commands = {};
    for (command of Object.keys(Config.KEYWORDS)){
        commands[command] = prefix + Config.KEYWORDS[command];
    }
    return commands;
}

MsgToCommand = (msg)=>{
    
    return msg.split(" ")[0] 
}

GenerateEventCode = (msg) =>{
    const validCommands = GenerateCommandList();
    const command = MsgToCommand(msg);
    code = null;
    for(var c of Object.keys(validCommands)){
        if (validCommands[c] === command){
            code = Config.EVENTCODE[c];
            break;
        }
    }
    return code;

}

module.exports = {GenerateEventCode};