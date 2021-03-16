/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import {
    InnerBlocks,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';

/**
 * Internal dependencies
 */
import { CollapsibleList } from 'shared';

const ALLOWED_BLOCKS = ['prc-block/menu-link'];

const edit = ({ attributes, className, setAttributes }) => {
    const { heading } = attributes;

    const blockProps = useBlockProps({
        className: classnames(className),
    });

    const innerBlocksProps = useInnerBlocksProps(
        {
            className: classnames('ui list'),
        },
        {
            allowedBlocks: ALLOWED_BLOCKS,
            orientation: 'vertical',
            templateLock: false,
            renderAppender: InnerBlocks.ButtonBlockAppender,
        },
    );

    return (
        <div {...blockProps}>
            <CollapsibleList
                heading={heading}
                placeholder="Politics"
                chevron
                setAttributes={setAttributes}
            >
                <div {...innerBlocksProps} />
            </CollapsibleList>
        </div>
    );
};

export default edit;
