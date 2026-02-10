import { config } from '@n8n/node-cli/eslint';

export default [
	...config,
	{
		files: ['nodes/**/__tests__/**/*.ts'],
		rules: {
			// Allow process.env in test files for configuration
			'@n8n/community-nodes/no-restricted-globals': 'off',
		},
	},
];
