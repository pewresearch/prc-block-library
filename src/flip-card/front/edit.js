/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import { Controls, ALLOWED_BLOCKS } from '../_shared';

const TEMPLATE = [['core/paragraph', {}]];

const edit = ({ clientId, context }) => {
	const { 'prc-block/flip-card/flipped': flipped } = context;
	const blockProps = useBlockProps({
		style: {
			display: !flipped ? 'block' : 'none',
		},
	});
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'vertical',
		templateLock: false,
		template: TEMPLATE,
	});

	return (
		<Fragment>
			<Controls clientId={clientId} />
			<div {...innerBlocksProps} />
		</Fragment>
	);
};

export default edit;
