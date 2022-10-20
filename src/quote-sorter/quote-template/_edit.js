/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

import Controls from './Controls';

const ALLOWED_BLOCKS = ['prc-block/quote-sorter-quote'];

const edit = ({ attributes, className, setAttributes }) => {
	const blockProps = useBlockProps({
		className: classnames(className, 'quote-sorter-quotes quote-wall"'),
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'vertical',
		templateLock: false,
	});

	return (
		<Fragment>
			<Controls attributes={attributes} setAttributes={setAttributes} />
			<div {...innerBlocksProps} />
		</Fragment>
	);
};

export default edit;
