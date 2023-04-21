/**
 * External Dependencies
 */
import { get } from 'lodash';

/**
 * WordPress Dependencies
 */
import {
	__experimentalBlockVariationPicker as BlockVariationPicker,
	useBlockProps,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import {
	createBlocksFromInnerBlocksTemplate,
	store as blocksStore,
} from '@wordpress/blocks';

export default function Placeholder({ clientId, setAttributes }) {
	const name = 'prc-block/grid-controller';

	const { blockType, defaultVariation, variations } = useSelect(
		(select) => {
			const { getBlockVariations, getBlockType, getDefaultBlockVariation } =
				select(blocksStore);

			return {
				blockType: getBlockType(name),
				defaultVariation: getDefaultBlockVariation(name, 'block'),
				variations: getBlockVariations(name, 'block'),
			};
		},
		[clientId],
	);
	const { replaceInnerBlocks } = useDispatch(blockEditorStore);
	const blockProps = useBlockProps({ className: 'is-placeholder' });

	return (
		<div {...blockProps}>
			<BlockVariationPicker
				icon={get(blockType, ['icon', 'src'])}
				label={get(blockType, ['title'])}
				variations={variations}
				onSelect={(nextVariation = defaultVariation) => {
					if (nextVariation.attributes) {
						setAttributes(nextVariation.attributes);
					}
					if (nextVariation.innerBlocks) {
						replaceInnerBlocks(
							clientId,
							createBlocksFromInnerBlocksTemplate(nextVariation.innerBlocks),
							true,
						);
					}
				}}
			/>
		</div>
	);
}
