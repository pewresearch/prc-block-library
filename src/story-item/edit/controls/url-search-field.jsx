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
	CardMedia,
	SearchControl,
	Spinner,
	TabbableContainer,
	KeyboardShortcuts,
} from '@wordpress/components';
import { date as formatDate } from '@wordpress/date';
import { useEntityRecords, useEntityProp } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';

/**
 * Internal Dependencies
 */
import { getAttributesFromPost } from '../../helpers';

function SearchRecords({ searchRecords, onSelect, imageSize = 'A3' }) {
	return searchRecords.map((item) => (
		<SearchItem {...{ item, onSelect, imageSize }} />
	));
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
	// if item has post_title then use that otherwise use title.rendered
	const title = item.post_title ? item.post_title : item.title.rendered;
	// if item has post_date then use that otherwise use date
	const date = item.post_date ? item.post_date : item.date;

	const { label } = item;
	const canonicalUrl = item.canonical_url;

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

export default function URLSearchField({
	attributes,
	setAttributes,
	onSelection,
}) {
	const { imageSize, url } = attributes;

	const [siteId] = useEntityProp('root', 'site', 'siteId');
	const postType = 1 === siteId ? 'stub' : 'post';

	const [isLoading, toggleLoading] = useState(!!url);

	const [searchInput, setSearchInput] = useState(url);
	const searchString = useDebounce(searchInput, 500);
	const searchStringIsUrl = useMemo(() => {
		if (
			url.match(/^(http|https):\/\//) ||
			searchString.match(/^(http|https):\/\//)
		) {
			return true;
		}
		return false;
	}, [searchString, url]);
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
		!isLoading && !searchStringIsUrl && searchRecords
			? 0 < searchRecords.length
			: false;
	const hasFoundObject =
		!isLoading && searchStringIsUrl && null !== foundObject;
	const hasNothingFound = !isLoading && !hasSearchRecords && !hasFoundObject;

	const getPostByUrl = (newUrl) =>
		new Promise((resolve, reject) => {
			apiFetch({
				path: '/prc-api/v2/stub/get-post-by-url',
				method: 'POST',
				data: { url: newUrl },
			})
				.then((post) => {
					if ('object' !== typeof post) {
						reject(new Error('post is not an object'));
					}
					resolve(post);
				})
				.catch((err) => reject(err));
		});

	const onSelect = (newPost) => {
		const postAttrs = getAttributesFromPost({
			post: newPost,
			imageSize,
			isRefresh: false,
		});

		setAttributes(postAttrs);

		if ('function' === typeof onSelection) {
			onSelection();
		}
	};

	useEffect(() => {
		if (searchStringIsUrl) {
			toggleLoading(true);
			getPostByUrl(searchString)
				.then((post) => {
					setFoundObject(post);
					toggleLoading(false);
				})
				.catch((err) => {
					console.error('getPostByUrl error', err);
					setFoundObject(null);
					toggleLoading(false);
				});
		}
	}, [searchString, searchStringIsUrl]);

	useEffect(() => {
		toggleLoading(isResolving);
	}, [isResolving]);

	return (
		<TabbableContainer
			onNavigate={(index, elm) => console.log('onNavigate:', elm)}
		>
			<KeyboardShortcuts
				shortcuts={{
					enter: () => {
						if (searchStringIsUrl) {
							setAttributes({
								url: searchString,
							});
							if ('function' === typeof onSelection) {
								onSelection();
							}
						}
					},
				}}
			>
				<SearchControl
					tabIndex="0"
					value={searchInput}
					onChange={(keyword) => setSearchInput(keyword)}
					placeholder="Climate Change..."
					autoComplete="off"
				/>
			</KeyboardShortcuts>
			{hasSearchString && (
				<Fragment>
					{isLoading && (
						<div
							style={{
								display: 'flex',
								justifyContent: 'center',
								alignItems: 'center',
								color: '#666',
							}}
						>
							<span>Loading... </span>
							<Spinner />
						</div>
					)}

					{hasNothingFound && (
						<div
							style={{
								textAlign: 'center',
								color: '#666',
								paddingTop: '1em',
							}}
						>
							<span>{__('Nothing found.', 'prc-block-library')}</span>
							{searchStringIsUrl && (
								<div>
									<span>
										{__('Press enter to change the URL.', 'prc-block-library')}
									</span>
								</div>
							)}
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
