import type {
	ICredentialTestRequest,
	ICredentialType,
	INodeProperties,
} from 'n8n-workflow';

export class ObsidianApi implements ICredentialType {
	name = 'obsidianApi';
	displayName = 'Obsidian API';
	documentationUrl = 'https://coddingtonbear.github.io/obsidian-local-rest-api/';
	icon = 'file:obsidian.svg' as unknown as undefined;

	properties: INodeProperties[] = [
		{
			displayName: 'API Key',
			name: 'apiKey',
			type: 'string',
			typeOptions: {
				password: true,
			},
			default: '',
			required: true,
			description: 'The API key for Obsidian Local REST API. Find it in Obsidian settings under "Local REST API" plugin.',
		},
		{
			displayName: 'Base URL',
			name: 'baseUrl',
			type: 'string',
			default: 'https://localhost:27124',
			required: true,
			description: 'The base URL of the Obsidian Local REST API. Default is https://localhost:27124 (HTTPS) or http://localhost:27123 (HTTP).',
		},
		{
			displayName: 'Ignore SSL Issues',
			name: 'ignoreSslIssues',
			type: 'boolean',
			default: true,
			description: 'Whether to ignore SSL certificate validation errors. Enable this when using the default self-signed certificate.',
		},
	];

	test: ICredentialTestRequest = {
		request: {
			baseURL: '={{$credentials.baseUrl}}',
			url: '/',
			headers: {
				Authorization: '=Bearer {{$credentials.apiKey}}',
			},
			skipSslCertificateValidation: '={{$credentials.ignoreSslIssues}}',
		},
	};
}
