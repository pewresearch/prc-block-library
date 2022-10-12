const groupedBarTemplate = [
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
			chartType: 'bar',
			chartOrientation: 'horizontal',
			width: 420,
			height: 240,
			paddingLeft: 100,
			sortOrder: 'reverse',
			colorValue: 'social-trends-main',
			xDomainPadding: 30,
			xTickLabelTextAnchor: 'end',
			xTickLabelVerticalAnchor: 'middle',
			yAxisActive: false,
			barWidth: 24,
			barGroupOffset: 28,
			labelsActive: true,
			labelPositionDX: -20,
		},
	],
];

export default groupedBarTemplate;
