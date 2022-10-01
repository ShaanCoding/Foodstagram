import path from 'path'

import chalk from 'chalk'
import dotenv from 'dotenv'
import mysql from 'mysql'
import { CommandsRunner, MysqlDriver } from 'node-db-migration'

import { dbConfig } from './db'

async function RunMigrations() {
	let connection = mysql.createConnection(dbConfig)
	console.log(
		chalk.cyan(
			`Connecting to database ${connection.config.database} for migrations`
		)
	)

	let migrations = new CommandsRunner({
		driver: new MysqlDriver(connection),
		directoryWithScripts: path.join(__dirname, '../migrations'),
	})

	await migrations.run('init')
	await migrations.run('migrate')

	connection.end()

	console.log(chalk.cyan('Finished running migrations, serving website.'))
}

export default RunMigrations
