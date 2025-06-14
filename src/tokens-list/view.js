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

const { state, actions } = store('prc-block/tokens-list', {
	state: {
		get tokens() {
			const context = getContext();
			const { targetNamespace } = context;
			const targetNamespaceStore = store(targetNamespace);
			if (targetNamespaceStore) {
				return targetNamespaceStore.state.tokens;
			}
			return [];
		},
		get hasTokens() {
			const context = getContext();
			const { targetNamespace } = context;
			const targetNamespaceStore = store(targetNamespace);
			if (targetNamespaceStore) {
				return targetNamespaceStore.state.tokens.length > 0;
			}
			return false;
		},
		get tokenName() {
			const context = getContext();
			return `token-${context.token.slug}`;
		},
	},
	actions: {
		*clearAllTokens() {
			const context = getContext();
			const { targetNamespace } = context;
			const targetNamespaceStore = store(targetNamespace);
			if (targetNamespaceStore) {
				const { actions: targetNamespaceActions } =
					targetNamespaceStore;
				yield targetNamespaceActions.onClear(null, null);
			}
		},
		*onTokenClick() {
			const context = getContext();
			const { targetNamespace, token } = context;
			const targetNamespaceStore = store(targetNamespace);
			if (targetNamespaceStore) {
				const { actions: targetNamespaceActions } =
					targetNamespaceStore;
				const { slug, value } = token;
				yield targetNamespaceActions.onClear(value, slug);
			}
		},
	},
});
