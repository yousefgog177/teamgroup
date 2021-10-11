const {verify} = require('hcaptcha');
let db = require('../../mongoose/db.js')
module.exports = {
	path: '/api/v1/login',
	method: 'post',
	run: async (req, res) => {

let {body, query, params} = req
if(!body.email) return res.status(403).json({errors: [{email: {message: "This Fields Request"}}], message: "Invaild Form Body"})
if(!body.password) return res.status(403).json({errors: [{password: {message: "This Fields Request"}}], message: "Invaild Form Body"})
if(!body.captcha) return res.status(403).json({errors: [{captcha: {sitekey: "e46bdb57-621f-4386-b8fc-23a2e92189f7", message: "Request hcaptcha"}}], message: "Invaild Form Body"})

const secret = '0x51D3Fc7f7458c0Db815C6703F3f4570605f50686';
const token = body.captcha;
let dataCaptcha = await verify(secret, token)
if(dataCaptcha.success === false && dataCaptcha['error-codes'].includes('sitekey-secret-mismatch')) return res.status(403).json({errors: [{captcha: {sitekey: "e46bdb57-621f-4386-b8fc-23a2e92189f7", message: "Request hcaptcha"}}], message: "Invaild Form Body"})
if(dataCaptcha.success === false) return res.status(403).json({errors: [{captcha: dataCaptcha['erorrs-codes'], message: "Failed Captcha"}], message: "Invaild Form Body"})
let data = await db.getRESTLogin(body.email, body.password)
if(!data) return res.status(403).json({errors: [{email: {message: "This Email Not use"}}], message: "Invaild Form Body"})
if(data.password === "Worng") return res.status(403).json({errors: [{password: {message: "Worng Password"}}], message: "Invaild Form Body"})
res.status(200).json({token: data.token})
  }
}