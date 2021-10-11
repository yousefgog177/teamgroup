module.exports = {
	path: '/',
	method: 'get',
	run: async (req, res) => {
  res.sendFile("/app/website/home.html");
  }
}