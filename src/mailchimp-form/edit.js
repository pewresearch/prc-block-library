import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, PanelRow, SelectControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import MailchimpForm from './component';

const { interests } = window.prcMailchimpForm;

const SidebarControls = ({ interest, setAttributes }) => {
    return (
        <InspectorControls>
            <PanelBody title={__('Mailchimp Form Options')}>
                <PanelRow>
                    <SelectControl
                        label="Choose Newsletter"
                        value={interest}
                        options={interests}
                        onChange={id => {
                            setAttributes({ interest: id });
                        }}
                    />
                </PanelRow>
            </PanelBody>
        </InspectorControls>
    );
};

const edit = props => {
    const { attributes, setAttributes } = props;
    const { interest, className } = attributes;
    const formProps = {
        display: false,
        interest,
    };
    return (
        <Fragment>
            <SidebarControls
                interest={interest}
                setAttributes={setAttributes}
            />
            <MailchimpForm {...formProps} className={className} />
        </Fragment>
    );
};

export default edit;
