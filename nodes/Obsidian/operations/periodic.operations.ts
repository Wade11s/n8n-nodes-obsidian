import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import type { ObsidianCredentials, OperationHandler } from '../helpers/types';
import { makeRequest } from '../helpers/api.helper';
import { createSuccessResponse, createMutationResponse } from '../helpers/response.helper';

/**
 * Retrieves a periodic note (daily, weekly, monthly, quarterly, or yearly).
 * URL pattern: `/periodic/${period}/` for current date, or `/periodic/${period}/${date}/` for specific date.
 * When date is empty, the API returns the periodic note for the current date.
 */
export const handleGetPeriodicNote: OperationHandler = async function (
	this: IExecuteFunctions,
	itemIndex: number,
	credentials: ObsidianCredentials,
): Promise<IDataObject> {
	const period = this.getNodeParameter('period', itemIndex) as string;
	const date = this.getNodeParameter('date', itemIndex, '') as string;

	const url = date ? `/periodic/${period}/${date}/` : `/periodic/${period}/`;
	const response = await makeRequest.call(
		this,
		credentials,
		{
			method: 'GET',
			url,
		},
	);
	return createSuccessResponse(response.data as IDataObject, 'periodic', 'get', response.statusCode) as unknown as IDataObject;
};

/**
 * Creates or updates a periodic note.
 * URL pattern follows the same logic as handleGetPeriodicNote.
 * Uses PUT method to write content to the periodic note.
 */
export const handleCreatePeriodicNote: OperationHandler = async function (
	this: IExecuteFunctions,
	itemIndex: number,
	credentials: ObsidianCredentials,
): Promise<IDataObject> {
	const period = this.getNodeParameter('period', itemIndex) as string;
	const date = this.getNodeParameter('date', itemIndex, '') as string;
	const content = this.getNodeParameter('content', itemIndex) as string;

	const url = date ? `/periodic/${period}/${date}/` : `/periodic/${period}/`;
	const response = await makeRequest.call(
		this,
		credentials,
		{
			method: 'PUT',
			url,
			headers: {
				'Content-Type': 'text/markdown',
			},
			body: content,
		},
	);
	return createMutationResponse('periodic', 'create', response.statusCode) as unknown as IDataObject;
};
