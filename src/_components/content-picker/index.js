/**
 * External Dependencies
 */
import { v4 as uuidv4 } from 'uuid';
import arrayMove from 'array-move';
import styled from '@emotion/styled';

/**
 * WordPress Dependencies
 */
import { select } from '@wordpress/data';
import { useState, useEffect, useMemo } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

/**
 * Internal Dependencies
 */
import { ContentSearch } from '../content-search';
import SortableList from './sortable-list';

const NAMESPACE = 'prc-content-picker';

/**
 * Unfortunately, we had to use !important because on PickedItem we couldn't @emotion/styled css
 * as it was breaking sortability from react-sortable-hoc
 */
const StyleWrapper = styled('div')`
	& .block-editor-link-control__search-item {
		border: none !important;
		cursor: default;

		&:hover {
			background: transparent;
		}
	}
`;

/**
 * Content Picker
 */
const ContentPicker = ({
	label,
	placeholder,
	mode = 'post',
	contentTypes = ['post', 'page'],
	onPickChange = (ids) => {
        console.log('Content picker list change', ids); // eslint-disable-line no-console
    },
	maxContentItems = 1,
	isOrderable = false,
	singlePickedLabel = __('You have selected the following item:', 'prc-block-components'),
	multiPickedLabel = __('You have selected the following items:', 'prc-block-components'),
	value = [],
	uniqueContentItems = true,
	excludeCurrentPost = true,
	perPage = 50,
	PickedItemChild = false,
	searchStyle = 'search',
}) => {
	const [content, setContent] = useState(value);

	const currentPostId = select('core/editor')?.getCurrentPostId();

	useEffect(()=> {
		console.log("Init content state", value);
	}, []);

	/**
	 * This legacy code allows you to pass in only IDs to content like [ 1, 4, 5 ].
	 * This really shouldn't be done as of version 1.5.0.
	 */
	// if (content.length && typeof content[0] !== 'object') {
	// 	for (let i = 0; i < content.length; i++) {
	// 		content[i] = {
	// 			id: content[i],
	// 			type: contentTypes[0],
	// 		};
	// 	}
	// }

	// Run onPickChange callback when content changes.
	useEffect(() => {
		console.log("useEffect onPickChange->", content); // eslint-disable-line no-console
		onPickChange(content);
	}, [content]);

	const handleSelect = (item) => {
		console.log("handleSelect->", item); // eslint-disable-line no-console
		setContent((previousContent) => [
			{
				id: item.id,
				uuid: uuidv4(),
				type: 'subtype' in item ? item.subtype : item.type,
				url: item.url,
			},
			...previousContent,
		]);
	};

	const onDeleteItem = (deletedItem) => {
		setContent((previousContent) => {
			return previousContent.filter(({ id, uuid }) => {
				if (deletedItem.uuid) {
					return uuid !== deletedItem.uuid;
				} else {
					return id !== deletedItem.id;
				}
			});
		});
	};

	const excludeItems = useMemo(() => {
		const items = uniqueContentItems ? [...content] : [];

		if (excludeCurrentPost && currentPostId) {
			items.push({
				id: currentPostId
			});
		}

		return items;
	}, [content, currentPostId, excludeCurrentPost, uniqueContentItems]);

	return (
		<div className={`${NAMESPACE}`}>
			{(!content.length || (content.length && content.length < maxContentItems)) && (
				<ContentSearch
					placeholder={placeholder}
					label={label}
					excludeItems={excludeItems}
					onSelectItem={handleSelect}
					contentTypes={contentTypes}
					mode={mode}
					perPage={perPage}
					style={searchStyle}
				/>
			)}
			{Boolean(content?.length) > 0 && (
				<StyleWrapper>
					<span
						style={{
							marginTop: '15px',
							marginBottom: '2px',
							display: 'block',
						}}
					>
						{content.length > 1 ? multiPickedLabel : singlePickedLabel}
					</span>

					<SortableList
						items={content}
						useDragHandle
						handleItemDelete={onDeleteItem}
						isOrderable={isOrderable}
						mode={mode}
						onSortEnd={({ oldIndex, newIndex }) => {
							const newContent = [...arrayMove(content, oldIndex, newIndex)];
							console.log("newContent?", newContent);
							setContent(newContent);
						}}
						ChildComponent={PickedItemChild}
					/>
				</StyleWrapper>
			)}
		</div>
	);
};

export { ContentPicker };