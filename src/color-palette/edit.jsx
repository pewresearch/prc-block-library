/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';

/**
 * UI color group definitions (mirrors PHP class).
 */
const UI_GROUPS = {
	'UI — Surfaces & Backgrounds': [
		'ui-white',
		'ui-gray-very-light',
		'ui-beige-very-light',
		'ui-beige-light',
	],
	'UI — Text': [
		'ui-black',
		'ui-text-color',
		'ui-gray-very-dark',
		'ui-gray-dark',
	],
	'UI — Borders & Dividers': [
		'ui-gray-light',
		'ui-beige-dark',
		'ui-beige-very-dark',
	],
	'UI — Links': ['ui-link-color', 'ui-link-hover-color'],
	'UI — Status & Accent': [
		'ui-success',
		'ui-error',
		'ui-mustard',
		'ui-green-dark',
		'ui-brown-dark',
		'ui-blue-dark',
		'ui-purple-dark',
	],
};

/**
 * Spectrum shade display order.
 */
const SHADE_ORDER = {
	'light-one': 0,
	'light-two': 1,
	'light-three': 2,
	primary: 3,
	'dark-one': 4,
	'dark-two': 5,
};

/**
 * Parse a light-dark() CSS value into its light and dark components.
 *
 * @param {string} value CSS color value.
 * @return {{ light: string, dark: string|null }}
 */
function parseLightDark(value) {
	const match = value.match(
		/^light-dark\(\s*([^,]+?)\s*,\s*([^)]+?)\s*\)$/i
	);
	if (match) {
		return { light: match[1].trim(), dark: match[2].trim() };
	}
	return { light: value, dark: null };
}

/**
 * Compute relative luminance.
 *
 * @param {string} hex Hex color.
 * @return {number} Luminance 0-1.
 */
function luminance(hex) {
	const h = hex.replace('#', '');
	const r = parseInt(h.substring(0, 2), 16) / 255;
	const g = parseInt(h.substring(2, 4), 16) / 255;
	const b = parseInt(h.substring(4, 6), 16) / 255;
	return 0.299 * r + 0.587 * g + 0.114 * b;
}

/**
 * Get contrasting text color.
 *
 * @param {string} bgHex Background hex color.
 * @return {string} '#000000' or '#ffffff'.
 */
function textOn(bgHex) {
	return luminance(bgHex) > 0.45 ? '#000000' : '#ffffff';
}

/**
 * Group palette colors into named sections.
 *
 * @param {Array} colors Palette entries from theme settings.
 * @return {Array<{ title: string, colors: Array }>}
 */
function groupPalette(colors) {
	const bySlug = {};
	colors.forEach((c) => {
		bySlug[c.slug] = c;
	});

	const sections = [];

	// UI groups.
	for (const [title, slugs] of Object.entries(UI_GROUPS)) {
		const groupColors = [];
		for (const slug of slugs) {
			if (bySlug[slug]) {
				groupColors.push(bySlug[slug]);
				delete bySlug[slug];
			}
		}
		if (groupColors.length) {
			sections.push({ title, colors: groupColors });
		}
	}

	// Spectrum groups.
	const spectrumFamilies = {};
	for (const [slug, color] of Object.entries(bySlug)) {
		const match = slug.match(
			/^(.+)-spectrum-(primary|light-one|light-two|light-three|dark-one|dark-two)$/
		);
		if (match) {
			const family = match[1];
			if (!spectrumFamilies[family]) {
				spectrumFamilies[family] = [];
			}
			spectrumFamilies[family].push(color);
		}
	}

	for (const [family, familyColors] of Object.entries(spectrumFamilies)) {
		familyColors.sort((a, b) => {
			const aShade = a.slug.replace(`${family}-spectrum-`, '');
			const bShade = b.slug.replace(`${family}-spectrum-`, '');
			return (SHADE_ORDER[aShade] ?? 99) - (SHADE_ORDER[bShade] ?? 99);
		});

		const title =
			family
				.split('-')
				.map((w) => w.charAt(0).toUpperCase() + w.slice(1))
				.join(' ') + ' Spectrum';

		sections.push({ title, colors: familyColors });
	}

	return sections;
}

/**
 * Swatch component for the editor.
 */
function Swatch({ hex }) {
	return (
		<div
			className="color-palette-card__swatch"
			style={{ background: hex, color: textOn(hex) }}
		>
			{hex.toUpperCase()}
		</div>
	);
}

/**
 * The edit function for the Color Palette block.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit() {
	const blockProps = useBlockProps();

	const palette = useSelect((select) => {
		const settings = select('core/block-editor').getSettings();
		return settings?.colors ?? settings?.__experimentalFeatures?.color?.palette?.theme ?? [];
	}, []);

	const sections = useMemo(() => groupPalette(palette), [palette]);

	if (!sections.length) {
		return (
			<div {...blockProps}>
				<p>{__('No theme color palette found.', 'color-palette')}</p>
			</div>
		);
	}

	return (
		<div {...blockProps}>
			{sections.map((section) => (
				<div className="color-palette-section" key={section.title}>
					<h3 className="color-palette-section__title">
						{section.title}
					</h3>
					<div className="color-palette-grid">
						{section.colors.map((color) => {
							const parsed = parseLightDark(color.color);
							return (
								<div
									className="color-palette-card"
									key={color.slug}
								>
									<div className="color-palette-card__name">
										{color.slug}
									</div>
									<div className="color-palette-card__pair">
										<Swatch hex={parsed.light} />
										{parsed.dark && (
											<Swatch hex={parsed.dark} />
										)}
									</div>
									{parsed.dark && (
										<div className="color-palette-card__labels">
											<span>light</span>
											<span>dark</span>
										</div>
									)}
								</div>
							);
						})}
					</div>
				</div>
			))}
		</div>
	);
}
