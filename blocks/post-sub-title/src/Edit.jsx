/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	BlockControls,
	AlignmentControl,
} from '@wordpress/block-editor';
import { KeyboardShortcuts } from '@wordpress/components';
import { useDispatch, useSelect } from '@wordpress/data';
import { createBlock, getDefaultBlockName } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes,
	className,
	setAttributes,
	insertBlocksAfter,
}) {
	const { value, textAlign } = attributes;

	const blockProps = useBlockProps({
		className: classnames(className, {
			[`has-text-align-${textAlign}`]: textAlign,
		}),
		style: {
			marginBottom: '1.5em',
		},
	});

	return (
		<Fragment>
			<BlockControls>
				<AlignmentControl
					value={textAlign}
					onChange={(nextAlign) => {
						setAttributes({ textAlign: nextAlign });
					}}
				/>
			</BlockControls>
			<div {...blockProps}>
				<RichText
					tagName="div"
					onChange={(t) => setAttributes({ value: t })}
					allowedFormats={[]}
					keepPlaceholderOnFocus
					value={value}
					placeholder={__(
						'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua',
					)}
					disableLineBreaks
					__unstableOnSplitAtEnd={() =>
						insertBlocksAfter(createBlock(getDefaultBlockName()))
					}
				/>
			</div>
		</Fragment>
	);
}
