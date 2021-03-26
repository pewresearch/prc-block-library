/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useEffect } from '@wordpress/element';
import {
    BlockControls,
    RichText,
    InnerBlocks,
    InspectorControls,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';
import { useSelect } from '@wordpress/data';
import {
    BaseControl,
    PanelBody,
    ColorPalette,
    ToggleControl,
    SelectControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import { HeadingLevelToolbar } from 'shared';
import Icon from './icons';

const ALLOWED_BLOCKS = [
    'prc-block/menu-link',
    'prc-block/mailchimp-form',
    'prc-blocks/pathways-ask-an-analyst',
];

const BG_COLORS = [
    { name: 'Oatmeal', color: '#F7F7F2' },
    { name: 'Gray', color: '#F8F8F8' },
];
const BORDER_COLORS = [
    { name: 'Oatmeal', color: '#E2E2E2' },
    { name: 'Gray', color: '#D8D8D8' },
    { name: 'Black', color: '#000' },
];

const Controls = ({
    backgroundColor,
    borderColor,
    headingLevel,
    sansSerif,
    icon,
    setAttributes,
}) => {
    return (
        <Fragment>
            <BlockControls>
                <HeadingLevelToolbar
                    selectedLevel={headingLevel}
                    onChange={newLevel =>
                        setAttributes({ headingLevel: newLevel })
                    }
                />
            </BlockControls>
            <InspectorControls>
                <PanelBody title={__('Promo Design Options')}>
                    <BaseControl label="Background Color">
                        <ColorPalette
                            colors={BG_COLORS}
                            value={backgroundColor}
                            onChange={c =>
                                setAttributes({ backgroundColor: c })
                            }
                            disableCustomColors
                        />
                    </BaseControl>
                    <BaseControl label="Border Color">
                        <ColorPalette
                            colors={BORDER_COLORS}
                            value={borderColor}
                            onChange={c => setAttributes({ borderColor: c })}
                            disableCustomColors
                        />
                    </BaseControl>
                    <SelectControl
                        label="Choose Icon"
                        value={icon}
                        options={[
                            { label: 'None', value: '' },
                            { label: 'Audio', value: 'audio' },
                            { label: 'Donate', value: 'donate' },
                            { label: 'Election', value: 'election' },
                            { label: 'Mail', value: 'mail' },
                        ]}
                        onChange={i => setAttributes({ icon: i })}
                    />
                    <ToggleControl
                        label="Sans Serif Font"
                        checked={sansSerif}
                        onChange={() =>
                            setAttributes({ sansSerif: !sansSerif })
                        }
                    />
                </PanelBody>
            </InspectorControls>
        </Fragment>
    );
};

const edit = ({ attributes, setAttributes, isSelected, clientId }) => {
    const {
        className,
        heading,
        headingLevel,
        description,
        backgroundColor,
        borderColor,
        sansSerif,
        icon,
        header,
    } = attributes;

    useEffect(() => {
        // Quickly migrate the attribute value.
        if ('' !== header) {
            setAttributes({ heading: header, header: '' });
        }
    }, [header]);

    const hasDescription =
        undefined !== description &&
        '' !== description &&
        '<p></p>' !== description;

    const hasIcon = undefined !== icon && '' !== icon;

    const hasChildBlocks = useSelect(
        select =>
            0 < select('core/block-editor').getBlockOrder(clientId).length,
        [clientId],
    );

    const style = { borderColor, backgroundColor };

    const blockProps = useBlockProps({
        className: classnames(className), // wp-block-prc-block-promo
        style,
    });

    const innerBlocksProps = useInnerBlocksProps(
        {
            className: 'action',
        },
        {
            allowedBlocks: ALLOWED_BLOCKS,
            orientation: 'vertical',
            templateLock: false,
            renderAppender: !hasChildBlocks
                ? InnerBlocks.ButtonBlockAppender
                : false,
        },
    );

    return (
        <Fragment>
            <Controls
                {...{
                    backgroundColor,
                    borderColor,
                    headingLevel,
                    sansSerif,
                    icon,
                    setAttributes,
                }}
            />
            <div {...blockProps}>
                {hasIcon && (
                    <div className="icon">
                        <Icon icon={icon} />
                    </div>
                )}
                <div className="text">
                    <RichText
                        tagName={`h${headingLevel}`}
                        value={heading}
                        onChange={h => setAttributes({ heading: h })}
                        placeholder={__(`Facts are more important than ever.`)}
                        keepPlaceholderOnFocus
                        className={sansSerif ? 'sans-serif' : null}
                    />
                    {true === (isSelected || hasDescription) && (
                        <RichText
                            tagName="div"
                            value={description}
                            onChange={d => setAttributes({ description: d })}
                            placeholder={__(
                                `In times of uncertainty, good decisions demand good data. Please support our research with a financial contribution.`,
                            )}
                            multiline="p"
                            keepPlaceholderOnFocus
                            className={sansSerif ? 'sans-serif' : null}
                        />
                    )}
                </div>
                {true === (isSelected || hasChildBlocks) && (
                    <div {...innerBlocksProps} />
                )}
            </div>
        </Fragment>
    );
};

export default edit;
