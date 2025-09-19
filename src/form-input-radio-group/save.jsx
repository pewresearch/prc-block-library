/**
 * External Dependencies
 */
import clsx from 'clsx';

/**
 * WordPress Dependencies
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText
} from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const { label, required, metadata } = attributes;
	const { name } = metadata || {};

	const blockProps = useBlockProps.save({
		className: 'wp-block-prc-block-form-input-radio-group',
	});

	const innerBlockProps = useInnerBlocksProps.save(blockProps);

	return (
		<div {...innerBlockProps}>
			<RichText.Content tagName="label" value={label} />
			{innerBlockProps.children}
		</div>
	);
}
