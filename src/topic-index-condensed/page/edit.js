/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Fragment, useEffect, useState } from '@wordpress/element';
import {
    InspectorControls,
    InnerBlocks,
    useBlockProps,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */

import './style.scss';

const Edit = ({ attributes, className, clientId, context }) => {
    const { title, uuid } = attributes;
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
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Page Settings')}>
                    <Fragment>
                        <p>Page Settings WIP</p>
                        <p>
                            URL CONTROL HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
                        </p>
                    </Fragment>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <h2 className="sans-serif">{title}</h2>
                <div {...innerBlocksProps} />
            </div>
        </Fragment>
    );
};

export default Edit;
