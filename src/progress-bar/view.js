/**
 * WordPress Dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

/**
 * Format a number for fractional display without forcing trailing zeros,
 * while preserving one decimal place when the stored value has a fraction.
 *
 * @param {number} value Numeric value.
 * @return {string} Formatted value.
 */
const formatNumber = (value) => {
	const n = Number(value);
	if (!Number.isFinite(n)) {
		return '0';
	}
	if (Number.isInteger(n)) {
		return String(n);
	}
	return String(Math.round(n * 10) / 10);
};

const { state, actions } = store('prc-block/progress-bar', {
	state: {
		get barStyle() {
			const context = getContext();
			const { blockId } = context;
			const { value, maxValue, barHeight, barColor } = state[blockId];
			const safeMax = Number(maxValue) || 1;
			const width = (Number(value) / safeMax) * 100;
			return `height: ${barHeight}px; width: ${width}%; background-color: var(--wp--preset--color--${barColor});`;
		},
		get value() {
			const context = getContext();
			const { blockId } = context;
			const { value, maxValue, labelFormat } = state[blockId];
			if (labelFormat === 'fractional') {
				return `${formatNumber(value)}/${formatNumber(maxValue)}`;
			}
			// Percentage mode treats `value` as the display percent (matches editor).
			return `${formatNumber(value)}%`;
		},
	},
	actions: {},
	callbacks: {},
});
