import {
	createSuccessResponse,
	createMutationResponse,
	createErrorResponse,
	getErrorCode,
} from '../../helpers/response.helper';

describe('getErrorCode', () => {
	it('should return correct error code for known status codes', () => {
		expect(getErrorCode(400)).toBe('BAD_REQUEST');
		expect(getErrorCode(401)).toBe('UNAUTHORIZED');
		expect(getErrorCode(403)).toBe('FORBIDDEN');
		expect(getErrorCode(404)).toBe('NOT_FOUND');
		expect(getErrorCode(409)).toBe('CONFLICT');
		expect(getErrorCode(422)).toBe('VALIDATION_ERROR');
		expect(getErrorCode(429)).toBe('RATE_LIMITED');
		expect(getErrorCode(500)).toBe('INTERNAL_ERROR');
		expect(getErrorCode(502)).toBe('BAD_GATEWAY');
		expect(getErrorCode(503)).toBe('SERVICE_UNAVAILABLE');
		expect(getErrorCode(504)).toBe('GATEWAY_TIMEOUT');
	});

	it('should return UNKNOWN_ERROR for unknown status codes', () => {
		expect(getErrorCode(999)).toBe('UNKNOWN_ERROR');
		expect(getErrorCode(0)).toBe('UNKNOWN_ERROR');
	});
});

describe('createSuccessResponse', () => {
	it('should create response with data for query operations', () => {
		const data = { content: '# Test Note', path: 'test.md' };
		const response = createSuccessResponse(data, 'note', 'get', 200);

		expect(response.data).toEqual(data);
		expect(response.meta.resource).toBe('note');
		expect(response.meta.operation).toBe('get');
		expect(response.meta.statusCode).toBe(200);
		expect(response.meta.success).toBe(true);
		expect(response.meta.timestamp).toBeDefined();
		expect(response.error).toBeUndefined();
	});

	it('should include ISO timestamp', () => {
		const data = { results: [] };
		const response = createSuccessResponse(data, 'vault', 'list', 200);

		expect(response.meta.timestamp).toMatch(/^\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}/);
	});
});

describe('createMutationResponse', () => {
	it('should create response with null data for mutation operations', () => {
		const response = createMutationResponse('note', 'delete', 204);

		expect(response.data).toBeNull();
		expect(response.meta.resource).toBe('note');
		expect(response.meta.operation).toBe('delete');
		expect(response.meta.statusCode).toBe(204);
		expect(response.meta.success).toBe(true);
		expect(response.meta.timestamp).toBeDefined();
		expect(response.error).toBeUndefined();
	});

	it('should work for create operations', () => {
		const response = createMutationResponse('note', 'create', 201);

		expect(response.data).toBeNull();
		expect(response.meta.operation).toBe('create');
	});

	it('should work for update operations', () => {
		const response = createMutationResponse('note', 'update', 200);

		expect(response.data).toBeNull();
		expect(response.meta.operation).toBe('update');
	});
});

describe('createErrorResponse', () => {
	it('should create error response with all fields', () => {
		const response = createErrorResponse(
			'Note not found',
			404,
			'note',
			'get',
			'NOT_FOUND',
		);

		expect(response.data).toBeNull();
		expect(response.meta.resource).toBe('note');
		expect(response.meta.operation).toBe('get');
		expect(response.meta.statusCode).toBe(404);
		expect(response.meta.success).toBe(false);
		expect(response.error).toBeDefined();
		expect(response.error!.message).toBe('Note not found');
		expect(response.error!.code).toBe('NOT_FOUND');
		expect(response.error!.statusCode).toBe(404);
	});

	it('should auto-generate error code if not provided', () => {
		const response = createErrorResponse(
			'Server error',
			500,
			'command',
			'execute',
		);

		expect(response.error!.code).toBe('INTERNAL_ERROR');
	});

	it('should handle network errors with status code 0', () => {
		const response = createErrorResponse(
			'Network error',
			0,
			'vault',
			'list',
			'NETWORK_ERROR',
		);

		expect(response.error!.statusCode).toBe(0);
		expect(response.error!.code).toBe('NETWORK_ERROR');
	});
});
