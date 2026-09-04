/**
 * Whether the slide layout stretches direct inner blocks to fill leftover height.
 *
 * @param {Object} [layout] Block layout attribute.
 * @return {boolean} True when Alignment is Stretch.
 */
export function isSlideVerticallyStretched(layout) {
	return layout?.verticalAlignment === 'stretch';
}
