/**
 * External Dependencies
 */
import styled from '@emotion/styled';
import { sortableHandle } from 'react-sortable-hoc';

/**
 * WordPress Dependencies
 */
import { safeDecodeURI, filterURLForDisplay } from '@wordpress/url';
import { decodeEntities } from '@wordpress/html-entities';
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import { useEffect } from '@wordpress/element';

/**
 * SVG Drag Handle
 */
const DragHandle = sortableHandle(() => (
	<svg
		style={{ marginRight: '5px', cursor: 'grab', flexShrink: 0 }}
		width="18"
		height="18"
		xmlns="http://www.w3.org/2000/svg"
		viewBox="0 0 18 18"
		role="img"
		aria-hidden="true"
		focusable="false"
	>
		<path d="M5 4h2V2H5v2zm6-2v2h2V2h-2zm-6 8h2V8H5v2zm6 0h2V8h-2v2zm-6 6h2v-2H5v2zm6 0h2v-2h-2v2z" />
	</svg>
));

const Wrapper = styled('div')`
	button {
		display: block;
		padding: 2px 8px 6px 8px;
		margin-left: auto;
		font-size: 2em;
		cursor: pointer;
		border: none;
		background-color: transparent;

		&:hover {
			background-color: #ccc;
		}
	}
`;


/**
 * PickedItem
 *
 * @param {Object} props react props
 * @return {*} React JSX
 */
const PickedItem = ({ item, isOrderable = false, handleItemDelete, mode }) => {
	const type = mode === 'post' ? 'postType' : 'taxonomy';

	// This will return undefined while the item data is being fetched. If the item comes back
	// empty, it will return null, which is handled in the effect below.
	const preparedItem = useSelect(
		(select) => {
			const { getEntityRecord, hasFinishedResolution } = select('core');

			const getEntityRecordParameters = [type, item.type, item.id];
			const result = getEntityRecord(...getEntityRecordParameters);

			if (result) {
				console.log("Has Item", result);
				const newItem = {
					title: mode === 'post' ? result.title.rendered : result.name,
					url: result.link,
					id: result.id,
				};

				if (item.uuid) {
					newItem.uuid = item.uuid;
				}

				return newItem;
			}

			if (hasFinishedResolution('getEntityRecord', getEntityRecordParameters)) {
				return null;
			}

			return undefined;
		},
		[item.id, type],
	);

	// If `getEntityRecord` did not return an item, pass it to the delete callback.
	useEffect(() => {
		if (preparedItem === null) {
			handleItemDelete(item);
		}
	}, [item, handleItemDelete, preparedItem]);

	return preparedItem ? (
		<Wrapper
			style={{
				border: '2px dashed #ddd',
				paddingTop: '10px',
				paddingBottom: '10px',
				paddingLeft: isOrderable ? '3px' : '8px',
			}}
			className="block-editor-link-control__search-item is-entity"
		>
			{isOrderable ? <DragHandle /> : ''}
			<span className="block-editor-link-control__search-item-header">
				<span className="block-editor-link-control__search-item-title">
					{decodeEntities(preparedItem.title)}
				</span>
				<span aria-hidden className="block-editor-link-control__search-item-info">
					{filterURLForDisplay(safeDecodeURI(preparedItem.url)) || ''}
				</span>
			</span>

			<button
				type="button"
				onClick={() => {
					handleItemDelete(preparedItem);
				}}
				aria-label={__('Delete item', '10up-block-components')}
			>
				&times;
			</button>
		</Wrapper>
	) : (
		<div />
	);
};

export default PickedItem;