import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';

/**
 * Obsidian API credentials
 */
export interface ObsidianCredentials {
	apiKey: string;
	baseUrl: string;
	ignoreSslIssues: boolean;
}

/**
 * Standard operation handler function signature
 * All operation handlers must implement this interface
 */
export type OperationHandler = (
	this: IExecuteFunctions,
	itemIndex: number,
	credentials: ObsidianCredentials,
) => Promise<IDataObject>;
