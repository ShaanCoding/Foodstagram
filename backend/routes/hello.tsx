function hello(req, res) {
	const name = req.params.name ?? 'world'
	res.send(`hello ${name}!`)
}

export { hello }