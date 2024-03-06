/* eslint-disable max-lines-per-function */
/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	ToggleControl,
	__experimentalHStack as HStack, // eslint-disable-line
	__experimentalToggleGroupControl as ToggleGroupControl, // eslint-disable-line
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon, // eslint-disable-line
} from '@wordpress/components';
/**
 * Internal Dependencies
 */
import MenuTemplatePartControl from './control-menu-template-part';

export default function Controls({ attributes, setAttributes, clientId }) {
	const { menuSlug, label, title, description, url } = attributes;

	return (
		<InspectorControls group="settings">
			<PanelBody
				title={__('Settings', 'prc-navigation-mega-menu')}
				initialOpen={true}
			>
				<TextControl
					label={__('Label', 'prc-navigation-mega-menu')}
					type="text"
					value={label}
					onChange={(value) => setAttributes({ label: value })}
					autoComplete="off"
				/>
				<MenuTemplatePartControl
					menuSlug={menuSlug}
					onChange={(value) => setAttributes({ menuSlug: value })}
				/>
				<TextareaControl
					className="settings-panel__description"
					label={__('Description', 'prc-navigation-mega-menu')}
					type="text"
					value={description || ''}
					onChange={(descriptionValue) => {
						setAttributes({ description: descriptionValue });
					}}
					help={__(
						'The description will be displayed in the menu if the current theme supports it.',
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
				<TextControl
					label={__('URL', 'prc-navigation-mega-menu')}
					type="text"
					value={url || ''}
					onChange={(newUrl) => {
						setAttributes({
							url: newUrl,
						});
					}}
					help={__(
						'When the mega menu is unable to be opened clicking on the navigation link will direct the user to this url instead.',
						'prc-navigation-mega-menu'
					)}
					autoComplete="off"
				/>
			</PanelBody>
		</InspectorControls>
	);
}
