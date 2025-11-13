/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import {
	InspectorControls,
	store as blockEditorStore,
} from '@wordpress/block-editor';
import { PanelBody, SelectControl, TextControl } from '@wordpress/components';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import { useFormInputBlockDetector } from './utils';

function ConditionalDisplayControls({
	attributes,
	setAttributes,
	formClientId,
}) {
	const formFields = useFormInputBlockDetector(formClientId);

	// Get current display logic settings from attributes or set defaults
	const {
		formDisplayMode = 'always',
		formDisplayCondition = {
			name: '',
			operator: 'equals', // equals, not_equals
			value: '',
		},
	} = attributes;

	const displayModeOptions = [
		{ label: 'Always Display', value: 'always' },
		{ label: 'Conditional Display', value: 'conditional' },
	];

	return (
		<>
			<InspectorControls>
				<PanelBody
					title="Form Conditional Display Logic"
					initialOpen={true}
				>
					<SelectControl
						__nextHasNoMarginBottom
						label="Display Mode"
						help="Choose when this block should be displayed."
						value={formDisplayMode}
						options={displayModeOptions}
						onChange={(value) =>
							setAttributes({
								formDisplayMode: value,
							})
						}
					/>

					{formDisplayMode === 'conditional' && (
						<>
							<SelectControl
								__nextHasNoMarginBottom
								label="Target Field"
								help="Select which form field to check."
								value={formDisplayCondition?.name}
								options={[
									{ label: 'Select a field...', value: '' },
									...formFields
										.filter((field) => field && field.name)
										.map((field) => ({
											label:
												field.label || 'Unnamed Field',
											value: field.name,
										})),
								]}
								onChange={(value) =>
									setAttributes({
										formDisplayCondition: {
											...formDisplayCondition,
											name: value,
											// Reset value when field changes
											value: '',
										},
									})
								}
							/>

							{formDisplayCondition.name.length > 0 && (
								<>
									<SelectControl
										__nextHasNoMarginBottom
										label="Condition Operator"
										help="How to compare the field value."
										value={formDisplayCondition.operator}
										options={[
											{
												label: 'Equals',
												value: 'equals',
											},
											{
												label: 'Not Equals',
												value: 'not_equals',
											},
										]}
										onChange={(value) =>
											setAttributes({
												formDisplayCondition: {
													...formDisplayCondition,
													operator: value,
												},
											})
										}
									/>

									{(() => {
										// Find the selected field to check if it has subFields
										const selectedField = formFields.find(
											(field) =>
												field.name ===
												formDisplayCondition.name
										);
										const hasSubFields =
											selectedField?.subFields &&
											selectedField.subFields.length > 0;

										if (hasSubFields) {
											return (
												<SelectControl
													__nextHasNoMarginBottom
													label="Target Value"
													help="Select which option should trigger this condition."
													value={
														formDisplayCondition.value
													}
													options={[
														{
															label: 'Select a value...',
															value: '',
														},
														...selectedField.subFields.map(
															(subField) => ({
																label:
																	subField.value ||
																	'Unnamed Option',
																value: subField.value,
															})
														),
													]}
													onChange={(value) =>
														setAttributes({
															formDisplayCondition:
																{
																	...formDisplayCondition,
																	value,
																},
														})
													}
												/>
											);
										}

										return (
											<TextControl
												__nextHasNoMarginBottom
												label="Target Value"
												help="Enter the value to compare against."
												value={
													formDisplayCondition.value
												}
												onChange={(value) =>
													setAttributes({
														formDisplayCondition: {
															...formDisplayCondition,
															value,
														},
													})
												}
											/>
										);
									})()}
								</>
							)}
						</>
					)}
				</PanelBody>
			</InspectorControls>
		</>
	);
}

export default function registerFormConditionalDisplayFilter() {
	/**
	 * Add support for the form conditional display attributes to blocks.
	 *
	 * @param {Object} settings Settings for the block.
	 *
	 * @return {Object} settings Modified settings.
	 */
	addFilter(
		'blocks.registerBlockType',
		`form-conditional-display-controls-supports`,
		(settings) => {
			settings.attributes = {
				...settings.attributes,
				formDisplayMode: {
					type: 'string',
					default: 'always',
					enum: ['always', 'conditional'],
				},
				formDisplayCondition: {
					type: 'object',
					default: {
						name: '',
						operator: 'equals', // equals, not_equals
						value: '',
					},
				},
			};
			return settings;
		}
	);

	/**
	 * Add support for form conditional display controls to blocks.
	 *
	 * @param {Object} settings Settings for the block.
	 *
	 * @return {Object} settings Modified settings.
	 */
	addFilter(
		'editor.BlockEdit',
		`form-conditional-display-controls`,
		createHigherOrderComponent(
			(BlockEdit) =>
				function FormConditionalDisplayControls(props) {
					// Check if this block is inside the form block, do this by navigating up the tree of this clientId and check if the parent is a form block.
					// If it is, we can add the conditional display controls.
					const formClientId = useSelect(
						(select) => {
							const { getBlockParentsByBlockName } =
								select(blockEditorStore);
							const formBlocks = getBlockParentsByBlockName(
								props.clientId,
								'prc-block/form'
							);
							return formBlocks[0] || null;
						},
						[props.clientId]
					);

					const isInsideForm = !!formClientId;

					if (!isInsideForm) {
						return <BlockEdit {...props} />;
					}

					return (
						<>
							<ConditionalDisplayControls
								{...props}
								formClientId={formClientId}
							/>
							<BlockEdit {...props} />
						</>
					);
				},
			'withFormConditionalDisplayControls'
		),
		100
	);
}
