/**
 * External Dependencies
 */
import classNames from 'classnames';
import { TaxonomySelect } from '@prc/components';
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps, useInnerBlocksProps, InspectorControls } from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
/**
 * Internal Dependencies
 */

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props                            Properties passed to the function.
 * @param {Object}   props.attributes                 Available block attributes.
 * @param            props.className
 * @param            props.clientId
 * @param            props.context
 * @param            props.isSelected
 * @param            props.textColor
 * @param            props.setTextColor
 * @param            props.backgroundColor
 * @param            props.setBackgroundColor
 * @param            props.borderColor
 * @param            props.setBorderColor
 * @param            props.__unstableLayoutClassNames
 * @param {Function} props.setAttributes              Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	__unstableLayoutClassNames: layoutClassNames,
}) {
	const { layout, className, taxonomy } = attributes;
	const orientation = layout?.orientation || 'vertical';

	const blockProps = useBlockProps({
		className: classNames(className, layoutClassNames),
	});

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		orientation,
	});

	return (
		<>
			<InspectorControls>
				<PanelBody
					title={__(
						'Taxonomy Settings',
						'prc-block-library'
					)}
				>
					<TaxonomySelect
						value={taxonomy}
						onChange={(newTaxonomy) => {
							setAttributes({ taxonomy: newTaxonomy });
						}}
					/>
				</PanelBody>
			</InspectorControls>
			<div {...innerBlocksProps} />
		</>
	);
}
