const ICON_NAME_ALIASES = {
	'column-chart': 'chart-column',
	pdf: 'file-pdf',
	x: 'xmark',
	home: 'house',
	'globe-pointer': 'earth-americas',
	'chart-bar': 'chart-column',
	'building-magnifying-glass': 'magnifying-glass',
	'face-viewfinder': 'users-viewfinder',
	'filter-list': 'filter',
	filters: 'filter',
	'lock-hashtag': 'lock',
	'pen-field': 'pen-to-square',
	'table-pivot': 'table',
	'rectangle-history-circle-plus': 'circle-plus',
	'square-dashed-circle-plus': 'circle-plus',
	'arrow-down-small-big': 'arrow-down-short-wide',
	'arrow-up-small-big': 'arrow-up-short-wide',
	'cards-blank': 'clone',
	'chess-clock': 'stopwatch',
	'clock-two': 'clock',
	'credit-card-front': 'credit-card',
	donut: 'chart-pie',
	'input-text': 'i-cursor',
	'list-radio': 'circle-dot',
	'message-smile': 'comment',
	'rectangle-history': 'clone',
	'rectangle-vertical-history': 'bars-staggered',
	'shield-exclamation': 'shield-halved',
	slider: 'sliders',
	'chart-bullet': 'chart-simple',
	'hexagon-image': 'image',
	'pen-circle': 'pen',
};

/**
 * Map legacy `prc-block/icon` attributes onto `core/icon`.
 *
 * `{ library, icon, size }` → `{ icon: 'prc/{icon}', style.dimensions.width: '{size}em' }`.
 * Empty values take block.json defaults (`solid` / `star` / `1`) first.
 * Historical names (`pdf`, `column-chart`) remap onto curated fills.
 * The FA weight axis is dropped (PRC-721). Other attributes (`className`,
 * `anchor`, colors, and remaining `style`) are preserved. Keep this in sync
 * with `class-icon-migrate.php`.
 *
 * @param {Object} attributes
 * @param {string} [attributes.library]
 * @param {string} [attributes.icon]
 * @param {number} [attributes.size]
 * @return {Object} core/icon attributes.
 */
export function mapPrcIconToCoreIconAttributes(attributes = {}) {
	const rawIcon =
		typeof attributes.icon === 'string' && attributes.icon
			? attributes.icon
			: 'star';
	const icon = ICON_NAME_ALIASES[rawIcon] ?? rawIcon;
	const size =
		typeof attributes.size === 'number' && Number.isFinite(attributes.size)
			? attributes.size
			: 1;
	const style =
		attributes.style && typeof attributes.style === 'object'
			? attributes.style
			: {};

	const next = { ...attributes };
	delete next.library;
	delete next.size;

	return {
		...next,
		icon: `prc/${icon}`,
		style: {
			...style,
			dimensions: {
				...(style.dimensions || {}),
				width: `${size}em`,
			},
		},
	};
}
