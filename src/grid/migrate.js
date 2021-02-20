// We need to migrate prc-block/columns to prc-block/grid -> prc-block/row with its columns inside.
/**
 * WordPress dependencies
 */
import { useEffect } from '@wordpress/element';
import { createBlock, registerBlockType } from '@wordpress/blocks';
import { InnerBlocks } from '@wordpress/block-editor';
import { select, dispatch } from '@wordpress/data';
import { __ } from '@wordpress/i18n';

const settings = {
    title: __('PRC Columns'),
    description: __('LEGACY, DO NOT USE. USE prc-block/grid, instead'),
    icon: (
        <svg
            width="24"
            height="24"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
            role="img"
            aria-hidden="true"
            focusable="false"
        >
            <path d="M19 6H6c-1.1 0-2 .9-2 2v9c0 1.1.9 2 2 2h13c1.1 0 2-.9 2-2V8c0-1.1-.9-2-2-2zm-4.1 1.5v10H10v-10h4.9zM5.5 17V8c0-.3.2-.5.5-.5h2.5v10H6c-.3 0-.5-.2-.5-.5zm14 0c0 .3-.2.5-.5.5h-2.6v-10H19c.3 0 .5.2.5.5v9z" />
        </svg>
    ),
    attribues: {
        equal: {
            type: 'boolean',
            default: false,
        },
    },
    edit: ({ clientId, isSelected }) => {
        // We need to get the Innerblocks from here (the columns) gather them up and store them. We then need to create a block or replace this block with a new block. That will snap us out of migration and back into grid.
        useEffect(() => {
            const block = select('core/block-editor').getBlock(clientId);
            const { innerBlocks, attributes } = block;
            let isEqual = false;
            if (attributes.className.split(' ').includes('equal')) {
                isEqual = true;
            }
            if (true === isSelected) {
                const rowBlock = createBlock(
                    'prc-block/row',
                    { equal: isEqual, className: '' },
                    innerBlocks,
                );
                const newGridBlock = createBlock(
                    'prc-block/grid',
                    { className: '' },
                    [rowBlock],
                );
                console.log(
                    'Migrating prc-block/columns->',
                    block,
                    innerBlocks,
                    newGridBlock,
                );
                dispatch('core/block-editor').replaceBlock(
                    clientId,
                    newGridBlock,
                );
            }
        }, [clientId]);
        return <InnerBlocks />;
    },
    save: () => <InnerBlocks.Content />,
    supports: {
        inserter: false,
    },
};

registerBlockType('prc-block/columns', settings);
