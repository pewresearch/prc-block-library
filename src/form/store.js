/**
 * WordPress Dependencies
 */
import { createReduxStore } from '@wordpress/data';

const DEFAULT_STATE = {
	forms: [],
};

const actions = {
	registerForm(form) {
		return {
			type: 'REGISTER_FORM',
			form,
		};
	},
};

function reducer(state = DEFAULT_STATE, action) {
	switch (action.type) {
		case 'REGISTER_FORM':
			return {
				...state,
				forms: [...state.forms, action.form],
			};
		default:
			return state;
	}
}

const selectors = {
	getForms(state) {
		return state.forms;
	},
};

const store = createReduxStore('prc-block-library/forms', {
	reducer,
	actions,
	selectors,
});

export default store;

export const { registerForm } = actions;
