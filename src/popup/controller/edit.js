/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import {
	useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';

const TEMPLATE = [
	[ 'prc-block/popup-content', {} ],
	[ 'prc-block/popup-modal', {} ],
];

const edit = ({ attributes, className, setAttributes }) => {

    const blockProps = useBlockProps();

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        orientation: 'vertical',
		template: TEMPLATE,
        templateLock: 'all',
    });

    return(
		<Fragment>
			<div {...innerBlocksProps} />
		</Fragment>
	);
};

export default edit;
