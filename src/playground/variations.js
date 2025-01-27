export default [
	{
		name: 'blocks-playground',
		title: 'Blocks Playground',
		isDefault: true,
		attributes: {
			playgroundType: 'blocks'
		},
		isActive: ({ playgroundType }) => playgroundType === 'blocks',
		scope: ['block', 'inserter', 'transform'],
	},
	{
		name: 'components-playground',
		title: 'Components Playground',
		attributes: {
			playgroundType: 'components'
		},
		isActive: ({ playgroundType }) => playgroundType === 'components',
		scope: ['block', 'inserter', 'transform'],
	}
];
