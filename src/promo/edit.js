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
    RichText,
    InnerBlocks,
    InspectorControls,
    __experimentalUseInnerBlocksProps as useInnerBlocksProps,
    useBlockProps,
} from '@wordpress/block-editor';
import {
    BaseControl,
    PanelBody,
    PanelRow,
    ColorPalette,
    ToggleControl,
    SelectControl,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import Icon from './icons';

const ALLOWED_BLOCKS = [
    'prc-block/menu-link',
    'prc-block/mailchimp-form',
    'prc-blocks/pathways-ask-an-analyst',
];

const Controls = ({
    backgroundColor,
    borderColor,
    sansSerif,
    icon,
    setAttributes,
}) => {
    const bgDefaults = [
        { name: 'Oatmeal', color: '#F7F7F2' },
        { name: 'Gray', color: '#F8F8F8' },
    ];
    const borderDefaults = [
        { name: 'Oatmeal', color: '#E2E2E2' },
        { name: 'Gray', color: '#D8D8D8' },
        { name: 'Black', color: '#000' },
    ];

    return (
        <InspectorControls>
            <PanelBody title={__('Promo Design Options')}>
                <BaseControl label="Background Color">
                    <ColorPalette
                        colors={bgDefaults}
                        value={backgroundColor}
                        onChange={c => setAttributes({ backgroundColor: c })}
                        disableCustomColors
                    />
                </BaseControl>
                <BaseControl label="Border Color">
                    <ColorPalette
                        colors={borderDefaults}
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
                        { label: 'Donate', value: 'donate' },
                        { label: 'Election', value: 'election' },
                        { label: 'Mail', value: 'mail' },
                    ]}
                    onChange={i => setAttributes({ icon: i })}
                />
                <ToggleControl
                    label="Sans Serif Font"
                    checked={sansSerif}
                    onChange={() => setAttributes({ sansSerif: !sansSerif })}
                />
            </PanelBody>
        </InspectorControls>
    );
};

const edit = ({ attributes, setAttributes, isSelected, clientId }) => {
    const {
        className,
        heading,
        headingSize,
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

    const hasChildBlocks = false;

    const style = { borderColor, backgroundColor };
    if (isSelected && !borderColor) {
        style.borderColor = '#eaeaea';
    }

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
                ? InnerBlocks.ButtonBlockerAppender
                : false,
        },
    );

    return (
        <Fragment>
            <Controls
                {...{
                    backgroundColor,
                    borderColor,
                    sansSerif,
                    icon,
                    setAttributes,
                }}
            />
            <div {...blockProps}>
                {(isSelected || '' !== icon) && (
                    <div className="icon">
                        <Icon icon={icon} />
                    </div>
                )}
                <div className="text">
                    <RichText
                        tagName={`h${headingSize}`}
                        value={heading}
                        onChange={h => setAttributes({ heading: h })}
                        placeholder={__(`Facts are more important than ever.`)}
                        keepPlaceholderOnFocus
                        className={sansSerif ? 'sans-serif' : null}
                    />
                    {true === (isSelected || '' !== description) && (
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
                <div {...innerBlocksProps} />
            </div>
        </Fragment>
    );
};

export default edit;
