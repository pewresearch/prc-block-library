/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-lines-per-function */
/**
 * External Dependencies
 */
import classnames from 'classnames';
import { Icon } from '@prc/icons';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	RichText,
	useBlockProps,
	withColors,
	getColorClassName,
} from '@wordpress/block-editor';
import { Fragment, useState, useMemo } from 'react';

/**
 * Internal Dependencies
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
 * @param {Object} props                                  Properties passed to the function.
 * @param {Object} props.attributes                       Available block attributes.
 * @param          props.clientId
 * @param          props.isSelected
 * @param          props.menuItemBackgroundColor
 * @param          props.setMenuItemBackgroundColor
 * @param          props.menuItemTextColor
 * @param          props.setMenuItemTextColor
 * @param          props.menuItemActiveBackgroundColor
 * @param          props.setMenuItemActiveBackgroundColor
 * @param          props.menuItemActiveTextColor
 * @param          props.setMenuItemActiveTextColor
 * @param          props.menuOverlayBackgroundColor
 * @param          props.setMenuOverlayBackgroundColor
 * @param          props.menuOverlayTextColor
 * @param          props.setMenuOverlayTextColor
 * @param          props.menuActiveBorderColor
 * @param          props.setMenuActiveBorderColor
 * @param          props.setAttributes
 *
 * @return {Element} Element to render.
 */
function Edit({
	attributes,
	setAttributes,
	clientId,
	isSelected,
	menuItemBackgroundColor,
	setMenuItemBackgroundColor,
	menuItemTextColor,
	setMenuItemTextColor,
	menuItemActiveBackgroundColor,
	setMenuItemActiveBackgroundColor,
	menuItemActiveTextColor,
	setMenuItemActiveTextColor,
	menuOverlayBackgroundColor,
	setMenuOverlayBackgroundColor,
	menuOverlayTextColor,
	setMenuOverlayTextColor,
	menuActiveBorderColor,
	setMenuActiveBorderColor,
}) {
	const { label, description, menuSlug, icon } = attributes;
	const [isMenuVisible, setMenuVisibility] = useState(false);
	const toggleMenu = () => setMenuVisibility(!isMenuVisible);
	// Little helper function for now...
	window.toggleMegaMenu = () => toggleMenu();

	const colors = {
		menuItemBackgroundColor,
		setMenuItemBackgroundColor,
		menuItemTextColor,
		setMenuItemTextColor,
		menuItemActiveBackgroundColor,
		setMenuItemActiveBackgroundColor,
		menuItemActiveTextColor,
		setMenuItemActiveTextColor,
		menuOverlayBackgroundColor,
		setMenuOverlayBackgroundColor,
		menuOverlayTextColor,
		setMenuOverlayTextColor,
		menuActiveBorderColor,
		setMenuActiveBorderColor,
	};

	const menuItemClassnames = classnames('wp-block-navigation-item', {
		'is-active': isMenuVisible,
		'has-active-menu-item-background':
			!!menuItemActiveBackgroundColor.color ||
			menuItemActiveBackgroundColor.class,
		[getColorClassName(
			'active-menu-item-background',
			menuItemActiveBackgroundColor?.slug
		)]: !!menuItemActiveBackgroundColor?.slug,
		'has-active-menu-item-color':
			!!menuItemActiveTextColor.color || menuItemActiveTextColor.class,
		[getColorClassName(
			'active-menu-item-color',
			menuItemActiveTextColor?.slug
		)]: !!menuItemActiveTextColor?.slug,
		'has-menu-item-background':
			!!menuItemBackgroundColor.color || menuItemBackgroundColor.class,
		[getColorClassName(
			'menu-item-background',
			menuItemBackgroundColor?.slug
		)]: !!menuItemBackgroundColor?.slug,
		'has-menu-item-color':
			!!menuItemTextColor.color || menuItemTextColor.class,
		[getColorClassName('menu-item-color', menuItemTextColor?.slug)]:
			!!menuItemTextColor?.slug,
		'has-active-border-color':
			!!menuActiveBorderColor.color || menuActiveBorderColor.class,
		[getColorClassName('active-border-color', menuActiveBorderColor?.slug)]:
			!!menuActiveBorderColor?.slug,
	});

	const overlayClassnames = classnames(
		'wp-block-prc-block-navigation-mega-menu__container',
		{
			'has-overlay-background':
				!!menuOverlayBackgroundColor.color ||
				menuOverlayBackgroundColor.class,
			[getColorClassName(
				'overlay-background',
				menuOverlayBackgroundColor?.slug
			)]: !!menuOverlayBackgroundColor?.slug,
			'has-overlay-color':
				!!menuOverlayTextColor.color || menuOverlayTextColor.class,
			[getColorClassName('overlay-color', menuOverlayTextColor?.slug)]:
				!!menuOverlayTextColor?.slug,
		}
	);

	const blockProps = useBlockProps({
		className: menuItemClassnames,
	});

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
		<Fragment>
			<Controls {...{ attributes, setAttributes, colors, clientId }} />
			<div {...blockProps}>
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
						<Icon
							library={selectedIconLibrary}
							icon={selectedIcon}
						/>
					</span>
					{description && (
						<span className="wp-block-navigation-item__description">
							{description}
						</span>
					)}
				</button>
				<div className="wp-block-prc-block-navigation-mega-menu__tab-divider"></div>
				{isMenuVisible && (
					<EditMenuTemplatePart
						{...{ menuSlug, clientId, overlayClassnames }}
					/>
				)}
			</div>
		</Fragment>
	);
}

export default withColors(
	{ menuItemBackgroundColor: 'color' },
	{ menuItemTextColor: 'color' },
	{ menuItemActiveBackgroundColor: 'color' },
	{ menuItemActiveTextColor: 'color' },
	{ menuOverlayBackgroundColor: 'color' },
	{ menuOverlayTextColor: 'color' },
	{ menuActiveBorderColor: 'color' }
)(Edit);
