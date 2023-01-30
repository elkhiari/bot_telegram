const TelegramBot = require('node-telegram-bot-api');

const fs = require('fs');
const ytdl = require('ytdl-core');


require('dotenv').config()
const token = process.env.TOKEN;

const bot = new TelegramBot(token,{polling:true})



bot.on('message', async (msg)=>{
    let user = msg.from.username
    let msgg = msg.text
    let chatID = msg.from.id
    if (msgg == '/start'){
        bot.sendMessage(chatID,`Hello ${user} send any ytb link :)`)
    }
    else if (ytdl.validateURL(msgg)){
        async function downloadVideo()
        {
            try {
                await bot.sendMessage(chatID,`Video is downloading...`)
                let info = await ytdl.getInfo(msgg);
                let video_Title = info.videoDetails.title
                ytdl(msgg).pipe(fs.createWriteStream(`video/${video_Title}.mp4`));
                setTimeout(async()=>{
                await bot.sendVideo(chatID,`video/${video_Title}.mp4`,{
                    caption:video_Title
                })
                },10000)
            } catch (error) {
                console.log(error+"")
            }
        }
        downloadVideo()
    }
    else if(!ytdl.validateURL(msgg)){
        bot.sendMessage(chatID,`Please send valid url :(`)
    }
});

