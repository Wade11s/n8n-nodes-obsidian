import type { IDataObject } from 'n8n-workflow';
import type { StandardizedResponse, ResponseMeta, ErrorInfo } from './types';

/**
 * HTTP status code to error code mapping
 */
const STATUS_CODE_TO_ERROR_CODE: Record<number, string> = {
	400: 'BAD_REQUEST',
	401: 'UNAUTHORIZED',
	403: 'FORBIDDEN',
	404: 'NOT_FOUND',
	409: 'CONFLICT',
	422: 'VALIDATION_ERROR',
	429: 'RATE_LIMITED',
	500: 'INTERNAL_ERROR',
	502: 'BAD_GATEWAY',
	503: 'SERVICE_UNAVAILABLE',
	504: 'GATEWAY_TIMEOUT',
};

/**
 * Get error code from HTTP status code
 */
export function getErrorCode(statusCode: number): string {
	return STATUS_CODE_TO_ERROR_CODE[statusCode] || 'UNKNOWN_ERROR';
}

/**
 * Create response metadata
 */
export function createResponseMeta(
	resource: string,
	operation: string,
	statusCode: number,
	success = true,
): ResponseMeta {
	return {
		resource,
		operation,
		timestamp: new Date().toISOString(),
		statusCode,
		success,
	};
}

/**
 * Create a standardized success response for query operations
 */
export function createSuccessResponse<T extends IDataObject>(
	data: T,
	resource: string,
	operation: string,
	statusCode: number,
): StandardizedResponse<T> {
	return {
		data,
		meta: createResponseMeta(resource, operation, statusCode, true),
	};
}

/**
 * Create a standardized response for mutation operations
 */
export function createMutationResponse(
	resource: string,
	operation: string,
	statusCode: number,
): StandardizedResponse<null> {
	return {
		data: null,
		meta: createResponseMeta(resource, operation, statusCode, true),
	};
}

/**
 * Create a standardized error response
 */
export function createErrorResponse(
	message: string,
	statusCode: number,
	resource: string,
	operation: string,
	code?: string,
): StandardizedResponse<null> {
	const errorInfo: ErrorInfo = {
		message,
		code: code || getErrorCode(statusCode),
		statusCode,
	};

	return {
		data: null,
		meta: createResponseMeta(resource, operation, statusCode, false),
		error: errorInfo,
	};
}
