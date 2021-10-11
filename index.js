let http = require('./http/api_request-v1.js')
let client = require('./http/client.js')
const fetch = require('node-fetch')
const Captcha = require("2captcha")
const solver = new Captcha.Solver("d239a612fe62c01a8db3ff5d1c1a13d5")
const cloudscraper = require("cloudscraper")
const Eris = require('eris')/*
function validUrl(url) {
    return /http(s)?:\/\/(\w+:?\w*@)?(\S+)(:\d+)?((?<=\.)\w+)+(\/([\w#!:.?+=&%@!\-/])*)?/gi.test(url);
}

function base64ToNode(buffer) {
    return buffer.toString('base64');
}
let bot = new Eris('NzMwODMwNzgxMzUzNjg5MTk4.XwdNNA.p56018e0DDbbdSQjjcnTr4lfmNI')

function imageToBase64(urlOrImage) {
    if (validUrl(urlOrImage)) {
        return fetch(urlOrImage).then(function (response) {
            return response.buffer();
        }).then(base64ToNode);
    } 
}
const getUser = async auth => {
  return await new Promise(re => {
    cloudscraper
      .get({
        url: `https://api.probot.io/user`,
        method: "GET",
        headers: {
          "authorization": auth,
          "agent-agent": "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
        }
      })
      .then(res => {re(JSON.parse(res))})
      .catch(err => re());
  });
};
const sendMessage = async (token , channelID , content) => {
  return await new Promise(re => {
    cloudscraper({
        url: `https://discord.com/api/channels/${channelID}/messages`,
        method: "POST",
        body: { content },
        headers: {
          "authorization": token,
          "user-agent": "Mozilla/5.0 (Windows NT 10.0) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/89.0.4389.114 Safari/537.36"
        },
        json:true
      }).then(res => {
re(res)
}).catch(err => {re();});
  });
}
fetch(('http://iron-magical-clownfish.glitch.me/api/transfer'), {method: "GET"}).then(d => d.json().then(async json =>{
console.log('Ready')
var lastend = true


for(const d of json.filter(d => d.code === "yousuf")){
await new Promise(async (res , rej) =>{ 

setInterval(async () => {
if(lastend === true) res()
}, 0)


})
lastend = false
let probotData = await getUser(d.probot_token)
console.log(probotData)
if(probotData.credits < 100){
lastend = true
}else{
var end = false
bot.on('messageCreate', async (msg) =>{
if(end === true) return;
console.log(msg.content)

if(!msg.content.includes(probotData.name) || !msg.content.includes('Transfer Fees')) return;
let url = msg.attachments[0].url
let base64 = await imageToBase64(url)
console.log('Done Get base64')
solver.imageCaptcha(base64)
.then((res) => {
lastend = true
end = true
sendMessage(d.token, '755584636377366591', `${res.data}`)
}).catch(err =>{
lastend = true

})
})

sendMessage(d.token, '755584636377366591', `#credits <@755584175611969557> ${probotData.credits}`)
}
}

}))
bot.connect()*/

var pay = 95000

let resulting = Math.floor(Math.floor(pay)+(pay)*(5.26320/100))
console.log(resulting)