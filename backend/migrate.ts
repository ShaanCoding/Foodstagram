import mysql from 'mysql'

require('dotenv').config()

let { CommandsRunner, MysqlDriver } = require('node-db-migration')

const { DB_USERNAME, DB_PASSWORD, DB_HOST, DB_NAME } = process.env

var connection = mysql.createConnection({
	host: DB_HOST,
	user: DB_USERNAME,
	database: DB_NAME,
	password: DB_PASSWORD,
	multipleStatements: true,
})

async function RunMigrations() {
	let migrations = new CommandsRunner({
		driver: new MysqlDriver(connection),
		directoryWithScripts: __dirname + '/migrations',
	})
	await migrations.run('init')
	migrations.run('migrate')
}

export default RunMigrations
