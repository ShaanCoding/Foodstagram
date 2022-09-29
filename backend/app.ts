import http from 'http'

import { DefaultAzureCredential } from '@azure/identity';
import { BlobServiceClient } from '@azure/storage-blob';
import express from 'express'
import formData from 'express-form-data';
import mysql, { EscapeFunctions } from 'mysql';

import router from './routes/main'

require('dotenv').config()

export const database = mysql.createConnection({
	host: process.env.DATABASE_HOST,
	port: +process.env.DATABASE_PORT!,
	user: process.env.DATABASE_USERNAME,
	password: process.env.DATABASE_PASSWORD,
	database: process.env.DATABASE_NAME,
});

// https://www.npmjs.com/package/mysql#custom-format
database.config.queryFormat = function (this: EscapeFunctions, query: string, values: any) {
	if (!values) return query;
	return query.replace(/\:(\w+)/g, function (this: EscapeFunctions,  txt: string, key: string & keyof typeof values) {
		return values.hasOwnProperty(key) ? this.escape(values[key]) : txt;
	}.bind(this));
};

export const blobServiceClient = new BlobServiceClient(`https://${process.env.AZURE_STORAGE_ACCOUNT_NAME}.blob.core.windows.net`, new DefaultAzureCredential());

database.connect();

const app = express()

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(formData.parse());
app.use(formData.format());
app.use(formData.stream());
app.use(formData.union());
app.use('/', router)

const port = process.env.PORT || '3000'
app.set('port', port)

const server = http.createServer(app)
server.listen(port)

console.log('Express Server Started On Port ' + port)
