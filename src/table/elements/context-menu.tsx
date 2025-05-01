/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useEffect } from '@wordpress/element';
import { Button, Popover } from '@wordpress/components';

/**
 * Internal Dependencies
 */
import type { VCell } from '../utils/table-state';

export type ContextMenuProps = {
	isOpen: boolean;
	anchorElement: HTMLElement | null;
	cell: VCell | null;
	onClose: () => void;
	copyToClipboard: (text: string) => void;
	TableCellContextMenuSlot: React.ComponentType<any>;
};

export default function ContextMenu({
	isOpen,
	anchorElement,
	cell,
	onClose,
	copyToClipboard,
	TableCellContextMenuSlot,
}: ContextMenuProps) {
	useEffect(() => {
		if (!isOpen) return;
		const handleClickOutside = (event: MouseEvent) => {
			const target = event.target as Node;
			const menu = document.querySelector('.ftb-table-cell-context-menu');
			const isClickInside = menu?.contains(target);
			if (!isClickInside) {
				onClose();
			}
		};
		const handleEscape = (event: KeyboardEvent) => {
			if (event.key === 'Escape') {
				onClose();
			}
		};
		document.addEventListener('click', handleClickOutside, true);
		document.addEventListener('contextmenu', handleClickOutside, true);
		document.addEventListener('keydown', handleEscape);
		return () => {
			document.removeEventListener('click', handleClickOutside, true);
			document.removeEventListener(
				'contextmenu',
				handleClickOutside,
				true
			);
			document.removeEventListener('keydown', handleEscape);
		};
	}, [isOpen, onClose]);

	if (!isOpen) return null;

	return (
		<Popover
			anchor={anchorElement}
			position="bottom right"
			onClose={onClose}
			expandOnMobile={true}
			focusOnMount="firstElement"
			className="ftb-table-cell-context-menu"
		>
			{/* eslint-disable-next-line jsx-a11y/no-static-element-interactions */}
			<div
				className="ftb-table-cell-context-menu__content"
				onClick={(event) => event.stopPropagation()}
				onKeyDown={(event) => {
					if (event.key === 'Enter' || event.key === ' ') {
						event.preventDefault();
						onClose();
					}
				}}
			>
				<Button
					variant="tertiary"
					onClick={() => {
						if (cell?.content) {
							copyToClipboard(cell.content);
						}
						onClose();
					}}
					className="ftb-table-cell-context-menu__button"
				>
					{__('Copy Cell Content', 'flexible-table-block')}
				</Button>
				<TableCellContextMenuSlot fillProps={{ cell }} />
			</div>
		</Popover>
	);
}
