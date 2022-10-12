/**
 * WordPress Dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';

/**
 * Internal Dependencies
 */
import Controls from './controls';

const TEMPLATE = [['core/html', {}]];

const edit = ({ attributes, setAttributes, clientId }) => {
	const blockProps = useBlockProps();

	const innerBlocksProps = useInnerBlocksProps(
		{},
		{
			orientation: 'vertical',
			templateLock: false,
			template: TEMPLATE,
		},
	);

	return (
		<div {...blockProps}>
			<Controls
				attributes={attributes}
				setAttributes={setAttributes}
				clientId={clientId}
			/>
			<div {...innerBlocksProps} />
		</div>
	);
};

export default edit;
