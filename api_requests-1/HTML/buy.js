module.exports = {
	path: '/buy',
	method: 'get',
	run: async (req, res) => {
  res.sendFile("/app/website/buymembers.html");
  }
}