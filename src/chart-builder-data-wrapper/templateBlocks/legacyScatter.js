const legacyScatterTemplate = [
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
			chartType: 'scatter',
			paddingLeft: 30,
			paddingBottom: 20,
			paddingRight: 20,
			width: 640,
			height: 300,
			xMinDomain: 2000,
			xMaxDomain: 2020,
			xDomainPadding: 0,
			xTickMarksActive: true,
			xScale: 'time',
			yDomainPadding: 0,
			showYMinDomainLabel: true,
			yTickMarksActive: true,
			yTickLabelVerticalAnchor: 'middle',
			lineStrokeWidth: 4,
			nodeSize: 4,
			nodeFill: 'white',
			nodeStroke: 1,
			legendActive: true,
			legendOffsetX: 200,
			legendOffsetY: 10,
			tooltipActive: true,
		},
	],
];

export default legacyScatterTemplate;
