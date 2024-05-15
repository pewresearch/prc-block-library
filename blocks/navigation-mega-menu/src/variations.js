export default [
	{
		isDefault: true,
		title: 'Mega Menu (Desktop)',
		name: 'mega-menu-desktop',
		description: 'Mega Menu with absolute positioning designed for desktop',
		attributes: {
			isMobile: false,
		},
		isActive: (attributes) => false === attributes.isMobile,
		scope: ['block', 'inserter', 'transform'],
	},
	{
		title: 'Mega Menu (Mobile)',
		name: 'mega-menu-mobile',
		description: 'Mega Menu with absolute positioning designed for mobile',
		attributes: {
			isMobile: true,
		},
		isActive: (attributes) => true === attributes.isMobile,
		scope: ['block', 'inserter', 'transform'],
	},
];
