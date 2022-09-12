/**
 * WordPress Dependencies
 */
import {
	useInnerBlocksProps,
	useBlockProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

const edit = ({ attributes, className, setAttributes, clientId }) => {
	const { direction } = attributes;

	const blockProps = useBlockProps();

	const hasInnerBlocks = useSelect(
		(select) => 0 < select(blockEditorStore).getBlocks(clientId).length,
		[clientId],
	);

	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			orientation: direction,
			templateLock: false,
			template: [
				[
					'core/paragraph',
					{
						placeholder: 'You can use any blocks inside this carousel slide.',
					},
				],
			],
		},
	);

	return (
		<div {...blockProps}>
			<div {...innerBlocksProps} />
		</div>
	);
};

export default edit;
