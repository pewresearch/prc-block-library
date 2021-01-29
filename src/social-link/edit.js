/**
 * External dependencies
 */
import classnames from 'classnames';
import { Icon } from 'semantic-ui-react';
/**
 * WordPress dependencies
 */
import { useSelect } from '@wordpress/data';
import {
    PanelBody,
    SelectControl,
    TextControl,
    TextareaControl,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { InspectorControls, useBlockProps } from '@wordpress/block-editor';
import { Fragment, useEffect } from '@wordpress/element';

const edit = ({ attributes, setAttributes, className, isSelected }) => {
    const { description, label, title, icon, url } = attributes;
    const blockProps = useBlockProps({
        className: classnames('item', className, {
            'is-selected': isSelected,
        }),
    });

    const { postId, postTitle, shortUrl } = useSelect(select => {
        const { bitly } = select('core/editor').getEditedPostAttribute('meta');
        return {
            postTitle: select('core/editor').getEditedPostAttribute('title'),
            postId: select('core/editor').getCurrentPostId(),
            shortUrl: bitly,
        };
    });

    useEffect(() => {
        console.log('shortUrl', shortUrl, postId);
        setAttributes({ url: shortUrl, title: postTitle });
    }, [postId, postTitle]);

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
