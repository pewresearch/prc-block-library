/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
    useBlockProps,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */

import { BlockInserterButton } from 'shared';

const ALLOWED_BLOCKS = ['prc-block/topic-index-condensed-menu-item'];

const Edit = ({ className, clientId }) => {
    const blockProps = useBlockProps({
        className: classnames(className, 'column five wide'),
    });

    const innerBlocksProps = useInnerBlocksProps(
        {
            className: 'ui vertical fluid secondary menu',
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
