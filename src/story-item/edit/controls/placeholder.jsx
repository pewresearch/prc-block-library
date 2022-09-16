/**
 * External Dependencies
 */
import { useDebounce } from '@prc-app/shared';

/**
 * WordPress Dependencies
 */
import { useState, useMemo, useEffect, Fragment } from '@wordpress/element';
import {
	SearchControl,
	TextControl,
	Spinner,
	NavigableMenu,
	Placeholder as WPComPlaceholder,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useEntityRecords } from '@wordpress/core-data';
import apiFetch from '@wordpress/api-fetch';

export default function Placeholder({ attributes, setAttributes, blockProps }) {
	const { metaTaxonomy } = attributes;
	const postType = 'stub';

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

	const handleItemSelection = (item) => {
		console.log('handleItemSelection', item);
		// use get entity records to get the given metaTaxonomy
	};

	useEffect(() => {
		console.log('searchRecords isResolving', isResolving, searchRecords);
	}, [searchRecords, isResolving]);

	return (
		<WPComPlaceholder
			icon="admin-post"
			label={__('Story Item', 'prc-block-library')}
			{...blockProps}
		>
			<div
				style={{
					display: 'flex',
				}}
			>
				<div
					style={{
						flexGrow: '1',
					}}
				>
					<SearchControl
						label="Seach for a post"
						value={searchInput}
						onChange={(keyword) => setSearchInput(keyword)}
						placeholder="Search for a post..."
						autoComplete="off"
					/>
				</div>

				{isResolving && (
					<div
						style={{
							position: 'absolute',
							right: '8px',
							marginTop: '27px',
						}}
					>
						<Spinner />
					</div>
				)}
			</div>

			{hasSearchString ? (
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
						<li>{__('Nothing found.', 'prc-block-components')}</li>
					)}

					{!isResolving && !hasSearchRecords && searchStringIsUrl && (
						<li>{__('Press enter to change url.', 'prc-block-components')}</li>
					)}

					{!isResolving &&
						hasSearchRecords &&
						searchRecords.map((item, index) => {
							console.log('Item: ', item);
							return (
								<li key={item.id} onClick={() => handleItemSelection(item)}>
									{item.title.rendered}
								</li>
							);
						})}
				</ul>
			) : null}
		</WPComPlaceholder>
	);
}
