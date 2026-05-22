/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useState, useEffect } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import './style.scss';
import './editor.scss';
import IconPickerPanel from './inspector';

/**
 * Async utility: fetch the FA Pro sprite for `library`, extract the <symbol>
 * with `iconName`, and return a CSS-ready `url("data:image/svg+xml,...")` string.
 * Results are cached at module scope for the lifetime of the editor session.
 */
const _spriteFetchCache = new Map();
const _iconUriCache = new Map();

async function getEditorIconUri(library, iconName) {
	const cacheKey = `${library}/${iconName}`;
	if (_iconUriCache.has(cacheKey)) return _iconUriCache.get(cacheKey);

	const spriteUrl = `${window.location.origin}/wp-content/plugins/prc-icon-library/build/icons/sprites/${library}.svg`;
	if (!_spriteFetchCache.has(spriteUrl)) {
		_spriteFetchCache.set(
			spriteUrl,
			fetch(spriteUrl).then((r) => r.text())
		);
	}
	const spriteText = await _spriteFetchCache.get(spriteUrl);

	const parser = new DOMParser();
	const doc = parser.parseFromString(spriteText, 'image/svg+xml');
	const symbol = doc.getElementById(iconName);
	if (!symbol) return null;

	const viewBox = symbol.getAttribute('viewBox') || '0 0 512 512';
	const inner = symbol.innerHTML;
	const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="${viewBox}" fill="black">${inner}</svg>`;
	const encoded = encodeURIComponent(svg);
	const uri = `url("data:image/svg+xml,${encoded}")`;

	_iconUriCache.set(cacheKey, uri);
	return uri;
}

const BLOCKNAME = 'core/button';
const BLOCKIDENTIFIER = 'prc-block-library/core-button';

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
		};
		// I want singular button blocks to be available anywhere and everywhere.
		delete settings.parent;
		return settings;
	},
	10
);

addFilter('editor.BlockEdit', `${BLOCKIDENTIFIER}-icon-panel`, IconPickerPanel);

/**
 * Live editor preview: inject --icon-url / --icon-color CSS vars and
 * data-icon-position onto the wrapper div whenever is-style-has-icon is active.
 */
addFilter(
	'editor.BlockListBlock',
	`${BLOCKIDENTIFIER}-icon-preview`,
	createHigherOrderComponent((BlockListBlock) => {
		return function ButtonWithIconPreview(props) {
			const { name, attributes, wrapperProps } = props;

			if (BLOCKNAME !== name) {
				return <BlockListBlock {...props} />;
			}

			const {
				hasIcon,
				iconLibrary = 'solid',
				iconName,
				iconPosition = 'right',
				iconColor,
			} = attributes;

			const [iconUri, setIconUri] = useState(null);

			useEffect(() => {
				if (!hasIcon || !iconName) {
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
			}, [hasIcon, iconLibrary, iconName]);

			const newWrapperProps = { ...wrapperProps };

			if (hasIcon && iconUri) {
				newWrapperProps.className =
					`${newWrapperProps.className || ''} has-icon`.trim();
				newWrapperProps.style = {
					...(newWrapperProps.style || {}),
					'--icon-url': iconUri,
					'--icon-color': iconColor || 'currentColor',
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
