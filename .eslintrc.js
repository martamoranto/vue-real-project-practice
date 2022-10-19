module.exports = {
	root: true,
	env: {
		node: true,
	},
	extends: [
		'plugin:vue/vue3-essential',
		'eslint:recommended',
		'plugin:prettier/recommended',
	],
	parserOptions: {
		parser: '@babel/eslint-parser',
	},
	rules: {
		'no-console': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'no-debugger': process.env.NODE_ENV === 'production' ? 'warn' : 'off',
		'prettier/prettier': [
			'error',
			{
				prindWidth: 100,
				singleQuote: true,
				tabWidth: 4,
				semi: false,
				endOfLine: 'lf',
				useTabs: true,
				singleAttributePerLine: true,
			},
		],
	},
	plugins: ['prettier'],
}
