/**
 * WordPress Dependencies
 */
import { InnerBlocks, useBlockProps } from '@wordpress/block-editor';

function save() {
	const blockProps = useBlockProps.save();
	return <InnerBlocks.Content />;
}
export default save;
