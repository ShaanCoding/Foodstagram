import mysql from 'mysql'
import path from 'path'
import dotenv from 'dotenv'

const chalk = require('chalk')

dotenv.config()

let { CommandsRunner, MysqlDriver } = require('node-db-migration')

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = process.env

let connection = mysql.createConnection({
	host: DB_HOST,
	user: DB_USERNAME,
	database: DB_NAME,
	password: DB_PASSWORD,
	multipleStatements: true,
})

async function RunMigrations() {
	console.log(chalk.cyan(`Connecting to database ${DB_NAME} for migrations`))

	let migrations = new CommandsRunner({
		driver: new MysqlDriver(connection),
		directoryWithScripts: path.join(__dirname, 'migrations'),
	})

	await migrations.run('init')
	await migrations.run('migrate')

	connection.end()

	console.log(chalk.cyan('Finished running migrations, serving website.'))
}

export default RunMigrations
