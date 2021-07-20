const Client = new (require ("discord.js")).Client();
const Config = require("./config.js")
const Utility = require("./helpers.js")

var vcID = null;

Client.on("ready",()=>{
    console.log("Bot is running");
})

Client.on("message",msg=>{
    
    //generate event code for valid command
    console.log(msg.content);
    let eventCode = Utility.GenerateEventCode(msg.content);
    if(eventCode){
        switch(eventCode){
            case 1:
                vcID = msg.content.split(" ")[1] || vcID;
                Client.channels.fetch(vcID)
                    .then(VC=>{                   
                        VC.join()
                            .then(()=> msg.channel.send(`> Joined <#${vcID}>`))       
                    })
                    .catch(console.log("> ChannelID is missing or invalid."))
                break;
            case 2:
                Client.channels.fetch(vcID)
                .then(VC=>{
                    VC.leave()
                    msg.channel.send(`> Left <#${vcID}>`)          
                })
                break;
        }
    }
})


Client.login(process.env.TOKEN);