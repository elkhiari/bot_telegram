const { Telegraf } = require('telegraf');
require('dotenv').config()
const bot = new Telegraf(process.env.TOKEN);

bot.start((ctx) => ctx.reply('Welcome'));
// bot.on('text',(msg)=>{
//     msg.replyWithPhoto('https://raw.githubusercontent.com/hosein2398/node-telegram-bot-api-tutorial/master/pics/CaptionJPG.JPG',{
//     caption:'HELLO'
//     })
// })
bot.command('hi', (a)=>{
    a.replyWithChatAction("upload_photo")
    a.replyWithAudio('https://d278.d2mefast.net/tb/d/1d/eminem_not_afraid_mp3_60221.mp3');
})

bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));