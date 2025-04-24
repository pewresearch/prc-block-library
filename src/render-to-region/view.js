/**
 * WordPress Dependencies
 */
import {
	store,
	getElement,
	getContext,
	getServerState,
	getServerContext,
} from '@wordpress/interactivity';

const { state, actions } = store('prc-block/render-to-region', {
	state: {
		// This gets derived state, it does not point to a direct value in state but rather acts as a callback in the state object.
		// Getting a value from state.myValueFromServer would in this case yield that value using the getServerState function
		//  which gets state from the server.
		get myValueFromServer() {
			const { myValue } = getServerState();
			return myValue;
		},
	},
	actions: {
		// This is a simple action that updates the client state.
		updateValue: (value) => {
			state.myValue = value;
		},
		// This updates the client state with the server value so its always in sync. You can attach this as a callback or call it after a router action.
		updateClientValueWithServerValue: () => {
			const serverState = getServerState();
			const { myValue } = serverState;
			state.myValue = myValue;
		},
		*doNavigateAction(newUrl) {
			// Process the new url. This will hit the server and update state server side accordingly.
			// We load the router dynamically for increased performance, only when we first need it.
			const router = yield import('@wordpress/interactivity-router');
			yield router.actions.navigate(newUrl);

			// Update the client state with the server state.
			actions.updateClientValueWithServerValue();
		},
	},
	callbacks: {
		onMount: () => {
			const element = getElement();
			const regionName = element.getAttribute(
				'data-prc-block--render-to-region--name'
			);
			console.log('onMount', element, regionName, state);
		},
		onUpdate: () => {
			const element = getElement();
			const regionName = element.getAttribute(
				'data-prc-block--render-to-region--name'
			);
			console.log('onUpdate', element, regionName, state);
		},
		onRegionMount: () => {
			const element = getElement();
			const regionName = element.getAttribute(
				'data-prc-block--render-to-region--name'
			);
			console.log('onRegionMount', element, regionName, state);
		},
		onRegionUpdate: () => {
			const element = getElement();
			const regionName = element.getAttribute(
				'data-prc-block--render-to-region--name'
			);
			console.log('onRegionUpdate', element, regionName, state);
		},
	},
});
