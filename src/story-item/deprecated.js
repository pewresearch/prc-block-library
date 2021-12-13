/**
 * WordPress Dependencies
 */
import { RichText } from '@wordpress/block-editor';
import { Fragment } from '@wordpress/element';

const deprecated = [
    {
        attributes: {
            postID: {
                type: "integer"
            },
            link: {
                type: "string"
            },
            excerpt: {
                type: "string",
                multiline: "p"
            },
            enableExcerpt: {
                type: "boolean",
                default: true
            },
            enableExcerptBelow: {
                type: "boolean",
                default: false
            },
            enableAltTaxonomy: {
                type: "boolean",
                default: false
            }
        },

        migrate( { postID, link, excerpt, enableExcerpt, enableExcerptBelow, enableAltTaxonomy, enableMeta } ) {
            console.log("Migrating...", { postID, link, excerpt, enableExcerpt, enableExcerptBelow, enableAltTaxonomy, enableMeta });
            const newMetaTaxonomy = enableMeta ? ( enableAltTaxonomy ? 'research-teams' : 'formats' ) : 'disabled';
            return {
                postId: postID,
                url: link,
                description: excerpt,
                enableDescription: enableExcerpt,
                enableDescriptionBelow: enableExcerptBelow,
                metaTaxonomy: newMetaTaxonomy,
            };
        },

        save( props ) {
            return (
                <Fragment>
                    { 0 !== props.excerpt.length && (<RichText.Content className="description" tagName="div" value={props.excerpt}/>) }
                </Fragment>
            );
        },
    },
];

export default deprecated;