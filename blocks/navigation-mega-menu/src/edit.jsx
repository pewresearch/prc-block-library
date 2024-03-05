/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText, useBlockProps } from '@wordpress/block-editor';
import { Fragment, useState } from 'react';

/**
 * Internal dependencies
 */
import './edit.scss';
import Controls from './controls';
import EditMenuTemplatePart from './edit-menu-template-part';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param            props.clientId
 * @param            props.isSelected
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {Element} Element to render.
 */
export default function Edit({
	attributes,
	setAttributes,
	clientId,
	isSelected,
}) {
	const { label, description, menuSlug } = attributes;
	const [isMenuVisible, setMenuVisibility] = useState(false);
	const toggleMenu = () => setMenuVisibility(!isMenuVisible);
	// Little helper function for now...
	window.toggleMegaMenu = () => toggleMenu();

	// Modify block props.
	const blockProps = useBlockProps({
		className:
			'wp-block-navigation-item wp-block-prc-block-navigation-mega-menu__toggle',
	});

	return (
		<Fragment>
			<Controls {...{ attributes, setAttributes, clientId }} />
			<div {...blockProps}>
				<button
					className="wp-block-navigation-item__content wp-block-prc-block-navigation-mega-menu__toggle"
					aria-expanded={isMenuVisible}
					type="button"
				>
					<RichText
						identifier="label"
						className="wp-block-navigation-item__label"
						value={label}
						onChange={(labelValue) =>
							setAttributes({
								label: labelValue,
							})
						}
						aria-label={__(
							'Mega menu link text',
							'mega-menu-block'
						)}
						placeholder={__('Add label…', 'mega-menu-block')}
						allowedFormats={[
							'core/bold',
							'core/italic',
							'core/image',
							'core/strikethrough',
						]}
					/>
					<span
						{...{
							className:
								'wp-block-prc-block-navigation-mega-menu__toggle-icon',
							onClick: () => {
								if (isSelected) {
									toggleMenu();
								}
							},
						}}
					>
						<svg
							xmlns="http://www.w3.org/2000/svg"
							width="12"
							height="12"
							viewBox="0 0 12 12"
							fill="none"
							aria-hidden="true"
							focusable="false"
						>
							<path
								d="M1.50002 4L6.00002 8L10.5 4"
								strokeWidth="1.5"
							></path>
						</svg>
					</span>
					{description && (
						<span className="wp-block-navigation-item__description">
							{description}
						</span>
					)}
				</button>
				{isMenuVisible && (
					<EditMenuTemplatePart {...{ menuSlug, clientId }} />
				)}
			</div>
		</Fragment>
	);
}
