/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
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
