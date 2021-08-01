const Discord = require(`discord.js`);
const client = new Discord.Client();
const NewsAPI = require('newsapi');
const fs = require(`fs`);

const { data } = require('./security.js');
const nickname = `Wilson`;


client.on(`ready`, async () => {
    log(`Client ready.`);
    change_nickname();

    await GetTopNews();
});

client.on('message', async (message) => {

    if(message.author.bot){
        return; // Do not reply to bots. (Or self.)
    }

    var m = message.content.trim();
    var c = m.split(` `);

    if(c[0].toLowerCase() == `wilson`){
        if(c[1] != null){
            if(c[1].toLowerCase() == `help`){
                var link = `https://github.com/overclaimer/wilson/wiki/`;
                message.channel.send(`You can view all my info here: ${link}`);
            }
            if(c[1].toLowerCase() == `code`){
                var link = `https://github.com/overclaimer/wilson`;
                message.channel.send(`You can view my code on github: ${link}`);
            }
        }else{
            message.channel.send(`You can view commands with *wilson help*`);
        }
    }else{
        var r = random(0,50);
        if(r == 1){
            message.channel.send(`Interesting.`);
        }
        if(r == 2){
            message.channel.send(`I agree!`);
        }
        if(r == 3){
            message.channel.send(`Say wat..`);
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

var GetTopNews = async ()=>{
    log(`Getting news..`);
    var story = ``;
    const newsapi = new NewsAPI(data.newsApi);
    var a = await newsapi.v2.topHeadlines({
        language: 'en'
    }).then(response => {
        return response;
    });
    var ttt = a.totalResults;
    var sss = random(0, ttt);
    var l = 0;
    a.articles.forEach((art)=>{
        if(l == sss){
            console.log(art);
        }
        l++;
    });
    
}