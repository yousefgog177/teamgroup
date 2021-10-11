let mongoose = require('mongoose')
let random = require("random-id")
mongoose.connect("mongodb+srv://yousuf:41371755aa@cluster0.8dy7d.mongodb.net/data" , {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      autoIndex: false,
      reconnectTries: Number.MAX_VALUE,
      reconnectInterval: 500,
      poolSize: 5,
      connectTimeoutMS: 10000,
      family: 4
    });


const collection = mongoose.model("users",  new mongoose.Schema({
            _id: { type: mongoose.Schema.Types.ObjectId, required: true, auto: true },
            "email": { type: String } ,
            "password": { type: String },
            "pay": { type: Number, default: 0 },
            "id": { type: String },
            "token": { type: String }, // let token = "Nyz" + random(31, 'QWERTYUIOPASDFGHJKZXCVBNM') + "." + random(4, 'QWERTYUIOPASDFGHJKZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnm') + "." + random(21, 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKZXCVBNM')
            "payHistory": { type: Array, default: [] }, /*
{statusType: 0, pay: 300000, tax: 0, totl: 300000, payid: 1, id: random(8, '0123456789')}

statusType:

0 = Waiting Tranfers
1 = Waiting Confirm
2 = Refund
3 = Cancel
4 = Failed
5 = Success

*/
            "orders": { type: Array, default: [] }, /*
 {link: "", type: 0, members: 1000, membersType: 0, pay: 1600000, payType: 0, date: Date.now(), buyType: 0, orderid: 1, id: random(8, '0123456789')} 
Type:

0 = waiting Accept Pay
1 = Failed
2 = Waiting Staff
3 = Waiting Members Join
4 = Success

membersType:

0 = offline
1 = online

payType:

0 = waiting verify
1 = Failed
2 = Accept

buyType:

0 = Canel
1 = Needed

*/
}));

const newUser = async (id) =>{
return await collection({
email: id, 
password: '0000000',
id: random(18, '0123456789'),
token: "Nyz" + random(31, 'QWERTYUIOPASDFGHJKZXCVBNM') + "." + random(4, 'QWERTYUIOPASDFGHJKZXCVBNM1234567890qwertyuiopasdfghjklzxcvbnm') + "." + random(21, 'qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKZXCVBNM')
}).save()
}

const getRESTDataUser = async (token) =>{

let data = await collection.findOne({token: token})
if(!data) return;
return {
pay: data.pay,
payHistory: data.payHistory,
orders: data.orders,
token: data.token,
id: data.id,
email: data.email,
password: data.password
}

}

const addMoney = async (email, pay) =>{
let data = await collection.findOne({email: email})
if(!data) return;

await collection.updateOne({_id: data._id}, {$inc: {
pay: pay
}})
}
const removeMoney = async (token, pay) =>{
let data = await collection.findOne({token: token})
if(!data) return;

await collection.updateOne({_id: data._id}, {$inc: {
pay: -pay
}})
}
const getRESTUser = async (id) =>{

let data = await collection.findOne({email: id})
if(!data) return data
return {
pay: data.pay,
payHistory: data.payHistory,
orders: data.orders,
token: data.token,
id: data.id,
email: data.email,
password: data.password
}

}

const editPay = async (email, id, d) =>{
let data = await collection.findOne({email: email})
if(!data) return;

let dataOrder = data.payHistory.find(s => s.id === id)
await collection.updateOne({_id: data._id}, {$pull: {
payHistory: dataOrder
}})
await collection.updateOne({_id: data._id}, {$push: {
payHistory: d
}})
}

const addPay = async (email, d) =>{
let data = await collection.findOne({email: email})
if(!data) return;
var id = random(8, '0123456789')
await collection.updateOne({_id: data._id}, {$push: {
payHistory: {statusType: 0, pay: d.pay, tax: 0, totl: d.pay, payid: data.payHistory.length, id: id}

}})
return {statusType: 0, pay: d.pay, tax: 0, totl: d.pay, payid: data.payHistory.length, id: id}

}

const editOrder = async (token, id, d) =>{
let data = await collection.findOne({email: token})
if(!data) return;

let dataOrder = data.orders.find(s => s.id === id)
await collection.updateOne({_id: data._id}, {$pull: {
orders: dataOrder
}})
await collection.updateOne({_id: data._id}, {$push: {
orders: d
}})
}

const addOrder = async (token, d) =>{
let data = await collection.findOne({email: token})
if(!data) return;
var id = random(8, '0123456789')
await collection.updateOne({_id: data._id}, {$push: {
orders:  {link: d.link, type: 0, members: d.membersCount, membersType: d.membersType, pay: d.pay, payType: 0, date: Date.now(), buyType: 1, orderid: data.orders.length, id: id, captchaGo: 0} 

}})
return {link: d.link, type: 0, members: d.membersCount, membersType: d.membersType, pay: d.pay, payType: 0, date: Date.now(), buyType: 1, orderid: data.orders.length, id: id, captchaGo: 0} 
}

const getRESTLogin = async (email, pass) =>{

let data = await collection.findOne({email: email, password: pass})
if(data.password !== pass) return;
return {
pay: data.pay,
payHistory: data.payHistory,
orders: data.orders,
token: data.token,
id: data.id,
email: data.email,
password: data.password
}

}

module.exports = { getRESTLogin, getRESTUser, getRESTDataUser, addOrder, editOrder, removeMoney, addPay, editPay, addMoney, newUser }