/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import { Controls } from '../_shared';

const ALLOWED_BLOCKS = [
	'prc-block/flip-card-front',
	'prc-block/flip-card-back',
];

const TEMPLATE = [
	[
		'prc-block/flip-card-front',
		{},
		[
			[
				'core/paragraph',
				{
					placeholder: __('Front of the card...', 'prc-block-library'),
				},
			],
		],
	],
	[
		'prc-block/flip-card-back',
		{},
		[
			[
				'core/paragraph',
				{
					placeholder: __('Back of the card...', 'prc-block-library'),
				},
			],
		],
	],
];

const edit = ({ clientId }) => {
	const blockProps = useBlockProps();

	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			allowedBlocks: ALLOWED_BLOCKS,
			orientation: 'vertical',
			templateLock: 'all',
			template: TEMPLATE,
			__experimentalCaptureToolbars: true,
			renderAppender: false,
		},
	);

	return (
		<Fragment>
			<Controls clientId={clientId} />
			<div {...blockProps}>
				<div {...innerBlocksProps} />
			</div>
		</Fragment>
	);
};

export default edit;
