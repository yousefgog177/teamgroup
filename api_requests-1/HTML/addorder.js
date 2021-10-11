module.exports = {
	path: '/app/orders/add',
	method: 'get',
	run: async (req, res) => {
  res.sendFile("/app/wix/store.html");
  }
}