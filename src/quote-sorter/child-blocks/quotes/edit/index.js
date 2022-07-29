/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
	InnerBlocks,
	useInnerBlocksProps,
	useBlockProps,
} from '@wordpress/block-editor';

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
		<div {...blockProps}>
			<Controls attributes={attributes} setAttributes={setAttributes} />
			<div {...innerBlocksProps} />
		</div>
	);
};

export default edit;
