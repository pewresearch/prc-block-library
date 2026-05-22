/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import { PanelBody, ToggleControl } from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';

/**
 * External Dependencies
 */
import { IconPicker } from '@prc/components';

const BLOCKNAME = 'core/button';

/**
 * Map of legacy icon__ / brand__ style names to has-icon attribute values.
 * Used to auto-migrate blocks on first edit.
 */
const LEGACY_STYLE_MAP = {
	'icon__arrow-right-long': {
		library: 'solid',
		name: 'arrow-right-long',
		position: 'right',
	},
	'icon__up-right-and-down-left-from-center': {
		library: 'solid',
		name: 'up-right-and-down-left-from-center',
		position: 'right',
	},
	'icon__magnifying-glass': {
		library: 'solid',
		name: 'magnifying-glass',
		position: 'right',
		color: '#346EAD',
	},
	icon__clear: { library: 'light', name: 'circle-x', position: 'right' },
	icon__clear__filled: {
		library: 'solid',
		name: 'circle-x',
		position: 'right',
	},
	'icon__arrows-rotate': {
		library: 'solid',
		name: 'arrows-rotate',
		position: 'right',
	},
	'icon__graduation-cap': {
		library: 'solid',
		name: 'graduation-cap',
		position: 'right',
	},
	brand__google: {
		library: 'brands',
		name: 'google',
		position: 'left',
		color: '#4285F4',
	},
	brand__apple: {
		library: 'brands',
		name: 'apple',
		position: 'left',
		color: '#000000',
	},
	brand__microsoft: {
		library: 'brands',
		name: 'microsoft',
		position: 'left',
		color: '#00A4EF',
	},
	brand__github: {
		library: 'brands',
		name: 'github',
		position: 'left',
		color: '#181717',
	},
};

/**
 * HOC wired via editor.BlockEdit that adds:
 * 1. Icon picker InspectorControls panel when is-style-has-icon is active.
 * 2. Edit-load migration of legacy icon__/ brand__ styles to has-icon + attributes.
 */
const IconPickerPanel = createHigherOrderComponent(
	(BlockEdit) =>
		function ButtonWithIconPanel(props) {
			const { name, attributes, setAttributes } = props;

			const {
				className,
				hasIcon = false,
				iconLibrary = 'solid',
				iconName,
				iconPosition = 'right',
				iconColor,
			} = attributes;

			useEffect(() => {
				if (name !== BLOCKNAME) return;
				if (!className) return;
				if (hasIcon) return;

				const legacyKey = Object.keys(LEGACY_STYLE_MAP).find((k) =>
					className.includes(`is-style-${k}`)
				);
				if (!legacyKey) return;

				const {
					library,
					name: mappedName,
					position,
					color,
				} = LEGACY_STYLE_MAP[legacyKey];

				const updatedClassName = className
					.replace(`is-style-${legacyKey}`, '')
					.replace(/\s+/g, ' ')
					.trim();

				setAttributes({
					className: updatedClassName || undefined,
					hasIcon: true,
					iconLibrary: library,
					iconName: mappedName,
					iconPosition: position,
					iconColor: color || iconColor,
				});
			}, []); // eslint-disable-line react-hooks/exhaustive-deps

			if (name !== BLOCKNAME) {
				return <BlockEdit {...props} />;
			}

			return (
				<>
					<InspectorControls>
						<PanelBody title={__('Icon')} initialOpen={hasIcon}>
							<ToggleControl
								label={__('Add icon')}
								checked={hasIcon}
								onChange={(val) => {
									setAttributes({ hasIcon: val });
									if (!val) {
										setAttributes({
											iconName: undefined,
											iconLibrary: undefined,
											iconPosition: undefined,
											iconColor: undefined,
										});
									}
								}}
							/>
							{hasIcon && (
								<IconPicker
									library={iconLibrary}
									icon={iconName}
									position={iconPosition}
									onChange={(next) => {
										const update = {};
										if ('library' in next) {
											update.iconLibrary = next.library;
										}
										if ('icon' in next) {
											update.iconName = next.icon;
										}
										if ('position' in next) {
											update.iconPosition = next.position;
										}
										setAttributes(update);
									}}
								/>
							)}
						</PanelBody>
						{hasIcon && (
							<PanelColorSettings
								title={__('Icon Color')}
								colorSettings={[
									{
										value: iconColor,
										onChange: (val) =>
											setAttributes({ iconColor: val }),
										label: __('Icon Color'),
									},
								]}
								enableAlpha={false}
							/>
						)}
					</InspectorControls>
					<BlockEdit {...props} />
				</>
			);
		},
	'withButtonIconPanel'
);

export default IconPickerPanel;
