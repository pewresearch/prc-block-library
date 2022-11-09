/**
 * WordPress Dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';
/**
 * Internal Dependencies
 */
import Controls from './Controls';

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
const TEMPLATE = [
	['prc-block/quote-sorter-search-bar'],
	['prc-block/quote-sorter-quote-template'],
];

const edit = ({ attributes, setAttributes }) => {
	const blockProps = useBlockProps();
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'vertical',
		template: TEMPLATE,
	});
	return (
		<Fragment>
			<div {...innerBlocksProps} />
			<Controls attributes={attributes} setAttributes={setAttributes} />
		</Fragment>
	);
};

export default edit;
