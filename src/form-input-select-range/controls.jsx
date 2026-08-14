/* eslint-disable no-restricted-imports */
// /**
//  * External Dependencies
//  */
import { LimitControls } from '@prc/controls';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
	PanelBody,
	TextControl,
	ToggleControl,
	SelectControl,
	Notice,
} from '@wordpress/components';
import { InspectorControls,  store as blockEditorStore } from '@wordpress/block-editor';
import { generateRangeOptions } from './utils';
import { useSelect } from '@wordpress/data';



export default function Controls({ attributes, setAttributes, clientId }) {
	const { type, rangeStart, rangeEnd, rangeStep, currentYear, enableClearIcons } = attributes;
	const baseNumberStart = 0,
		baseNumberEnd = 100,
		baseYearStart = 1985,
		baseYearEnd = new Date().getFullYear();
	
	const limitList = ['prc-ep/facet-template'];
	const checkParents = {blockEditorStore: blockEditorStore, clientId: clientId, parentList: limitList};
	return (
	<LimitControls checkParents={checkParents}>
		<InspectorControls>
			<PanelBody title={__('Select Range Field Settings')}>
				{+rangeStart > +rangeEnd && (
					<Notice status="error" isDismissible={false}>
						Invalid Range
					</Notice>
				)}
				<ToggleControl
					label="Clear Icons Enabled"
					checked={enableClearIcons}
					help="If toggled on, a clear icon will be displayed in the input field."
					onChange={(val) => {
						setAttributes({ enableClearIcons: val });
					}}
				/>
				<SelectControl
					label="Select range type"
					value={type}
					options={[
						{ label: 'Years', value: 'years' },
						{ label: 'Numbers', value: 'numbers' },
					]}
					onChange={(newType) => {
						if (newType === 'years') {
							const updatedOptions = generateRangeOptions(
								baseYearStart,
								baseYearEnd,
								rangeStep
							);
							setAttributes({
								type: newType,
								rangeStart: baseYearStart,
								rangeEnd: baseYearEnd,
								currentYear: true,
								options: updatedOptions,
							});
						} else {
							const updatedOptions = generateRangeOptions(
								baseNumberStart,
								baseNumberEnd,
								rangeStep
							);
							setAttributes({
								type: newType,
								rangeStart: baseNumberStart,
								rangeEnd: baseNumberEnd,
								options: updatedOptions,
							});
						}
					}}
				/>
				<TextControl
					label="Minimum Value"
					value={rangeStart}
					type="number"
					onChange={(newRangeStart) => {
						const updatedOptions = generateRangeOptions(
							+newRangeStart,
							rangeEnd,
							rangeStep
						);
						setAttributes({
							rangeStart: +newRangeStart,
							options: updatedOptions,
						});
					}}
				/>
				{!(type === 'years' && currentYear) && (
					<TextControl
						label="Maximum Value"
						value={rangeEnd}
						type="number"
						onChange={(newRangeEnd) => {
							const updatedOptions = generateRangeOptions(
								rangeStart,
								+newRangeEnd,
								rangeStep
							);
							setAttributes({
								rangeEnd: +newRangeEnd,
								options: updatedOptions,
							});
						}}
					/>
				)}
				{type === 'years' && (
					<ToggleControl
						label="Current Year"
						checked={currentYear}
						onChange={(isCurrentYear) => {
							const updatedOptions = generateRangeOptions(
								rangeStart,
								baseYearEnd,
								rangeStep
							);
							setAttributes({
								currentYear: isCurrentYear,
								rangeEnd: baseYearEnd,
								options: updatedOptions,
							});
						}}
					/>
				)}
				{/* <TextControl
					label="Step Value"
					value={rangeStep}
					type="number"
					onChange={(newRangeStep) => {
						setAttributes({ rangeStep: newRangeStep });
					}}
				/> */}
			</PanelBody>
		</InspectorControls>
	</LimitControls>
	);
}
