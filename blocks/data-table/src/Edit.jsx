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

	const isTableEmpty = attributes.colHeaders.length === 0;

	return (
		<Fragment>
			{isTableEmpty && (
				<TableSetupWizard
					onFinish={(c) => {
						const newAttributes = {
							colHeaders: c,
						};
						// add a row of empty cells for each column to newAttributes.body
						newAttributes.body = [Array(c.length).fill('')];
						console.log(newAttributes);
						setAttributes(newAttributes);
					}}
				/>
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
