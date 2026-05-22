/**
 * External Dependencies
 */
import clsx from 'clsx';

/**
 * WordPress Dependencies
 */
import { useBlockProps, withColors } from '@wordpress/block-editor';
import { useCallback, useState } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import './edit.scss';
import StyleEngine from './style-engine';
import Controls from './controls';
import EditMenuItem from './edit-menu-item';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * The editor shows the nav toggle button for styling. Click the icon span to
 * toggle a local `is-active` preview (active menu item colors); it is not saved.
 * Content is authored via the "Edit in Site Editor" link in the inspector
 * (see `controls.jsx` → `MenuTemplatePartControl`).
 *
 * The **frontend** uses `<dialog>` + `showModal()` driven by the Interactivity
 * API (see `class-navigation-mega-menu.php` and `view.js`).
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props                                  Properties passed to the function.
 * @param {Object}   props.attributes                       Available block attributes.
 * @param {string}   props.clientId                         The unique identifier for the block.
 * @param {Object}   props.menuItemBackgroundColor          The background color of the menu item.
 * @param {Function} props.setMenuItemBackgroundColor       Function to set the background color of the menu item.
 * @param {Object}   props.menuItemTextColor                The text color of the menu item.
 * @param {Function} props.setMenuItemTextColor             Function to set the text color of the menu item.
 * @param {Object}   props.menuItemActiveBackgroundColor    The background color of the active menu item.
 * @param {Function} props.setMenuItemActiveBackgroundColor Function to set the background color of the active menu item.
 * @param {Object}   props.menuItemActiveTextColor          The text color of the active menu item.
 * @param {Function} props.setMenuItemActiveTextColor       Function to set the text color of the active menu item.
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
	menuItemBackgroundColor,
	setMenuItemBackgroundColor,
	menuItemTextColor,
	setMenuItemTextColor,
	menuItemActiveBackgroundColor,
	setMenuItemActiveBackgroundColor,
	menuItemActiveTextColor,
	setMenuItemActiveTextColor,

	menuActiveBorderColor,
	setMenuActiveBorderColor,
}) {
	const { icon } = attributes;

	const [isActive, setIsActive] = useState(false);
	const toggleActive = useCallback(() => {
		setIsActive((value) => !value);
	}, []);

	const blockProps = useBlockProps({
		className: clsx('wp-block-navigation-item', {
			'has-label': 'dropdown' === icon,
			'is-active': isActive,
		}),
	});

	return (
		<div {...blockProps}>
			<StyleEngine attributes={attributes} clientId={clientId} />
			<Controls
				{...{
					attributes,
					setAttributes,
					clientId,
					menuItemBackgroundColor,
					setMenuItemBackgroundColor,
					menuItemTextColor,
					setMenuItemTextColor,
					menuItemActiveBackgroundColor,
					setMenuItemActiveBackgroundColor,
					menuItemActiveTextColor,
					setMenuItemActiveTextColor,

					menuActiveBorderColor,
					setMenuActiveBorderColor,
				}}
			/>
			<EditMenuItem
				{...{
					attributes,
					setAttributes,
					isActive,
					toggleActive,
				}}
			/>
		</div>
	);
}

export default withColors(
	{ menuItemBackgroundColor: 'color' },
	{ menuItemTextColor: 'color' },
	{ menuItemActiveBackgroundColor: 'color' },
	{ menuItemActiveTextColor: 'color' },

	{ menuActiveBorderColor: 'color' }
)(Edit);
