/**
 * External dependencies
 */
import { Search } from 'semantic-ui-react';

/**
 * WordPress dependencies
 */
import {
    render,
    useEffect,
    useReducer,
    useCallback,
    useRef,
} from '@wordpress/element';
import { __ } from '@wordpress/i18n/';
import domReady from '@wordpress/dom-ready';
import apiFetch from '@wordpress/api-fetch';
import { addQueryArgs } from '@wordpress/url';
import { decodeEntities } from '@wordpress/html-entities';

/**
 * Internal dependencies
 */

import './style.scss';

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

const doSearch = (searchTerm, restrictToTermId = 0) => {
    return new Promise(resolve => {
        const args = { per_page: 25 };
        if ('' !== searchTerm) {
            args.search = searchTerm;
        }
        if (0 !== restrictToTermId && '' !== restrictToTermId) {
            args.parent = restrictToTermId;
        }
        const request = {
            method: 'GET',
            path: addQueryArgs('/prc-api/v2/blocks/topic-index-search', args),
        };
        console.log('Search Request->', request);
        apiFetch(request).then(d => {
            console.log('... returns: ', d);
            const tmpData = d.map(t => {
                return {
                    key: t.id,
                    value: t.link,
                    // description: decodeEntities(t.description), If enabled this would add helpful descriptions for terms that have them.
                    title: decodeEntities(t.name),
                };
            });
            resolve(tmpData);
        });
    });
};

const TopicSearchField = ({ restrictToTermId = 0 }) => {
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

            doSearch(data.value, restrictToTermId).then(r => {
                dispatch({
                    type: 'FINISH_SEARCH',
                    results: r,
                });
            });
        }, 300);
    }, []);

    useEffect(() => {
        return () => {
            clearTimeout(timeoutRef.current);
        };
    }, []);

    useEffect(() => {
        if (false !== selected) {
            setTimeout(() => {
                window.location = selected;
            }, 1000);
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
            placeholder={__(`Start typing to search for a topic...`)}
        />
    );
};

domReady(() => {
    const fields = document.querySelectorAll(
        '.js-react-topic-index-search-field',
    );
    if (fields) {
        fields.forEach(elm => {
            const restrictToTermId = elm.getAttribute('data-term-id');
            console.log(elm, restrictToTermId);
            render(
                <TopicSearchField restrictToTermId={restrictToTermId} />,
                elm,
            );
        });
    }
});
