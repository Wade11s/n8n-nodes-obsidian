import type { IExecuteFunctions, IHttpRequestOptions } from 'n8n-workflow';
import { TEST_CREDENTIALS } from './setup';
import { makeRequest } from '../../helpers/api.helper';

// Mock `this` context for makeRequest calls outside of operation handlers
const mockThis: IExecuteFunctions = {
	helpers: {
		httpRequest: async (options: IHttpRequestOptions): Promise<unknown> => {
			// Fix double slash issue
			const baseURL = options.baseURL?.replace(/\/$/, '') || '';
			const url = options.url?.startsWith('/') ? options.url : `/${options.url}`;
			const fullUrl = baseURL + url;

			// Determine body content - don't JSON stringify if it's already a string
			let body: string | undefined;
			if (options.body) {
				if (typeof options.body === 'string') {
					body = options.body;
				} else {
					body = JSON.stringify(options.body);
				}
			}

			const response = await fetch(fullUrl, {
				method: options.method || 'GET',
				headers: options.headers as Record<string, string>,
				body,
			});

			if (!response.ok) {
				throw new Error(`HTTP ${response.status}: ${response.statusText}`);
			}

			// Handle empty responses (e.g., DELETE)
			const contentLength = response.headers.get('content-length');
			if (contentLength === '0' || response.status === 204) {
				return {};
			}

			// Try to parse JSON, fall back to text
			const contentTypeHeader = response.headers.get('content-type') || '';
			if (contentTypeHeader.includes('application/json')) {
				return response.json();
			}
			return response.text();
		},
	},
} as IExecuteFunctions;

/**
 * Create a mock IExecuteFunctions for integration tests
 * Only mocks getNodeParameter, uses real HTTP requests
 */
export function createMockExecuteFunctions(
	parameters: Record<string, unknown>,
): IExecuteFunctions {
	return {
		getNodeParameter: jest.fn((name: string, _itemIndex: number, defaultValue?: unknown) => {
			return parameters[name] ?? defaultValue;
		}),
		helpers: {
			httpRequest: mockThis.helpers.httpRequest,
		},
	} as unknown as IExecuteFunctions;
}

/**
 * Clean up all content in the test vault
 * This should be called before each test to ensure isolation
 */
export async function cleanupTestVault(): Promise<void> {
	try {
		// List all files in test vault
		const response = (await makeRequest.call(
			mockThis,
			TEST_CREDENTIALS,
			{
				method: 'GET',
				url: '/vault/test/',
			},
		)) as { files?: Array<{ path: string; type: 'file' | 'folder' }> };

		const files = response.files || [];

		// Sort files by path depth (deepest first) to delete children before parents
		const sortedFiles = files.sort((a, b) => {
			const depthA = a.path.split('/').length;
			const depthB = b.path.split('/').length;
			return depthB - depthA;
		});

		// Delete all files and folders
		for (const item of sortedFiles) {
			try {
				const encodedPath = item.path.split('/').map(encodeURIComponent).join('/');
				await makeRequest.call(
					mockThis,
					TEST_CREDENTIALS,
					{
						method: 'DELETE',
						url: item.type === 'folder' ? `/vault/${encodedPath}/` : `/vault/${encodedPath}`,
					},
				);
			} catch {
				// Ignore errors during cleanup (item might not exist)
			}
		}
	} catch {
		// If test vault doesn't exist yet, that's fine
	}
}

/**
 * Create a test note with given path and content
 */
export async function createTestNote(path: string, content: string): Promise<void> {
	const encodedPath = path.split('/').map(encodeURIComponent).join('/');
	await makeRequest.call(
		mockThis,
		TEST_CREDENTIALS,
		{
			method: 'PUT',
			url: `/vault/${encodedPath}`,
			headers: {
				'Content-Type': 'text/markdown',
			},
			body: content,
		},
	);
}

/**
 * Check if a note exists in the test vault
 */
export async function noteExists(path: string): Promise<boolean> {
	try {
		const encodedPath = path.split('/').map(encodeURIComponent).join('/');
		await makeRequest.call(
			mockThis,
			TEST_CREDENTIALS,
			{
				method: 'GET',
				url: `/vault/${encodedPath}`,
			},
		);
		return true;
	} catch {
		return false;
	}
}
