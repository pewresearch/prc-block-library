/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import apiFetch from '@wordpress/api-fetch';
import {
    __experimentalLinkControl as LinkControl,
} from '@wordpress/block-editor';

/**
 * @param {*} param0 
 * @returns 
 */
const WPObjectSearchField = ({value, type, subType, onChange}) => {
    const linkValue = {
        url: null,
        title: null,
        type: null,
        id: null,
    }

    /**
     * Get's a post's id and site id from the url given.
     * @param {string} url
     * @param {func} setAttributes
     */
    const getPostByUrl = (url) => {
        if (undefined === url) {
            return false;
        }
        return new Promise((resolve, reject) => {
            apiFetch({
                path: '/prc-api/v2/utils/get-post-by-url',
                method: 'POST',
                data: { url },
            })
                .then(post => {
                    console.log('getPostByUrl', post);
                    resolve(post);
                })
                .catch(err => reject(err));
        });
    };

    const handleChange = (newValue) => {
        console.log("handleChange", newValue);
        if ( !newValue.hasOwnProperty('id') && newValue.hasOwnProperty('url') && 'post' === type ) {
            // No id but we do have a url so lets go get the url...
            getPostByUrl(newValue.url).then( p => {
                console.log('after', p);
                const newLinkValue = {
                    url: p.permalink,
                    title: p.post_title,
                    id: p.ID,
                    type: subType,
                };
                onChange(newLinkValue);
            });
        } else {
            onChange(newValue);
        }
    }

    return(
        <div>
            <LinkControl
                value={{ ...linkValue }}
                suggestionsQuery={{ type, subtype: subType }}
                onChange={handleChange}
                settings={[]}
            />
        </div>
    );
}

export {
    WPObjectSearchField
}