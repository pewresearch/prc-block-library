/**
 * External Dependencies
 */

import { getBlockGapSupportValue } from '@prc/block-utils';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, RawHTML } from '@wordpress/element';
import {
	useBlockProps,
	RichText,
	useInnerBlocksProps,
	InnerBlocks,
} from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import useShortcodeCollector from './shortcode-collector';

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
}) {
	const footnotes = useShortcodeCollector();

	// loop through the footnotes and get all their content properties and create a list of them <li> and store as footnotesList variable that I can call in the ul below
	const footnotesList = footnotes.map((footnote, index) => {
		return (
			<li
				key={`footnote-${index}`}
				className="wp-block-prc-block-footnotes__footnote"
			>
				<span>
					<RawHTML>{footnote}</RawHTML>
				</span>
				<span className="wp-block-prc-block-footnotes__footnote__return">
					↩
				</span>
			</li>
		);
	});

	const blockProps = useBlockProps({
		style: {
			'--block-gap': getBlockGapSupportValue(attributes),
		},
	});

	console.log('footnotes', footnotes);
	// then we'll need to build the markup to go into blockProps...

	return <ol {...blockProps}>{footnotesList}</ol>;
}
