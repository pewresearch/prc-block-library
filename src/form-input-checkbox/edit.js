/**
 * WordPress Dependencies
 */
import { Fragment, useState } from '@wordpress/element';
import { useBlockProps, RichText } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './controls';

const edit = ({ attributes, setAttributes }) => {
	const { anchor, label, type } = attributes;

	const [checked, setChecked] = useState(false);
	const toggleChecked = () => setChecked(!checked);

	const blockProps = useBlockProps();

	return (
		<Fragment>
			<div {...blockProps}>
				<input
					type={type}
					id={anchor}
					name={anchor}
					checked={checked}
					onChange={() => toggleChecked()}
				/>
				<RichText
					tagName="label"
					value={label}
					onChange={(value) => setAttributes({ label: value })}
					placeholder="Label"
					keepPlaceholderOnFocus
					multiline={false}
					allowedFormats={['core/bold', 'core/italic']}
				/>
			</div>
			<Controls {...{ attributes, setAttributes }} />
		</Fragment>
	);
};

export default edit;