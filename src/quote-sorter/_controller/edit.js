/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
// import Controls from './Controls';

const ALLOWED_BLOCKS = [
	'prc-block/quote-sorter-dropdown',
	'prc-block/quote-sorter-search-bar',
	'prc-block/quote-sorter-quote-template',
	'prc-block/quote-sorter-quote-text',
	'prc-block/quote-sorter-quote-attribution',
	'prc-block/quote-sorter-dynamic-text',
	'prc-block/grid',
	'core/group',
];
const TEMPLATE = [];

const edit = ({ attributes, className, setAttributes }) => {
	const blockProps = useBlockProps({
		className: classnames(className),
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'vertical',
		template: TEMPLATE,
	});

	return (
		<Fragment>
			<div {...blockProps}>Hello world</div>
			{/* <div {...innerBlocksProps} /> */}
			{/* <Controls attributes={attributes} setAttributes={setAttributes} /> */}
		</Fragment>
	);
};

export default edit;
