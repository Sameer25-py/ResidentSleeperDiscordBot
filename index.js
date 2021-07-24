const Client = new (require ("discord.js")).Client();
const Config = require("./config.js")
const Utility = require("./helpers.js")

var vcID = null;
const dummyMP3= "./dummy.mp3";

Client.on("ready",()=>{
    console.log("Bot is running");
})

Client.on("message",msg=>{
    
    //generate event code for valid command
    let eventCode = Utility.GenerateEventCode(msg.content);
    if(eventCode){
        switch(eventCode){
            case 1:
                vcID = msg.content.split(" ")[1] || vcID;
                Client.channels.fetch(vcID)
                    .then(VC=>{                   
                        VC.join()
                            .then((connection)=>{
                                msg.channel.send(`> Joined <#${vcID}>`)
                                var dispatcher = connection.play(dummyMP3);
                                dispatcher.on("speaking",status=>{
                                    if(!status){
                                        dispatcher = connection.play(dummyMP3);
                                    }
                                }) 
                            })       
                    })
                    .catch(()=>msg.channel.send("> ChannelID is missing or invalid."))
                break;
            case 2:
                Client.channels.fetch(vcID)
                .then(VC=>{
                    VC.leave()
                    msg.channel.send(`> Left <#${vcID}>`)          
                })
                .catch(()=>msg.channel.send("> Can't find VC to disconnect from."))
                break;
        }
    }
})


Client.login(process.env.TOKEN);