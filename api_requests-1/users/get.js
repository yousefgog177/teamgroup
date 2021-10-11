let db = require('../../mongoose/db.js')

module.exports = {
	path: '/api/v1/users/:id',
	method: 'get',
	run: async (req, res) => {
if(!req.params || !req.params.id) return res.status(403).json({errors: [{id: {message: "This field Request"}}], message: "Invaild Form Params"})
let {params} = req
if(params.id !== "@me"){

let user = await db.getRESTUser(params.id)
if(!user) return res.status(403).json({errors: [{id: {message: "Unknown User"}}], message: "Invaild Form Params"})
delete user.token
delete user.email
delete user.password
delete user.payHistory
delete user.orders
res.status(200).json(user)
}else{

if(!req.headers || !req.headers.authorization) return res.status(403).json({errors: ['authorization'], message: "Request Headers Authorization"})

let user = await db.getRESTDataUser(req.headers.authorization)
if(!user) return res.status(403).json({errors: ['authorization'], message: "Failed authorization"})
delete user.email
delete user.password
res.status(200).json(user)
}

  }
}