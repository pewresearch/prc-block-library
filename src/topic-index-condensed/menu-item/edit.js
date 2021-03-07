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
} from '@wordpress/block-editor';
import { PanelBody } from '@wordpress/components';
import { useSelect, useDispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const Edit = ({
    attributes,
    setAttributes,
    className,
    clientId,
    isSelected,
}) => {
    const { updateBlockAttributes } = useDispatch('core/block-editor');
    const { rootClientId } = useSelect(
        select => {
            const { getBlockRootClientId } = select('core/block-editor');
            const rootBlockClientId = getBlockRootClientId(clientId);
            return {
                rootClientId: rootBlockClientId,
            };
        },
        [clientId],
    );

    useEffect(() => {}, [isSelected]);

    const blockProps = useBlockProps({
        className: classnames(className),
    });

    // When you click into a menu link, when isSelected is true then we should using block context change something in the parent block, view block, that says this is whats active. From there we will hide or show the current page, when you click on a new menu link that will show the appropriate page.

    return (
        <Fragment>
            <BlockControls>Toolbar Shit Here For Links and Such</BlockControls>

            <InspectorControls>
                <PanelBody title={__('Menu settings')}>
                    <Fragment>
                        <p>Yep</p>
                    </Fragment>
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>Menu item here</div>
        </Fragment>
    );
};

export default Edit;
