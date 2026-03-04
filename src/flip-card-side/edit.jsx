/**
 * WordPress Dependencies
 */
import { useBlockProps, useInnerBlocksProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import FlipControl from '../flip-card-controller/flip-control';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props                            Properties passed to the function.
 * @param {Object}   props.attributes                 Available block attributes.
 * @param {Object}   props.context                    Block context.
 * @param {string}   props.clientId                   Block client ID.
 * @param {string}   props.isSelected                 Whether the block is selected.
 * @param            props.__unstableLayoutClassNames
 * @param {Function} props.setAttributes              Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
	context,
	clientId,
	__unstableLayoutClassNames: layoutClassNames,
}) {
	const isFlipped = context['prc-block/flip-card-isFlipped'] ?? false;

	const { parentClientId, fixedHeight } = useSelect(
		(select) => {
			const { getBlockRootClientId, getBlockAttributes } =
				select('core/block-editor');
			const rootId = getBlockRootClientId(clientId);
			const parentAttrs = rootId ? getBlockAttributes(rootId) : {};
			return {
				parentClientId: rootId,
				fixedHeight: parentAttrs.fixedHeight,
			};
		},
		[clientId]
	);

	const blockProps = useBlockProps({
		className: layoutClassNames,
	});
	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		templateLock: false,
	});

	return (
		<>
			{parentClientId && (
				<FlipControl
					clientId={parentClientId}
					isFlipped={isFlipped}
					fixedHeight={fixedHeight}
					maxHeight={null}
				/>
			)}
			<div {...innerBlocksProps} />
		</>
	);
}
