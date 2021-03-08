/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Fragment, useEffect, useState } from '@wordpress/element';
import {
    BlockControls,
    InspectorControls,
    useBlockProps,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const BLOCKS_TEMPLATE = [
    ['prc-block/topic-index-condensed-menu', {}],
    ['prc-block/topic-index-condensed-pages', {}],
];

const ALLOWED_BLOCKS = [
    'prc-block/topic-index-condensed-menu',
    'prc-block/topic-index-condensed-pages',
];

const Edit = ({ attributes, setAttributes, className, clientId }) => {
    const blockProps = useBlockProps({
        className: classnames(className, 'ui divided grid'),
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        allowedBlocks: ALLOWED_BLOCKS,
        renderAppender: false,
        template: BLOCKS_TEMPLATE,
        templateLock: 'all',
    });

    return (
        <Fragment>
            <BlockControls />

            <InspectorControls>
                <PanelBody title={__('Controller Settings')}>
                    <Fragment>
                        <p>Yep</p>
                    </Fragment>
                </PanelBody>
            </InspectorControls>

            <div className="ui container">
                <div {...innerBlocksProps} />
            </div>
        </Fragment>
    );
};

export default Edit;
