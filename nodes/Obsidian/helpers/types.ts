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
 * Response metadata included in every standardized response
 */
export interface ResponseMeta {
	resource: string;
	operation: string;
	timestamp: string;
	statusCode: number;
	success?: boolean;
}

/**
 * Error information structure for failed operations
 */
export interface ErrorInfo {
	message: string;
	code: string;
	statusCode: number;
}

/**
 * Standardized response envelope for all operations
 */
export interface StandardizedResponse<T = IDataObject | null> {
	data: T;
	meta: ResponseMeta;
	error?: ErrorInfo;
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
