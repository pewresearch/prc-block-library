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
    useBlockProps,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

/**
 * Internal dependencies
 */

import './style.scss';

const Edit = ({ attributes, className, clientId, context, setAttributes }) => {
    const { uuid } = attributes;
    const currentlyActive = context['prc-block/tabs-active'];
    const isActive = uuid === currentlyActive;

    const isVertical = context['prc-block/tabs-vertical'];
    const style = context['prc-block/tabs-style'];

    if (!isActive) {
        return <Fragment />;
    }

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
        className: classnames(className, 'ui segment tab', {
            active: uuid === currentlyActive,
        }),
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        renderAppender: hasChildBlocks
            ? InnerBlocks.DefaultBlockAppender
            : InnerBlocks.ButtonBlockAppender,
    });

    return <div {...innerBlocksProps} />;
};

export default Edit;
