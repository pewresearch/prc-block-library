/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useMemo, useState, useEffect } from '@wordpress/element';
import {
	useBlockProps,
	useInnerBlocksProps,
	InspectorControls,
	BlockContextProvider,
} from '@wordpress/block-editor';
import {
	PanelBody,
	PanelRow,
	SelectControl,
	Button,
	Modal,
} from '@wordpress/components';
import { useDispatch } from '@wordpress/data';
import { createBlock } from '@wordpress/blocks';

/**
 * Internal Dependencies
 */

export default function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
}) {
	const { dataSource, primaryKey, pivotedData, selectedColumns } = attributes;
	const remoteDataContext = context?.['remote-data-blocks/remoteData'] || {};
	
	// State for column sum binding modal
	const [isModalOpen, setIsModalOpen] = useState(false);
	const [selectedColumn, setSelectedColumn] = useState('');
	
	// Block editor dispatch for inserting blocks
	const { insertBlock } = useDispatch('core/block-editor');

	const blockProps = useBlockProps({});
	const innerBlocksProps = useInnerBlocksProps({
		className: 'prc-block-remote-pivot-table__template',
	}, {});

	const columns = useMemo(() => {
		const { results } = remoteDataContext;
		if (!results) {
			return [];
		}
		const firstResult = results[0].result;
		if (!firstResult) {
			return [];
		}
		return Object.keys(firstResult);
	}, [remoteDataContext]);

	const rows = useMemo(() => {
		const { results } = remoteDataContext;
		if (!results) {
			return [];
		}
		return results.map(result => result.result);
	}, [remoteDataContext]);

	/**
	 * Handle inserting a block with column sum binding
	 */
	const handleInsertColumnSumBlock = () => {
		if (!selectedColumn) {
			return;
		}

		// Create a new paragraph block with the binding metadata
		const newBlock = createBlock('core/paragraph', {
			content: __('Column Sum', 'remote-pivot-table'),
			metadata: {
				bindings: {
					content: {
						source: 'prc-block/remote-pivot-table-sum',
						args: {
							column: selectedColumn,
						},
					},
				},
			},
		});

		// Insert the block after the current block
		insertBlock(newBlock, undefined, clientId);
		
		// Close modal and reset selection
		setIsModalOpen(false);
		setSelectedColumn('');
	};

	/**
	 /**
	  * This effect pivots the remote data according to the selected data source type.
	  * If the dataSource is 'row', it creates an object keyed by the primary key value,
	  * with each value containing only the selected columns for that row.
	  * If the dataSource is 'column', it creates an object keyed by each selected column,
	  * with each value being an object mapping primary key values to the corresponding column value.
	  * The resulting pivoted data is stored in the block's attributes for use by child blocks.
	  */
	useEffect(() => {
		const pivoted = {};
		if (dataSource === 'row') {
			rows.forEach(row => {
				const primaryKeyValue = row[primaryKey]?.value;
				if (!primaryKeyValue) {
					return;
				}
				pivoted[primaryKeyValue] = Object.fromEntries(
					Object.entries(row).filter(([key]) => key !== primaryKey && selectedColumns.includes(key))
				);
			});
			console.log('pivoted rows:', pivoted);
		} else if (dataSource === 'column') {
			columns.forEach(columnName => {
				if (!selectedColumns.includes(columnName)) {
					return;
				}
				pivoted[columnName] = {};
				// Go through each row, get the primary key value, and the columnName value and add it to the pivoted object.
				rows.forEach(row => {
					const primaryKeyValue = row[primaryKey]?.value;
					const columnValue = row[columnName];
					pivoted[columnName][primaryKeyValue] = columnValue;
				});
			});
			console.log('pivoted columns:', pivoted);
		}
		setAttributes({ pivotedData: pivoted });
	}, [dataSource, selectedColumns, primaryKey, rows, columns]);

	return (
		<div {...blockProps}>
			<InspectorControls>
				<PanelBody title={__('Remote Data: Pivot Table', 'remote-pivot-table')}>
					<div>
						<SelectControl
							label={__('Selected Columns', 'remote-pivot-table')}
							multiple={true}
							value={selectedColumns}
							onChange={(value) => setAttributes({ selectedColumns: value })}
							options={columns.map(column => ({
								value: column,
								label: column,
							}))}
						/>
						<SelectControl
							label={__('Data Source', 'remote-pivot-table')}
							value={dataSource}
							onChange={(value) => setAttributes({ dataSource: value })}
							options={[
								{
									value: 'column',
									label: __('Column', 'remote-pivot-table'),
								},
								{
									value: 'row',
									label: __('Row', 'remote-pivot-table'),
								},
							]}
						/>
						<SelectControl
							label={__('Primary Key', 'remote-pivot-table')}
							value={primaryKey}
							onChange={(value) => setAttributes({ primaryKey: value })}
							options={columns.map(column => ({
								value: column,
								label: column,
							}))}
						/>
					</div>
				</PanelBody>
				<PanelBody title={__('Column Sum Block Binding', 'remote-pivot-table')} initialOpen={false}>
					<PanelRow>
						<p style={{ margin: 0 }}>
							{__('Create a block that displays the sum of values for a selected column.', 'remote-pivot-table')}
						</p>
					</PanelRow>
					<PanelRow>
						<Button
							variant="secondary"
							onClick={() => setIsModalOpen(true)}
							disabled={columns.length === 0}
						>
							{__('Add Column Sum Block', 'remote-pivot-table')}
						</Button>
					</PanelRow>
				</PanelBody>
			</InspectorControls>
			{isModalOpen && (
				<Modal
					title={__('Select Column for Sum Block', 'remote-pivot-table')}
					onRequestClose={() => setIsModalOpen(false)}
					className="prc-block-remote-pivot-table-column-modal"
				>
					<div style={{ padding: '16px' }}>
						<SelectControl
							label={__('Column to Sum', 'remote-pivot-table')}
							value={selectedColumn}
							onChange={setSelectedColumn}
							options={[
								{ value: '', label: __('Select a column...', 'remote-pivot-table') },
								...columns.map(column => ({
									value: column,
									label: column,
								}))
							]}
						/>
						<div style={{ display: 'flex', gap: '8px', marginTop: '16px' }}>
							<Button
								variant="primary"
								onClick={handleInsertColumnSumBlock}
								disabled={!selectedColumn}
							>
								{__('Insert Block', 'remote-pivot-table')}
							</Button>
							<Button
								variant="secondary"
								onClick={() => setIsModalOpen(false)}
							>
								{__('Cancel', 'remote-pivot-table')}
							</Button>
						</div>
					</div>
				</Modal>
			)}
			<div {...innerBlocksProps} />
		</div>
	);
}
