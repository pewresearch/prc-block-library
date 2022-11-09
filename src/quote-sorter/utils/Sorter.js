/**
 * External Dependencies
 */
import { List, arrayMove } from 'react-movable';
/**
 * Wordpress Dependencies
 */
import { useState } from '@wordpress/element';
import { Icon } from '@wordpress/components';

function Sorter({ options, setAttributes }) {
	const [items, setItems] = useState(options);
	return (
		<List
			values={items}
			onChange={({ oldIndex, newIndex }) => {
				const newItems = arrayMove(items, oldIndex, newIndex);
				setItems(newItems);
				setAttributes({
					sortedTypologies: newItems,
				});
			}}
			renderList={({ children, props }) => <ul {...props}>{children}</ul>}
			renderItem={({ value, props, index, isDragged, isSelected }) => (
				<li
					{...props}
					style={{
						...props.style,
						listStyleType: 'none',
						cursor: isDragged ? 'grabbing' : 'grab',
						color: value.disabled ? '#888' : '#333',
						textDecoration: value.disabled ? 'line-through' : 'none',
						backgroundColor: isDragged || isSelected ? '#EEE' : '#FFF',
						paddingTop: '5px',
						paddingBottom: '5px',
						borderBottom: '1px solid #CCC',
					}}
				>
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							justifyContent: 'space-between',
						}}
					>
						<input
							value={value.label}
							type="text"
							disabled={value.disabled}
							onChange={(e) => {
								items[index].label = e.target.value;
								items[index].name = e.target.value;
								const newItems = arrayMove(items, index, index);
								setItems(newItems);
								setAttributes({
									sortedTypologies: newItems,
								});
							}}
						/>
						<button
							type="button"
							onClick={({ oldIndex, newIndex }) => {
								items[index].disabled = !items[index].disabled;
								const newItems = arrayMove(items, oldIndex, newIndex);
								setItems(newItems);
								setAttributes({
									sortedTypologies: newItems,
								});
							}}
							style={{
								border: 'none',
								margin: 0,
								padding: 0,
								width: 'auto',
								overflow: 'visible',
								cursor: 'pointer',
								background: 'transparent',
							}}
						>
							{!value.disabled ? (
								<Icon icon="visibility" />
							) : (
								<Icon icon="hidden" />
							)}
						</button>
					</div>
				</li>
			)}
		/>
	);
}

export default Sorter;
