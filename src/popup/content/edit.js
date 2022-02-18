/**
 * WordPress Dependencies
 */
import {
	useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';

const edit = ({ attributes, className, setAttributes }) => {

    const blockProps = useBlockProps();

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        orientation: 'vertical',
        templateLock: false,
    });

    return <div {...innerBlocksProps} />
};

export default edit;
