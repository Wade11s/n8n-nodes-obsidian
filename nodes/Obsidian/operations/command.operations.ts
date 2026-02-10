import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import type { ObsidianCredentials, OperationHandler } from '../helpers/types';
import { makeRequest, encodePath } from '../helpers/api.helper';
import { createSuccessResponse, createMutationResponse } from '../helpers/response.helper';

export const handleListCommands: OperationHandler = async function (
	this: IExecuteFunctions,
	itemIndex: number,
	credentials: ObsidianCredentials,
): Promise<IDataObject> {
	const response = await makeRequest.call(
		this,
		credentials,
		{
			method: 'GET',
			url: '/commands/',
		},
	);
	// API returns { commands: [...] } directly
	return createSuccessResponse(response.data as IDataObject, 'command', 'list', response.statusCode) as unknown as IDataObject;
};

export const handleExecuteCommand: OperationHandler = async function (
	this: IExecuteFunctions,
	itemIndex: number,
	credentials: ObsidianCredentials,
): Promise<IDataObject> {
	const commandId = this.getNodeParameter('commandId', itemIndex) as string;

	const encodedCommandId = encodePath(commandId);
	const response = await makeRequest.call(
		this,
		credentials,
		{
			method: 'POST',
			url: `/commands/${encodedCommandId}/`,
		},
	);
	return createMutationResponse('command', 'execute', response.statusCode) as unknown as IDataObject;
};
