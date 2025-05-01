/**
 * External Dependencies
 */
import { Button } from '@wordpress/components';
import type { MouseEvent } from 'react';

/**
 * Internal Dependencies
 */
import type { SectionName } from '../block-attributes';
import type { StoreOptions } from '../store';

interface TableRowSelectButtonProps {
	sectionName: SectionName;
	onSelectSectionCells: (sectionName: SectionName) => void;
	options: StoreOptions;
}

const TableRowSelectButton = ({
	sectionName,
	onSelectSectionCells,
	options,
}: TableRowSelectButtonProps) => (
	<Button
		className="ftb-table-cell-label"
		tabIndex={options.focus_control_button ? 0 : -1}
		variant="primary"
		onClick={(event: MouseEvent) => {
			onSelectSectionCells(sectionName);
			event.stopPropagation();
		}}
	>
		{`t${sectionName}`}
	</Button>
);

export default TableRowSelectButton;
