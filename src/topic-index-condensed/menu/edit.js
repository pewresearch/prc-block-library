/**
 * External dependencies
 */
import classnames from 'classnames';
import { BlockInserterButton } from '@prc-app/shared';

/**
 * WordPress dependencies
 */
import {
    useBlockProps,
    useInnerBlocksProps,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['prc-block/topic-index-condensed-menu-item'];

const Edit = ({ className, clientId }) => {
    const blockProps = useBlockProps({
        className: classnames(className, 'column five wide'),
    });

    const innerBlocksProps = useInnerBlocksProps(
        {
            className: 'ui vertical fluid tabular menu',
        },
        {
            allowedBlocks: ALLOWED_BLOCKS,
            orientation: 'vertical',
            templateLock: false,
            renderAppender: () => (
                <BlockInserterButton
                    label="Add New Menu Item"
                    blockName="prc-block/topic-index-condensed-menu-item"
                    clientId={clientId}
                />
            ),
        },
    );

    return (
        <div {...blockProps}>
            <div {...innerBlocksProps} />
        </div>
    );
};

export default Edit;
