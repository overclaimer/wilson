const Discord = require(`discord.js`);
const client = new Discord.Client();

const { data } = require('./security.js');
const nickname = `Wilson`;


client.on(`ready`, () => {
    log(`Client ready.`);
    change_nickname();
});

client.on('message', message => {

    if(message.author.bot){
        return; // Do not reply to bots. (Or self.)
    }

    var m = message.content.trim();
    var c = m.split(` `);

    if(c[0].toLowerCase() == `wilson`){
        if(c[1] != null){
            if(c[1].toLowerCase() == `help`){
                message.reply(`You cannot be helped.`);
            }
        }else{
            message.reply(`You can view commands with *wilson help*`);
        }
    }else{
        var r = random(0,5);
        if(r == 1){
            message.reply(`Interesting.`);
        }
    }
});

var change_nickname = () =>{
    log(`Changing nickname..`);
    var server = get_main_server();
    server.members.cache.forEach(member => {
        if(member.id == `${data.wilson}`){
            member.setNickname(`${nickname}`);
            log(`Changed nickname to ${nickname}!`);
        }
    }); 
}
var get_main_server = () =>{
    log(`Getting main discord server..`);
    return client.guilds.cache.get(`${data.server}`);
}
var log = (v) =>{
    console.log(`[Wilson] ${v}`);
}

client.login(`${data.token}`);

var random = (min, max)=>{
    return Math.floor((Math.random() * max) + min);
}