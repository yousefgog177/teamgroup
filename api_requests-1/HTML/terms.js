module.exports = {
	path: '/app/terms',
	method: 'get',
	run: async (req, res) => {
  res.sendFile("/app/wix/terms.html");
  }
}