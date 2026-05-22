/* eslint-disable max-lines-per-function */
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	SelectControl,
	TextControl,
	TextareaControl,
	__experimentalVStack as VStack, // eslint-disable-line
} from '@wordpress/components';
import { Fragment } from 'react';

/**
 * Internal Dependencies
 */
import MenuTemplatePartControl from './control-menu-template-part';
import ColorControls from './control-colors';

export default function Controls({
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
	const { menuSlug, label, title, description, url, icon } = attributes;

	return (
		<Fragment>
			<InspectorControls group="settings">
				<PanelBody
					title={__('Menu Button', 'prc-navigation-mega-menu')}
					initialOpen={true}
				>
					<VStack spacing={2}>
						<TextControl
							label={__('Label', 'prc-navigation-mega-menu')}
							type="text"
							value={label}
							onChange={(value) =>
								setAttributes({ label: value })
							}
							autoComplete="off"
						/>
						<SelectControl
							label={__('Icon', 'prc-navigation-mega-menu')}
							value={icon}
							options={[
								{
									label: __(
										'Dropdown',
										'prc-navigation-mega-menu'
									),
									value: 'dropdown',
								},
								{
									label: __(
										'Mobile Menu',
										'prc-navigation-mega-menu'
									),
									value: 'mobile',
								},
								{
									label: __(
										'Search',
										'prc-navigation-mega-menu'
									),
									value: 'search',
								},
							]}
							onChange={(newIcon) => {
								setAttributes({ icon: newIcon });
							}}
							help={__(
								'Mobile and Search options replace the label with an icon.',
								'prc-navigation-mega-menu'
							)}
						/>
						<TextControl
							label={__('URL', 'prc-navigation-mega-menu')}
							type="text"
							value={url || ''}
							onChange={(newUrl) => {
								setAttributes({ url: newUrl });
							}}
							help={__(
								'Fallback URL when the mega menu cannot open.',
								'prc-navigation-mega-menu'
							)}
							autoComplete="off"
						/>
						<TextareaControl
							label={__(
								'Description',
								'prc-navigation-mega-menu'
							)}
							value={description || ''}
							onChange={(descriptionValue) => {
								setAttributes({
									description: descriptionValue,
								});
							}}
							help={__(
								'Displayed if the current theme supports it.',
								'prc-navigation-mega-menu'
							)}
							autoComplete="off"
						/>
						<TextControl
							label={__('Title', 'prc-navigation-mega-menu')}
							type="text"
							value={title || ''}
							onChange={(titleValue) => {
								setAttributes({ title: titleValue });
							}}
							help={__(
								'Additional information to help clarify the purpose of the link.',
								'prc-navigation-mega-menu'
							)}
							autoComplete="off"
						/>
					</VStack>
				</PanelBody>
				<PanelBody
					title={__('Menu Content', 'prc-navigation-mega-menu')}
					initialOpen={true}
				>
					<VStack spacing={4}>
						<MenuTemplatePartControl
							menuSlug={menuSlug}
							onChange={(value) =>
								setAttributes({ menuSlug: value })
							}
						/>
					</VStack>
				</PanelBody>
			</InspectorControls>
			<ColorControls
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
		</Fragment>
	);
}
