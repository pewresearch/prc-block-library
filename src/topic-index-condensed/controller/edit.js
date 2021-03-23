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
import { __ } from '@wordpress/i18n';
import { dispatch, useSelect } from '@wordpress/data';

const BLOCKS_TEMPLATE = [
    ['prc-block/topic-index-condensed-menu', {}],
    ['prc-block/topic-index-condensed-pages', {}],
];

const ALLOWED_BLOCKS = [
    'prc-block/topic-index-condensed-menu',
    'prc-block/topic-index-condensed-pages',
];

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

const Edit = ({ className, clientId, setAttributes }) => {
    const [menuBlocksPast, setMenuBlocksPast] = useState(false);

    const blockProps = useBlockProps({
        className: classnames(className, 'ui divided grid'),
    });

    const innerBlocksProps = useInnerBlocksProps(blockProps, {
        allowedBlocks: ALLOWED_BLOCKS,
        renderAppender: false,
        template: BLOCKS_TEMPLATE,
        templateLock: 'all',
    });

    // Get menu blocks, get page blocks
    const { menuBlocks, pageBlocks } = useSelect(select => {
        const rootBlocks = select('core/block-editor').getBlocks(clientId);
        return {
            menuBlocks: rootBlocks.filter(
                e => 'prc-block/topic-index-condensed-menu' === e.name,
            )[0].innerBlocks,
            pageBlocks: rootBlocks.filter(
                e => 'prc-block/topic-index-condensed-pages' === e.name,
            )[0].innerBlocks,
        };
    });

    // When a menu item block is removed find the matching page block by uuid and remove it.
    useEffect(() => {
        if (menuBlocks.length < menuBlocksPast.length) {
            // We have removed something.
            // Find what the diff from menuBlocks and menuBlocksPast is, then get the uuid then search the pageBlocks and remove the block in question.
            const removed = findRemovedDiff(menuBlocksPast, menuBlocks);
            const matchedPage = pageBlocks.filter(
                e => e.attributes.uuid === removed[0].attributes.uuid,
            );
            dispatch('core/block-editor').removeBlock(matchedPage[0].clientId);
            // Need to set active the next available menu item block
        }

        setMenuBlocksPast(menuBlocks);
        // If menu
    }, [menuBlocks]);

    return (
        <Fragment>
            <BlockControls />

            <InspectorControls>
                <PanelBody title={__('Controller Settings')}>
                    <Fragment>Controller Settings</Fragment>
                </PanelBody>
            </InspectorControls>

            <div className="ui container">
                <div {...innerBlocksProps} />
            </div>
        </Fragment>
    );
};

export default Edit;
