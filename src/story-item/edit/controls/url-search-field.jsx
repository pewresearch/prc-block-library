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
	CardMedia,
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

function SearchRecords({ searchRecords, onSelect, imageSize = 'A3' }) {
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
				<SearchItem {...{ item, onSelect, imageSize }} />
			))}
		</NavigableMenu>
	);
}

function Image({ item, imageSize }) {
	const { art } = item;
	// Check if art has imageSize as a valid key. If so get the rawUrl, height and width. Then return an img tag accordingly.
	if (art && art[imageSize]) {
		const { rawUrl, height, width, caption } = art[imageSize];
		return (
			<CardMedia>
				<img src={rawUrl} height={height} width={width} alt={caption} />
			</CardMedia>
		);
	}
	return null;
}

function SearchItem({ item, onSelect, imageSize = 'A3' }) {
	if (!item) {
		return null;
	}
	console.log('<SearchItem />', item);
	// if item has post_title then use that otherwise use title.rendered
	const title = item.post_title ? item.post_title : item.title.rendered;
	console.log('title', title);
	// if item has post_date then use that otherwise use date
	const date = item.post_date ? item.post_date : item.date;
	console.log('date', date);

	const { label } = item;
	console.log('label', label);
	const canonicalUrl = item.canonical_url;
	console.log('canonicalUrl', canonicalUrl);

	return (
		// eslint-disable-next-line jsx-a11y/click-events-have-key-events
		<Card
			onClick={() => onSelect(item)}
			size="small"
			style={{
				cursor: 'pointer',
				':hover': {
					'background-color': '#f3f4f5',
				},
			}}
		>
			<CardBody
				style={{
					display: 'flex',
				}}
			>
				<div
					style={{
						width: '35%',
						maxWidth: '200px',
						paddingRight: '1em',
						paddingTop: '0.5em',
					}}
				>
					<Image {...{ item, imageSize }} />
				</div>
				<div>
					<div
						style={{
							fontSize: '0.8em',
							color: '#666',
						}}
					>
						{`${label} | ${formatDate('M j, Y', date)}`}
					</div>
					<strong>{title}</strong>
					<div
						style={{
							fontSize: '0.8em',
							fontStyle: 'italic',
							color: '#666',
							lineHeight: '1.5em',
						}}
					>
						{canonicalUrl}
					</div>
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
		!isResolving && !searchStringIsUrl && searchRecords
			? 0 < searchRecords.length
			: false;
	const hasFoundObject =
		!isResolving && searchStringIsUrl && null !== foundObject;
	const hasNothingFound = !isResolving && !hasSearchRecords && !hasFoundObject;

	const getPostByUrl = (newUrl) =>
		new Promise((resolve, reject) => {
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
		setFoundObject(newSelection);
	};

	useEffect(() => {
		console.log('searchRecords isResolving', isResolving, searchRecords);
	}, [searchRecords, isResolving]);

	useEffect(() => {
		if (searchStringIsUrl) {
			getPostByUrl(searchString).then((post) => {
				setFoundObject(post);
			});
		}
		console.log('searchStringIsUrl changed', searchStringIsUrl, searchString);
	}, [searchString, searchStringIsUrl]);

	useEffect(() => {
		console.log('foundObject', foundObject);
	}, [foundObject]);

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
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
							}}
						>
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
							<SearchItem {...{ item: foundObject, onSelect, imageSize }} />
							<div
								style={{
									textAlign: 'center',
									color: '#666',
									paddingTop: '1em',
								}}
							>
								<span>
									{__('Press enter to insert post.', 'prc-block-library')}
								</span>
							</div>
						</div>
					)}

					{hasSearchRecords && !searchStringIsUrl && (
						<SearchRecords {...{ searchRecords, onSelect, imageSize }} />
					)}
				</Fragment>
			)}
		</TabbableContainer>
	);
}
