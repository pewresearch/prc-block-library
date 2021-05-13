/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import {
    PanelBody,
    PanelRow,
    ToggleControl,
    HorizontalRule,
} from '@wordpress/components';

/**
 * Internal dependencies
 */
import Form from './form';
import mailChimpInterests from '../_shared/data/mailchimp-interests';

const edit = ({ attributes, setAttributes }) => {
    const { interests, className } = attributes;
    const [selected, setSelected] = useState(interests);

    const blockProps = useBlockProps({
        className: classnames(className),
    });

    const updateSelection = s => {
        const tmp = selected;
        if (tmp.includes(s)) {
            const index = tmp.indexOf(s);
            if (-1 !== index) {
                tmp.splice(index, 1);
            }
        } else {
            tmp.push(s);
        }
        setAttributes({ interests: tmp });
        setSelected([...tmp]);
    };

    return (
        <div {...blockProps}>
            <InspectorControls>
                <PanelBody title={__('Mailchimp Interests')}>
                    <PanelRow>
                        <div>
                            {mailChimpInterests.map(i => {
                                return false !== i.value ? (
                                    <ToggleControl
                                        label={i.label}
                                        checked={selected.includes(i.value)}
                                        onChange={() =>
                                            updateSelection(i.value)
                                        }
                                    />
                                ) : (
                                    <HorizontalRule />
                                );
                            })}
                        </div>
                    </PanelRow>
                </PanelBody>
            </InspectorControls>

            <Form interests={mailChimpInterests} selected={selected} />
        </div>
    );
};

export default edit;
