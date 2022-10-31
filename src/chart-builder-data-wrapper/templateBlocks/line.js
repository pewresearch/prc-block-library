const lineTemplate = [
	[
		'core/table',
		{
			className: 'chart-builder-data-table',
			head: [
				{
					cells: [
						{ content: 'Year', tag: 'th' },
						{ content: 'n1', tag: 'th' },
						{ content: 'n2', tag: 'th' },
					],
				},
			],
			body: [
				{
					cells: [
						{ content: '2000', tag: 'td' },
						{ content: '20', tag: 'td' },
						{ content: '30', tag: 'td' },
					],
				},
				{
					cells: [
						{ content: '2010', tag: 'td' },
						{ content: '40', tag: 'td' },
						{ content: '50', tag: 'td' },
					],
				},
				{
					cells: [
						{ content: '2020', tag: 'td' },
						{ content: '70', tag: 'td' },
						{ content: '30', tag: 'td' },
					],
				},
			],
		},
	],
	[
		'prc-block/chart-builder',
		{
			isConvertedChart: false,
			chartType: 'line',
			width: 420,
			height: 356,
			paddingTop: 20,
			paddingRight: 20,
			paddingBottom: 20,
			paddingLeft: 30,
			xDomainPadding: 1,
			yDomainPadding: 0,
			xMinDomain: 2000,
			xMaxDomain: 2020,
			xScale: 'time',
			showYMinDomainLabel: true,
			lineStrokeWidth: 4,
			lineNodes: true,
			nodeSize: 4,
			nodeStroke: 1,
			nodeFill: 'white',
		},
	],
];

export default lineTemplate;
