const pieTemplate = [
	[
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
						{ content: 'Germany', tag: 'td' },
						{ content: '40', tag: 'td' },
					],
				},
				{
					cells: [
						{ content: 'Spain', tag: 'td' },
						{ content: '50', tag: 'td' },
					],
				},
				{
					cells: [
						{ content: 'France', tag: 'td' },
						{ content: '60', tag: 'td' },
					],
				},
			],
		},
	],
	[
		'prc-block/chart-builder',
		{
			isConvertedChart: false,
			chartType: 'pie',
			width: 420,
			height: 160,
			paddingLeft: 100,
			xDomainPadding: 16,
			xTickNum: null,
			xTickLabelTextAnchor: 'end',
			xTickLabelVerticalAnchor: 'middle',
			yAxisActive: false,
			labelsActive: true,
			labelPositionDX: -20,
			sortOrder: 'reverse',
		},
	],
];

export default pieTemplate;
