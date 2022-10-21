import dotenv from 'dotenv'
import mysql from 'mysql2'

dotenv.config()

const { DB_USERNAME, DB_PASSWORD, DB_HOST, ENVIRONMENT } = process.env

export const dbConfig = {
	host: DB_HOST,
	user: DB_USERNAME,
	database: ENVIRONMENT,
	password: DB_PASSWORD,
	multipleStatements: true,
}

export const pool = mysql.createPool({
	host: DB_HOST,
	user: DB_USERNAME,
	database: ENVIRONMENT,
	password: DB_PASSWORD,
	multipleStatements: true,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
})

export const Query = (sql: string, parameters: string[]) =>
	pool
		.promise()
		.execute(sql, parameters)
		.then(([rows, fields]) => rows)
