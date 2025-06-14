/**
 * External Dependencies
 */
import clsx from 'clsx';

/**
 * WordPress Dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const blockProps = useBlockProps.save({
		className: clsx('wp-block-prc-block-form-message'),
	});
	const innerBlocksProps = useInnerBlocksProps.save({
		blockProps,
	});
	return <div {...innerBlocksProps}/>;
}
