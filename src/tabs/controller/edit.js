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
import { PanelBody, ToggleControl } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { dispatch, useSelect } from '@wordpress/data';

const BLOCKS_TEMPLATE = [
    ['prc-block/tabs-menu', {}],
    ['prc-block/tabs-panes', {}],
];

const ALLOWED_BLOCKS = ['prc-block/tabs-menu', 'prc-block/tabs-panes'];

const findRemovedDiff = (past, present) => {
    const comparer = otherArray => {
        return current => {
            return (
                0 ===
                otherArray.filter(other => {
                    return other.attributes.uuid === current.attributes.uuid;
                }).length
            );
        };
    };

    const onlyInA = past.filter(comparer(present));
    const onlyInB = present.filter(comparer(past));
    return onlyInA.concat(onlyInB);
};

const Edit = ({ attributes, className, setAttributes, clientId }) => {
    const [menuBlocksPast, setMenuBlocksPast] = useState(false);
    const { vertical } = attributes;

    const blockProps = useBlockProps({
        className: classnames(className, { 'ui grid': vertical }),
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        allowedBlocks: ALLOWED_BLOCKS,
        renderAppender: false,
        template: BLOCKS_TEMPLATE,
        templateLock: 'all',
    });

    // Get menu blocks, get page blocks
    const { menuBlocks, paneBlocks } = useSelect(select => {
        const rootBlocks = select('core/block-editor').getBlocks(clientId);
        const mBlocks =
            1 <= rootBlocks.length
                ? rootBlocks.filter(e => 'prc-block/tabs-menu' === e.name)
                : [];
        const pBlocks =
            1 <= rootBlocks.length
                ? rootBlocks.filter(e => 'prc-block/tabs-panes' === e.name)
                : [];
        return {
            menuBlocks: 1 <= mBlocks.length ? mBlocks[0].innerBlocks : false,
            paneBlocks: 1 <= pBlocks.length ? pBlocks[0].innerBlocks : false,
        };
    });

    // When a menu item block is removed find the matching page block by uuid and remove it.
    useEffect(() => {
        if (menuBlocks.length < menuBlocksPast.length) {
            // We have removed something.
            // Find what the diff from menuBlocks and menuBlocksPast is, then get the uuid then search the pageBlocks and remove the block in question.
            const removed = findRemovedDiff(menuBlocksPast, menuBlocks);
            const matchedPane = paneBlocks.filter(
                e => e.attributes.uuid === removed[0].attributes.uuid,
            );
            dispatch('core/block-editor').removeBlock(matchedPane[0].clientId);
            // Need to set active the next available menu item block
        }

        setMenuBlocksPast(menuBlocks);
    }, [menuBlocks]);

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Tab Controller Settings')}>
                    <ToggleControl
                        label="Vertical Orientation"
                        checked={vertical}
                        onChange={() => setAttributes({ vertical: !vertical })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...innerBlocksProps} />
        </Fragment>
    );
};

export default Edit;
