/* eslint-disable no-param-reassign */
/**
 * WordPress Dependencies
 */
import { createReduxStore } from '@wordpress/data';

const store = createReduxStore('prc-block/progress-bar', {
	// a redux store that has two variables: isCopied which is a boolean
	// and copiedStyles which is an object that holds the styles
	reducer: (
		state = {
			isCopied: false,
			copiedStyles: {},
		},
		action
	) => {
		switch (action.type) {
			case 'COPY_LAYOUT_STYLES':
				return {
					...state,
					isCopied: true,
					copiedStyles: action.payload,
				};
			default:
				return state;
		}
	},
	actions: {
		copyLayoutStyles(styles) {
			return {
				type: 'COPY_LAYOUT_STYLES',
				payload: styles,
			};
		},
	},
	selectors: {
		getCopiedStylesStatus(state) {
			return state.isCopied;
		},
		getCopiedStyles(state) {
			return state.copiedStyles;
		},
	},
});

export default store;
