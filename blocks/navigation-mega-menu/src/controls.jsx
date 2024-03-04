/* eslint-disable max-lines-per-function */
/**
 * WordPress Dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	ToggleControl,
	__experimentalHStack as HStack, // eslint-disable-line
	__experimentalToggleGroupControl as ToggleGroupControl, // eslint-disable-line
	__experimentalToggleGroupControlOptionIcon as ToggleGroupControlOptionIcon, // eslint-disable-line
} from '@wordpress/components';
import {
	alignNone,
	justifyLeft,
	justifyCenter,
	justifyRight,
	stretchWide,
	stretchFullWidth,
} from '@wordpress/icons';

/**
 * Internal Dependencies
 */
import MenuTemplatePartControl from './control-menu-template-part';

export default function Controls({ attributes, setAttributes, clientId }) {
	const {
		label,
		menuSlug,
		title,
		description,
		disableWhenCollapsed,
		collapsedUrl,
		justifyMenu,
		width,
	} = attributes;

	// Get the layout settings.
	const layout = useSelect(
		(select) =>
			select('core/editor').getEditorSettings()?.__experimentalFeatures
				?.layout
	);

	const justificationOptions = [
		{
			value: 'left',
			icon: justifyLeft,
			label: __('Justify menu left', 'mega-menu-block'),
		},
		{
			value: 'center',
			icon: justifyCenter,
			label: __('Justify menu center', 'mega-menu-block'),
		},
		{
			value: 'right',
			icon: justifyRight,
			label: __('Justify menu right', 'mega-menu-block'),
		},
	];

	const widthOptions = [
		{
			value: 'content',
			icon: alignNone,
			label: sprintf(
				// translators: %s: container size (i.e. 600px etc)
				__('Content width (%s wide)', 'mega-menu-block'),
				layout.contentSize
			),
		},
		{
			value: 'wide',
			icon: stretchWide,
			label: sprintf(
				// translators: %s: container size (i.e. 600px etc)
				__('Wide width (%s wide)', 'mega-menu-block'),
				layout.wideSize
			),
		},
		{
			value: 'full',
			icon: stretchFullWidth,
			label: __('Full width', 'mega-menu-block'),
		},
	];

	return (
		<InspectorControls group="settings">
			<PanelBody
				title={__('Settings', 'mega-menu-block')}
				initialOpen={true}
			>
				<TextControl
					label={__('Label', 'mega-menu-block')}
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
					label={__('Description', 'mega-menu-block')}
					type="text"
					value={description || ''}
					onChange={(descriptionValue) => {
						setAttributes({ description: descriptionValue });
					}}
					help={__(
						'The description will be displayed in the menu if the current theme supports it.',
						'mega-menu-block'
					)}
					autoComplete="off"
				/>
				<TextControl
					label={__('Title', 'mega-menu-block')}
					type="text"
					value={title || ''}
					onChange={(titleValue) => {
						setAttributes({ title: titleValue });
					}}
					help={__(
						'Additional information to help clarify the purpose of the link.',
						'mega-menu-block'
					)}
					autoComplete="off"
				/>
				<ToggleControl
					label={__(
						'Disable in navigation overlay',
						'mega-menu-block'
					)}
					checked={disableWhenCollapsed}
					onChange={() => {
						setAttributes({
							disableWhenCollapsed: !disableWhenCollapsed,
						});
					}}
					help={__(
						'When the navigation options are displayed in an overlay, typically on mobile devices, disable the mega menu.',
						'mega-menu-block'
					)}
				/>
				{disableWhenCollapsed && (
					<TextControl
						label={__('Url', 'mega-menu-block')}
						type="text"
						value={collapsedUrl || ''}
						onChange={(collapsedUrlValue) => {
							setAttributes({
								collapsedUrl: collapsedUrlValue,
							});
						}}
						help={__(
							'When the navigtion menu is collapsed, link to this URL instead.',
							'mega-menu-block'
						)}
						autoComplete="off"
					/>
				)}
			</PanelBody>
			<PanelBody
				title={__('Layout', 'mega-menu-block')}
				initialOpen={true}
			>
				<HStack alignment="top" justify="space-between">
					<ToggleGroupControl
						className="block-editor-hooks__flex-layout-justification-controls"
						label={__('Justification', 'mega-menu-block')}
						value={justifyMenu}
						onChange={(justificationValue) => {
							setAttributes({
								justifyMenu: justificationValue,
							});
						}}
						isDeselectable={true}
					>
						{justificationOptions.map(
							({ value, icon, iconLabel }) => {
								return (
									<ToggleGroupControlOptionIcon
										key={value}
										value={value}
										icon={icon}
										label={iconLabel}
									/>
								);
							}
						)}
					</ToggleGroupControl>
					<ToggleGroupControl
						className="block-editor-hooks__flex-layout-justification-controls"
						label={__('Width', 'mega-menu-block')}
						value={width || 'content'}
						onChange={(widthValue) => {
							setAttributes({
								width: widthValue,
							});
						}}
						__nextHasNoMarginBottom
					>
						{widthOptions.map(({ value, icon, iconLabel }) => {
							return (
								<ToggleGroupControlOptionIcon
									key={value}
									value={value}
									icon={icon}
									label={iconLabel}
								/>
							);
						})}
					</ToggleGroupControl>
				</HStack>
			</PanelBody>
		</InspectorControls>
	);
}
