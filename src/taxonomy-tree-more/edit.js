/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import {
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';

const ALLOWED_BLOCKS = ['prc-block/menu-link'];

const edit = ({ className }) => {
    const [visible, toggleVisibility] = useState(false);

    const blockProps = useBlockProps({
        className: classnames(className),
    });

    const innerBlocksProps = useInnerBlocksProps(
        {},
        {
            allowedBlocks: ALLOWED_BLOCKS,
            orientation: 'vertical',
            templateLock: false,
        },
    );

    return (
        <div {...blockProps}>
            <div onClick={() => toggleVisibility(!visible)}>View More +</div>
            {visible && <div {...innerBlocksProps} />}
        </div>
    );
};

export default edit;
