import type { INodeProperties } from 'n8n-workflow';

const showOnlyForPeriodic = {
	resource: ['periodic'],
};

export const periodicOperations: INodeProperties[] = [
	{
		displayName: 'Operation',
		name: 'operation',
		type: 'options',
		noDataExpression: true,
		displayOptions: {
			show: showOnlyForPeriodic,
		},
		options: [
			{
				name: 'Create',
				value: 'create',
				description: 'Create or update a periodic note',
				action: 'Create a periodic note',
			},
			{
				name: 'Get',
				value: 'get',
				description: 'Get a periodic note (daily, weekly, etc.)',
				action: 'Get a periodic note',
			},
		],
		default: 'get',
	},
];

export const periodicFields: INodeProperties[] = [
	{
		displayName: 'Period',
		name: 'period',
		type: 'options',
		options: [
			{
				name: 'Daily',
				value: 'daily',
			},
			{
				name: 'Monthly',
				value: 'monthly',
			},
			{
				name: 'Quarterly',
				value: 'quarterly',
			},
			{
				name: 'Weekly',
				value: 'weekly',
			},
			{
				name: 'Yearly',
				value: 'yearly',
			},
		],
		default: 'daily',
		description: 'The type of periodic note',
		displayOptions: {
			show: {
				resource: ['periodic'],
				operation: ['get', 'create'],
			},
		},
	},
	{
		displayName: 'Date',
		name: 'date',
		type: 'string',
		default: '',
		placeholder: 'YYYY-MM-DD',
		description: 'The date for the periodic note (optional, uses current date if empty)',
		displayOptions: {
			show: {
				resource: ['periodic'],
				operation: ['get', 'create'],
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
		description: 'The content to write to the periodic note',
		displayOptions: {
			show: {
				resource: ['periodic'],
				operation: ['create'],
			},
		},
	},
];
