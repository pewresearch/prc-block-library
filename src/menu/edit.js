/**
 * External dependencies
 */
import { upperFirst } from 'lodash';
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { Fragment, useState } from '@wordpress/element';
import {
    InnerBlocks,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    BlockControls,
    useBlockProps,
} from '@wordpress/block-editor';
import { useDispatch, withSelect, withDispatch } from '@wordpress/data';
import { ToolbarGroup } from '@wordpress/components';
import { compose } from '@wordpress/compose';
import { __ } from '@wordpress/i18n';

/**
 * Internal dependencies
 */
import useBlockNavigator from './use-block-navigator';
import * as navIcons from './icons';
import NavigationPlaceholder from './placeholder';

const isStyle = (needle, haystack) => {
    const arr = haystack.split(' ');
    return arr.includes(needle);
};

const Navigation = ({
    selectedBlockHasDescendants,
    attributes,
    setAttributes,
    clientId,
    hasExistingNavItems,
    isImmediateParentOfSelectedBlock,
    isSelected,
    updateInnerBlocks,
    className,
    hasItemJustificationControls = true,
    hasListViewModal = true,
}) => {
    const [isPlaceholderShown, setIsPlaceholderShown] = useState(
        !hasExistingNavItems,
    );

    const { selectBlock } = useDispatch('core/block-editor');

    const blockProps = useBlockProps({
        className: classnames(className, {
            [`items-justified-${attributes.itemsJustification}`]: attributes.itemsJustification,
            'is-vertical': 'vertical' === attributes.orientation,
        }),
    });

    const { navigatorToolbarButton, navigatorModal } = useBlockNavigator(
        clientId,
    );

    // useInnerBlocksProps is amazing, really changes how we can use innerblocks.
    const innerBlocksProps = useInnerBlocksProps(
        {
            className: classnames('ui menu', {
                secondary: isStyle('is-style-secondary', blockProps.className),
                tabular: isStyle('is-style-tabular', blockProps.className),
                text: isStyle('is-style-text', blockProps.className),
            }),
        },
        {
            allowedBlocks: [
                'prc-block/menu-link',
                'prc-block/social-link',
                'prc-block/post-bylines',
                'prc-block/post-publish-date',
            ],
            orientation: attributes.orientation || 'horizontal',
            renderAppender:
                (isImmediateParentOfSelectedBlock &&
                    !selectedBlockHasDescendants) ||
                isSelected
                    ? InnerBlocks.DefaultAppender
                    : false,
            __experimentalAppenderTagName: 'div',
            __experimentalCaptureToolbars: true,
            // Template lock set to false here so that the Nav
            // Block on the experimental menus screen does not
            // inherit templateLock={ 'all' }.
            templateLock: false,
        },
    );

    if (isPlaceholderShown) {
        return (
            <div {...blockProps}>
                <NavigationPlaceholder
                    onCreate={(blocks, selectNavigationBlock) => {
                        setIsPlaceholderShown(false);
                        updateInnerBlocks(blocks);
                        if (selectNavigationBlock) {
                            selectBlock(clientId);
                        }
                    }}
                />
            </div>
        );
    }

    const handleItemsAlignment = align => {
        return () => {
            const itemsJustification =
                attributes.itemsJustification === align ? undefined : align;
            setAttributes({
                itemsJustification,
            });
        };
    };

    return (
        <Fragment>
            <BlockControls>
                {hasItemJustificationControls && (
                    <ToolbarGroup
                        icon={
                            attributes.itemsJustification
                                ? navIcons[
                                      `justify${upperFirst(
                                          attributes.itemsJustification,
                                      )}Icon`
                                  ]
                                : navIcons.justifyLeftIcon
                        }
                        label={__('Change items justification')}
                        isCollapsed
                        controls={[
                            {
                                icon: navIcons.justifyLeftIcon,
                                title: __('Justify items left'),
                                isActive:
                                    'left' === attributes.itemsJustification,
                                onClick: handleItemsAlignment('left'),
                            },
                            {
                                icon: navIcons.justifyCenterIcon,
                                title: __('Justify items center'),
                                isActive:
                                    'center' === attributes.itemsJustification,
                                onClick: handleItemsAlignment('center'),
                            },
                            {
                                icon: navIcons.justifyRightIcon,
                                title: __('Justify items right'),
                                isActive:
                                    'right' === attributes.itemsJustification,
                                onClick: handleItemsAlignment('right'),
                            },
                        ]}
                    />
                )}
                {hasListViewModal && (
                    <ToolbarGroup>{navigatorToolbarButton}</ToolbarGroup>
                )}
            </BlockControls>
            {hasListViewModal && navigatorModal}
            <nav {...blockProps}>
                <div {...innerBlocksProps} />
            </nav>
        </Fragment>
    );
};

const edit = compose([
    withSelect((select, { clientId }) => {
        const innerBlocks = select('core/block-editor').getBlocks(clientId);
        const {
            getClientIdsOfDescendants,
            hasSelectedInnerBlock,
            getSelectedBlockClientId,
        } = select('core/block-editor');
        const isImmediateParentOfSelectedBlock = hasSelectedInnerBlock(
            clientId,
            false,
        );
        const selectedBlockId = getSelectedBlockClientId();
        const selectedBlockHasDescendants = !!getClientIdsOfDescendants([
            selectedBlockId,
        ])?.length;
        return {
            isImmediateParentOfSelectedBlock,
            selectedBlockHasDescendants,
            hasExistingNavItems: !!innerBlocks.length,
        };
    }),
    withDispatch((dispatch, { clientId }) => {
        return {
            updateInnerBlocks(blocks) {
                if (0 === blocks?.length) {
                    return false;
                }
                dispatch('core/block-editor').replaceInnerBlocks(
                    clientId,
                    blocks,
                    true,
                );
            },
        };
    }),
])(Navigation);

export default edit;
