import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import type { ObsidianCredentials, OperationHandler } from '../helpers/types';
import { makeRequest, encodePath } from '../helpers/api.helper';
import { createSuccessResponse } from '../helpers/response.helper';

export const handleListNotes: OperationHandler = async function (
	this: IExecuteFunctions,
	itemIndex: number,
	credentials: ObsidianCredentials,
): Promise<IDataObject> {
	const folder = this.getNodeParameter('folder', itemIndex, '') as string;

	// Build the path: if folder is provided, append it to the URL path
	// Obsidian API uses path-based folder filtering, not query params
	let url = '/vault/';
	if (folder) {
		// Ensure folder doesn't start or end with slash
		const cleanFolder = folder.replace(/^\//, '').replace(/\/$/, '');
		if (cleanFolder) {
			url = `/vault/${encodePath(cleanFolder)}/`;
		}
	}
	const response = await makeRequest.call(
		this,
		credentials,
		{
			method: 'GET',
			url,
		},
	);
	return createSuccessResponse({ results: response.data as IDataObject }, 'vault', 'list', response.statusCode) as unknown as IDataObject;
};
