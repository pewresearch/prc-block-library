const dotPlotTemplate = [
	[
		'core/table',
		{
			className: 'chart-builder-data-table',
			head: [
				{
					cells: [
						{ content: 'Independent variable', tag: 'th' },
						{ content: 'n1', tag: 'th' },
						{ content: 'n2', tag: 'th' },
					],
				},
			],
			body: [
				{
					cells: [
						{ content: 'Germany', tag: 'td' },
						{ content: '30', tag: 'td' },
						{ content: '60', tag: 'td' },
					],
				},
				{
					cells: [
						{ content: 'Spain', tag: 'td' },
						{ content: '50', tag: 'td' },
						{ content: '70', tag: 'td' },
					],
				},
				{
					cells: [
						{ content: 'France', tag: 'td' },
						{ content: '60', tag: 'td' },
						{ content: '40', tag: 'td' },
					],
				},
			],
		},
	],
	[
		'prc-block/chart-builder',
		{
			isConvertedChart: false,
			chartType: 'dot-plot',
			width: 420,
			height: 200,
			paddingTop: 36,
			paddingLeft: 100,
			paddingBottom: 36,
			paddingRight: 20,
			xDomainPadding: 28,
			xTickLabelVerticalAnchor: 'middle',
			xAxisStroke: '#756f6b00',
			xGridStroke: '#d1d1d1',
			yAxisStroke: '#756f6b',
			yGridStroke: '#00000000',
			yDomainPadding: 0,
			showYMinDomainLabel: true,
			yTickMarksActive: true,
			yTickExact: '0,50,100',
			yTickLabelVerticalAnchor: 'middle',
			yMultiLineTickLabelsBreak: 3,
			lineStrokeWidth: 4,
			lineNodes: true,
			nodeSize: 4,
			nodeStroke: 1,
			tooltipActive: false,
			tooltipCategoryActive: false,
			labelsActive: true,
			labelPositionDX: 16,
			legendActive: true,
			legendMarkerStyle: 'circle',
			legendBorderStroke: '#24202100',
		},
	],
];

export default dotPlotTemplate;
