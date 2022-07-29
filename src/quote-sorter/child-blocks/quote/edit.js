/**
 * External Dependencies
 */
import classnames from 'classnames';
import { Card } from 'semantic-ui-react';

/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['core/pullquote'];

const edit = ({ attributes, className, setAttributes }) => {
	const { quote, attribution } = attributes;

	const blockProps = useBlockProps({
		className: classnames(className, 'ui list'),
	});
	const TEMPLATE = [
		[
			'core/pullquote',
			{
				value: `<p>${__(quote)}</p>`,
				citation: attribution,
			},
		],
	];
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		allowedBlocks: ALLOWED_BLOCKS,
		orientation: 'vertical',
		templateLock: false,
		template: TEMPLATE,
	});

	return (
		<div {...blockProps}>
			<div {...innerBlocksProps} />
		</div>
	);
};

export default edit;
