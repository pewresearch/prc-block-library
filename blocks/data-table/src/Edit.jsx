/**
 * External Dependencies
 */
import { HotTable } from '@handsontable/react';
import { registerAllModules } from 'handsontable/registry';
import 'handsontable/dist/handsontable.full.min.css';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './Controls';

registerAllModules();

/**
 * The edit function describes the structure of your block in the context of the
 * editor. This represents what the editor will render when the block is used.
 *
 * @see https://developer.wordpress.org/block-editor/reference-guides/block-api/block-edit-save/#edit
 *
 * @param {Object}   props               Properties passed to the function.
 * @param {Object}   props.attributes    Available block attributes.
 * @param {Function} props.setAttributes Function that updates individual attributes.
 *
 * @return {WPElement} Element to render.
 */
export default function Edit({
	attributes,
	setAttributes,
	context,
	clientId,
	isSelected,
}) {
	const blockProps = useBlockProps();

	const data = [
		['', 'Tesla', 'Volvo', 'Toyota', 'Ford'],
		['2019', 10, 11, 12, 13],
		['2020', 20, 11, 14, 13],
		['2021', 30, 15, 12, 13],
	];

	return (
		<Fragment>
			<Controls {...{ attributes, setAttributes, context: false }} />
			<div {...blockProps}>
				<HotTable
					data={data}
					rowHeaders
					colHeaders
					height="auto"
					contextMenu
					licenseKey="non-commercial-and-evaluation" // for non-commercial use only
				/>
			</div>
		</Fragment>
	);
}
