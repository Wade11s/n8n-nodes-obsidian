import type { IExecuteFunctions, IHttpRequestOptions, IDataObject } from 'n8n-workflow';
import type { ObsidianCredentials } from './types';

/**
 * API response with status code
 */
export interface ApiResponse<T = IDataObject> {
	data: T;
	statusCode: number;
}

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
 * Returns both the response data and HTTP status code
 */
export async function makeRequest<T = IDataObject>(
	this: IExecuteFunctions,
	credentials: ObsidianCredentials,
	options: IHttpRequestOptions,
): Promise<ApiResponse<T>> {
	const { apiKey, baseUrl, ignoreSslIssues } = credentials;

	const requestOptions: IHttpRequestOptions = {
		...options,
		baseURL: baseUrl,
		headers: {
			...options.headers,
			Authorization: `Bearer ${apiKey}`,
		},
		skipSslCertificateValidation: ignoreSslIssues,
		returnFullResponse: true,
	};

	const response = await this.helpers.httpRequest(requestOptions);

	// Handle full response with status code
	if (response && typeof response === 'object' && 'body' in response && 'statusCode' in response) {
		return {
			data: response.body as T,
			statusCode: response.statusCode as number,
		};
	}

	// Fallback for direct response (shouldn't happen with returnFullResponse: true)
	return {
		data: response as T,
		statusCode: 200,
	};
}
