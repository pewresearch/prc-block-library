/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

const TEMPLATE = [
	[
		'core/group',
		{
			layout: {
				type: 'flex',
				orientation: 'vertical',
				verticalAlignment: 'center',
				justifyContent: 'center',
			},
			style: {
				layout: {
					selfStretch: 'fill',
				},
			},
		},
		[
			[
				'core/paragraph',
				{
					placeholder:
						'Type / to add blocks inside the carousel slide.',
				},
			],
		],
	],
];

export default function Edit({ attributes }) {
	const blockProps = useBlockProps();
	const { orientation } = attributes;
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		orientation: orientation || 'vertical',
		templateLock: false,
		template: TEMPLATE,
	});

	return <div {...innerBlocksProps} />;
}
