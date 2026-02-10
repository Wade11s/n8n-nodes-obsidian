import type { IExecuteFunctions, IDataObject } from 'n8n-workflow';
import type { ObsidianCredentials, OperationHandler } from '../helpers/types';
import { makeRequest, encodePath } from '../helpers/api.helper';

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
	) as { commands: Array<{ id: string; name: string }> };
	// API returns { commands: [...] } directly
	return response;
};

export const handleExecuteCommand: OperationHandler = async function (
	this: IExecuteFunctions,
	itemIndex: number,
	credentials: ObsidianCredentials,
): Promise<IDataObject> {
	const commandId = this.getNodeParameter('commandId', itemIndex) as string;

	const encodedCommandId = encodePath(commandId);
	await makeRequest.call(
		this,
		credentials,
		{
			method: 'POST',
			url: `/commands/${encodedCommandId}/`,
		},
	);
	return { success: true, commandId };
};
