/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './controls';

const edit = ({ attributes, setAttributes }) => {
	const { placeholder, type } = attributes;
	const blockProps = useBlockProps({
		placeholder,
		onChange: (event) => event.preventDefault(),
		type,
	});

	return (
		<Fragment>
			<input {...blockProps} />
			<Controls {...{ attributes, setAttributes }} />
		</Fragment>
	);
};

export default edit;
