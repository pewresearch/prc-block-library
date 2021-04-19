/**
 * External dependencies
 */
import classnames from 'classnames';
import { escape, get, head, find } from 'lodash';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useSelect } from '@wordpress/data';
import {
    ColorPalette,
    Button,
    Flex,
    FlexItem,
    FlexBlock,
    KeyboardShortcuts,
    PanelBody,
    Popover,
    TextControl,
    TextareaControl,
    ToggleControl,
    ToolbarButton,
    ToolbarGroup,
} from '@wordpress/components';
import { rawShortcut, displayShortcut } from '@wordpress/keycodes';
import {
    BlockControls,
    InspectorControls,
    RichText,
    __experimentalLinkControl as LinkControl,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';
import { isURL, prependHTTP } from '@wordpress/url';
import { Fragment, useState, useEffect, useRef } from '@wordpress/element';
import { placeCaretAtHorizontalEdge } from '@wordpress/dom';
import {
    link as linkIcon,
    formatIndent as moreIcon,
    plusCircle as expandInlineIcon,
} from '@wordpress/icons';

/**
 * Internal dependencies
 */

import { BlockInserterButton } from 'shared';

const getColorName = (color, colors) => {
    const matched = colors.filter(c => c.color === color);
    if (1 <= matched.length) {
        return `${matched[0].name}`;
    }
    return null;
};

/**
 * Given the Link block's type attribute, return the query params to give to
 * /wp/v2/search.
 *
 * @param {string} type Link block's type attribute.
 * @return {{ type?: string, subtype?: string }} Search query params.
 */
const getSuggestionsQuery = type => {
    switch (type) {
        case 'page':
            return { type: 'post', subtype: 'page' };
        case 'topic':
            return { type: 'term', subtype: 'topic' };
        case 'formats':
            return { type: 'term', subtype: 'formats' };
        case 'programs':
            return { type: 'term', subtype: 'programs' };
        default:
            return {};
    }
};

const SubMenu = ({ type, close, clientId, linkType }) => {
    const capitalize = s => {
        if ('string' !== typeof s) return '';
        return s.charAt(0).toUpperCase() + s.slice(1);
    };

    const innerBlocksProps = useInnerBlocksProps(
        {
            className: classnames({
                list: 'inline' === type,
            }),
            style:
                'dropdown' === type
                    ? { width: '200px', padding: '0 1em 1em 1em', zIndex: 2 }
                    : null,
        },
        {
            allowedBlocks: ['prc-block/menu-link'],
            orientation: 'vertical',
            __experimentalCaptureToolbars: 'dropdown' === type,
            templateLock: false,
            renderAppender: () => (
                <BlockInserterButton
                    label={__(`Add New ${capitalize(type)} Item`)}
                    blockName="prc-block/menu-link"
                    attributes={{ type: linkType }}
                    clientId={clientId}
                />
            ),
        },
    );

    if ('inline' === type) {
        return <div {...innerBlocksProps} />;
    }

    return (
        <Popover
            position="bottom center"
            onFocusOutside={() => null}
            onClose={close}
            style={{ zIndex: 1 }}
        >
            <div {...innerBlocksProps} />
        </Popover>
    );
};

const edit = ({
    attributes,
    isSelected,
    setAttributes,
    clientId,
    mergeBlocks,
    onReplace,
}) => {
    const {
        className,
        color,
        label,
        type,
        opensInNewTab,
        url,
        description,
        rel,
        title,
        subMenuEnabled,
    } = attributes;

    const link = {
        url,
        opensInNewTab,
    };

    const {
        subMenuType,
        allowSubMenu,
        parentBlockName,
        rootBlockName,
    } = useSelect(select => {
        const {
            getBlockHierarchyRootClientId,
            getBlockRootClientId,
            getBlock,
        } = select('core/block-editor');
        const parentBlock = getBlock(getBlockRootClientId(clientId));
        const rootBlock = getBlock(getBlockHierarchyRootClientId(clientId));
        return {
            allowSubMenu:
                null !== parentBlock &&
                parentBlock.hasOwnProperty('name') &&
                [
                    'prc-block/menu',
                    'prc-block/taxonomy-tree',
                    'prc-block/taxonomy-tree-more',
                ].includes(parentBlock.name),
            subMenuType:
                null !== parentBlock &&
                parentBlock.hasOwnProperty('name') &&
                'prc-block/menu' === parentBlock.name
                    ? 'dropdown'
                    : 'inline',
            rootBlockName:
                null !== rootBlock && rootBlock.hasOwnProperty('name')
                    ? rootBlock.name
                    : null,
            parentBlockName:
                null !== parentBlock && parentBlock.hasOwnProperty('name')
                    ? parentBlock.name
                    : null,
        };
    }, []);

    const [isLinkOpen, setIsLinkOpen] = useState(false);
    const [isSubMenuOpen, setIsSubMenuOpen] = useState(false);
    const listItemRef = useRef(null);
    const itemLabelPlaceholder = __('Add link…');
    const ref = useRef();

    /**
     * Focus the Link label text and select it.
     */
    const selectLabelText = () => {
        ref.current.focus();
        const { ownerDocument } = ref.current;
        const { defaultView } = ownerDocument;
        const selection = defaultView.getSelection();
        const range = ownerDocument.createRange();
        // Get the range of the current ref contents so we can add this range to the selection.
        range.selectNodeContents(ref.current);
        selection.removeAllRanges();
        selection.addRange(range);
    };

    // Show the LinkControl on mount if the URL is empty
    // ( When adding a new menu item)
    // This can't be done in the useState call because it conflicts
    // with the autofocus behavior of the BlockListBlock component.
    useEffect(() => {
        if (!url) {
            setIsLinkOpen(true);
        }
        setAttributes({
            rootBlockName,
            parentBlockName,
        });
    }, []);

    /**
     * The hook shouldn't be necessary but due to a focus loss happening
     * when selecting a suggestion in the link popover, we force close on block unselection.
     */
    useEffect(() => {
        if (!isSelected) {
            setIsLinkOpen(false);
        }
    }, [isSelected]);

    // If the LinkControl popover is open and the URL has changed, close the LinkControl and focus the label text.
    useEffect(() => {
        if (isLinkOpen && url) {
            // Does this look like a URL and have something TLD-ish?
            if (isURL(prependHTTP(label)) && /^.+\.[a-z]+/.test(label)) {
                // Focus and select the label text.
                selectLabelText();
            } else {
                // Focus it (but do not select).
                placeCaretAtHorizontalEdge(ref.current, true);
            }
        }
    }, [url]);

    /**
     * Style constants
     */
    const buttonColors = [
        { name: 'primary', color: '#2185d0' },
        { name: 'secondary', color: '#000' },
        { name: 'mustard', color: '#d3aa20' },
        { name: 'basic', color: '#fff' },
    ];
    const isButton = 'is-style-button' === className;
    const isMenuItem = ['prc-block/menu', 'prc-block/menu-link'].includes(
        parentBlockName,
    );
    const isListItem = [
        'prc-block/taxonomy-tree',
        'prc-block/taxonomy-tree-more',
    ].includes(parentBlockName);

    /**
     * If toggling between button style, if no longer a button clear the color
     */
    useEffect(() => {
        if (!isButton) {
            setAttributes({ color: null });
        } else if (
            'prc-block/menu' === parentBlockName &&
            (null === color || undefined === color)
        ) {
            setAttributes({ color: '#fff' });
        }
    }, [isButton]);

    const blockProps = useBlockProps({
        ref: listItemRef,
        className: classnames(className, getColorName(color, buttonColors), {
            item: !isButton || isListItem || isMenuItem,
            'ui button': isButton && !(isListItem || isMenuItem),
        }),
    });

    return (
        <Fragment>
            <BlockControls>
                <ToolbarGroup>
                    <KeyboardShortcuts
                        bindGlobal
                        shortcuts={{
                            [rawShortcut.primary('k')]: () =>
                                setIsLinkOpen(true),
                        }}
                    />
                    <ToolbarButton
                        name="link"
                        icon={linkIcon}
                        title={__('Link')}
                        shortcut={displayShortcut.primary('k')}
                        onClick={() => setIsLinkOpen(true)}
                    />
                    {true === allowSubMenu && (
                        <ToolbarButton
                            name="sub-menu"
                            icon={moreIcon}
                            title={__('Sub Menu')}
                            isActive={isSubMenuOpen}
                            onClick={() => {
                                if (false === subMenuEnabled) {
                                    setAttributes({ subMenuEnabled: true });
                                }
                                setIsSubMenuOpen(!isSubMenuOpen);
                            }}
                        />
                    )}
                </ToolbarGroup>
            </BlockControls>

            <InspectorControls>
                <PanelBody title={__('Link settings')}>
                    <TextareaControl
                        value={description || ''}
                        onChange={descriptionValue => {
                            setAttributes({ description: descriptionValue });
                        }}
                        label={__('Description')}
                        help={__(
                            'The description will be displayed where supported.',
                        )}
                    />
                    <TextControl
                        value={title || ''}
                        onChange={titleValue => {
                            setAttributes({ title: titleValue });
                        }}
                        label={__('Link title')}
                        autoComplete="off"
                    />
                    <TextControl
                        value={rel || ''}
                        onChange={relValue => {
                            setAttributes({ rel: relValue });
                        }}
                        label={__('Link rel')}
                        autoComplete="off"
                    />
                    {true === allowSubMenu && (
                        <ToggleControl
                            checked={subMenuEnabled}
                            onChange={() => {
                                setAttributes({
                                    subMenuEnabled: !subMenuEnabled,
                                });
                            }}
                            label={__('Enable Sub Menu')}
                        />
                    )}
                </PanelBody>
                {isButton && (
                    <PanelBody title={__('Button Style Options')}>
                        <ColorPalette
                            colors={buttonColors}
                            value={color}
                            onChange={c => {
                                setAttributes({ color: c });
                            }}
                            disableCustomColors
                        />
                    </PanelBody>
                )}
            </InspectorControls>

            <div {...blockProps}>
                <Flex>
                    <FlexItem>
                        <RichText
                            ref={ref}
                            identifier="label"
                            className={
                                undefined !== parentBlockName &&
                                'prc-block/menu' === parentBlockName &&
                                isButton
                                    ? `ui ${getColorName(
                                          color,
                                          buttonColors,
                                      )} button`
                                    : ''
                            }
                            value={label}
                            onChange={labelValue =>
                                setAttributes({ label: labelValue })
                            }
                            onMerge={mergeBlocks}
                            onReplace={onReplace}
                            aria-label={__('Menu link text')}
                            placeholder={itemLabelPlaceholder}
                            keepPlaceholderOnFocus
                            withoutInteractiveFormatting
                            allowedFormats={['bold']}
                        />
                    </FlexItem>
                    <FlexBlock>
                        {true === subMenuEnabled &&
                            'inline' === subMenuType && (
                                <Button
                                    isTertiary
                                    isPressed={isSubMenuOpen}
                                    icon={expandInlineIcon}
                                    onClick={() =>
                                        setIsSubMenuOpen(!isSubMenuOpen)
                                    }
                                />
                            )}
                    </FlexBlock>
                </Flex>

                {isLinkOpen && (
                    <Popover
                        position="bottom center"
                        onClose={() => setIsLinkOpen(false)}
                    >
                        <LinkControl
                            className="wp-block-navigation-link__inline-link-input"
                            value={link}
                            showInitialSuggestions
                            noDirectEntry={!!type}
                            noURLSuggestion={!!type}
                            suggestionsQuery={getSuggestionsQuery(type)}
                            onChange={({
                                title: newTitle = '',
                                url: newURL = '',
                                opensInNewTab: newOpensInNewTab,
                                id,
                            } = {}) =>
                                setAttributes({
                                    url: encodeURI(newURL),
                                    label: (() => {
                                        const normalizedTitle = newTitle.replace(
                                            /http(s?):\/\//gi,
                                            '',
                                        );
                                        const normalizedURL = newURL.replace(
                                            /http(s?):\/\//gi,
                                            '',
                                        );
                                        if (
                                            '' !== newTitle &&
                                            normalizedTitle !== normalizedURL &&
                                            label !== newTitle
                                        ) {
                                            return escape(newTitle);
                                        }
                                        if (label) {
                                            return label;
                                        }
                                        // If there's no label, add the URL.
                                        return escape(normalizedURL);
                                    })(),
                                    opensInNewTab: newOpensInNewTab,
                                    id,
                                })
                            }
                        />
                    </Popover>
                )}
                {true === subMenuEnabled && true === isSubMenuOpen && (
                    <SubMenu
                        type={subMenuType}
                        close={() => setIsSubMenuOpen(!isSubMenuOpen)}
                        clientId={clientId}
                        linkType={type}
                    />
                )}
            </div>
        </Fragment>
    );
};

export default edit;
