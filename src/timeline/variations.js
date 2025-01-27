/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';

const createTicksSpread = (startingPoint = 2000, endPoint = 2025) => {
	const ticks = [];
	for (let i = startingPoint; i < endPoint; i++) {
		const newName = i.toString();
		const newTick = [
			'prc-block/timeline-slide',
			{ metadata: { name: newName } },
			[
				[
					'core/paragraph',
					{
						placeholder: 'Add content to timeline slide here...',
					},
				],
			],
		];
		ticks.push([...newTick]);
	}
	return ticks;
};

export default [
	{
		name: 'timeline-2000',
		title: __('Timeline: 2000', 'prc-block-library'),
		excerpt: __(
			'Display content in a timeline that starts 25 years ago.',
			'prc-block-library'
		),
		attributes: {
			className: 'starting-point-2000',
		},
		category: 'media',
		innerBlocks: createTicksSpread(2000, 2025),
		scope: ['inserter', 'transform'],
		isActive: ({ className }) =>
			className ? className.includes('starting-point-2000') : false,
	},
	{
		name: 'timeline-1990',
		title: __('Timeline: 1990', 'prc-block-library'),
		excerpt: __(
			'Display content in a timeline that starts 35 years ago.',
			'prc-block-library'
		),
		attributes: {
			className: 'starting-point-1990',
		},
		category: 'media',
		innerBlocks: createTicksSpread(1990, 2025),
		scope: ['inserter', 'transform'],
		isActive: ({ className }) =>
			className ? className.includes('starting-point-1990') : false,
	},
	{
		name: 'timeline-1980',
		title: __('Timeline: 1980', 'prc-block-library'),
		excerpt: __(
			'Display content in a timeline that starts 45 years ago.',
			'prc-block-library'
		),
		attributes: {
			className: 'starting-point-1980',
		},
		category: 'media',
		innerBlocks: createTicksSpread(1980, 2025),
		scope: ['inserter', 'transform'],
		isActive: ({ className }) =>
			className ? className.includes('starting-point-1980') : false,
	},
	{
		name: 'timeline-1970',
		title: __('Timeline: 1970', 'prc-block-library'),
		excerpt: __(
			'Display content in a timeline that starts 55 years ago.',
			'prc-block-library'
		),
		attributes: {
			className: 'starting-point-1970',
		},
		category: 'media',
		innerBlocks: createTicksSpread(1970, 2025),
		scope: ['inserter', 'transform'],
		isActive: ({ className }) =>
			className ? className.includes('starting-point-1970') : false,
	},
];
