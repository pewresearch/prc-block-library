import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import { registerBlockType } from '@wordpress/blocks';
import { InspectorControls } from '@wordpress/block-editor';
import { PanelBody, TextControl } from '@wordpress/components';

import Card from './component';

/**
 * Register: aa Gutenberg Block.
 *
 * Registers a new block provided a unique name and an object defining its
 * behavior. Once registered, the block is made editor as an option to any
 * editor interface where blocks are implemented.
 *
 * @link https://wordpress.org/gutenberg/handbook/block-api/
 * @param  {string}   name     Block name.
 * @param  {Object}   settings Block settings.
 * @return {?WPBlock}          The block, if it has been successfully
 *                             registered; otherwise `undefined`.
 */
registerBlockType('prc-block/card', {
    // Block name. Block names must be string that contains a namespace prefix. Example: my-plugin/my-custom-block.
    title: __('Card'), // Block title.
    icon: 'format-aside', // Block icon from Dashicons → https://developer.wordpress.org/resource/dashicons/.
    category: 'widgets', // Block category — Group blocks together based on common traits E.g. common, formatting, layout, widgets, embed.
    keywords: [__('prc'), __('card'), __('baseball card'), __('packaged card')],
    styles: [
        {
            name: 'default',
            label: 'Basic (Baseball Card)',
            isDefault: true,
        },
        {
            name: 'borderless',
            label: 'Basic Borderless',
        },
        {
            name: 'beige',
            label: 'Beige (Borderless)',
        },
        {
            name: 'oatmeal',
            label: 'Oatmeal (Borderless)',
        },
    ],
    supports: {
        html: false, // We do not want to give people the ability to edit the raw html of this block.
    },
    // Attributes are really react props.
    attributes: {
        link: {
            type: 'string',
            default: 'https://www.pewresearch.org/',
        },
        label: {
            type: 'string',
            default: 'Read More',
        },
        //
        title: {
            type: 'string',
            default: 'Card Title',
        },
    },
    deprecated: [
        {
            attributes: {
                link: {
                    type: 'string',
                },
                label: {
                    type: 'string',
                },
                title: {
                    type: 'string',
                },
                // Legacy
                image: {
                    type: 'string',
                },
                excerpt: {
                    type: 'string',
                },
            },

            migrate(attributes, innerBlocks) {
                const { omit } = window.lodash;
                return [
                    omit(attributes, ['excerpt', 'image']),
                    [
                        createBlock('core/image', {
                            url: attributes.image,
                            sizeSlug: 'large',
                        }),
                        createBlock('core/paragraph', {
                            content: attributes.excerpt,
                        }),
                        ...innerBlocks,
                    ],
                ];
            },

            save(props) {
                const { attributes } = props;
                const data = attributes;
                data.isDisplay = true;
                data.setAttributes = false;
                return <Card {...data} />;
            },
        },
    ],

    /**
     * The edit function describes the structure of your block in the context of the editor.
     * This represents what the editor will render when the block is used.
     *
     * The "edit" property must be a valid function.
     *
     * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
     *
     * @param {Object} props Props.
     * @returns {Mixed} JSX Component.
     */
    edit: props => {
        const { attributes, setAttributes, isSelected } = props;
        const data = attributes;
        data.setAttributes = setAttributes;
        data.isDisplay = true;
        if (true === isSelected) {
            data.isDisplay = false;
        }

        return (
            <Fragment>
                {true === isSelected && (
                    <InspectorControls>
                        <PanelBody title={__('Card Options')}>
                            <div>
                                <TextControl
                                    label="Link"
                                    value={attributes.link}
                                    onChange={value =>
                                        setAttributes({ link: value })
                                    }
                                />
                            </div>
                            <div>
                                <TextControl
                                    label="Read More Text"
                                    value={attributes.label}
                                    onChange={value =>
                                        setAttributes({ label: value })
                                    }
                                />
                            </div>
                        </PanelBody>
                    </InspectorControls>
                )}
                <div style={{ maxWidth: '400px' }}>
                    <Card {...data} />
                </div>
            </Fragment>
        );
    },

    // Seth Learning Note: SO save literally only transforms on post_content filter. You won't see this result inside the gutenberg editor, you will however see it if you look at code view.
    /**
     * The save function defines the way in which the different attributes should be combined
     * into the final markup, which is then serialized by Gutenberg into post_content.
     *
     * The "save" property must be specified and must be a valid function.
     *
     * @link https://wordpress.org/gutenberg/handbook/block-api/block-edit-save/
     *
     * @param {Object} props Props.
     * @returns {Mixed} JSX Frontend HTML.
     */
    save: props => {
        const { attributes } = props;
        const data = attributes;
        data.isDisplay = true;
        data.setAttributes = false;
        return <Card {...data} />;
    },
});
