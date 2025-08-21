/* eslint-disable max-len */
/* eslint-disable jsx-a11y/click-events-have-key-events */
/* eslint-disable max-lines-per-function */
/**
 * External Dependencies
 */
import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import {
	useBlockProps,
	withColors,
	getColorClassName,
} from '@wordpress/block-editor';
import { useState, useMemo } from 'react';

/**
 * Internal Dependencies
 */
import './edit.scss';
import Controls from './controls';
import EditMenuItem from './edit-menu-item';
import EditMenuTemplatePart from './edit-menu-template-part';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props                                  Properties passed to the function.
 * @param {Object}   props.attributes                       Available block attributes.
 * @param {string}   props.clientId                         The unique identifier for the block.
 * @param {boolean}  props.isSelected                       Whether the block is currently selected.
 * @param {Object}   props.menuItemBackgroundColor          The background color of the menu item.
 * @param {Function} props.setMenuItemBackgroundColor       Function to set the background color of the menu item.
 * @param {Object}   props.menuItemTextColor                The text color of the menu item.
 * @param {Function} props.setMenuItemTextColor             Function to set the text color of the menu item.
 * @param {Object}   props.menuItemActiveBackgroundColor    The background color of the active menu item.
 * @param {Function} props.setMenuItemActiveBackgroundColor Function to set the background color of the active menu item.
 * @param {Object}   props.menuItemActiveTextColor          The text color of the active menu item.
 * @param {Function} props.setMenuItemActiveTextColor       Function to set the text color of the active menu item.
 * @param {Object}   props.menuOverlayBackgroundColor       The background color of the menu overlay.
 * @param {Function} props.setMenuOverlayBackgroundColor    Function to set the background color of the menu overlay.
 * @param {Object}   props.menuOverlayTextColor             The text color of the menu overlay.
 * @param {Function} props.setMenuOverlayTextColor          Function to set the text color of the menu overlay.
 * @param {Object}   props.menuActiveBorderColor            The border color of the active menu.
 * @param {Function} props.setMenuActiveBorderColor         Function to set the border color of the active menu.
 * @param {Function} props.setAttributes                    Function to set the block attributes.
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
	const { icon, label, description, menuSlug, isMobile } = attributes;
	const [isMenuVisible, setMenuVisibility] = useState(false);
	const toggleMenu = () => setMenuVisibility(!isMenuVisible);

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
		'has-label': 'dropdown' === icon,
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

	return (
		<div {...blockProps}>
			<Controls {...{ attributes, setAttributes, colors, clientId }} />
			<EditMenuItem
				{...{
					attributes,
					setAttributes,
					isSelected,
					isMenuVisible,
					toggleMenu,
				}}
			/>
			<div className="wp-block-prc-block-navigation-mega-menu__tab-divider"></div>
			{isMenuVisible && (
				<EditMenuTemplatePart
					{...{
						menuSlug,
						clientId,
						overlayClassnames,
						toggleMenu,
						isMobile,
					}}
				/>
			)}
		</div>
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
