import { __ } from '@wordpress/i18n';
import {
    InspectorControls,
    RichText,
    InnerBlocks,
} from '@wordpress/block-editor';
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
    clientId,
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
                bgColor={backgroundColor}
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
                        tagName="h2" // The tag here is the element output and editable in the admin
                        value={header} // Any existing content, either from the database or an attribute default
                        onChange={h => setAttributes({ header: h })} // Store updated content as a block attribute
                        placeholder="Facts are more important than ever." // Display this text before any content has been added by the user
                        formattingControls={[]}
                        keepPlaceholderOnFocus
                        className={fontFamily}
                    />
                    <RichText
                        tagName="div" // The tag here is the element output and editable in the admin
                        value={description} // Any existing content, either from the database or an attribute default
                        onChange={d => setAttributes({ description: d })} // Store updated content as a block attribute
                        placeholder="In times of uncertainty, good decisions demand good data. Please support our research with a financial contribution." // Display this text before any content has been added by the user
                        // formattingControls={[]}
                        multiline="p"
                        allowedFormats={['core/bold', 'core/italic']}
                        keepPlaceholderOnFocus
                        className={fontFamily}
                    />
                </div>
                <div className="action">
                    <InnerBlocks
                        allowedBlocks={allowedBlocks}
                        template={template}
                    />
                </div>
            </div>
        </Fragment>
    );
};

export default edit;
