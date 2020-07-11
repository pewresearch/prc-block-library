/**
 * BLOCK: prc-blocks
 *
 * Registering a basic block with Gutenberg.
 * Simple block, renders and saves the same content without any interactivity.
 */

import { __ } from '@wordpress/i18n';
import { registerBlockType } from '@wordpress/blocks';
import { RichText } from '@wordpress/block-editor';
import { share as icon } from '@wordpress/icons';

import FollowUs from './component';

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
registerBlockType('prc-block/follow-us', {
    title: __('Follow Us'), // Block title.
    icon,
    category: 'widgets',
    keywords: [__('prc'), __('newsletter'), __('follow us')],
    supports: {
        html: false,
    },
    attributes: {
        newsletters: {
            type: 'string',
            default: '',
        },
        socialMedia: {
            type: 'string',
            source: 'html',
            selector: '.ui.link.list',
            multiline: 'li',
            default: '<li><a href="#">Twitter</a></li>',
        },
    },

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
        const data = props.attributes;
        data.setAttributes = false;
        data.editMode = true;
        if (true === props.isSelected) {
            data.setAttributes = props.setAttributes;
        }
        return (
            <FollowUs {...data}>
                <RichText.Content
                    className="ui link list"
                    tagName="div"
                    value={data.socialMedia}
                />
            </FollowUs>
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
        return (
            <div
                className="js-react-follow-us"
                data-newsletters={props.attributes.newsletters}
            >
                <RichText.Content
                    className="ui link list"
                    tagName="div"
                    value={props.attributes.socialMedia}
                />
            </div>
        );
    },
});
