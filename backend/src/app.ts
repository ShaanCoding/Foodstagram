import http from 'http'

import chalk from 'chalk'
import cors from 'cors'
import * as dotenv from 'dotenv';
import express from 'express'

dotenv.config();

import router from './routes/main'
import RunMigrations from './util/migrate'
import { CreateEnvironmentContainers } from './util/storage'

const Run = async () => {
	await RunMigrations()
	await CreateEnvironmentContainers()

	const app = express()

	app.use(
		cors({
			origin: function (origin, callback) {
				// Allow traffic from any domains
				return callback(null, true)
			},
		})
	)

	app.use(express.json())

	app.use('/', router)

	const port = process.env.PORT || '3000'
	app.set('port', port)

	const server = http.createServer(app)
	server.listen(port)

	console.log(chalk.greenBright('Express Server Started On Port ' + port))

	process.on('SIGINT', function () {
		console.log(
			chalk.yellowBright('\nGracefully shutting down from SIGINT (Ctrl-C)')
		)

		server.close()

		process.exit(0)
	})
}

Run()
