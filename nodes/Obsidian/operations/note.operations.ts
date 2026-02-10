import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import type { ObsidianCredentials, OperationHandler } from '../helpers/types';
import { makeRequest, encodePath } from '../helpers/api.helper';
import { createSuccessResponse, createMutationResponse } from '../helpers/response.helper';

export const handleGetNote: OperationHandler = async function (
	this: IExecuteFunctions,
	itemIndex: number,
	credentials: ObsidianCredentials,
): Promise<IDataObject> {
	const path = this.getNodeParameter('path', itemIndex) as string;
	const encodedPath = encodePath(path);
	const response = await makeRequest.call(
		this,
		credentials,
		{
			method: 'GET',
			url: `/vault/${encodedPath}`,
			headers: {
				Accept: 'application/json',
			},
		},
	);
	return createSuccessResponse(response.data as IDataObject, 'note', 'get', response.statusCode) as unknown as IDataObject;
};

/**
 * Creates a new note in the Obsidian vault.
 * Uses PUT method with optional `overwrite` query parameter.
 * When overwrite is true, existing note will be replaced; otherwise the operation may fail if note exists.
 */
export const handleCreateNote: OperationHandler = async function (
	this: IExecuteFunctions,
	itemIndex: number,
	credentials: ObsidianCredentials,
): Promise<IDataObject> {
	const path = this.getNodeParameter('path', itemIndex) as string;
	const content = this.getNodeParameter('content', itemIndex) as string;
	const overwrite = this.getNodeParameter('overwrite', itemIndex, false) as boolean;

	const encodedPath = encodePath(path);
	const qs: IDataObject = {};
	if (overwrite) {
		qs.overwrite = 'true';
	}

	const response = await makeRequest.call(
		this,
		credentials,
		{
			method: 'PUT',
			url: `/vault/${encodedPath}`,
			headers: {
				'Content-Type': 'text/markdown',
			},
			body: content,
			qs,
		},
	);
	return createMutationResponse('note', 'create', response.statusCode) as unknown as IDataObject;
};

export const handleUpdateNote: OperationHandler = async function (
	this: IExecuteFunctions,
	itemIndex: number,
	credentials: ObsidianCredentials,
): Promise<IDataObject> {
	const path = this.getNodeParameter('path', itemIndex) as string;
	const content = this.getNodeParameter('content', itemIndex) as string;

	const encodedPath = encodePath(path);
	const response = await makeRequest.call(
		this,
		credentials,
		{
			method: 'PUT',
			url: `/vault/${encodedPath}`,
			headers: {
				'Content-Type': 'text/markdown',
			},
			body: content,
		},
	);
	return createMutationResponse('note', 'update', response.statusCode) as unknown as IDataObject;
};


export const handleDeleteNote: OperationHandler = async function (
	this: IExecuteFunctions,
	itemIndex: number,
	credentials: ObsidianCredentials,
): Promise<IDataObject> {
	const path = this.getNodeParameter('path', itemIndex) as string;

	const encodedPath = encodePath(path);
	const response = await makeRequest.call(
		this,
		credentials,
		{
			method: 'DELETE',
			url: `/vault/${encodedPath}`,
		},
	);
	return createMutationResponse('note', 'delete', response.statusCode) as unknown as IDataObject;
};

/**
 * Copies a note from source path to destination path.
 * Uses PUT method with `X-Destination` header to specify the target location.
 * Note: This operation uses Obsidian API's custom header approach for copying.
 */
export const handleCopyNote: OperationHandler = async function (
	this: IExecuteFunctions,
	itemIndex: number,
	credentials: ObsidianCredentials,
): Promise<IDataObject> {
	const sourcePath = this.getNodeParameter('sourcePath', itemIndex) as string;
	const destinationPath = this.getNodeParameter('destinationPath', itemIndex) as string;

	const encodedSourcePath = encodePath(sourcePath);
	const encodedDestinationPath = encodePath(destinationPath);

	const response = await makeRequest.call(
		this,
		credentials,
		{
			method: 'PUT',
			url: `/vault/${encodedSourcePath}`,
			headers: {
				'X-Destination': `/vault/${encodedDestinationPath}`,
			},
		},
	);
	return createMutationResponse('note', 'copy', response.statusCode) as unknown as IDataObject;
};

/**
 * Appends content to the end of an existing note.
 * Uses POST method with `X-Append: true` header to add content without replacing.
 * Creates the note if it doesn't exist.
 */
export const handleAppendToNote: OperationHandler = async function (
	this: IExecuteFunctions,
	itemIndex: number,
	credentials: ObsidianCredentials,
): Promise<IDataObject> {
	const path = this.getNodeParameter('path', itemIndex) as string;
	const content = this.getNodeParameter('content', itemIndex) as string;

	const encodedPath = encodePath(path);
	const response = await makeRequest.call(
		this,
		credentials,
		{
			method: 'POST',
			url: `/vault/${encodedPath}`,
			headers: {
				'Content-Type': 'text/markdown',
				'X-Append': 'true',
			},
			body: content,
		},
	);
	return createMutationResponse('note', 'append', response.statusCode) as unknown as IDataObject;
};
