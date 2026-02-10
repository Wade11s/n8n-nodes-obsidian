import type { INodeProperties } from 'n8n-workflow';

const showOnlyForCommand = {
	resource: ['command'],
};

export const commandOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForCommand,
		},
		options: [
			{
				name: 'Execute',
				value: 'execute',
				description: 'Execute an Obsidian command',
				action: 'Execute a command',
			},
			{
				name: 'List Commands',
				value: 'listCommands',
				description: 'List all available Obsidian commands',
				action: 'List commands',
			},
		],
		default: 'listCommands',
	},
];

export const commandFields: INodeProperties[] = [
	{
		displayName: 'Command ID',
		name: 'commandId',
		type: 'string',
		default: '',
		required: true,
		description: 'The ID of the command to execute',
		displayOptions: {
			show: {
				resource: ['command'],
				operation: ['execute'],
			},
		},
	},
];
