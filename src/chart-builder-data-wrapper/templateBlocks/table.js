const tableTemplate = [
	'core/table',
	{
		className: 'chart-builder-data-table',
		head: [
			{
				cells: [
					{ content: 'x', tag: 'th' },
					{ content: 'y', tag: 'th' },
				],
			},
		],
		body: [
			{
				cells: [
					{ content: '', tag: 'td' },
					{ content: '', tag: 'td' },
				],
			},
			{
				cells: [
					{ content: '', tag: 'td' },
					{ content: '', tag: 'td' },
				],
			},
		],
	},
];

export default tableTemplate;
