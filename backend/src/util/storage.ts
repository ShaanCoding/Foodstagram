const azure = require('@azure/storage-blob')
const chalk = require('chalk')

const dotenv = require('dotenv')
dotenv.config()

const { BLOB_CONNECTION_STRING, ENVIRONMENT } = process.env

const getBlobClient = () => {
	return azure.BlobServiceClient.fromConnectionString(
		BLOB_CONNECTION_STRING as string
	)
}

async function CreateEnvironmentContainers() {
	console.log(
		chalk.magentaBright(
			'Connecting to Azure & creating required environment containers.'
		)
	)

	const client = getBlobClient()

	try {
		await client.createContainer(ENVIRONMENT as string, { access: 'container' })
	} catch {
		console.log(chalk.green('Container already existed with that name.'))
	}

	console.log(chalk.magentaBright('Finished creating file containers.'))
}

export { getBlobClient, CreateEnvironmentContainers }
