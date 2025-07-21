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
		className: 'wp-block-prc-block-form',
	});
	const innerBlocksProps = useInnerBlocksProps.save();
	return <form {...blockProps}>{innerBlocksProps.children}</form>;
}
