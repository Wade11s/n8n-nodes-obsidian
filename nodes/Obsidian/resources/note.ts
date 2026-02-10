import type { INodeProperties } from 'n8n-workflow';

const showOnlyForNotes = {
	resource: ['note'],
};

export const noteOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForNotes,
		},
		options: [
			{
				name: 'Append',
				value: 'append',
				description: 'Append content to the end of a note',
				action: 'Append to a note',
			},
			{
				name: 'Copy',
				value: 'copy',
				description: 'Copy a note to a new location',
				action: 'Copy a note',
			},
			{
				name: 'Create',
				value: 'create',
				description: 'Create a new note',
				action: 'Create a note',
			},
			{
				name: 'Delete',
				value: 'delete',
				description: 'Delete a note',
				action: 'Delete a note',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get the content of a note',
				action: 'Get a note',
			},
			{
				name: 'Update',
				value: 'update',
				description: 'Update a note',
				action: 'Update a note',
			},
		],
		default: 'get',
	},
];

export const noteFields: INodeProperties[] = [
	{
		displayName: 'Path',
		name: 'path',
		type: 'string',
		default: '',
		required: true,
		description: 'The path to the note (e.g., "folder/note.md")',
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['get', 'update', 'delete', 'append'],
			},
		},
	},
	{
		displayName: 'Path',
		name: 'path',
		type: 'string',
		default: '',
		required: true,
		description: 'The path for the new note (e.g., "folder/note.md")',
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Content',
		name: 'content',
		type: 'string',
		typeOptions: {
			rows: 5,
		},
		default: '',
		required: true,
		description: 'The content to write to the note',
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['create', 'update', 'append'],
			},
		},
	},
	{
		displayName: 'Overwrite',
		name: 'overwrite',
		type: 'boolean',
		default: false,
		description: 'Whether to overwrite the note if it already exists',
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['create'],
			},
		},
	},
	{
		displayName: 'Source Path',
		name: 'sourcePath',
		type: 'string',
		default: '',
		required: true,
		description: 'The path of the note to copy',
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['copy'],
			},
		},
	},
	{
		displayName: 'Destination Path',
		name: 'destinationPath',
		type: 'string',
		default: '',
		required: true,
		description: 'The path to copy the note to',
		displayOptions: {
			show: {
				resource: ['note'],
				operation: ['copy'],
			},
		},
	},
];
