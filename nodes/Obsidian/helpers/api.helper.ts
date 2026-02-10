import type { IExecuteFunctions, IHttpRequestOptions, IDataObject } from 'n8n-workflow';
import type { ObsidianCredentials } from './types';

/**
 * Encode path segments separately while preserving directory separators
 * Ensures paths like 'folder/note.md' are encoded correctly
 */
export const encodePath = (path: string): string => {
	return path
		.split('/')
		.map((part) => encodeURIComponent(part))
		.join('/');
};

/**
 * Make an authenticated request to the Obsidian Local REST API
 */
export async function makeRequest(
	this: IExecuteFunctions,
	credentials: ObsidianCredentials,
	options: IHttpRequestOptions,
): Promise<IDataObject> {
	const { apiKey, baseUrl, ignoreSslIssues } = credentials;

	const requestOptions: IHttpRequestOptions = {
		...options,
		baseURL: baseUrl,
		headers: {
			...options.headers,
			Authorization: `Bearer ${apiKey}`,
		},
		skipSslCertificateValidation: ignoreSslIssues,
	};

	const response = await this.helpers.httpRequest(requestOptions);
	return response as IDataObject;
}
