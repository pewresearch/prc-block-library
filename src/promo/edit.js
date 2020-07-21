import { __ } from '@wordpress/i18n';
import {
    InspectorControls,
    RichText,
    InnerBlocks,
} from '@wordpress/block-editor';
import { withSelect } from '@wordpress/data';
import {
    PanelBody,
    PanelRow,
    ColorPalette,
    ToggleControl,
    SelectControl,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import classNames from 'classnames/bind';

import Icon from './icons';

const allowedBlocks = [
    'prc-block/button',
    'prc-block/mailchimp-form',
    'prc-blocks/pathways-ask-an-analyst',
];
const template = [
    ['prc-block/button', { color: '#d3aa20', label: 'DONATE', url: '' }],
];

const SidebarControls = ({
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
        // { name: 'Oatmeal (dark)', color: '#D5D5CD' },
        { name: 'Gray', color: '#D8D8D8' },
        { name: 'Black', color: '#000' },
    ];

    return (
        <InspectorControls>
            <PanelBody title={__('Promo Design Options')}>
                <PanelRow>
                    <p>
                        <strong>Background Color:</strong>
                    </p>
                    <ColorPalette
                        colors={bgDefaults}
                        value={backgroundColor}
                        onChange={c => setAttributes({ backgroundColor: c })}
                        disableCustomColors
                    />
                </PanelRow>
                <PanelRow>
                    <p>
                        <strong>Border Color:</strong>
                    </p>
                    <ColorPalette
                        colors={borderDefaults}
                        value={borderColor}
                        onChange={c => setAttributes({ borderColor: c })}
                        disableCustomColors
                    />
                </PanelRow>
                <PanelRow>
                    <SelectControl
                        label="Choose Icon"
                        value={icon}
                        options={[
                            { label: 'None', value: '' },
                            { label: 'Mail', value: 'mail' },
                            { label: 'Election', value: 'election' },
                        ]}
                        onChange={i => setAttributes({ icon: i })}
                    />
                </PanelRow>
                <PanelRow>
                    <ToggleControl
                        label="Sans Serif Font"
                        checked={sansSerif}
                        onChange={() =>
                            setAttributes({ sansSerif: !sansSerif })
                        }
                    />
                </PanelRow>
            </PanelBody>
        </InspectorControls>
    );
};

const edit = ({
    attributes,
    className,
    setAttributes,
    hasChildBlocks,
    isSelected,
}) => {
    const {
        header,
        description,
        backgroundColor,
        borderColor,
        sansSerif,
        icon,
    } = attributes;
    const classes = classNames(className);
    const fontFamily = classNames({ 'sans-serif': sansSerif });

    return (
        <Fragment>
            <SidebarControls
                backgroundColor={backgroundColor}
                borderColor={borderColor}
                sansSerif={sansSerif}
                icon={icon}
                setAttributes={setAttributes}
            />
            <div className={classes} style={{ borderColor, backgroundColor }}>
                {'' !== icon && (
                    <div className="icon">
                        <Icon icon={icon} />
                    </div>
                )}
                <div className="text">
                    <RichText
                        tagName="h2"
                        value={header}
                        onChange={h => setAttributes({ header: h })}
                        placeholder="Facts are more important than ever."
                        allowedFormats={['core/italic']}
                        keepPlaceholderOnFocus
                        className={fontFamily}
                    />
                    {true === isSelected && (
                        <RichText
                            tagName="div"
                            value={description}
                            onChange={d => setAttributes({ description: d })}
                            placeholder="In times of uncertainty, good decisions demand good data. Please support our research with a financial contribution."
                            multiline="p"
                            allowedFormats={['core/bold', 'core/italic']}
                            keepPlaceholderOnFocus
                            className={fontFamily}
                        />
                    )}
                    {true !== isSelected && '<p></p>' !== description && (
                        <RichText
                            tagName="div"
                            value={description}
                            onChange={d => setAttributes({ description: d })}
                            placeholder="In times of uncertainty, good decisions demand good data. Please support our research with a financial contribution."
                            multiline="p"
                            allowedFormats={['core/bold', 'core/italic']}
                            keepPlaceholderOnFocus
                            className={fontFamily}
                        />
                    )}
                </div>
                <div className="action">
                    {true === isSelected && (
                        <InnerBlocks
                            allowedBlocks={allowedBlocks}
                            renderAppender={
                                hasChildBlocks
                                    ? undefined
                                    : () => <InnerBlocks.ButtonBlockAppender />
                            }
                        />
                    )}
                    {true !== isSelected && true === hasChildBlocks && (
                        <InnerBlocks
                            allowedBlocks={allowedBlocks}
                            renderAppender={false}
                        />
                    )}
                </div>
            </div>
        </Fragment>
    );
};

export default withSelect((select, ownProps) => {
    const { clientId } = ownProps;
    const { getBlockOrder } = select('core/block-editor');
    return {
        hasChildBlocks: 0 < getBlockOrder(clientId).length,
    };
})(edit);
