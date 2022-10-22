import { BlobServiceClient } from '@azure/storage-blob'
import chalk from 'chalk'

const { BLOB_CONNECTION_STRING, ENVIRONMENT } = process.env

export const getBlobClient = () => {
	return BlobServiceClient.fromConnectionString(BLOB_CONNECTION_STRING!)
}

export async function CreateEnvironmentContainers() {
	console.log(
		chalk.magentaBright(
			'Connecting to Azure & creating required environment containers.'
		)
	)

	const client = getBlobClient()

	try {
		await client.createContainer(ENVIRONMENT!, { access: 'container' })
	} catch {
		console.log(chalk.green('Container already existed with that name.'))
	}

	console.log(chalk.magentaBright('Finished creating file containers.'))
}
