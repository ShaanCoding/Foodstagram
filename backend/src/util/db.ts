import mysql from 'mysql2'

require('dotenv').config()

const { DB_USERNAME, DB_PASSWORD, DB_HOST, ENVIRONMENT } = process.env

const dbConfig = {
	host: DB_HOST,
	user: DB_USERNAME,
	database: ENVIRONMENT,
	password: DB_PASSWORD,
	multipleStatements: true,
}

const pool = mysql.createPool({
	host: DB_HOST,
	user: DB_USERNAME,
	database: ENVIRONMENT,
	password: DB_PASSWORD,
	multipleStatements: true,
	waitForConnections: true,
	connectionLimit: 10,
	queueLimit: 0,
})

const Query = async (sql: string, parameters: string[]) => {
	const [rows, fields] = await pool.promise().execute(sql, parameters)
	return rows
}

export { dbConfig, Query }
