/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __, sprintf } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
    BlockControls,
    InnerBlocks,
    useBlockProps,
    __experimentalLinkControl as LinkControl,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
} from '@wordpress/block-editor';
import {
    BaseControl,
    Button,
    ToggleControl,
    TextControl,
    Dropdown,
    Toolbar,
    ToolbarButton,
    ToolbarGroup,
    Popover,
} from '@wordpress/components';

const ALLOWED_BLOCKS = ['prc-block/topic-list-item'];

const Edit = ({ attributes, setAttributes, className, clientId, isSelected }) => {
    const { id, title, url, more } = attributes;
    const blockProps = useBlockProps({
        className: 'item',
    });

    const innerBlocksProps = useInnerBlocksProps(
        {},
        {
            allowedBlocks: ALLOWED_BLOCKS,
            orientation: 'vertical',
            templateLock: false,
        },
    );

    return (
        <Fragment>
            <BlockControls>
                <ToolbarGroup>
                    <ToolbarButton
                        label={__('Toggle More')}
                        icon="admin-links"
                        onClick={() => setAttributes({more: !more})}
                        showTooltip
                    />
                </ToolbarGroup>
            </BlockControls>
            <div {...blockProps}>
                
                { true === isSelected && (
                    <LinkControl
                        value={{ url }}
                        showInitialSuggestions
                        suggestionsQuery={{ type: 'term', subtype: 'topic' }}
                        onChange={term => {
                            console.log(term);
                            setAttributes({
                                id: term.id,
                                title: term.title,
                                url: term.url,
                            });
                        }}
                        settings={[]}
                    />
                ) }
                { false === isSelected && null !== url && `${title}`}
                { false === isSelected && null === url && `Click to select Topic term.`}
                { true === more && <div {...innerBlocksProps} /> }
            </div>
        </Fragment>
    );
};

export default Edit;
