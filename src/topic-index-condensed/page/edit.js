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

    const blockProps = useBlockProps({
        className: classnames(className, {
            active: uuid === currentlyActive,
        }),
    });

    const innerBlocksProps = useInnerBlocksProps();

    useEffect(() => {
        console.log('page context', uuid, context);
    }, [context]);

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Page Settings')}>
                    <Fragment>
                        <p>Yep, sure looks like {__`"page settings"`}</p>
                    </Fragment>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <h2>{title}</h2>
                <div {...innerBlocksProps} />
            </div>
        </Fragment>
    );
};

export default Edit;
