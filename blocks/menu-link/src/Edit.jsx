/* eslint-disable max-lines-per-function */
/**
 * External Dependencies
 */
import classNames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useRef } from '@wordpress/element';
import { useBlockProps, RichText } from '@wordpress/block-editor';
import { createBlock } from '@wordpress/blocks';
import { useMergeRefs } from '@wordpress/compose';

/**
 * Internal Dependencies
 */
import Controls from './Controls';

// Allow only this block to be inserted into the inner blocks.

/**
 * Converts a spacing preset into a custom value.
 * Function from @wordpress/block-editor/src/components/spacing-control/utils.js
 *
 * @param {string} value Value to convert.
 *
 * @return {string} CSS var string for given spacing preset value.
 */
export function getSpacingPresetCssVar(value) {
	if (!value) {
		return null;
	}

	const slug = value.match(/var:preset\|spacing\|(.+)/);

	if (!slug) {
		return value;
	}

	return `var(--wp--preset--spacing--${slug[1]})`;
}

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props                   Properties passed to the function.
 * @param {Object}   props.attributes        Available block attributes.
 * @param            props.className
 * @param            props.context
 * @param            props.clientId
 * @param            props.isSelected
 * @param            props.insertBlocksAfter
 * @param {Function} props.setAttributes     Function that updates individual attributes.
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
	// eslint-disable-next-line prettier/prettier, object-curly-newline
	const { className, label } = attributes;

	// Use internal state instead of a ref to make sure that the component
	// re-renders when the popover's anchor updates.
	const [popoverAnchor, setPopoverAnchor] = useState(null);
	const listItemRef = useRef(null);
	const blockProps = useBlockProps({
		ref: useMergeRefs([setPopoverAnchor, listItemRef]),
	});

	const labelClassNames = classNames('wp-block-prc-block-menu-link__label');

	const allowedFormats = ['core/bold', 'core/italic'];

	return (
		<Fragment>
			<Controls
				{...{
					attributes,
					setAttributes,
					isSelected,
					context,
					clientId,
					popoverAnchor,
				}}
			/>
			<div {...blockProps}>
				<RichText
					tagName="span"
					className={labelClassNames}
					value={label}
					onChange={(newLabel) => setAttributes({ label: newLabel })}
					placeholder={__('Add Label', 'prc-block-library')}
					allowedFormats={allowedFormats}
					multiline={false}
					disableLineBreaks
					__unstableOnSplitAtEnd={() => {
						const newBlock = createBlock('prc-block/menu-link');
						insertBlocksAfter(newBlock);
					}}
				/>
			</div>
		</Fragment>
	);
}
