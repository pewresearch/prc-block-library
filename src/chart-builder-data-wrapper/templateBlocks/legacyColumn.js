const legacyColumnTemplate = [
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
			chartType: 'bar',
			chartOrientation: 'vertical',
			width: 640,
			height: 400,
			paddingLeft: 20,
			paddingRight: 20,
			colorValue: 'social-trends-spectrum',
			xDomainPadding: 20,
			xTickNum: null,
			yAxisActive: false,
			yMaxDomain: '100',
			barWidth: 24,
			barGroupOffset: 28,
			labelsActive: true,
			labelPositionDX: -20,
			tooltipActive: true,
		},
	],
];

export default legacyColumnTemplate;
