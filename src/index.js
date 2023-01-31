const { default: axios } = require('axios');
const { Telegraf } = require('telegraf');
require('dotenv').config()
const bot = new Telegraf(process.env.TOKEN);
require('axios')



bot.start((a) => a.reply('Welcome'));

bot.command('you',(a)=>{
    bot.telegram.sendMessage(a.chat.id,`Hi i'am Othmane Elkhiari`,
    {
        reply_markup:{
            inline_keyboard:[
                [
                    {text:'Portfolio',callback_data:'Portfolio'},
                    {text:'Mail',callback_data:'Mail'},
                    {text:'Phone',callback_data:'Phone'}
                ],
                [
                    {text:'Instagram',callback_data:'Instagram'},
                    {text:'Twitter',callback_data:'Twitter'},
                    {text:'Github',callback_data:'Github'}

                ]
            ]
        }})
})


bot.action('Mail',(a)=>{
    a.reply('Othmaneelkkhiari@gmail.com')
})


bot.on('text', async (msg)=>
{
    try {
        const dataApi = await axios(`http://www.omdbapi.com/?t=${msg.update.message.text}&apikey=cebd9b53`)
        if (dataApi.data.Poster){
        msg.replyWithPhoto(dataApi.data.Poster)
        msg.replyWithHTML(
        `<b>Title:</b> ${dataApi.data.Title}
<b>Type:</b> ${dataApi.data.Type}
<b>Actors:</b> ${dataApi.data.Actors}
<b>Writer:</b> ${dataApi.data.Writer}
<b>Director:</b> ${dataApi.data.Director}
<b>Language:</b> ${dataApi.data.Language}
<b>Country:</b> ${dataApi.data.Country}
<b>Genre:</b> ${dataApi.data.Genre}
<b>Rating:</b> ${dataApi.data.imdbRating}
<b>Plot:</b> ${dataApi.data.Plot}


FOLLOW ME 😊 :<i><b><a href="elkhiari.ga">@Elkhiari</a></b></i>
        `)}
        else{msg.reply("Movie not found!")}
    } catch (error) {
        console.log('err')
    }
    // msg.replyWithPhoto('https://raw.githubusercontent.com/hosein2398/node-telegram-bot-api-tutorial/master/pics/CaptionJPG.JPG',{
    // caption:'HELLO'
    // })
})





// bot.help((a)=>{
//     a.reply('test')
// })




bot.launch();

process.once('SIGINT', () => bot.stop('SIGINT'));
process.once('SIGTERM', () => bot.stop('SIGTERM'));