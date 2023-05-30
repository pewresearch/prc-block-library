/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { useRef, Fragment } from '@wordpress/element';
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './Controls';
import TableEdit from './TableEdit';
import TableSetupWizard from './TableSetupWizard';

import { ProvideDataTable } from './context';

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param            props.context
 * @param            props.clientId
 * @param            props.isSelected
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes,
	setAttributes,
	clientId,
	isSelected,
}) {
	const blockProps = useBlockProps();
	const tableRef = useRef(null);

	console.log(clientId);

	const isTableEmpty = attributes.colHeaders.length === 0;

	return (
		<Fragment>
			{isTableEmpty && (
				<figure {...blockProps}>
					<TableSetupWizard
						onFinish={(c) => {
							const newAttributes = {
								colHeaders: c,
							};

							// generate an object with a key for each column
							// and an empty array for each key
							// newAttributes.data = c.reduce(
							// 	(acc, cur) => ({ ...acc, [cur]: [] }),
							// 	{}
							// );

							// add a row of empty cells for each column to newAttributes.body
							newAttributes.data = [Array(c.length).fill('')];
							console.log(
								'Finish Table Setup Wizard: Yield = ',
								newAttributes
							);
							setAttributes(newAttributes);
						}}
						setAttributes={setAttributes}
					/>
				</figure>
			)}
			{!isTableEmpty && (
				<ProvideDataTable clientId={clientId} tableRef={tableRef}>
					<Controls />
					<figure {...blockProps}>
						<TableEdit tableRef={tableRef} />
						{(isSelected || attributes.caption) && (
							<RichText
								tagName="figcaption"
								placeholder="Caption"
								value={attributes.caption}
								onChange={(caption) =>
									setAttributes({ caption })
								}
							/>
						)}
					</figure>
				</ProvideDataTable>
			)}
		</Fragment>
	);
}
