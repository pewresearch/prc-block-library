/**
 * External Dependencies
 */
import type { AnyAction as Action } from 'redux';
import type { Property } from 'csstype';

/**
 * WordPress Dependencies
 */
import apiFetch from '@wordpress/api-fetch';
import { createReduxStore, register } from '@wordpress/data';
import type { NoticeProps } from '@wordpress/components/build-types/notice/types';

/**
 * Internal Dependencies
 */
import { STORE_NAME, REST_API_ROUTE } from './constants';

export interface ApiResponse {
	status?: NoticeProps['status'];
	message?: string;
	options?: StoreOptions;
	// eslint-disable-next-line camelcase
	block_css?: string;
}

export interface StoreOptions {
	/* eslint-disable camelcase */
	show_label_on_section: boolean;
	show_control_button: boolean;
	focus_control_button: boolean;
	show_dot_on_th: boolean;
	tab_move: boolean;
	merge_content: boolean;
	show_global_setting: boolean;
	breakpoint: number;
	block_style: {
		table_width?: string;
		table_max_width?: string;
		row_odd_color?: string;
		row_even_color?: string;
		table_border_collapse?: string;
		cell_text_color_th?: string;
		cell_text_color_td?: string;
		cell_background_color_th?: string;
		cell_background_color_td?: string;
		cell_padding?: {
			top?: Property.PaddingTop;
			right?: Property.PaddingRight;
			bottom?: Property.PaddingBottom;
			left?: Property.PaddingLeft;
		};
		cell_border_width?: string;
		cell_border_style?: string;
		cell_border_color?: string;
		cell_text_align?: string;
		cell_vertical_align?: string;
	};
	/* eslint-enable camelcase */
}

const DEFAULT_STATE = {
	options: {},
};

const actions = {
	getOptions(path: string) {
		return {
			type: 'GET_OPTIONS',
			path,
		};
	},
	setOptions(options: StoreOptions) {
		return {
			type: 'SET_OPTIONS',
			options,
		};
	},
};

const reducer = (state = DEFAULT_STATE, action: Action) => {
	switch (action.type) {
		case 'SET_OPTIONS': {
			return {
				...state,
				options: action.options,
			};
		}
		default: {
			return state;
		}
	}
};

const selectors = {
	getOptions(state: { options: StoreOptions }) {
		const { options } = state;
		return options;
	},
};

const controls = {
	GET_OPTIONS(action: Action) {
		return apiFetch<ApiResponse>({ path: action.path });
	},
};

const resolvers = {
	*getOptions() {
		const options: StoreOptions = yield actions.getOptions(REST_API_ROUTE);
		return actions.setOptions(options);
	},
};

const store = createReduxStore(STORE_NAME, {
	reducer,
	controls,
	selectors,
	resolvers,
	actions,
});

register(store);

export { STORE_NAME };
