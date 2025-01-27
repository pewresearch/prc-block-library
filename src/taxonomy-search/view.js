/**
 * WordPress Dependencies
 */
import {
	store,
	getContext,
	getElement,
	useState,
	useEffect,
} from '@wordpress/interactivity';

const { apiFetch } = window.wp;
const { addQueryArgs } = window.wp.url;
const { decodeEntities } = window.wp.htmlEntities;

const useDebounce = (value, delay) => {
	// State and setters for debounced value
	const [debouncedValue, setDebouncedValue] = useState(value);
	useEffect(
		() => {
			// Update debounced value after delay
			const handler = setTimeout(() => {
				setDebouncedValue(value);
			}, delay);
			// Cancel the timeout if value changes (also on delay change or unmount)
			// This is how we prevent debounced value from updating if value is changed ...
			// .. within the delay period. Timeout gets cleared and restarted.
			return () => {
				clearTimeout(handler);
			};
		},
		[value, delay] // Only re-call effect if value or delay changes
	);
	return debouncedValue;
};

const { state, actions } = store('prc-block/taxonomy-search', {
	actions: {
		async doSearch(searchValue, taxonomy, parentTermId = 0) {
			console.log('doSearch', searchValue, taxonomy, parentTermId);
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
				console.log('doSearch', request);
				apiFetch(request).then((d) => {
					console.log('doSearch', d);
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
		onInputFocus: (event) => {
			const context = getContext();
			context.isActive = true;
		},
		onInputBlur: (event) => {
			const context = getContext();
			setTimeout(() => {
				context.isActive = false;
			}, 300);
		},
		onInputChange: (event) => {
			const { value } = event.target;
			const context = getContext();
			const { ref } = getElement();
			const { id } = ref;
			// Store the value in the global state where we store all primitve inputs.
			state[id].value = value;
			// Also, store the value in this block's context so we can use it in the submitHandler.
			context.searchValue = state[id].value;
		},
	},
	callbacks: {
		showResults: () => {
			const context = getContext();
			console.log('showResults', context, state);
			return (
				context.results &&
				context.results.length >= 1 &&
				context.isActive
			);
		},
		onSearchValueChange: () => {
			const context = getContext();
			const { debouncedSearchValue } = context;
			if (debouncedSearchValue) {
				console.log(
					'onSearchValueChange',
					context,
					state,
					debouncedSearchValue
				);
				// do the search
				actions
					.doSearch(debouncedSearchValue, context.taxonomy)
					.then((d) => {
						context.results = d;
					});
			}
		},
		debounceSearchValueChange: () => {
			const context = getContext();
			const debouncedSearchValue = useDebounce(context.searchValue, 1000);
			if (debouncedSearchValue.length > 2) {
				context.debouncedSearchValue = debouncedSearchValue;
			}
		},
		onEscKey: (event) => {
			if (27 === event.keyCode) {
				const context = getContext();
				context.isActive = false;
			}
		},
	},
});
