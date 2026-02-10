import type { INodeProperties } from 'n8n-workflow';

const showOnlyForVault = {
	resource: ['vault'],
};

export const vaultOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForVault,
		},
		options: [
			{
				name: 'List Notes',
				value: 'listNotes',
				description: 'List all notes in the vault',
				action: 'List notes',
			},
		],
		default: 'listNotes',
	},
];

export const vaultFields: INodeProperties[] = [
	{
		displayName: 'Folder',
		name: 'folder',
		type: 'string',
		default: '',
		description: 'The folder to list notes from (optional, lists root if empty)',
		displayOptions: {
			show: {
				resource: ['vault'],
				operation: ['listNotes'],
			},
		},
	},
	{
		displayName: 'Include Subfolders',
		name: 'includeSubfolders',
		type: 'boolean',
		default: false,
		description: 'Whether to include notes from subfolders',
		displayOptions: {
			show: {
				resource: ['vault'],
				operation: ['listNotes'],
			},
		},
	},
];
