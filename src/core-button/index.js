/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';

/**
 * External Dependencies
 */
import {
	curatedPrcIcons,
	getIconSpriteSheetUrl,
	resolveIconSource,
} from '@prc/icons';

/**
 * Internal Dependencies
 */
import './style.scss';
import './editor.scss';
import IconPickerPanel from './inspector';

/**
 * Async utility: fetch the sprite sheet for the resolved library, extract the
 * <symbol> with the resolved icon name, and return a CSS-ready
 * `url("data:image/svg+xml,...")` string. Curated PRC names (and aliases)
 * load `build/icons/prc.svg` — the same sheet the PHP facade uses. Approved
 * brands load `build/icons/brands.svg`. Missing names return null. Results
 * are cached for the editor session.
 */
const _spriteFetchCache = new Map();
const _iconUriCache = new Map();

async function getEditorIconUri(library, iconName) {
	const source = resolveIconSource({
		library,
		icon: iconName,
		curatedNames: curatedPrcIcons.prc,
		approvedBrandNames: curatedPrcIcons.brands,
	});
	const { spriteLibrary, kind, icon: resolvedIcon } = source;
	if (kind === 'missing') {
		return null;
	}
	const cacheKey = `${kind}:${spriteLibrary}/${resolvedIcon}`;
	if (_iconUriCache.has(cacheKey)) {
		return _iconUriCache.get(cacheKey);
	}

	const origin =
		typeof window !== 'undefined' && window.location
			? window.location.origin
			: '';
	const spriteUrl = getIconSpriteSheetUrl(origin, spriteLibrary, kind);
	if (!_spriteFetchCache.has(spriteUrl)) {
		_spriteFetchCache.set(
			spriteUrl,
			fetch(spriteUrl)
				.then((response) => (response.ok ? response.text() : ''))
				.catch(() => '')
		);
	}
	const spriteText = await _spriteFetchCache.get(spriteUrl);
	if (!spriteText) {
		return null;
	}

	const parser = new window.DOMParser();
	const doc = parser.parseFromString(spriteText, 'image/svg+xml');
	const symbol = doc.getElementById(resolvedIcon);
	if (!symbol) {
		return null;
	}

	const viewBox = symbol.getAttribute('viewBox') || '0 0 24 24';
	const inner = symbol.innerHTML.replace(
		/fill="currentColor"/g,
		'fill="black"'
	);
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="black">${inner}</svg>`;
	const encoded = encodeURIComponent(svg);
	const uri = `url("data:image/svg+xml,${encoded}")`;

	_iconUriCache.set(cacheKey, uri);
	return uri;
}

const BLOCKNAME = 'core/button';
const BLOCKIDENTIFIER = 'prc-block-library/core-button';
const DEFAULT_ICON_SIZE = 0.875;
const DEFAULT_ICON_SIZE_UNIT = 'em';
const ICON_SIZE_UNITS = ['em', 'rem', 'px'];

/**
 * Resolve a CSS length for --icon-size. Falls back to 0.875em for legacy content.
 *
 * @param {number|string} size
 * @param {string}        unit
 * @return {string} CSS length.
 */
function getIconSizeCss(size, unit) {
	const n = Number(size);
	const safeSize = Number.isFinite(n) && n >= 0 ? n : DEFAULT_ICON_SIZE;
	const safeUnit = ICON_SIZE_UNITS.includes(unit)
		? unit
		: DEFAULT_ICON_SIZE_UNIT;
	return `${safeSize}${safeUnit}`;
}

/**
 * Add support for interactivity api to the core button block,
 * extend with icon attributes, and strip legacy icon styles from the picker.
 *
 * @param {Object} settings Settings for the block.
 *
 * @return {Object} settings Modified settings.
 */
addFilter(
	'blocks.registerBlockType',
	`${BLOCKIDENTIFIER}-supports`,
	(settings) => {
		if (BLOCKNAME !== settings.name) {
			return settings;
		}
		settings.supports = {
			...settings.supports,
			interactivity: true,
		};
		// Icon attributes.
		settings.attributes = {
			...settings.attributes,
			hasIcon: { type: 'boolean', default: false },
			iconLibrary: { type: 'string' },
			iconName: { type: 'string' },
			iconPosition: { type: 'string', default: 'right' },
			iconColor: { type: 'string' },
			iconSize: { type: 'number', default: DEFAULT_ICON_SIZE },
			iconSizeUnit: { type: 'string', default: DEFAULT_ICON_SIZE_UNIT },
		};
		// I want singular button blocks to be available anywhere and everywhere.
		delete settings.parent;
		return settings;
	},
	10
);

addFilter('editor.BlockEdit', `${BLOCKIDENTIFIER}-icon-panel`, IconPickerPanel);

/**
 * Live editor preview: put has-icon, data-icon-position, and --icon-url /
 * --icon-color / --icon-size on the BlockListBlock `.wp-block-button`
 * (same node the FE wrapper uses). CSS vars inherit onto
 * `.wp-element-button::before/::after`. Do not flex this wrapper — see
 * editor.scss.
 */
addFilter(
	'editor.BlockListBlock',
	`${BLOCKIDENTIFIER}-icon-preview`,
	createHigherOrderComponent((BlockListBlock) => {
		return function ButtonWithIconPreview(props) {
			const { name, attributes = {}, wrapperProps } = props;
			const {
				hasIcon,
				iconLibrary = 'prc',
				iconName,
				iconPosition = 'right',
				iconColor,
				iconSize = DEFAULT_ICON_SIZE,
				iconSizeUnit = DEFAULT_ICON_SIZE_UNIT,
			} = attributes;

			const [iconUri, setIconUri] = useState(null);

			useEffect(() => {
				if (BLOCKNAME !== name || !hasIcon || !iconName) {
					setIconUri(null);
					return;
				}
				let cancelled = false;
				getEditorIconUri(iconLibrary, iconName).then((uri) => {
					if (!cancelled) setIconUri(uri);
				});
				return () => {
					cancelled = true;
				};
			}, [name, hasIcon, iconLibrary, iconName]);

			if (BLOCKNAME !== name) {
				return <BlockListBlock {...props} />;
			}

			const newWrapperProps = { ...wrapperProps };

			if (hasIcon && iconUri) {
				newWrapperProps.className =
					`${newWrapperProps.className || ''} has-icon`.trim();
				newWrapperProps.style = {
					...(newWrapperProps.style || {}),
					'--icon-url': iconUri,
					'--icon-color': iconColor || 'currentColor',
					'--icon-size': getIconSizeCss(iconSize, iconSizeUnit),
				};
				newWrapperProps['data-icon-position'] = iconPosition;
			}

			return <BlockListBlock {...props} wrapperProps={newWrapperProps} />;
		};
	}, 'withButtonIconPreview'),
	100
);

/**
 * Hide legacy icon__ / brand__ styles from the block style picker while
 * keeping them registered so existing content still renders correctly.
 */
const LEGACY_STYLE_NAMES = [
	'icon__arrow-right-long',
	'icon__up-right-and-down-left-from-center',
	'icon__magnifying-glass',
	'icon__clear',
	'icon__clear__filled',
	'icon__arrows-rotate',
	'icon__graduation-cap',
	'brand__google',
	'brand__apple',
	'brand__microsoft',
	'brand__github',
];

addFilter(
	'blocks.registerBlockType',
	`${BLOCKIDENTIFIER}-hide-legacy-styles`,
	(settings) => {
		if (BLOCKNAME !== settings.name) {
			return settings;
		}
		if (!Array.isArray(settings.styles)) {
			return settings;
		}
		settings.styles = settings.styles.filter(
			(style) => !LEGACY_STYLE_NAMES.includes(style.name)
		);
		return settings;
	},
	20
);
