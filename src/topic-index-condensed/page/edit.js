/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import {
    InnerBlocks,
    useBlockProps,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */
import { CaretHeadingLink } from 'shared';

import './style.scss';

const Edit = ({ attributes, className, clientId, context, setAttributes }) => {
    const { heading, url, uuid } = attributes;
    const currentlyActive = context['prc-block/topic-index-condensed-active'];

    const { hasChildBlocks } = useSelect(
        select => {
            const { getBlockOrder } = select('core/block-editor');
            return {
                hasChildBlocks: 0 < getBlockOrder(clientId).length,
            };
        },
        [clientId],
    );

    const blockProps = useBlockProps({
        className: classnames(className, {
            active: uuid === currentlyActive,
        }),
    });

    const innerBlocksProps = useInnerBlocksProps(
        { className: 'pages' },
        {
            renderAppender: hasChildBlocks
                ? InnerBlocks.DefaultBlockAppender
                : InnerBlocks.ButtonBlockAppender,
        },
    );

    return (
        <div {...blockProps}>
            <CaretHeadingLink
                url={url}
                heading={heading}
                setAttributes={setAttributes}
            />
            <div {...innerBlocksProps} />
        </div>
    );
};

export default Edit;
