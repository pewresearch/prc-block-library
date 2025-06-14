/**
 * External Dependencies
 */
import clsx from 'clsx';

/**
 * WordPress Dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const blockProps = useBlockProps.save();
	const innerBlocksProps = useInnerBlocksProps.save();
	return (
		<form {...blockProps} className="wp-block-prc-block-form">
			{innerBlocksProps.children}
		</form>
	);
}
