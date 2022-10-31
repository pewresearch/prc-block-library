const stackedBarTemplate = [
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
						{ content: '40', tag: 'td' },
						{ content: '60', tag: 'td' },
					],
				},
				{
					cells: [
						{ content: 'Spain', tag: 'td' },
						{ content: '50', tag: 'td' },
						{ content: '50', tag: 'td' },
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
			chartType: 'stacked-bar',
			chartOrientation: 'horizontal',
			colorValue: 'social-trends-main',
			width: 420,
			height: 160,
			paddingLeft: 100,
			xDomainPadding: 16,
			xTickLabelTextAnchor: 'end',
			xTickLabelVerticalAnchor: 'middle',
			yAxisActive: false,
			barWidth: 24,
			barGroupOffset: 28,
			labelsActive: true,
			labelPositionDX: -20,
			labelPositionDY: -3,
			sortOrder: 'reverse',
		},
	],
];

export default stackedBarTemplate;
