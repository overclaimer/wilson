const Discord = require(`discord.js`);
const client = new Discord.Client();

const { data } = require('./security.js');
const nickname = `Wilson`;


client.on(`ready`, () => {
    log(`Client ready.`);
    change_nickname();
});

client.on('message', message => {
    if (message.content === 'ping') {
      message.channel.send('pong');
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