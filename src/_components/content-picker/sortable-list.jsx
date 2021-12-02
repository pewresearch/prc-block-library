/**
 * External Dependencies
 */
import { SortableContainer, SortableElement } from 'react-sortable-hoc';

/**
 * Internal Dependencies
 */
import PickedItem from './picked-item';

const SortableList = SortableContainer(({ items, isOrderable, handleItemDelete, mode, ChildComponent = false }) => {
	const ItemComponent = false !== ChildComponent ? (isOrderable ? SortableElement(ChildComponent) : ChildComponent) : isOrderable ? SortableElement(PickedItem) : PickedItem;
	return (
		<div
			style={{
				fontFamily:
					'-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, Oxygen-Sans, Ubuntu, Cantarell, "Helvetica Neue", sans-serif',
			}}
		>
			{items.map((item, index) => {
				const itemKey = item.uuid ? item.uuid : item.id;
				return <ItemComponent
					isOrderable={isOrderable && items.length > 1 ? isOrderable : false}
					key={`item-${itemKey}`}
					index={index}
					handleItemDelete={handleItemDelete}
					sortIndex={index}
					item={item}
					mode={mode}
					totalItems={items.length}
				/>
			})}
		</div>
	);
});

export default SortableList;