import express from 'express'
import http from 'http'
import router from './routes/main'
import RunMigrations from './migrate'
import chalk from 'chalk'

require('dotenv').config()

const Run = async () => {
	await RunMigrations()

	const app = express()

	app.use('/', router)

	const port = process.env.PORT || '3000'
	app.set('port', port)

	const server = http.createServer(app)
	server.listen(port)

	console.log(chalk.greenBright('Express Server Started On Port ' + port))
}

Run()
