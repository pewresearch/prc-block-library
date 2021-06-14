/**
 * External dependencies
 */
import classnames from 'classnames';
import {mailChimpInterests} from '@pewresearch/app-components';
/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { PanelBody, PanelRow, SelectControl } from '@wordpress/components';
import { Fragment } from '@wordpress/element';

/**
 * Internal dependencies
 */
import MailchimpForm from './component';

const SidebarControls = ({ interest, setAttributes }) => {
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
            </PanelBody>
        </InspectorControls>
    );
};

const edit = ({ attributes, setAttributes }) => {
    const { interest, className } = attributes;
    const componentProps = {
        display: false,
        interest,
        blockProps: useBlockProps({
            className: classnames(className),
        }),
    };
    return (
        <Fragment>
            <SidebarControls
                interest={interest}
                setAttributes={setAttributes}
            />
            <MailchimpForm {...componentProps} />
        </Fragment>
    );
};

export default edit;
