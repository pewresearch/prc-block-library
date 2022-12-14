/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
	useBlockProps,
	__experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';
import {
	Button,
	Flex,
	FlexItem,
	FlexBlock,
	Placeholder,
} from '@wordpress/components';

/**
 * Internal Dependencies
 */
import Controls from './Controls';

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
	setAttributes,
	context,
	clientId,
	isSelected,
}) {
	const blockProps = useBlockProps();

	return (
		<div {...blockProps}>
			<Placeholder label="Configured Taxonomy Search" isColumnLayout>
				<p>Placeholder for a new object search field using wp api?? </p>
				<p>{__(`First we need to select taxonomy(ies).`)}</p>
				<p>We should offer the ability to restrict to 1 parent term id and make sure we note that if you choose this then it doesnt matter how many taxonomies you select it will be restrict to this and only this...</p>
			</Placeholder>
		</div>
	);
}
