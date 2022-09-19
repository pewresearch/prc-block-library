/**
 * External Dependencies
 */
import { useDebounce } from '@prc-app/shared';

/**
 * WordPress Dependencies
 */
import { useState, useMemo, useEffect } from '@wordpress/element';
import {
	Button,
	SearchControl,
	Spinner,
	NavigableMenu,
	Placeholder as WPComPlaceholder,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useBlockProps } from '@wordpress/block-editor';
import { useEntityRecords, useEntityProp } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';

export default function Placeholder({ attributes, setAttributes }) {
	const { metaTaxonomy, imageSize } = attributes;

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

	const [selectedItem, setSelectedItem] = useState(null);

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

	const hasSearchRecords = searchRecords ? 0 < searchRecords.length : false;

	const getPostByUrl = (url) => {
		if (undefined === url) {
			return new Error('url is undefined');
		}
		return new Promise((resolve, reject) => {
			apiFetch({
				path: '/prc-api/v2/utils/get-post-by-url',
				method: 'POST',
				data: { url },
			})
				.then((post) => {
					console.log('getPostByUrl', url, post);
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

	const handleItemSelection = (item) => {
		console.log('handleItemSelection', item);
		const attrs = {
			postId: item.id,
			title: item.title.rendered,
			excerpt: item.excerpt.rendered,
			date: item.date,
		};
		if (item.art) {
			const { art } = item;
			attrs.image = art[imageSize].url;
			attrs.isChartArt = art[imageSize].chartArt;
		}
		setAttributes({ ...attrs });
	};

	useEffect(() => {
		console.log('searchRecords isResolving', isResolving, searchRecords);
	}, [searchRecords, isResolving]);

	const blockProps = useBlockProps({
		className: 'wp-block-prc-block-story-item__placeholder',
	});

	return (
		<WPComPlaceholder
			icon="admin-post"
			label={__(' Story Item', 'prc-block-library')}
			isColumnLayout
			instructions={__(
				`Search for a ${postType} or paste url here`,
				'prc-block-library',
			)}
			{...blockProps}
		>
			<div
				style={{
					display: 'flex',
					width: '100%',
				}}
			>
				<div
					style={{
						flexGrow: '1',
					}}
				>
					<SearchControl
						value={searchInput}
						onChange={(keyword) => setSearchInput(keyword)}
						placeholder="Joe Biden climate change..."
						autoComplete="off"
					/>
				</div>

				{isResolving && (
					<div
						style={{
							position: 'absolute',
							right: '20px',
							marginTop: '12px',
							backgroundColor: '#f0f0f0', // Same color as the SearchControl background.
						}}
					>
						<Spinner />
					</div>
				)}
			</div>

			{hasSearchString && (
				<ul
					style={{
						marginTop: '0',
						marginBottom: '0',
						marginLeft: '0',
						paddingLeft: '0',
						listStyle: 'none',
					}}
				>
					{!isResolving && !hasSearchRecords && false === searchStringIsUrl && (
						<li>{__('Nothing found.', 'prc-block-library')}</li>
					)}

					{!isResolving && !hasSearchRecords && searchStringIsUrl && (
						<li>{__('Press enter to insert post.', 'prc-block-library')}</li>
					)}

					{!isResolving &&
						hasSearchRecords &&
						searchRecords.map((item, index) => {
							console.log('Item: ', item);
							return (
								<li
									key={item.id}
									onClick={() => handleItemSelection(item)}
									style={{
										cursor: 'pointer',
										padding: '0.2em 1em',
										display: 'block',
										backgroundColor:
											selectedItem === item.id ? '#eee' : 'transparent',
									}}
								>
									{item.title.rendered}
								</li>
							);
						})}
				</ul>
			)}
			<Button
				isLink
				onClick={() => {
					setAttributes({ postId: 0 });
				}}
				text={__('Skip')}
				style={{
					paddingLeft: '9px',
				}}
			/>
		</WPComPlaceholder>
	);
}
