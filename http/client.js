let Eris = require('eris')
let client = new Eris('ODEzMDI4ODA0NTE5Mzk1NDE4.YDJWFA.y_1YJ03F9H7Fo-jqis7OkJXOhJg')
let db = require('../mongoose/db.js')

client.on('ready', () =>{
console.log('Ready')
})
async function await_messages(msg, accepts, inn, member){
  return await new Promise(async (res , rej) =>{
if(accepts === "Number"){
client.on('messageCreate', (message) =>{
if(message.channel.id !== inn || member.id !== message.author.id) return;

if(Number(Number(message.content))) res(message)
})
}else
if(accepts === "all"){
client.on('messageCreate', (message) =>{
if(message.channel.id !== inn || member.id !== message.author.id) return;

res(message)
})
}else
client.on('messageCreate', (message) =>{
if(message.channel.id !== inn || member.id !== message.author.id) return;
if(!accepts.includes(message.content)) return;


res(message)
})

  })
}

client.on('messageCreate', async (msg) =>{

let args = msg.content.split(' ')
if(args[0] === "history"){
let user = await msg.author.getDMChannel().catch(err =>{})

  let d = await db.getRESTUser(msg.author.id)
if(!d) {
return msg.delete()
}
console.log(d)

if(d.orders[0] && d.payHistory[0]){

let m = await client.createMessage(msg.channel.id, {
embed:    {
      "title": "History",
      "description": "You Have 2 History \n\n:one: Orders\n:two: Add Funds",
      "color": 49919
    }
})
m.addReaction(`1️⃣`)
m.addReaction(`2️⃣`)
client.on('messageReactionAdd', async (msg, emoji, reaction) =>{

if(msg.id !== m.id) return;
if(reaction.id !== msg.author.id) return;

if(emoji.name === "1️⃣"){
var fields = []

for(const data of d.orders){
if(fields.length > 23){
user.createMessage({embed: {
title: "History Orders",
fields: fields
}})
fields = []
}
fields.unshift({
name: `Order ID: ${data.id}`,
value: `Status:
Order Status: ${`${data.type}`.replace('0', 'Waiting Accept').replace('1', 'Failed').replace('2', 'Waiting Bot').replace('3', 'Waiting Members Join').replace('4', 'Success')}
Status Pay: ${`${data.payType}`.replace('0', 'Waiting Verified').replace('1', 'Failed').replace('2', 'Succes')}
Your Status: ${`${data.buyType}`.replace('0', 'Cancel').replace('1', 'Needed')}
Other Data:
Server Link: ${data.link.slice(0, 2)}xxx
Members: ${`${data.membersType}`.replace('0', 'Offline').replace('1', 'Online')}
Balance: ${data.pay}
Count: ${data.members}`
})
}
if(fields[0]) user.createMessage({embed: {
title: "History Orders",
fields: fields
}})


}
if(emoji.name === "2️⃣"){
var fields = []

for(const data of d.payHistory){
if(fields.length > 23){
user.createMessage({embed: {
title: "History Orders",
fields: fields
}})
fields = []
}
fields.unshift({
name: `Order ID: ${data.id}`,
value: `Status:
statusType: ${`${data.statusType}`.replace('0', 'Waiting Tranfer').replace('1', 'Waiting Confirm').replace('2', 'Refund').replace('3', 'Cancel').replace('4', 'Failed').replace('5', 'Success')}
Order:
Money: ${data.pay}
Tax: ${data.tax}
Totl: ${data.totl}`
})
}
if(fields[0]) user.createMessage({embed: {
title: "History Orders",
fields: fields
}})
}

})

return;
}
if(d.orders[0] && !d.payHistory[0]){
var fields = []

for(const data of d.orders){
if(fields.length > 23){
user.createMessage({embed: {
title: "History Orders",
fields: fields
}})
fields = []
}
fields.unshift({
name: `Order ID: ${data.id}`,
value: `Status:
Order Status: ${`${data.type}`.replace('0', 'Waiting Accept').replace('1', 'Failed').replace('2', 'Waiting Bot').replace('3', 'Waiting Members Join').replace('4', 'Success')}
Status Pay: ${`${data.payType}`.replace('0', 'Waiting Verified').replace('1', 'Failed').replace('2', 'Succes')}
Your Status: ${`${data.buyType}`.replace('0', 'Cancel').replace('1', 'Needed')}
Other Data:
Server Link: ${data.link.slice(0, 2)}xxx
Members: ${`${data.membersType}`.replace('0', 'Offline').replace('1', 'Online')}
Balance: ${data.pay}
Count: ${data.members}`
})
}
if(fields[0]) user.createMessage({embed: {
title: "History Orders",
fields: fields
}})
return;
}
if(d.payHistory[0] && !d.orders[0]){
var fields = []

for(const data of d.payHistory){
if(fields.length > 23){
user.createMessage({embed: {
title: "History Orders",
fields: fields
}})
fields = []
}
fields.unshift({
name: `Order ID: ${data.id}`,
value: `Status:
statusType: ${`${data.statusType}`.replace('0', 'Waiting Tranfer').replace('1', 'Waiting Confirm').replace('2', 'Refund').replace('3', 'Cancel').replace('4', 'Failed').replace('5', 'Success')}
Order:
Money: ${data.pay}
Tax: ${data.tax}
Totl: ${data.totl}`
})
}
if(fields[0]) user.createMessage({embed: {
title: "History Orders",
fields: fields
}})

}
client.createMessage(msg.channel.id, `DM`)



}
if(args[0] === "order"){
if(!msg.channel.guild || msg.channel.guild.id !== "867064399427665930") return;
let user = await msg.author.getDMChannel().catch(err =>{})

let m = await client.createMessage(msg.channel.id, {embed:     {
      "title": "Order | Terms",
      "description": "** Terms **\n\n**1 - ** We are not responsible if Link a Invalid (No compensation)\n**2 - ** In a solution that was discovered that you are using a loophole, your account will be banned and you will not be compensated with any amount \n**3 -** If you want to buy more than once, wait until your first transaction ends, and buy again \n**4 - ** You must wait at least 12 hours to receive your order (if you have not received your order within 12 hours, open a ticket)\nNote: You must make sure that the process is acceptable\n**5 - ** It is forbidden to open an account again if you have been banned once \n**6 - ** After transferring an amount, you will add the money to your account, using the (email) that you will put\n\nNote: This Page Auto Edit for 6 seconds",
      "color": null
    }})
let d = await db.addPay(msg.author.id, 0)
if(!d) {
await db.newUser(msg.author.id)
}
await new Promise((res , rej) =>{ setTimeout(() => res() , 6000)})

if(d.orders.find(data => data.type !== 1 && data.type !== 4)) return client.createMessage(msg.channel.id, `See the terms`)

d = await db.addPay(msg.author.id, 0)
let order = await db.addOrder(msg.author.id, {membersCount: 0, link: "null", membersType: 0, pay: 0})
user.createMessage({embed:     {
      "title": "New Email | Order Members is being reviewed",
      "description": `Dear ${msg.author.username},


Thank you for your recent purchase!
Our team is currently performing a final review of your order, making sure everything is just right for you. Your order will then be processed in the shortest time possible (maximum 1 business day).


Should you have any questions regarding your order simply reply to this message, mentioning a phone number where we can reach you.\nOne of our team members will soon contact you to discuss your request.


Thank you for using our services,\nthe TeamLog Team


P.S. All your order details and status updates are available 24/7 in your customer account, accessible here.`,
      "color": 16414720,
      "timestamp": new Date()
    }})
let ticket = await client.createChannel(msg.channel.guild.id, "order-" + order.id, 0, {parentID: "867064562087493632"})
await ticket.editPermission("867064399427665930", 0, 1024, "role")
await ticket.editPermission(msg.author.id, 1024, 0, "member")
m.edit({embed: null, content: "Done Open Ticket"})

let link = await await_messages(msg, 'all', ticket.id, msg.member)

await db.editOrder(msg.author.id, {link: link.content, type: 0, members: 0, membersType: 0, pay: 0, payType: 0, date: order.date, buyType: 0, orderid: order.orderid, id: order.id})

let memberCount = await await_messages(msg, 'Number', ticket.id, msg.member)

await db.editOrder(msg.author.id, {link: link.content, type: 0, members: Number(memberCount.content), membersType: 0, pay: 0, payType: 0, date: order.date, buyType: 0, orderid: order.orderid, id: order.id})

let pay = Number(memberCount.content) * 800

await db.editOrder(msg.author.id, {link: link.content, type: 0, members: Number(memberCount.content), membersType: 0, pay: pay, payType: 0, date: order.date, buyType: 0, orderid: order.orderid, id: order.id})

if(d.pay < pay) {
await db.editOrder(msg.author.id, {link: link.content, type: 1, members: Number(memberCount.content), membersType: 0, pay: pay, payType: 1, date: order.date, buyType: 0, orderid: order.orderid, id: order.id})
m.edit({embed: null, content: "You Don't Have Money!"})
return user.send({embed:     {
      "title": "New Email | Failed to review your last request [Members]",
      "description": `Dear ${msg.author.username},


There is not enough money for me to complete the process. Please recharge your balance and then try to open another ticket 


To More Help Go To Team.
`,
      "color": 16414720,
      "timestamp": new Date()
}

    })
}

ticket.createMessage(`Done Send Your Ticket To Bot

You should know that there are people before you!

You will receive a confirmation message for your product within this hour!

700 will be withdrawn from your balance for 1 captcha
25 will be deducted from your balance on 1 photo (base64).
25 will be withdrawn from your balance on 1 name
50 will be withdrawn from your balance on the proxy
All other services are free
Total: 800 per member
Please make sure that all protection bots from fake members are closed (we do not take responsibility for this)
And please make sure that the permanent link and the room made with a link will not be deleted (we are not responsible for this thing)

All your money is withheld, your money can only be used after the transaction is completed 
`)
await new Promise((res , rej) =>{ setTimeout(() => res() , 12000)})
await db.editOrder(msg.author.id, {link: link.content, type: 2, members: Number(memberCount.content), membersType: 0, pay: pay, payType: 2, date: order.date, buyType: 0, orderid: order.orderid, id: order.id})

user.createMessage({embed:    {
      "title": "New Email | Order Members is complete",
      "description": `Dear ${msg.author.username},

Thank you for purchasing.


Your order details:


Add Funds - 1 item(s) - Members Offline


You will receive your products from teamlog soon, however if not received within 12 hours Open Ticket


Your credentials for customer control panel:
login: ${msg.author.username} (ID: ${msg.author.id})


Kind regards,
the TeamLog Care Team`,
      "color": 16414720,
      "timestamp": new Date()
    }})


}
if(args[0] === "status"){
client.createMessage(msg.channel.id,{embed:{
      "title": "Captcha Price",
      "description": "Status: ON",
      "color": null,
      "fields": [
        {
          "name": "$ 700",
          "value": "Per 1 Captcha"
        },
        {
          "name": "$ 25",
          "value": "Per 1 Avatar Base64"
        },
        {
          "name": "$ 25",
          "value": "Per 1 Name"
        },
        {
          "name": "$ 50",
          "value": "Per 1 Proxy"
        },
        {
          "name": "$ 0",
          "value": "Per 1 hypeSquad"
        }
      ]
    }})
}
if(args[0] === "profile"){
  let d = await db.getRESTUser(msg.author.id)
if(!d) {
await db.newUser(msg.author.id)
}
if(!d) d = {pay: 0}
client.createMessage(msg.channel.id, `$${d.pay}`)
}
if(args[0] === "addfunds"){
if(msg.channel.id !== "867064536782471178") return;
let user = await msg.author.getDMChannel().catch(err =>{})

let m = await client.createMessage(msg.channel.id, {embed:     {
      "title": "Add Funds | Terms",
      "description": "** Terms **\n\n**1 - ** We are not responsible if Link a Invalid (No compensation)\n**2 - ** In a solution that was discovered that you are using a loophole, your account will be banned and you will not be compensated with any amount \n**3 -** If you want to buy more than once, wait until your first transaction ends, and buy again \n**4 - ** You must wait at least 12 hours to receive your order (if you have not received your order within 12 hours, open a ticket)\nNote: You must make sure that the process is acceptable\n**5 - ** It is forbidden to open an account again if you have been banned once \n**6 - ** After transferring an amount, you will add the money to your account, using the (email) that you will put\n\nNote: This Page Auto Edit for 6 seconds",
      "color": null
    }})
let d = await db.addPay(msg.author.id, 0)
if(!d) {
await db.newUser(msg.author.id)
}
await new Promise((res , rej) =>{ setTimeout(() => res() , 6000)})
 d = await db.addPay(msg.author.id, 0)

m.edit({embed:     {
      "title": "Add Funds | Tranfer",
      "description": "**Good!**\n\nNow Tranfer To <@535423612308422668>\nAfter sending the amount you want to add, the money will be added to your account. Account: [email]\nNote: tax on us\n\n```#credits 535423612308422668 [money]```".replace('[email]', msg.author.id),
      "color": null
    }})
var dn = false
client.on('messageCreate', async (message) =>{
if(message.channel.id !== "867064536782471178" || dn === true) return;
if(message.author.id !== "282859044593598464" || !message.content.includes(msg.author.username) || !message.content.includes('has transferred')) return;

user.createMessage({embed:     {
      "title": "New Email | Add Funds is being reviewed",
      "description": `Dear ${msg.author.username},


Thank you for your recent purchase!
Our team is currently performing a final review of your order, making sure everything is just right for you. Your order will then be processed in the shortest time possible (maximum 1 business day).


Should you have any questions regarding your order simply reply to this message, mentioning a phone number where we can reach you.\nOne of our team members will soon contact you to discuss your request.


Thank you for using our services,\nthe TeamLog Team


P.S. All your order details and status updates are available 24/7 in your customer account, accessible here.`,
      "color": 16414720,
      "timestamp": new Date()
    }})
let money = message.content.replace(msg.author.username, '').replace('**:moneybag: | ', '').replace('**', '').replace(', has transferred ', '')
.replace('`', '')
.replace('`', '')
.replace('$', '')
.replace(' to ', '')
.replace('<@!535423612308422668>', '')
.replace('<@535423612308422668>', '')
dn = true
let pay = Number(money)
await db.editPay(msg.author.id, d.id, {statusType: 1, pay: 0, tax: 0, totl: 0, payid: d.payid, id: d.id})
if(!Number(pay)) {
user.send({embed:     {
      "title": "New Email | Failed to review your last request [Add Funds]",
      "description": `Dear ${msg.author.username},


Failed to recognize the amount you sent


To More Help Go To Team.
`,
      "color": 16414720,
      "timestamp": new Date()
}

    })
m.edit({embed: {
      "title": "Add Funds | Failed Tranfers!",
      "description": "Failed to recognize the amount you sent",
      "color": 16711680
}})
await db.editPay(msg.author.id, d.id, {statusType: 4, pay: 0, tax: 0, totl: 0, payid: d.payid, id: d.id})
await new Promise((res , rej) =>{ setTimeout(() => res() , 12000)})
msg.delete()
return m.delete()
}
let resulting = Math.floor(Math.floor(pay)+(pay)*(5.26320/100))
await db.editPay(msg.author.id, d.id, {statusType: 1, pay: resulting, tax: 0, totl: resulting, payid: d.payid, id: d.id})

msg.delete()
m.edit({embed: {title: "Done!"}})
await new Promise((res , rej) =>{ setTimeout(() => res() , 12000)})
user.createMessage({embed:    {
      "title": "New Email | Add Funds is complete",
      "description": `Dear ${msg.author.username},

Thank you for purchasing.


Your order details:


Add Funds - 1 item(s) - ${resulting} credits


You will receive your products from teamlog soon, however if not received within 12 hours Open Ticket


Your credentials for customer control panel:
login: ${msg.author.username} (ID: ${msg.author.id})


Kind regards,
the TeamLog Care Team`,
      "color": 16414720,
      "timestamp": new Date()
    }})

await db.editPay(msg.author.id, d.id, {statusType: 5, pay: resulting, tax: 0, totl: resulting, payid: d.payid, id: d.id})
await db.addMoney(msg.author.id, resulting)
m.delete()
})

}


})

client.connect()