/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

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
	[
		'prc-block/quote-sorter-search-bar',
		{
			placeholder: __('Search for a quote ...'),
		},
	],
	['prc-block/quote-sorter-quote-template', {}],
];

const edit = ({ attributes, className, setAttributes }) => {
	const blockProps = useBlockProps({
		className: classnames(className),
	});

	console.log({ blockProps });

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
