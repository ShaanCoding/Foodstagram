module.exports = {
	plugins: ['transform-commonjs-es2015-modules'],
	presets: [
		['@babel/preset-env', { targets: { node: 'current' } }],
		'@babel/preset-typescript',
	],
}
