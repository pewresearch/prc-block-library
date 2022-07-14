/**
 * WordPress Dependencies
 */
import { useInnerBlocksProps, useBlockProps } from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal Dependencies
 */
import { ModalControls } from '../_shared';

const edit = ({ attributes, className, setAttributes, clientId }) => {
	const { rootClientId } = useSelect((select) => ({
		rootClientId: select('core/block-editor').getBlockRootClientId(clientId),
	}));

	const blockProps = useBlockProps();

	const innerBlocksProps = useInnerBlocksProps(blockProps, {
		orientation: 'vertical',
		templateLock: false,
	});

	return (
		<ModalControls controllerClientId={rootClientId}>
			<div {...innerBlocksProps} />
		</ModalControls>
	);
};

export default edit;
