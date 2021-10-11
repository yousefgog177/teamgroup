module.exports = {
	path: '/app/funds/add',
	method: 'get',
	run: async (req, res) => {
  res.sendFile("/app/website/Addfunds.html");
  }
}