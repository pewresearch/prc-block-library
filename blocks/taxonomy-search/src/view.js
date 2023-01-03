/**
 * External Dependencies
 */
import { Search } from 'semantic-ui-react';

/**
 * WordPress Dpendencies
 */
import {
	render,
	useEffect,
	useReducer,
	useCallback,
	useRef,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n';
import domReady from '@wordpress/dom-ready';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { decodeEntities } from '@wordpress/html-entities';

const INITIAL_STATE = {
	loading: false,
	results: [
		{
			key: null,
			value: null,
			title: 'Start typing to search for a topic...',
		},
	],
	value: '',
	selected: false,
};

const searchReducer = (state, action) => {
	switch (action.type) {
		case 'CLEAN_QUERY':
			return INITIAL_STATE;
		case 'START_SEARCH':
			return { ...state, loading: true, value: action.query };
		case 'FINISH_SEARCH':
			return { ...state, loading: false, results: action.results };
		case 'UPDATE_SELECTION':
			return {
				...state,
				loading: true,
				value: action.selection.title,
				selected: action.selection.value,
			};

		default:
			throw new Error();
	}
};

const doSearch = (searchValue, taxonomy, parentTermId = 0) =>
	new Promise((resolve) => {
		const args = { per_page: 25 };
		if ('' !== taxonomy) {
			args.taxonomy = taxonomy;
		}
		if ('' !== searchValue) {
			args.searchValue = searchValue;
		}
		if (0 !== parentTermId && '' !== parentTermId) {
			// cast parentTermId as a whole number
			args.parentTermId = parentTermId;
		}
		const request = {
			method: 'GET',
			path: addQueryArgs('/prc-api/v2/blocks/taxonomy-search', args),
		};
		console.log('Search Request->', request);
		apiFetch(request).then((d) => {
			console.log('... returns: ', d);
			const tmpData = d.map((t) => ({
				key: t.id,
				value: t.link,
				// description: decodeEntities(t.description), If enabled this would add helpful descriptions for terms that have them.
				title: decodeEntities(t.name),
			}));
			resolve(tmpData);
		});
	});

function SearchField({ taxonomy = '', parentTermId = 0, parentTermName = '' }) {
	const [state, dispatch] = useReducer(searchReducer, INITIAL_STATE);
	const { loading, results, value, selected } = state;

	const timeoutRef = useRef();

	const handleResultSelect = (e, { result }) => {
		dispatch({ type: 'UPDATE_SELECTION', selection: result });
	};

	const handleSearchChange = useCallback((e, data) => {
		clearTimeout(timeoutRef.current);
		dispatch({ type: 'START_SEARCH', query: data.value });

		timeoutRef.current = setTimeout(() => {
			if (0 === data.value.length) {
				dispatch({ type: 'CLEAN_QUERY' });
				return;
			}

			doSearch(data.value, taxonomy, parentTermId).then((r) => {
				dispatch({
					type: 'FINISH_SEARCH',
					results: r,
				});
			});
		}, 300);
	}, []);

	useEffect(
		() => () => {
			clearTimeout(timeoutRef.current);
		},
		[],
	);

	useEffect(() => {
		if (false !== selected) {
			setTimeout(() => {
				window.location = selected;
			}, 350);
		}
	}, [selected]);

	return (
		<Search
			loading={loading}
			onResultSelect={handleResultSelect}
			onSearchChange={handleSearchChange}
			results={results}
			value={value}
			defaultValue={null}
			fluid
			placeholder={__(
				`Start typing to search ${
					'' !== parentTermName ? parentTermName : 'for a topic'
				}...`,
			)}
		/>
	);
}

domReady(() => {
	const blocks = document.querySelectorAll(
		'.wp-block-prc-block-taxonomy-search',
	);
	if (blocks) {
		blocks.forEach((elm) => {
			const taxonomy = elm.getAttribute('data-taxonomy');
			const parentTermId = elm.getAttribute('data-restrict-to-term-id');
			const parentTermName = elm.getAttribute('data-restrict-to-term-name');
			render(
				<SearchField
					taxonomy={taxonomy}
					parentTermId={parentTermId}
					parentTermName={parentTermName}
				/>,
				elm,
			);
		});
	}
});
