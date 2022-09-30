/* eslint-disable react/jsx-pascal-case */
/**
 * External Dependencies
 */
import classnames from 'classnames';
import { dropRight, times } from 'lodash';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { PanelBody, RangeControl, Notice, ToggleControl } from '@wordpress/components';
import {
    InnerBlocks,
    InspectorAdvancedControls,
    useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';

const ALLOWED_BLOCKS = ['prc-block/row'];

const edit = ({ attributes, setAttributes, clientId }) => {
    const { useCssGrid } = attributes;
    const { count, displayBlockAppender } = useSelect(
        select => {
            const innerBlockSelected = select('core/block-editor').hasSelectedInnerBlock(clientId);
            const isSelected = select('core/block-editor').isBlockSelected(clientId);
            return {
                count: select('core/block-editor').getBlockCount(clientId),
                displayBlockAppender: (innerBlockSelected || isSelected),
            };
        },
        [clientId],
    );

    const blockProps = useBlockProps({
        className: classnames({
            'ui container': count > 1
        }),
    });

    const innerBlocksProps = useInnerBlocksProps({
        className: classnames({
            'ui grid': count > 1,
        }),
    }, {
        allowedBlocks: ALLOWED_BLOCKS,
        orientation: 'vertical', // @TODO When we get to a certain viewport size in the editor we should change the orientation from horizontal to vertical.
        template: [
            [ 'prc-block/row', {} ],
        ],
        renderAppender: displayBlockAppender ? InnerBlocks.ButtonBlockAppender : false,
    });

    return (
        <Fragment>
            <InspectorAdvancedControls>
                <ToggleControl
                    label={__('Use experimental CSS Grid', 'prc-block-library')}
                    checked={useCssGrid}
                    onChange={() => setAttributes({ useCssGrid: !useCssGrid })}
                />
            </InspectorAdvancedControls>
            <div {...blockProps}>
                <div {...innerBlocksProps} />
            </div>
        </Fragment>
    );
};

export default edit;