module.exports = {
	path: '/app',
	method: 'get',
	run: async (req, res) => {
  res.sendFile("/app/wix/home.html");
  }
}