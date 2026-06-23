/**
 * External Dependencies
 */
import {
	DndContext,
	KeyboardSensor,
	PointerSensor,
	closestCenter,
	useSensor,
	useSensors,
} from '@dnd-kit/core';
import {
	SortableContext,
	arrayMove,
	sortableKeyboardCoordinates,
	verticalListSortingStrategy,
} from '@dnd-kit/sortable';

/**
 * WordPress Dependencies
 */
import { store as blockEditorStore } from '@wordpress/block-editor';
import { Notice, PanelBody } from '@wordpress/components';
import { useDispatch, useSelect, select } from '@wordpress/data';
import { __ } from '@wordpress/i18n';
import { useMemo } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import SortableOrderItem from './sortable-order-item';
import { calculateDividers } from './utils';

function getPositionKey(deviceType) {
	return deviceType === 'tablet' ? 'tabletPosition' : 'mobilePosition';
}

function getSpanForDevice(gridLayout, deviceType) {
	if (deviceType === 'tablet') {
		return gridLayout?.tabletSpan ?? 4;
	}
	return gridLayout?.mobileSpan ?? 4;
}

export default function ColumnOrderPanel({
	parentClientId,
	activeColumnClientId,
}) {
	const { siblingColumns, deviceType } = useSelect(
		(selectStore) => {
			const type = selectStore('core/editor').getDeviceType();
			const device = type ? type.toLowerCase() : 'desktop';

			if (!parentClientId) {
				return {
					deviceType: device,
					siblingColumns: [],
				};
			}

			const blocks =
				selectStore(blockEditorStore).getBlocks(parentClientId) || [];

			return {
				deviceType: device,
				siblingColumns: blocks.filter(
					(block) => block.name === 'prc-block/grid-column'
				),
			};
		},
		[parentClientId]
	);

	const { updateBlockAttributes, flashBlock } = useDispatch(blockEditorStore);

	const sensors = useSensors(
		useSensor(PointerSensor),
		useSensor(KeyboardSensor, {
			coordinateGetter: sortableKeyboardCoordinates,
		})
	);

	const orderableColumns = useMemo(() => {
		if (!siblingColumns.length) {
			return [];
		}

		const positionKey = getPositionKey(deviceType);

		return siblingColumns
			.map((column, domIndex) => {
				const gridLayout = column?.attributes?.gridLayout || {};
				const domPosition = domIndex + 1;
				return {
					clientId: column.clientId,
					gridLayout,
					domPosition,
					visualPosition: gridLayout[positionKey] || domPosition,
					span: getSpanForDevice(gridLayout, deviceType),
				};
			})
			.sort((a, b) => {
				if (a.visualPosition !== b.visualPosition) {
					return a.visualPosition - b.visualPosition;
				}
				return a.domPosition - b.domPosition;
			});
	}, [siblingColumns, deviceType]);

	const onHoverColumn = (clientId) => {
		if (clientId) {
			flashBlock(clientId, 250);
		}
	};

	const handleDragEnd = ({ active, over }) => {
		if (!over || active.id === over.id) {
			return;
		}

		const oldIndex = orderableColumns.findIndex(
			(item) => item.clientId === active.id
		);
		const newIndex = orderableColumns.findIndex(
			(item) => item.clientId === over.id
		);

		if (oldIndex < 0 || newIndex < 0) {
			return;
		}

		const reordered = arrayMove(orderableColumns, oldIndex, newIndex);
		const positionKey = getPositionKey(deviceType);

		reordered.forEach((column, index) => {
			const nextPosition = index + 1;
			const positionValue =
				nextPosition === column.domPosition ? null : nextPosition;

			updateBlockAttributes(column.clientId, {
				gridLayout: {
					...column.gridLayout,
					[positionKey]: positionValue,
				},
			});
		});

		setTimeout(() => {
			const refreshedColumns = (
				select(blockEditorStore).getBlocks(parentClientId) || []
			).filter((block) => block.name === 'prc-block/grid-column');
			calculateDividers(refreshedColumns, updateBlockAttributes);
		}, 50);
	};

	return (
		<PanelBody
			title={__('Column Order', 'prc-block-library')}
			initialOpen={false}
		>
			<p className="grid-column-order-help">
				{__(
					'Drag columns to reorder how they appear at this breakpoint.',
					'prc-block-library'
				)}
			</p>
			{deviceType === 'desktop' && (
				<Notice status="info" isDismissible={false}>
					{__(
						'Desktop order follows canvas position. Switch to tablet or mobile preview to set responsive order.',
						'prc-block-library'
					)}
				</Notice>
			)}
			{deviceType !== 'desktop' && (
				<DndContext
					sensors={sensors}
					collisionDetection={closestCenter}
					onDragEnd={handleDragEnd}
				>
					<SortableContext
						items={orderableColumns.map(
							(column) => column.clientId
						)}
						strategy={verticalListSortingStrategy}
					>
						<div className="column-order-panel__list">
							{orderableColumns.map((column) => (
								<SortableOrderItem
									key={column.clientId}
									id={column.clientId}
									clientId={column.clientId}
									label={__(
										`Column ${column.gridLayout?.index || column.domPosition}`,
										'prc-block-library'
									)}
									spanLabel={__(
										`Span ${column.span}`,
										'prc-block-library'
									)}
									isActive={
										column.clientId === activeColumnClientId
									}
									onHover={onHoverColumn}
								/>
							))}
						</div>
					</SortableContext>
				</DndContext>
			)}
		</PanelBody>
	);
}
