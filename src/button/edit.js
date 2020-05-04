import { __ } from '@wordpress/i18n';
import { InspectorControls, RichText } from '@wordpress/block-editor';
import { PanelBody, ColorPalette, TextControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import classNames from 'classnames/bind';
import colors from './colors';
import { getColorName } from '../_shared';

const SidebarControls = ({ color, url, setAttributes }) => {
    return (
        <InspectorControls>
            <PanelBody title={__('Button Design Options')}>
                <div>
                    <p>
                        <strong>Color:</strong>
                    </p>
                    <ColorPalette
                        colors={colors}
                        value={color}
                        onChange={c => {
                            setAttributes({ color: c });
                        }}
                        disableCustomColors
                    />
                </div>
                <div>
                    <TextControl
                        label="URL"
                        value={url}
                        onChange={u => setAttributes({ url: u })}
                    />
                </div>
            </PanelBody>
        </InspectorControls>
    );
};

const edit = props => {
    const {
        attributes,
        className,
        isSelected,
        clientId,
        setAttributes,
    } = props;

    const { color, label, url } = attributes;

    const classes = classNames(
        className,
        getColorName(color, colors),
        'ui',
        'button',
    );

    return (
        <Fragment>
            <SidebarControls
                color={color}
                url={url}
                setAttributes={setAttributes}
            />
            <RichText
                tagName="a" // The tag here is the element output and editable in the admin
                value={label} // Any existing content, either from the database or an attribute default
                onChange={t => setAttributes({ label: t })} // Store updated content as a block attribute
                placeholder="Button Label" // Display this text before any content has been added by the user
                formattingControls={[]}
                className={classes}
            />
        </Fragment>
    );
};

export default edit;
