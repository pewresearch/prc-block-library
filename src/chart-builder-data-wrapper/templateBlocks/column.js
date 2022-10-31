const columnTemplate = [
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
			chartType: 'bar',
			chartOrientation: 'vertical',
			width: 240,
			height: 160,
			paddingLeft: 20,
			paddingBottom: 20,
			paddingRight: 20,
			xDomainPadding: 16,
			xTickNum: null,
			yAxisActive: false,
			barWidth: 24,
			barGroupOffset: 28,
			tooltipActive: false,
			labelsActive: true,
			labelPositionDY: 15,
		},
	],
];

export default columnTemplate;
