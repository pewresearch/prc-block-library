/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-lines-per-function */
/**
 * External Dependencies
 */
import { Icon } from '@prc/icons';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { RichText } from '@wordpress/block-editor';
import { useMemo } from 'react';

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
 * @param {string}   props.clientId      The unique identifier for the block.
 * @param {boolean}  props.isSelected    Whether the block is currently selected.
 * @param {boolean}  props.isMenuVisible Whether the menu is visible.
 * @param {Function} props.toggleMenu    Function to toggle the menu.
 * @param {Function} props.setAttributes Function to set the block attributes.
 *
 * @return {Element} Element to render.
 */
export default function EditMenuItem({
	attributes,
	setAttributes,
	isSelected,
	isMenuVisible,
	toggleMenu,
}) {
	const { label, description, icon } = attributes;

	const selectedIcon = useMemo(() => {
		if ('dropdown' === icon) {
			return 'caret-down';
		}
		if ('mobile' === icon) {
			return 'bars';
		}
		if ('search' === icon) {
			return 'magnifying-glass';
		}
		return 'caret-down';
	}, [icon]);
	/**
	 * There are certain libraries we want to use for certain icons, this controls that.
	 */
	const selectedIconLibrary = useMemo(() => {
		if ('caret-down' === selectedIcon) {
			return 'sharp-solid';
		}
		if ('mobile' === icon) {
			return 'light';
		}
		return 'solid';
	}, [selectedIcon, icon]);

	const showLabel = !icon || 'dropdown' === icon;

	return (
		<button
			className="wp-block-navigation-item__content wp-block-prc-block-navigation-mega-menu__toggle"
			aria-expanded={isMenuVisible}
			type="button"
		>
			{showLabel && (
				<RichText
					identifier="label"
					className="wp-block-navigation-item__label"
					value={label}
					onChange={(labelValue) =>
						setAttributes({
							label: labelValue,
						})
					}
					aria-label={__('Mega menu link text', 'mega-menu-block')}
					placeholder={__('Add label…', 'mega-menu-block')}
					allowedFormats={[
						'core/bold',
						'core/italic',
						'core/image',
						'core/strikethrough',
					]}
				/>
			)}
			<span
				{...{
					className: `wp-block-prc-block-navigation-mega-menu__toggle-${icon}-icon`,
					onClick: () => {
						if (isSelected) {
							toggleMenu();
						}
					},
				}}
			>
				<Icon library={selectedIconLibrary} icon={selectedIcon} />
			</span>
			{description && (
				<span className="wp-block-navigation-item__description">
					{description}
				</span>
			)}
		</button>
	);
}
