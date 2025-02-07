/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import {
	InnerBlocks,
	useBlockProps,
	useInnerBlocksProps,
	store as blockEditorStore,
	InspectorControls,
} from '@wordpress/block-editor';
import { useSelect, useDispatch } from '@wordpress/data';
import { Fragment, useEffect, useMemo } from '@wordpress/element';
import { PanelBody, TextControl } from '@wordpress/components';
import { cleanForSlug } from '@wordpress/url';

/**
 * Generates a slug from a tab's text label.
 *
 * @param {string} label    Tab label RichText value.
 * @param {number} tabIndex Tab index value.
 *
 * @return {string} The generated slug with HTML stripped out.
 */
function slugFromLabel(label, tabIndex) {
	// Get just the text content, filtering out any HTML tags from the RichText value.
	const htmlDocument = new window.DOMParser().parseFromString(
		label,
		'text/html'
	);
	if (htmlDocument.body?.textContent) {
		return cleanForSlug(htmlDocument.body.textContent);
	}

	// Fall back to using the tab index if the label is empty.
	return `tab-panel-${tabIndex}`;
}

function EditComponent({ attributes, clientId, setAttributes }) {
	const { anchor, isActive, label, slug, tabIndex } = attributes;
	// Use a custom anchor, if set. Otherwise fall back to the slug generated from the label text.
	const tabPanelId = anchor || slug;
	const tabLabelId = `${tabPanelId}--tab`;
	const hasChildBlocks = useSelect(
		(select) => select(blockEditorStore).getBlockOrder(clientId).length > 0,
		[clientId]
	);

	const blockProps = useBlockProps();

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		template: [['core/paragraph', { placeholder: 'Tab Content' }]],
		renderAppender: hasChildBlocks
			? undefined
			: InnerBlocks.ButtonBlockAppender,
	});

	return (
		<Fragment>
			<InspectorControls>
				<PanelBody title="Tab Settings">
					<TextControl
						label="Label"
						value={label}
						onChange={(value) => setAttributes({ label: value })}
					/>
				</PanelBody>
			</InspectorControls>
			<section
				{...innerBlocksProps}
				aria-labelledby={tabLabelId}
				id={tabPanelId}
				role="tabpanel"
			/>
		</Fragment>
	);
}

export default function Edit({
	attributes,
	clientId,
	isSelected,
	setAttributes,
}) {
	const { isActive, label, tabIndex } = attributes;
	const { __unstableMarkNextChangeAsNotPersistent } =
		useDispatch(blockEditorStore);

	const { hasInnerBlockSelected, blockIndex } = useSelect(
		(select) => {
			return {
				hasInnerBlockSelected:
					select(blockEditorStore).hasSelectedInnerBlock(clientId),
				blockIndex: select(blockEditorStore).getBlockIndex(clientId),
			};
		},
		[clientId]
	);

	/**
	 * These two hooks ensure the tab block's slug and tabIndex attributes are kept in sync with the parent tabs block.
	 */
	// Construct or update the slug when the label changes:
	useEffect(() => {
		if (label) {
			__unstableMarkNextChangeAsNotPersistent();
			setAttributes({ slug: slugFromLabel(label, tabIndex) });
		}
	}, [
		__unstableMarkNextChangeAsNotPersistent,
		label,
		setAttributes,
		tabIndex,
	]);

	// Ensure tabIndex attributes are in sync with the order relative to the root
	useEffect(() => {
		if (blockIndex !== tabIndex) {
			__unstableMarkNextChangeAsNotPersistent();
			setAttributes({ tabIndex: blockIndex });
		}
	}, [
		__unstableMarkNextChangeAsNotPersistent,
		blockIndex,
		setAttributes,
		tabIndex,
	]);

	const displayEditComponent = useMemo(() => {
		return isActive || isSelected || hasInnerBlockSelected;
	}, [isActive, hasInnerBlockSelected, isSelected]);

	// If the block is not selected, and or not active then
	// there is no reason to render the edit components.
	if (displayEditComponent) {
		return (
			<EditComponent
				attributes={attributes}
				clientId={clientId}
				setAttributes={setAttributes}
			/>
		);
	}

	return <div hidden />;
}
