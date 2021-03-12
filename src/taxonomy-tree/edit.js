/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Fragment } from '@wordpress/element';
import {
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';
import { CollapsibleList } from 'shared';

const ALLOWED_BLOCKS = ['prc-block/menu-item'];

const edit = ({ attributes, className, setAttributes }) => {
    const { heading } = attributes;

    const blockProps = useBlockProps({
        className: classnames(className),
    });

    const innerBlocksProps = useInnerBlocksProps(
        {
            className: classnames('ui relaxed tree list'),
        },
        {
            allowedBlocks: ALLOWED_BLOCKS,
            orientation: 'vertical',
            templateLock: false,
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
