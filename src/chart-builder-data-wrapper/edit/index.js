/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { BlockControls, InnerBlocks } from '@wordpress/block-editor';
import { ToolbarButton, ToolbarGroup } from '@wordpress/components';
import { minus, plusCircleFilled } from '@wordpress/icons';
import { select, dispatch } from '@wordpress/data';

const edit = ({ attributes, setAttributes, clientId }) => {
    console.log({ attributes, clientId });
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
        [
            'prc-block/chart-builder',
            {
                isConvertedChart: attributes.isConvertedChart,
            },
        ],
    ];

    return (
        <>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        name="hide-table"
                        icon={attributes.hideTable ? plusCircleFilled : minus}
                        title={
                            attributes.hideTable
                                ? __('Show Table')
                                : __('Hide Table')
                        }
                        onClick={() => {
                            const tableBlock = select('core/block-editor')
                                .getBlocks(clientId)
                                .find((block) => block.name === 'core/table');
                            if (attributes.hideTable) {
                                dispatch('core/editor').updateBlockAttributes(
                                    tableBlock.clientId,
                                    {
                                        className: 'chart-builder-data-table',
                                    },
                                );
                            } else {
                                dispatch('core/editor').updateBlockAttributes(
                                    tableBlock.clientId,
                                    {
                                        className:
                                            'chart-builder-data-table--hidden',
                                    },
                                );
                            }
                            setAttributes({ hideTable: !attributes.hideTable });
                        }}
                    />
                </ToolbarGroup>
            </BlockControls>
            <InnerBlocks template={MY_TEMPLATE} templateLock="all" />
        </>
    );
};

export default edit;
