/**
 * External Dependencies
 */
import { getBlockGapSupportValue } from '@prc/block-utils';
import { StyledComponentContext } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useDispatch, useSelect } from '@wordpress/data';
import {
	createBlock,
	createBlocksFromInnerBlocksTemplate,
} from '@wordpress/blocks';

/**
 * Internal Dependencies
 */
import Controls from './controls';

const ALLOWED_BLOCKS = [
	'prc-block/form-input-text',
	'prc-block/form-input-date',
];

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
export default function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
	insertBlocksAfter,
}) {
	const { allowedBlocks, label, required } = attributes;
	const blockProps = useBlockProps({
		required: required,
		style: {
			'--block-gap': getBlockGapSupportValue(attributes),
		},
	});
	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			allowedBlocks: allowedBlocks ? allowedBlocks : ALLOWED_BLOCKS,
			templateLock: true,
		}
	);

	const { currentVariation } = useSelect((select) => {
		const { getBlockVariations, getActiveBlockVariation } =
			select('core/blocks');
		const activeVariation = getActiveBlockVariation(
			'prc-block/form-field',
			attributes
		);
		return {
			currentVariation: activeVariation,
		};
	}, []);

	const {
		insertBlock,
		moveBlockToPosition,
		selectNextBlock,
		updateBlockAttributes,
	} = useDispatch('core/block-editor');

	/**
	 * Inserts a new form-field block after the current block and selects it.
	 *
	 * @return
	 */
	const insertNewBlock = (variation) => {
		const attrs = {};
		const newAttrs = currentVariation?.attributes;
		const newInnerBlocks = createBlocksFromInnerBlocksTemplate(
			currentVariation?.innerBlocks
		);
		return insertBlocksAfter(
			createBlock('prc-block/form-field', { ...newAttrs }, newInnerBlocks)
		);
	};

	/**
	 * Insert a new block, or select the next block
	 * if one is available when the user presses enter at the end of the block.
	 */
	const onEnterSplit = () => {
		const type = 'checkbox';
		console.log('innerBlocksProps', innerBlocksProps);
		// With non-checkbox|radio input types we want to select the next block, but the way checkbox renders the label after the input element we want to insert a new block instead.
		if ('checkbox' !== type) {
			selectNextBlock(clientId);
		} else {
			insertNewBlock();
		}
	};

	return (
		<Fragment>
			<Controls {...{ attributes, setAttributes, context: false }} />
			<div {...blockProps}>
				<StyledComponentContext cacheKey={`form-field-${clientId}`}>
					<RichText
						tagName="label"
						placeholder={__('Label', 'prc-block-library')}
						value={label}
						onChange={(newLabel) => {
							setAttributes({ label: newLabel });
						}}
						__unstableOnSplitAtEnd={() => onEnterSplit()}
					/>
					<div {...innerBlocksProps} />
				</StyledComponentContext>
			</div>
		</Fragment>
	);
}
