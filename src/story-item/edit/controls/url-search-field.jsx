/**
 * External Dependencies
 */
import { useDebounce } from '@prc-app/shared';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState, useMemo, useEffect } from '@wordpress/element';
import {
	Button,
	Card,
	CardBody,
	CardDivider,
	CardHeader,
	SearchControl,
	Spinner,
	NavigableMenu,
	TabbableContainer,
} from '@wordpress/components';
import { date as formatDate } from '@wordpress/date';
import { useEntityRecords, useEntityProp } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal Dependencies
 */
import { setPostAttributes } from '../../helpers';

function SearchRecords({ searchRecords, onSelect }) {
	return (
		<NavigableMenu
			tabIndex="0"
			orientation="vertical"
			onNavigate={(index, elm) => {
				elm.focus();
				console.log('onNavigate', index, elm);
			}}
		>
			{searchRecords.map((item) => (
				<SearchItem {...{ item, onSelect }} />
			))}
		</NavigableMenu>
	);
}

function SearchItem({ item, onSelect }) {
	const title = item.title.rendered;
	const { id, date } = item;
	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events
		<Card onClick={() => onSelect(item)} size="small">
			<CardBody>
				<div
					style={{
						fontSize: '0.8em',
						color: '#666',
					}}
				>
					{`${item.label} | ${formatDate('M j, Y', date)}`}
				</div>
				<strong>{title}</strong>
				<div
					style={{
						fontSize: '0.8em',
						fontStyle: 'italic',
						color: '#666',
					}}
				>
					{item.canonical_url}
				</div>
			</CardBody>
		</Card>
	);
}

export default function URLSearchField({ attributes, setAttributes }) {
	const { imageSize, url } = attributes;

	const [siteId] = useEntityProp('root', 'site', 'siteId');
	const postType = 1 === siteId ? 'stub' : 'post';

	const [searchInput, setSearchInput] = useState('');
	const searchString = useDebounce(searchInput, 500);
	const searchStringIsUrl = useMemo(() => {
		if (searchString.match(/^(http|https):\/\//)) {
			return true;
		}
		return false;
	}, [searchString]);

	const [foundObject, setFoundObject] = useState(null);

	const hasSearchString = !!searchString.length;

	const { records: searchRecords, isResolving } = useEntityRecords(
		'postType',
		postType,
		{
			per_page: 10,
			search: hasSearchString && !searchStringIsUrl ? searchString : '',
			context: 'view',
		},
	);
	const hasSearchRecords =
		!isResolving && searchRecords ? 0 < searchRecords.length : false;
	const hasNothingFound =
		!isResolving && !hasSearchRecords && false === searchStringIsUrl;
	const hasFoundObject =
		!isResolving &&
		!hasSearchRecords &&
		searchStringIsUrl &&
		null !== foundObject;

	const getPostByUrl = (newUrl) => {
		if (undefined === newUrl) {
			return new Error('url is undefined');
		}
		return new Promise((resolve, reject) => {
			apiFetch({
				path: '/prc-api/v2/stub/get-post-by-url',
				method: 'POST',
				data: { url: newUrl },
			})
				.then((post) => {
					console.log('getPostByUrl', newUrl, post);
					if ('object' !== typeof post) {
						reject(new Error('post is not an object'));
					}
					resolve(post);
				})
				.catch((err) => reject(err));
		});
	};

	const getLabel = (item) => {
		console.log('getLabel', item);
	};

	const onReplace = (newPostId) => {
		setPostAttributes({
			postId: newPostId,
			imageSize,
			isRefresh: false,
			setAttributes,
		});
	};

	const onSelect = (newSelection) => {
		console.log('onSelect', newSelection);
	};

	useEffect(() => {
		console.log('searchRecords isResolving', isResolving, searchRecords);
	}, [searchRecords, isResolving]);

	useEffect(() => {
		if (searchStringIsUrl) {
			getPostByUrl(searchString).then((post) => {
				console.log('Complete =>', post);
			});
		}
	}, [searchString, searchStringIsUrl]);

	// When making a selection, whether its from entity records or the rest api, clicking or selecting an entry and hitting enter should run a standarized action.

	return (
		<TabbableContainer>
			<SearchControl
				tabIndex="0"
				value={searchInput}
				onChange={(keyword) => setSearchInput(keyword)}
				placeholder="Joe Biden climate change..."
				autoComplete="off"
			/>
			{hasSearchString && (
				<Fragment>
					{isResolving && (
						<div>
							<span>Loading... </span>
							<Spinner />
						</div>
					)}

					{hasNothingFound && (
						<div>
							<span>{__('Nothing found.', 'prc-block-library')}</span>
						</div>
					)}

					{hasFoundObject && (
						<div>
							<span>
								{__('Press enter to insert post.', 'prc-block-library')}
							</span>
						</div>
					)}

					{hasSearchRecords && (
						<SearchRecords {...{ searchRecords, onSelect }} />
					)}
				</Fragment>
			)}
		</TabbableContainer>
	);
}
