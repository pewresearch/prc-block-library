/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import {
	useBlockProps,
	useInnerBlocksProps,
} from '@wordpress/block-editor';

export default function Save( { attributes } ) {
	const blockProps = useBlockProps.save({
		className: 'wp-block-prc-block-form-page',
	});

	const innerBlockProps = useInnerBlocksProps.save(blockProps);

	return (
		<div {...innerBlockProps}/>
	);
}
