const variations = [
	{
		name: 'collapsible',
		title: 'Collapsible',
		isDefault: true,
		scope: ['block'],
		attributes: {
			isCoBranded: false,
		},
		isActive: (attributes) => {
			return true !== attributes?.isCoBranded;
		},
	},
	{
		name: 'pew-knight-co-branded-collapsible',
		title: 'Pew Knight Co-Branded Collapsible',
		scope: ['block'],
		attributes: {
			isCoBranded: true,
			backgroundColor: 'ui-white',
			style: {
				border: {
					top: {
						width: '1px',
						color: 'var:preset|color|ui-beige-dark',
					},
					right: {
						width: '0px',
						style: 'none',
					},
					bottom: {
						width: '1px',
						color: 'var:preset|color|ui-beige-dark',
					},
					left: {
						width: '0px',
						style: 'none',
					},
				},
				spacing: {
					blockGap: {
						top: 'var:preset|spacing|30',
					},
					padding: {
						right: '0px',
						left: '0px',
						top: '12px',
						bottom: '12px',
					},
				},
			},
		},
		isActive: (attributes) => {
			return attributes.isCoBranded;
		},
	},
];

export default variations;
