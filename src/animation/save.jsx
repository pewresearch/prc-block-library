/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';

export default function Save({ attributes }) {
	const blockProps = useBlockProps.save();
	const innerBlocksProps = useInnerBlocksProps.save(blockProps);

	return <div {...innerBlocksProps} />;
}
