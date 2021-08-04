/**
 * External Dependencies
 */
import classnames from 'classnames';
import { mailChimpInterests } from '@pewresearch/app-components';
/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { ColorPalette, PanelBody, PanelRow, SelectControl } from '@wordpress/components';
import { Fragment, useEffect } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import MailchimpForm from './component';

const BUTTON_COLORS = [
    { name: 'primary', color: '#2185d0' },
    { name: 'secondary', color: '#000' },
    { name: 'mustard', color: '#d3aa20' },
    { name: 'basic', color: '#fff' },
];

const SidebarControls = ({ interest, buttonColor, setAttributes, context }) => {
    const hasDarkBackground = context['promo/hasDarkBackground'];
    
    useEffect(() => {
        if ( buttonColor.length <= 0 && hasDarkBackground ) {
            setAttributes({
                buttonColor: '#d3aa20',
            });
        }
    }, [ buttonColor, hasDarkBackground ]);

    return (
        <InspectorControls>
            <PanelBody title={__('Mailchimp Form Options')}>
                <PanelRow>
                    <SelectControl
                        label="Choose Newsletter"
                        value={interest}
                        options={mailChimpInterests}
                        onChange={id => {
                            setAttributes({ interest: id });
                        }}
                    />
                </PanelRow>
                <PanelRow>
                    <ColorPalette
                        colors={BUTTON_COLORS}
                        value={buttonColor}
                        onChange={c => {
                            setAttributes({ buttonColor: c });
                        }}
                        disableCustomColors
                    />
                </PanelRow>
            </PanelBody>
        </InspectorControls>
    );
};

const edit = ({ attributes, setAttributes, context }) => {
    const { interest, buttonColor, className } = attributes;
    const componentProps = {
        display: false,
        interest,
        buttonColor,
        blockProps: useBlockProps({
            className: classnames(className),
        }),
    };
    return (
        <Fragment>
            <SidebarControls
                interest={interest}
                buttonColor={buttonColor}
                setAttributes={setAttributes}
                context={context}
            />
            <MailchimpForm {...componentProps} />
        </Fragment>
    );
};

export default edit;
