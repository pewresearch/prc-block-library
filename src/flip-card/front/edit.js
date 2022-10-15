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
	const { 'prc-block/flip-card/flipped': isFlipped } = context;

	const blockProps = useBlockProps();

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'vertical',
		templateLock: false,
		template: TEMPLATE,
	});

	if (isFlipped) {
		return <Fragment />;
	}


	return (
		<Fragment>
			<Controls clientId={clientId} />
			<div {...innerBlocksProps} />
		</Fragment>
	);
};

export default edit;
