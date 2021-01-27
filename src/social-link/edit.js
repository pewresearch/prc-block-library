/**
 * External dependencies
 */
import classnames from 'classnames';
import { Icon } from 'semantic-ui-react';
/**
 * WordPress dependencies
 */
import {
    useSelect,
    useDispatch,
    withDispatch,
    withSelect,
} from '@wordpress/data';
import {
    PanelBody,
    SelectControl,
    TextControl,
    TextareaControl,
    ToolbarButton,
    ToolbarGroup,
} from '@wordpress/components';
import { __, sprintf } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Fragment, useState, useEffect } from '@wordpress/element';

const isStyle = (needle, haystack) => {
    const arr = haystack.split(' ');
    return arr.includes(needle);
};

const edit = ({
    attributes,
    setAttributes,
    className,
    isSelected,
    clientId,
    context,
}) => {
    const { description, label, title, icon, url } = attributes;
    const blockProps = useBlockProps({
        className: classnames('item', className, {
            'is-selected': isSelected,
        }),
    });

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title={__('Link settings')}>
                    <TextareaControl
                        value={description || ''}
                        onChange={descriptionValue => {
                            setAttributes({ description: descriptionValue });
                        }}
                        label={__('Description')}
                        help={__(
                            'The description will be displayed in the menu if the current theme supports it.',
                        )}
                    />
                    <TextControl
                        value={title || ''}
                        onChange={titleValue => {
                            setAttributes({ title: titleValue });
                        }}
                        label={__('Link title')}
                        autoComplete="off"
                    />
                    <SelectControl
                        label="Select Icon"
                        value={icon}
                        options={[
                            { label: '(Click to select icon)', value: '' },
                            { label: 'Facebook', value: 'facebook' },
                            { label: 'Twitter', value: 'twitter' },
                            { label: 'LinkedIn', value: 'linkedin' },
                            { label: 'Print', value: 'print' },
                        ]}
                        onChange={i => setAttributes({ icon: i })}
                    />
                </PanelBody>
            </InspectorControls>

            <div {...blockProps}>
                <Icon name={icon} />
            </div>
        </Fragment>
    );
};

export default edit;
