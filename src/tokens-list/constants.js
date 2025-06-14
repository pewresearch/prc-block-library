const TOKEN_ATTRIBUTES = {
	interactiveNamespace: 'prc-block/tokens-list',
	interactiveSubsumption: true,
	className: 'prc-block-tokens-list__button',
	backgroundColor: 'ui-gray-very-light',
	textColor: 'ui-black',
	className: 'is-style-icon__clear',
	text: 'Token Label',
	tagName: 'button',
	style: {
		elements: {
			link: {
				color: {
					text: 'var:preset|color|ui-black',
				},
			},
		},
		typography: {
			fontStyle: 'normal',
			lineHeight: '1',
		},
		border: {
			width: '1px',
			color: '#dadbdb',
			radius: '50px',
		},
		layout: {
			selfStretch: 'fit',
			flexSize: null,
		},
		spacing: {
			padding: {
				left: 'var:preset|spacing|40',
				right: 'var:preset|spacing|40',
				top: 'var:preset|spacing|30',
				bottom: 'var:preset|spacing|30',
			},
		},
	},
	fontFamily: 'sans-serif',
};

export { TOKEN_ATTRIBUTES };
