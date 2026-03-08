/**
 * External Dependencies
 */
import classnames from 'classnames';
import { CSS } from '@dnd-kit/utilities';
import { useSortable } from '@dnd-kit/sortable';

/**
 * WordPress Dependencies
 */
import { Icon } from '@wordpress/icons';
import { dragHandle } from '@wordpress/icons';

export default function SortableOrderItem({
	id,
	clientId,
	label,
	spanLabel,
	isActive = false,
	onHover,
}) {
	const {
		attributes,
		listeners,
		setNodeRef,
		transform,
		transition,
		isDragging,
	} = useSortable({ id });

	const style = {
		transform: CSS.Transform.toString(transform),
		transition,
	};

	return (
		<div
			ref={setNodeRef}
			style={style}
			className={classnames('column-order-item', {
				'column-order-item--active': isActive,
				'column-order-item--dragging': isDragging,
			})}
			onMouseEnter={() => onHover?.(clientId)}
			onFocus={() => onHover?.(clientId)}
		>
			<div
				className="column-order-item__handle"
				{...attributes}
				{...listeners}
				aria-label="Drag to reorder column"
			>
				<Icon icon={dragHandle} />
			</div>
			<div className="column-order-item__meta">
				<div className="column-order-item__label">{label}</div>
				<div className="column-order-item__span">{spanLabel}</div>
			</div>
		</div>
	);
}
