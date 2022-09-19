/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['prc-block/carousel-slide'];

const edit = ({ attributes, className, setAttributes, clientId }) => {
	const blockProps = useBlockProps({});

	// const hasInnerBlocks = useSelect(
	// 	(select) => 0 < select(blockEditorStore).getBlocks(clientId).length,
	// 	[clientId],
	// );

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		templateLock: false,
		template: [
			[
				'prc-block/carousel-slide',
				{},
				[
					[
						'core/paragraph',
						{
							placeholder: 'You can use any blocks inside this carousel slide.',
						},
					],
				],
			],
		],
	});

	return <div {...innerBlocksProps} />;
};

export default edit;
