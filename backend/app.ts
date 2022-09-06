import express from 'express'
import http from 'http'
import router from './routes/main'
import RunMigrations from './migrate'

require('dotenv').config()

const migrations = async () => {
	await RunMigrations()
}

migrations()

const app = express()

app.use('/', router)

const port = process.env.PORT || '3000'
app.set('port', port)

const server = http.createServer(app)
server.listen(port)

console.log('Express Server Started On Port ' + port)
