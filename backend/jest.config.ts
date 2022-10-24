import type { Config } from 'jest'

const config: Config = {
	extensionsToTreatAsEsm: ['.ts'],
	testRegex: 'src/routes/__tests__/hello.test.ts',
}

export default config
