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
    const { description, title, icon } = attributes;
    const blockProps = useBlockProps({
        className: classnames('item', className, {
            'is-selected': isSelected,
        }),
    });

    const { postTitle, shortUrl } = useSelect(select => {
        console.log("Getting things");
        const meta = select('core/editor').getEditedPostAttribute('meta');
        let bitly = false;
        if ( undefined !== meta && meta.hasOwnProperty('bitly') ) {
            bitly = meta.bitly;
        }
        const t = select('core/editor').getEditedPostAttribute('title');
        return {
            postTitle: t ? t : false,
            shortUrl: bitly ? bitly : false,
        };
    });

    useEffect(() => {
        if ( false !== postTitle && false !== shortUrl ) {
            setAttributes({ url: shortUrl, title: postTitle });
        }
    }, [postTitle, shortUrl]);

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
