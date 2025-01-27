/**
 * WordPress Dependencies
 */
import { store, getContext } from '@wordpress/interactivity';

store('prc-block/show-more', {
	state: {
		get label() {
			const context = getContext();
			const { isExpanded, showLabel, hideLabel } = context;
			return isExpanded ? hideLabel : showLabel;
		},
	},
	actions: {
		toggleExpanded: () => {
			const context = getContext();
			if (true === context.isExpanded) {
				context.isExpanded = false;
			} else {
				context.isExpanded = true;
			}
		},
	},
	callbacks: {
		onResize: () => {
			const context = getContext();
			const width = document.documentElement.clientWidth;
			if (width <= 600) {
				context.currentDevice = 'mobile';
			} else if (width > 600 && width <= 782) {
				context.currentDevice = 'tablet';
			} else {
				context.currentDevice = 'desktop';
			}
		},
		getStyle: () => {
			const context = getContext();
			const { heights, currentDevice } = context;
			if (!heights[currentDevice]) {
				return;
			}
			const height = heights[currentDevice];
			return `--collapsed-height: ${height}px;`;
		},
	},
});
