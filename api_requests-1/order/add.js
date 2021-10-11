let db = require('../../mongoose/db.js')

module.exports = {
	path: '/api/v1/order',
	method: 'post',
	run: async (req, res) => {
if(!req.headers || !req.headers.authorization) return res.status(403).json({errors: ['authorization'], message: "Request Headers Authorization"})
if(!req.body || !req.body.membersCount) return res.status(403).json({errors: [{membersCount: {message: "This Fields Request"}}], message: "Invaild Form Body", errMessage: "Member Count ?"})
if(!req.body || !req.body.membersType) return res.status(403).json({errors: [{membersType: {message: "This Fields Request"}}], message: "Invaild Form Body", errMessage: "Online Or Offline?\no = Online\nf = Offline"})
if(!req.body || !req.body.link) return res.status(403).json({errors: [{link: {message: "This Fields Request"}}], message: "Invaild Form Body", errMessage: "Link?"})
if(!req.body || !Number(req.body.membersCount)) return res.status(403).json({errors: [{membersCount: {message: "Only Number"}}], message: "Invaild Form Body", errMessage: "Only Number Member Count"})

if(req.body.memberCount < 99) return res.status(403).json({errors: [{memberCount: {message: "Less memberCount 100"}, message: "Invaild Form Body"}], message: "Invaild Form Body", errMessage: "Less Member Count 100"})
if(req.body.membersType !== "o" && req.body.membersType !== "f") return res.status(403).json({errors: [{memberCount: {message: "Request o/f Only"}, message: "Invaild Form Body"}], message: "Invaild Form Body", errMessage: "Online Or Offline?\no = Online\nf = Offline"})

if(req.body.membersType === "o") req.body.membersType = 1
if(req.body.membersType === "f") req.body.membersType = 0

let pay = 0
if(req.body.membersType === 1) pay = req.body.membersCount * 1600
if(req.body.membersType === 0) pay = req.body.membersCount * 800

let dataOrder = {
membersType: req.body.membersType,
pay: pay,
membersCount: req.body.membersCount,
link: req.body.link
}

let user = await db.getRESTDataUser(req.headers.authorization)
if(!user) return res.status(403).json({errors: ['authorization'], message: "Failed authorization"})

let orderData = await db.addOrder(user.token, dataOrder)
console.log(orderData)
if(user.pay < pay){

var dataOrderNow = {
link: dataOrder.link, 
type: 1,
members: dataOrder.membersCount, 
membersType: dataOrder.membersType,
pay: dataOrder.pay, 
payType: 1, 
date: orderData.date, 
buyType: 0, 
orderid: orderData.orderid, 
id: orderData.id
} 

await db.editOrder(user.token, orderData.id, dataOrderNow)
 return res.status(403).json({errors: [{pay: {message: "You Don't Have Money"}}], message: "Invaild Form Body", errMessage: "You Don't Have Money"})
}
var dataOrderNow = {
link: dataOrder.link, 
type: 2,
members: dataOrder.membersCount, 
membersType: dataOrder.membersType,
pay: dataOrder.pay, 
payType: 2, 
date: orderData.date, 
buyType: 1, 
orderid: orderData.orderid, 
id: orderData.id
} 

await db.editOrder(user.token, orderData.id, dataOrderNow)
await db.removeMoney(user.token, pay)
res.status(200).json(dataOrderNow)
  }
}