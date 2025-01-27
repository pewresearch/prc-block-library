/* eslint-disable jsx-a11y/click-events-have-key-events */
/**
 * External Dependencies
 */
import { getBlockGapSupportValue } from '@prc/block-utils';

/**
 * WordPress Dependencies
 */
import {
	useBlockProps,
	useInnerBlocksProps,
	RichText,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import Icon from './icon';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 * @param {Object}   props.context       Context object with the block's context values.
 * @param {string}   props.clientId      Unique ID of the block.
 * @param {boolean}  props.isSelected    Whether or not the block is currently selected.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({ attributes, setAttributes, context, clientId }) {
	const { label } = attributes;
	const blockProps = useBlockProps({
		style: {
			'--block-gap': getBlockGapSupportValue(attributes),
		},
	});
	// get the allowedBlocks for the parent block...
	const allowedBlocks = useSelect(
		(select) => {
			/// get the parent block id...
			const parentClientId =
				select('core/block-editor').getBlockHierarchyRootClientId(
					clientId
				);
			const parentBlock =
				select('core/block-editor').getBlock(parentClientId);
			// check if parentBlock is core/social-links
			if (parentBlock.name !== 'core/social-links') {
				return ['core/social-link'];
			}
			return select('core/block-editor').getAllowedBlocks(parentClientId);
		},
		[clientId]
	);
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			allowedBlocks,
			orientation: 'horizontal',
		}
	);

	return (
		<div {...blockProps}>
			<div {...innerBlocksProps}></div>
			<button
				{...{
					type: 'button',
					onClick: (e) => {
						e.preventDefault();
					},
				}}
			>
				<RichText
					className="wp-block-prc-block-social-share-sheet__label"
					tagName="span"
					value={label}
					onChange={(value) => setAttributes({ label: value })}
					placeholder="Share"
					allowedFormats={['core/bold', 'core/italic']}
				/>
				<Icon />
			</button>
		</div>
	);
}
