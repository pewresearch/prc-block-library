/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, PanelColorSettings } from '@wordpress/block-editor';
import {
	PanelBody,
	ToggleControl,
	__experimentalUnitControl as UnitControl,
	__experimentalVStack as VStack,
} from '@wordpress/components';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useEffect } from '@wordpress/element';

/**
 * External Dependencies
 */
import { IconPicker } from '@prc/components';

const BLOCKNAME = 'core/button';
const DEFAULT_ICON_SIZE = 0.875;
const DEFAULT_ICON_SIZE_UNIT = 'em';
const ICON_SIZE_UNITS = [
	{ value: 'em', label: 'em', default: DEFAULT_ICON_SIZE },
	{ value: 'rem', label: 'rem', default: DEFAULT_ICON_SIZE },
	{ value: 'px', label: 'px', default: 14 },
];
const ICON_SIZE_UNIT_VALUES = ICON_SIZE_UNITS.map((unit) => unit.value);

/**
 * Split a UnitControl value into iconSize + iconSizeUnit.
 *
 * @param {string|number|undefined} next
 * @param {string}                  currentUnit
 * @return {Object} Attribute patch.
 */
function parseIconSizeControlValue(next, currentUnit = DEFAULT_ICON_SIZE_UNIT) {
	if (next === undefined || next === null || next === '') {
		return {
			iconSize: DEFAULT_ICON_SIZE,
			iconSizeUnit: DEFAULT_ICON_SIZE_UNIT,
		};
	}
	const raw = String(next).trim();
	const match = raw.match(/^(-?[\d.]+)(em|rem|px)?$/i);
	if (!match) {
		return {};
	}
	const size = parseFloat(match[1]);
	if (!Number.isFinite(size) || size < 0) {
		return {};
	}
	const unit = (match[2] || currentUnit).toLowerCase();
	return {
		iconSize: size,
		iconSizeUnit: ICON_SIZE_UNIT_VALUES.includes(unit)
			? unit
			: DEFAULT_ICON_SIZE_UNIT,
	};
}

/**
 * Map of legacy icon__ / brand__ style names to has-icon attribute values.
 * Used to auto-migrate blocks on first edit.
 */
const LEGACY_STYLE_MAP = {
	'icon__arrow-right-long': {
		library: 'prc',
		name: 'arrow-right-long',
		position: 'right',
	},
	'icon__up-right-and-down-left-from-center': {
		library: 'prc',
		name: 'up-right-and-down-left-from-center',
		position: 'right',
	},
	'icon__magnifying-glass': {
		library: 'prc',
		name: 'magnifying-glass',
		position: 'right',
		color: '#346EAD',
	},
	icon__clear: { library: 'prc', name: 'circle-x', position: 'right' },
	icon__clear__filled: {
		library: 'prc',
		name: 'circle-x',
		position: 'right',
	},
	'icon__arrows-rotate': {
		library: 'prc',
		name: 'arrows-rotate',
		position: 'right',
	},
	'icon__graduation-cap': {
		library: 'prc',
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
				iconLibrary = 'prc',
				iconName,
				iconPosition = 'right',
				iconColor,
				iconSize = DEFAULT_ICON_SIZE,
				iconSizeUnit = DEFAULT_ICON_SIZE_UNIT,
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
											iconSize: undefined,
											iconSizeUnit: undefined,
										});
									}
								}}
							/>
							{hasIcon && (
								<VStack spacing={3}>
									<IconPicker
										library={iconLibrary}
										icon={iconName}
										position={iconPosition}
										onChange={(next) => {
											const update = {};
											if ('library' in next) {
												update.iconLibrary =
													next.library;
											}
											if ('icon' in next) {
												update.iconName = next.icon;
											}
											if ('position' in next) {
												update.iconPosition =
													next.position;
											}
											setAttributes(update);
										}}
									/>
									<UnitControl
										label={__('Icon size')}
										value={`${iconSize}${iconSizeUnit}`}
										units={ICON_SIZE_UNITS}
										isResetValueOnUnitChange
										min={0}
										onChange={(next) => {
											const update =
												parseIconSizeControlValue(
													next,
													iconSizeUnit
												);
											if (Object.keys(update).length) {
												setAttributes(update);
											}
										}}
										__next40pxDefaultSize
										__nextHasNoMarginBottom
									/>
								</VStack>
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
