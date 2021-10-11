module.exports = {
	path: '/style',
	method: 'get',
	run: async (req, res) => {
if(!req.query || !req.query.for) return res.status(403).json({errors: [{for: {message: "This field Request"}}], message: "Invaild Form Query"})
if(req.query.for === "login") return res.sendFile("/app/css/style-" + req.query.for + ".css");
if(req.query.for === "app") return res.sendFile("/app/css/style-" + req.query.for + ".css");
if(req.query.for === "add-order") return res.sendFile("/app/css/style-" + req.query.for + ".css");
if(req.query.for === "add-funds") return res.sendFile("/app/css/style-" + req.query.for + ".css");

res.status(403).json({errors: [{for: {message: "Invaild Data"}}], message: "Invaild Form Query"})
  }
}