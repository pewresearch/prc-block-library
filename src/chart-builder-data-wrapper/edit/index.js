/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InnerBlocks } from '@wordpress/block-editor';

const edit = ({ attributes }) => {
    console.log({ attributes });
    // Create an empty table + chart component on page load
    const MY_TEMPLATE = [
        [
            'core/table',
            {
                className: 'chart-builder-data-table',
                head: attributes.tableHead,
                body: attributes.tableBody,
            },
        ],
        ['prc-block/chart-builder', {}],
    ];

    return <InnerBlocks template={MY_TEMPLATE} templateLock="all" />;
};

export default edit;
