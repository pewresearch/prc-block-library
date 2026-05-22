/* eslint-disable jsx-a11y/click-events-have-key-events */
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
 * Renders the nav item button in the editor. Click the icon span to toggle the
 * parent wrapper's `is-active` preview (see `edit.jsx`). Content is edited via
 * the Site Editor link in the inspector panel.
 *
 * @param {Object}   props               Component props.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function to set the block attributes.
 * @param {boolean}  props.isActive      Editor-only preview of active state.
 * @param {Function} props.toggleActive  Toggle active preview (icon click).
 *
 * @return {Element} Element to render.
 */
export default function EditMenuItem({
	attributes,
	setAttributes,
	isActive,
	toggleActive,
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
			type="button"
			aria-expanded={isActive}
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
			{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions -- Toggle active preview; keyboard users can use toolbar / parent focus */}
			<span
				className={`wp-block-prc-block-navigation-mega-menu__toggle-${icon}-icon`}
				onClick={toggleActive}
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
