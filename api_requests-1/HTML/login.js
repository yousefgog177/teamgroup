module.exports = {
	path: '/login',
	method: 'get',
	run: async (req, res) => {
  res.sendFile("/app/website/login.html");
  }
}