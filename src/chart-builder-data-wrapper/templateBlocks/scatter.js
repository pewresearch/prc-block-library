const scatterTemplate = [
	[
		'core/table',
		{
			className: 'chart-builder-data-table',
			head: [
				{
					cells: [
						{ content: 'x', tag: 'th' },
						{ content: 'y1', tag: 'th' },
						{ content: 'y2', tag: 'th' },
					],
				},
			],
			body: [
				{
					cells: [
						{ content: '0', tag: 'td' },
						{ content: '50', tag: 'td' },
						{ content: '', tag: 'td' },
					],
				},
				{
					cells: [
						{ content: '50', tag: 'td' },
						{ content: '40', tag: 'td' },
						{ content: '12', tag: 'td' },
					],
				},
				{
					cells: [
						{ content: '75', tag: 'td' },
						{ content: '', tag: 'td' },
						{ content: '33', tag: 'td' },
					],
				},
				{
					cells: [
						{ content: '100', tag: 'td' },
						{ content: '70', tag: 'td' },
						{ content: '80', tag: 'td' },
					],
				},
			],
		},
	],
	[
		'prc-block/chart-builder',
		{
			isConvertedChart: false,
			chartType: 'scatter',
			width: 420,
			height: 356,
			paddingTop: 56,
			paddingRight: 20,
			paddingBottom: 20,
			paddingLeft: 30,
			xDomainPadding: 0,
			yDomainPadding: 0,
			showYMinDomainLabel: true,
			lineStrokeWidth: 4,
			lineNodes: true,
			nodeSize: 4,
			nodeStroke: 1,
			nodeFill: 'inherit',
		},
	],
];

export default scatterTemplate;
