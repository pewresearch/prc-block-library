/**
 * WordPress Dependencies
 */
import {
	store,
	getContext,
	getElement,
	withSyncEvent,
	withScope,
} from '@wordpress/interactivity';

const { apiFetch } = window.wp;
const { addQueryArgs } = window.wp.url;
const { decodeEntities } = window.wp.htmlEntities;

const { state, actions } = store('prc-block/taxonomy-search', {
	state: {
		get inputValue() {
			const { attributes } = getElement();
			const { id } = attributes;
			const { formFields } = state;
			return formFields.find((field) => field.id === id)?.value;
		},
		get inputName() {
			const context = getContext();
			const { taxonomy } = context;
			return `search__${taxonomy}`;
		},
		get inputPlaceholder() {
			const { attributes } = getElement();
			const { id } = attributes;
			const { formFields } = state;
			return formFields.find((field) => field.id === id)?.placeholder;
		},
	},
	actions: {
		async doSearch(searchValue, taxonomy, parentTermId = 0) {
			return new Promise((resolve) => {
				const args = { per_page: 25 };
				if ('' !== taxonomy) {
					args.taxonomy = taxonomy;
				}
				if ('' !== searchValue) {
					args.search = searchValue;
				}
				if (0 !== parentTermId && '' !== parentTermId) {
					// cast parentTermId as a whole number
					args.parent_term_id = parentTermId;
				}
				const request = {
					method: 'GET',
					path: addQueryArgs(
						'/prc-api/v3/blocks/taxonomy-search',
						args
					),
				};
				console.log('doSearch request', request);
				apiFetch(request).then((d) => {
					console.log('doSearch response', d);
					const tmpData = d.map((t) => ({
						key: t.id,
						id: t.id,
						url: t.link,
						description: decodeEntities(t.description),
						label: decodeEntities(t.name),
					}));
					resolve(tmpData);
				});
			});
		},
		onInputFocus: withSyncEvent((event) => {
			const context = getContext();
			context.isActive = true;
		}),
		onInputBlur: withSyncEvent((event) => {
			const context = getContext();
			setTimeout(() => {
				context.isActive = false;
			}, 300);
		}),
		onInputChange: withSyncEvent((event) => {
			const { value } = event.target;
			const context = getContext();
			const { ref } = getElement();
			const { id } = ref;
			// Store the value in the global state where we store all primitve inputs.
			// Also, store the value in this block's context so we can use it in the submitHandler.
			const { formFields } = state;
			const formField = formFields.find((f) => f.id === id);
			if (formField) {
				formField.value = value;
			}
			state.formFields = formFields;
			context.searchValue = value;
		}),
	},
	callbacks: {
		showResults: () => {
			const context = getContext();
			return (
				context.results &&
				context.results.length >= 1 &&
				context.isActive
			);
		},
		onSearchValueChange: withSyncEvent(() => {
			const context = getContext();
			const { searchValue, taxonomy } = context;
			if (searchValue && searchValue.length > 4) {
				withScope(
					setTimeout(() => {
						console.log('onSearchValueChange', { ...context });
						actions.doSearch(searchValue, taxonomy).then((d) => {
							context.results = d;
						});
					}, 1200)
				);
			}
		}),
		onEscKey: (event) => {
			if (27 === event.keyCode) {
				const context = getContext();
				context.isActive = false;
			}
		},
	},
});
