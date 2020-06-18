import { __ } from '@wordpress/i18n';
import {
    InspectorControls,
    RichText,
    InnerBlocks,
} from '@wordpress/block-editor';
import { PanelBody, ColorPalette } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import classNames from 'classnames/bind';
// import Icon from './icons';

const allowedBlocks = [
    'prc-block/button',
    'prc-block/mailchimp-form',
    'prc-blocks/pathways-ask-an-analyst',
];
const template = [
    ['prc-block/button', { color: '#d3aa20', label: 'DONATE', url: '' }],
];

const SidebarControls = ({ backgroundColor, borderColor, setAttributes }) => {
    const bgDefaults = [
        { name: 'Oatmeal', color: '#F7F7F2' },
        { name: 'Gray', color: '#F8F8F8' },
        { name: 'White', color: '#FFF' },
    ];
    const borderDefaults = [
        { name: 'Oatmeal', color: '#E2E2E2' },
        // { name: 'Oatmeal (dark)', color: '#D5D5CD' },
        { name: 'Gray', color: '#D8D8D8' },
        { name: 'White', color: '#FFF' },
        { name: 'Black', color: '#000' },
    ];

    return (
        <InspectorControls>
            <PanelBody title={__('Promo Design Options')}>
                <div>
                    <p>
                        <strong>Background Color:</strong>
                    </p>
                    <ColorPalette
                        colors={bgDefaults}
                        value={backgroundColor}
                        onChange={c => setAttributes({ backgroundColor: c })}
                        disableCustomColors
                    />
                </div>
                <div>
                    <p>
                        <strong>Border Color:</strong>
                    </p>
                    <ColorPalette
                        colors={borderDefaults}
                        value={borderColor}
                        onChange={c => setAttributes({ borderColor: c })}
                        disableCustomColors
                    />
                </div>
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
    // If width is greater than 640 then set to "pancake" (horizontal flex).
    const domBlock = document.querySelector(`[data-block="${clientId}"]`);
    if (true === isSelected && null !== domBlock) {
        const width = domBlock.clientWidth;

        if (640 <= width) {
            setAttributes({ pancake: true });
        } else {
            setAttributes({ pancake: false });
        }
    }

    const {
        header,
        description,
        backgroundColor,
        borderColor,
        pancake,
    } = attributes;
    const classes = classNames(className, { pancake });

    return (
        <Fragment>
            <SidebarControls
                bgColor={backgroundColor}
                borderColor={borderColor}
                setAttributes={setAttributes}
            />
            <div className={classes} style={{ borderColor, backgroundColor }}>
                <div className="text">
                    <RichText
                        tagName="h2" // The tag here is the element output and editable in the admin
                        value={header} // Any existing content, either from the database or an attribute default
                        onChange={h => setAttributes({ header: h })} // Store updated content as a block attribute
                        placeholder="Facts are more important than ever." // Display this text before any content has been added by the user
                        formattingControls={[]}
                        keepPlaceholderOnFocus
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
