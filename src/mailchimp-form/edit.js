import { __ } from '@wordpress/i18n';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, SelectControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';
import MailchimpForm from './component';

const { interests } = window.prcMailchimpForm;

const SidebarControls = ({ interest, setAttributes }) => {
    return (
        <InspectorControls>
            <PanelBody title={__('Mailchimp Form Options')}>
                <div>
                    <SelectControl
                        label="Choose Newsletter"
                        value={interest}
                        options={interests}
                        onChange={id => {
                            setAttributes({ interest: id });
                        }}
                    />
                </div>
            </PanelBody>
        </InspectorControls>
    );
};


const edit = props => {
    const { attributes, setAttributes } = props;
    const { interest } = attributes;
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
            <MailchimpForm {...formProps} />
        </Fragment>
    );
};

export default edit;