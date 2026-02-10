import type { ObsidianCredentials } from '../../helpers/types';

/**
 * Get test credentials from environment variables
 * Falls back to defaults for baseUrl
 */
function getTestCredentials(): ObsidianCredentials {
	const apiKey = process.env.OBSIDIAN_TEST_API_KEY;
	const baseUrl = process.env.OBSIDIAN_TEST_BASE_URL || 'http://127.0.0.1:27123';

	if (!apiKey) {
		throw new Error(
			'OBSIDIAN_TEST_API_KEY environment variable is required for integration tests.\n' +
				'Please set it to your Obsidian Local REST API key.\n' +
				'Example: OBSIDIAN_TEST_API_KEY=your-api-key npm run test:integration',
		);
	}

	return {
		apiKey,
		baseUrl,
		ignoreSslIssues: false,
	};
}

/**
 * Test credentials for Obsidian Local REST API
 * These credentials are for the "test" vault only
 */
export const TEST_CREDENTIALS: ObsidianCredentials = getTestCredentials();

/**
 * Ensure all paths use the test vault prefix
 */
export const toTestPath = (path: string): string => {
	if (path.startsWith('test/')) return path;
	return `test/${path}`;
};

/**
 * Health check to verify Obsidian API is accessible
 */
export async function checkObsidianHealth(): Promise<boolean> {
	try {
		const response = await fetch(`${TEST_CREDENTIALS.baseUrl}/`, {
			headers: {
				Authorization: `Bearer ${TEST_CREDENTIALS.apiKey}`,
			},
		});
		return response.ok;
	} catch {
		return false;
	}
}

/**
 * Skip test if Obsidian is not running
 */
export function skipIfObsidianUnavailable(): void {
	beforeAll(async () => {
		const isHealthy = await checkObsidianHealth();
		if (!isHealthy) {
			// eslint-disable-next-line no-console
			console.warn(
				'\n⚠️  Obsidian Local REST API is not accessible. ' +
					'Please ensure:\n' +
					'  1. Obsidian is running\n' +
					'  2. Local REST API plugin is enabled\n' +
					'  3. HTTP server is running on 127.0.0.1:27123\n' +
					'  4. API key is configured in OBSIDIAN_TEST_API_KEY environment variable\n',
			);
		}
	});
}
