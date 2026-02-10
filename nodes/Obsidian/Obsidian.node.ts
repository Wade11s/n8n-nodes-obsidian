import type {
	IExecuteFunctions,
	INodeExecutionData,
	INodeType,
	INodeTypeDescription,
} from 'n8n-workflow';
import { NodeConnectionTypes, NodeOperationError } from 'n8n-workflow';
import { operations } from './operations';
import type { ObsidianCredentials } from './helpers/types';
import {
	noteOperations,
	noteFields,
	vaultOperations,
	vaultFields,
	periodicOperations,
	periodicFields,
	commandOperations,
	commandFields,
} from './resources';

export class Obsidian implements INodeType {
	description: INodeTypeDescription = {
		displayName: 'Obsidian',
		name: 'obsidian',
		icon: { light: 'file:obsidian.svg', dark: 'file:obsidian.dark.svg' },
		group: ['output'],
		version: 1,
		description: 'Interact with Obsidian vault via Local REST API',
		subtitle: '={{$parameter["resource"] + ": " + $parameter["operation"]}}',
		defaults: {
			name: 'Obsidian',
		},
		inputs: [NodeConnectionTypes.Main],
		outputs: [NodeConnectionTypes.Main],
		usableAsTool: true,
		credentials: [
			{
				name: 'obsidianApi',
				required: true,
			},
		],
		properties: [
			{
				displayName: 'Resource',
				name: 'resource',
				type: 'options',
				noDataExpression: true,
				options: [
					{
						name: 'Command',
						value: 'command',
						description: 'Execute Obsidian commands',
					},
					{
						name: 'Note',
						value: 'note',
						description: 'Work with individual notes',
					},
					{
						name: 'Periodic',
						value: 'periodic',
						description: 'Work with periodic notes (daily, weekly, etc.)',
					},
					{
						name: 'Vault',
						value: 'vault',
						description: 'Vault-wide operations',
					},
				],
				default: 'note',
			},
			...noteOperations,
			...noteFields,
			...vaultOperations,
			...vaultFields,
			...periodicOperations,
			...periodicFields,
			...commandOperations,
			...commandFields,
			{
				displayName: 'Options',
				name: 'options',
				type: 'collection',
				placeholder: 'Add Option',
				default: {},
				options: [
					{
						displayName: 'Continue On Fail',
						name: 'continueOnFail',
						type: 'boolean',
						default: false,
						description: 'Whether to continue the workflow if the operation fails',
					},
				],
			},
		],
	};

	async execute(this: IExecuteFunctions): Promise<INodeExecutionData[][]> {
		const items = this.getInputData();
		const returnData: INodeExecutionData[] = [];

		const credentials = (await this.getCredentials('obsidianApi')) as unknown as ObsidianCredentials;

		// Backward compatibility: map old operation names to resources
		const operationToResource: Record<string, string> = {
			getNote: 'note', createNote: 'note', updateNote: 'note',
			deleteNote: 'note', copyNote: 'note', appendToNote: 'note',
			listNotes: 'vault',
			getPeriodicNote: 'periodic', createPeriodicNote: 'periodic',
			listCommands: 'command', executeCommand: 'command',
		};

		for (let itemIndex = 0; itemIndex < items.length; itemIndex++) {
			// Get resource with backward compatibility
			let resource = this.getNodeParameter('resource', itemIndex, '') as string;
			const operation = this.getNodeParameter('operation', itemIndex) as string;
			const options = this.getNodeParameter('options', itemIndex, {}) as { continueOnFail?: boolean };
			const continueOnFail = options.continueOnFail ?? false;

			// Backward compatibility: map old operation format to new resource.operation
			if (!resource) {
				resource = operationToResource[operation] || 'note';
			}

			// Build the handler key
			const handlerKey = `${resource}.${operation}`;

			const handler = operations[handlerKey];
			if (!handler) {
				throw new NodeOperationError(this.getNode(), `Unknown operation: ${handlerKey}`, {
					itemIndex,
				});
			}

			try {
				const result = await handler.call(this, itemIndex, credentials);

				returnData.push({
					json: result,
					pairedItem: { item: itemIndex },
				});
			} catch (error) {
				if (continueOnFail) {
					returnData.push({
						json: { error: (error as Error).message },
						pairedItem: { item: itemIndex },
					});
				} else {
					const errorWithContext = error as { context?: { itemIndex?: number } };
					if (errorWithContext.context) {
						errorWithContext.context.itemIndex = itemIndex;
						throw error;
					}
					throw new NodeOperationError(this.getNode(), error as Error, {
						itemIndex,
					});
				}
			}
		}

		return [returnData];
	}

}
