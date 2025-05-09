/**
 * External dependencies
 */
import type { Properties } from 'csstype';
import type { Dispatch, SetStateAction } from 'react';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls, RichText } from '@wordpress/block-editor';
import { createBlock, type BlockInstance } from '@wordpress/blocks';
import { ToolbarButton } from '@wordpress/components';
import { title as titleIcon } from '@wordpress/icons';
import { useState, useEffect, useCallback } from '@wordpress/element';
import { usePrevious } from '@wordpress/compose';

/**
 * Internal dependencies
 */
import type { BlockAttributes } from '../block-attributes';
import type { VSelectedCells, VSelectedLine } from '../utils/table-state';
import { GenerateTableTitleButton } from '../utils/ai-generators';

type Props = {
	attributes: BlockAttributes;
	setAttributes: (attrs: Partial<BlockAttributes>) => void;
	setSelectedLine: Dispatch<SetStateAction<VSelectedLine>>;
	setSelectedCells: Dispatch<SetStateAction<VSelectedCells>>;
	isSelected?: boolean;
};

/* eslint-disable max-lines-per-function */
export default function TableTitle({
	attributes,
	setAttributes,
	setSelectedLine,
	setSelectedCells,
	tableTitleStylesObj,
	isSelected,
}: Props) {
	const { tableTitle = '' } = attributes;
	const prevTableTitle = usePrevious(tableTitle);
	const isTableTitleEmpty = RichText.isEmpty(prevTableTitle);
	const isPrevTableTitleEmpty = RichText.isEmpty(prevTableTitle || '');
	const [showTableTitle, setShowTableTitle] = useState(!isTableTitleEmpty);
	const [isGeneratingTableTitle, setIsGeneratingTableTitle] = useState(false);

	const onChange = (value: string | undefined) =>
		setAttributes({ tableTitle: value });

	useEffect(() => {
		if (!isTableTitleEmpty && isPrevTableTitleEmpty) {
			setShowTableTitle(true);
		}
	}, [isTableTitleEmpty, isPrevTableTitleEmpty]);

	useEffect(() => {
		if (!isSelected && isTableTitleEmpty) {
			setShowTableTitle(false);
		}
	}, [isSelected, isTableTitleEmpty]);

	const ref = useCallback(
		(node: any) => {
			if (node && isTableTitleEmpty) {
				node?.focus();
			}
		},
		[isTableTitleEmpty]
	);

	return (
		<>
			{isSelected && (
				<BlockControls group="block">
					<ToolbarButton
						onClick={() => {
							setShowTableTitle(!showTableTitle);
							if (showTableTitle && tableTitle) {
								onChange(undefined);
							}
						}}
						icon={titleIcon}
						isActive={showTableTitle}
						label={
							showTableTitle
								? __('Remove title', 'flexible-table-block')
								: __('Add title', 'flexible-table-block')
						}
					/>
				</BlockControls>
			)}
			{showTableTitle &&
				(!RichText.isEmpty(tableTitle) || isSelected) && (
					<div
						style={{
							display: 'flex',
							alignItems: 'center',
							gap: '10px',
							flexDirection: 'row',
						}}
						className="prc-block-table-title"
					>
						<RichText
							aria-label={__(
								'Table title text',
								'prc-block-library'
							)}
							placeholder={__(
								'Table title…',
								'prc-block-library'
							)}
							ref={ref}
							style={tableTitleStylesObj}
							tagName="h4"
							value={tableTitle}
							onChange={onChange}
							onFocus={() => {
								setSelectedLine(undefined);
								setSelectedCells(undefined);
							}}
						/>
						{isSelected && (
							<GenerateTableTitleButton
								attributes={attributes}
								setAttributes={setAttributes}
							/>
						)}
					</div>
				)}
		</>
	);
}
