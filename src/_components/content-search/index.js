/**
 * External Dependencies
 */
/** @jsx jsx */
import { jsx, css } from '@emotion/react';
import { useDebounce } from '@prc/blocks/hooks';

/**
 * WordPress Dependencies
 */
import { SearchControl, TextControl, Spinner, NavigableMenu } from '@wordpress/components';
import apiFetch from '@wordpress/api-fetch';
import { Fragment, useState, useRef, useEffect } from '@wordpress/element'; // eslint-disable-line
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import SearchItem from './search-item';

const NAMESPACE = 'prc-content-search';

const searchCache = {};

const ContentSearch = ({ onSelectItem, placeholder, label, style = 'search', contentTypes, mode, excludeItems, perPage }) => {
	const [searchInput, setSearchInput] = useState('');
	const searchString = useDebounce(searchInput, 500);

	const [searchResults, setSearchResults] = useState([]);
	const [isLoading, setIsLoading] = useState(false);
	const [selectedItem, setSelectedItem] = useState(null);
	const abortControllerRef = useRef();

	const mounted = useRef(true);

	/**
	 * handleSelection
	 *
	 * update the selected item in state to either the selected item or null if the
	 * selected item does not have a valid id
	 *
	 * @param {*} item
	 */
	const handleOnNavigate = (item) => {
		if (item === 0) {
			setSelectedItem(null);
		}

		setSelectedItem(item);
	}

	const getPostByUrl = (url) => {
        if (undefined === url) {
            return false;
        }
        return new Promise((resolve, reject) => {
            apiFetch({
                path: '/prc-api/v2/utils/get-post-by-url',
                method: 'POST',
                data: { url },
            })
                .then((post) => {
                    console.log('getPostByUrl', post);
                    resolve(post);
                })
                .catch((err) => reject(err));
        });
    };

	/**
	 * handleItemSelection
	 *
	 * reset the search input & item container
	 * trigger the onSelectItem callback passed in via props
	 *
	 * @param {*} item
	 */
	const handleItemSelection = (item) => {
		setSearchResults([]);
		setSearchInput('');
		onSelectItem(item);
	}

	const filterResults = (results) => {
		return results.filter((result) => {
			let keep = true;

			if (excludeItems.length) {
				keep = excludeItems.every((item) => item.id !== result.id);
			}

			return keep;
		});
	}

	const hasSearchString = !!searchString.length;
	const hasSearchResults = !!searchResults.length;

	/**
	 * handleSearchStringChange
	 *
	 * Using the keyword and the list of tags that are linked to the parent block
	 * search for posts/terms that match and return them to the autocomplete component.
	 *
	 * @param {string} keyword search query string
	 */
	const handleSearchStringChange = (keyword) => {
		if (abortControllerRef.current) {
			abortControllerRef.current.abort();
		}

		// Determine if keyword is a url
		const isUrl = keyword.match(/^(http|https):\/\//);

		if (keyword.trim() === '') {
			setIsLoading(false);
			setSearchResults([]);
			abortControllerRef.current = null;
			return;
		}

		abortControllerRef.current = new AbortController();

		setIsLoading(true);

		const searchQuery = `wp/v2/search/?search=${keyword}&subtype=${contentTypes.join(
			',',
		)}&type=${mode}&_embed&per_page=${perPage}`;

		if (searchCache[searchQuery]) {
			abortControllerRef.current = null;

			setSearchResults(filterResults(searchCache[searchQuery]));
			setIsLoading(false);
		} else if (isUrl) {
			getPostByUrl(keyword)
				.then((post) => {
					if (mounted.current) {
						const {
							ID,
							post_title,
							post_type,
							permalink,
						} = post;
						abortControllerRef.current = null;

						const result = [{
							id: ID,
							subtype: post_type,
							title: post_title,
							type: "post",
							url: permalink,
						}];

						console.log("this is where we should do our stuff...", result, post);

						searchCache[searchQuery] = result;

						setSearchResults(filterResults(result));

						setIsLoading(false);
					}
				}
			);
		} else {
			apiFetch({
				path: searchQuery,
				signal: abortControllerRef.current.signal
			}).then((results) => {
				if (mounted.current === false) {
					return;
				}

				console.log("search Results", results);

				abortControllerRef.current = null;

				searchCache[searchQuery] = results;

				setSearchResults(filterResults(results));

				setIsLoading(false);
			}).catch((error, code) => {
				// fetch_error means the request was aborted
				if (error.code !== 'fetch_error') {
					setSearchResults([]);
					abortControllerRef.current = null;
					setIsLoading(false);
				}
			});
		}
	};

	useEffect(() => {
		return () => {
			mounted.current = false;
		};
	}, []);

	useEffect(()=>{
		if ( '' !== searchString ) {
			handleSearchStringChange(searchString);
		}
	}, [searchString]);

	const listCSS = css`
		/* stylelint-disable */
		max-height: 350px;
		overflow-y: auto;
	`;

	return (
		<NavigableMenu onNavigate={handleOnNavigate} orientation="vertical">
			<div style={{
				display: 'flex'
			}}>
				<div style={{
					flexGrow: '1',
				}}>
					{ 'minimal' === style && (
						<TextControl
							label={label}
							value={searchInput}
							onChange={(keyword)=> setSearchInput(keyword)}
							placeholder={placeholder}
							autoComplete="off"
						/>
					)}
					{ 'search' === style && (
						<SearchControl
							value={searchInput}
							onChange={(keyword)=> setSearchInput(keyword)}
							placeholder={placeholder}
						/>
					)}
				</div>
				
				{isLoading && (
					<div style={{
						position: 'absolute',
						right: 'minimal' === style ? '8px' : '50px',
						marginTop: 'minimal' === style ? '27px' : '10px',
					}}>
						<Spinner />
					</div>
				)}
			</div>
			{hasSearchString ? (
				<ul
					className={`${NAMESPACE}-list`}
					style={{
						marginTop: '0',
						marginBottom: '0',
						marginLeft: '0',
						paddingLeft: '0',
						listStyle: 'none',
					}}
					css={listCSS}
				>
					{!isLoading && !hasSearchResults && (
						<li
							className={`${NAMESPACE}-list-item components-button`}
							style={{ color: 'inherit', cursor: 'default', paddingLeft: '3px' }}
						>
							{__('Nothing found.', 'prc-block-components')}
						</li>
					)}
					{!isLoading && searchResults.map((item, index) => {
						if (!item.title.length) {
							return null;
						}

						return (
							<li
								key={item.id}
								className={`${NAMESPACE}-list-item`}
								style={{
									marginBottom: '0',
								}}
							>
								<SearchItem
									onClick={() => handleItemSelection(item)}
									searchTerm={searchString}
									suggestion={item}
									contentTypes={contentTypes}
									isSelected={selectedItem === index + 1}
								/>
							</li>
						);
					})}
				</ul>
			) : null}
		</NavigableMenu>
	);
};

export { ContentSearch };