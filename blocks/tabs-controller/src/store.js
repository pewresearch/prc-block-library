// createa  quick store using wordpress data api
import { createReduxStore } from '@wordpress/data';

const STORE_NAME = 'prc-block/tabs-controller';

const DEFAULT_STATE = {
	clientIdsOnPage: [],
	clientIdsActiveUUIDPairs: {},
};

const actions = {
	setClientId(clientId) {
		return {
			type: 'SET_CLIENT_ID',
			clientId,
		};
	},
	setActiveUUIDPair(clientId, uuid) {
		return {
			type: 'SET_ACTIVE_UUID_PAIR',
			clientId,
			uuid,
		};
	},
};

const store = createReduxStore(STORE_NAME, {
	reducer(state = DEFAULT_STATE, action) {
		switch (action.type) {
			case 'SET_CLIENT_ID':
				return {
					...state,
					clientIdsOnPage: [
						...state.clientIdsOnPage,
						action.clientId,
					],
				};
			case 'SET_ACTIVE_UUID_PAIR':
				return {
					...state,
					clientIdsActiveUUIDPairs: {
						...state.clientIdsActiveUUIDPairs,
						[action.clientId]: action.uuid,
					},
				};
		}
		return state;
	},
	actions,
	selectors: {
		getClientIdsOnPage(state) {
			return state.clientIdsOnPage;
		},
		getActiveUUID(state, clientId) {
			return state.clientIdsActiveUUIDPairs[clientId];
		},
	},
});

export { store, STORE_NAME };
