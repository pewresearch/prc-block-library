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
    useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';
import { Button } from '@wordpress/components';

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
            <Button isLink onClick={() => toggleVisibility(!visible)}>
                {visible ? `- Less` : `+ More`}
            </Button>
            {visible && <div {...innerBlocksProps} />}
        </div>
    );
};

export default edit;
