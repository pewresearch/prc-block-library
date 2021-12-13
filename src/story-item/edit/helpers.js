/**
 * External Dependencies
 */
import moment from 'moment';

/**
 * WordPress Dependencies
 */
import apiFetch from '@wordpress/api-fetch';

const getStoryItemContentFromPostId = (postId) => {
    // go get the title, date, label, excerpt, and image for a post given the post id.
    return new Promise((resolve, reject) => {
        apiFetch({
            path: `/wp/v2/posts/${postId}`,
        }).then((post) => {
            // resolve as attributes
            const attrsToReturn = {
                title: post.title.hasOwnProperty('rendered')
                    ? post.title.rendered
                    : post.title,
                description: post.excerpt.hasOwnProperty('rendered')
                    ? post.excerpt.rendered
                    : post.excerpt,
                url: post.link,
                label: post.hasOwnProperty('label') ? post.label : 'Report',
                date: post.date,
                postId: post.id,
            };
            resolve(attrsToReturn);
        }).catch((error) => {
            reject(error);
        });
    });
}

const setArtBySize = (imageSize, postId, setAttributes) => {
    if (0 !== postId && false !== setAttributes) {
        apiFetch({
            path: `/prc-api/v2/get-art/?postId=${postId}`,
        }).then(data => {
            if (false !== data) {
                if (
                    undefined !== data[imageSize] &&
                    false !== setAttributes
                ) {
                    setAttributes({
                        image: data[imageSize].rawUrl,
                        isChartArt: data[imageSize].chartArt,
                    });
                }
            }
        });
    }
};

const getAttributesFromPost = (post, imageSize, isRefresh = false) => {
    const storyItem = {
        title: post.title.hasOwnProperty('rendered')
            ? post.title.rendered
            : post.title,
        description: post.excerpt.hasOwnProperty('rendered')
            ? post.excerpt.rendered
            : post.excerpt,
        url: post.link,
        label: post.hasOwnProperty('label') ? post.label : 'Report',
        date: post.date,
        postId: post.id,
    };

    if ( true !== isRefresh ) {
        storyItem.extra = '';
    }

    if (post.art) {
        const art = post.art;
        storyItem.image = art[imageSize].rawUrl;
        storyItem.isChartArt = art[imageSize].chartArt;
    }

    console.log('getAttributesFromPost', post, storyItem);
    
    return storyItem;
};

const getAttributesFromURL = (url, imageSize = 'A1') => {
    return new Promise((resolve, reject) => {
        apiFetch({
            path: '/prc-api/v2/blocks/helpers/get-post-by-url',
            method: 'POST',
            data: { url },
        })
            .then(post => {
                console.log('setPostbyURL', post);
                if (false !== post) {
                    const attrs = getAttributesFromPost(post, imageSize, false);
                    resolve(attrs);
                } else {
                    reject(post);
                }
            })
            .catch(err => {
                console.error(err);
                reject(err);
            });
    });
}

/**
 * Set's post attributes by url if a post is not found then failover and set just the link as what was passed through.
 * @param {string} url
 * @param {func} setAttributes
 */
const setPostByURL = (url, imageSize, isRefresh, setAttributes) => {
    if (undefined === url || undefined === setAttributes) {
        return;
    }
    apiFetch({
        path: '/prc-api/v2/blocks/helpers/get-post-by-url',
        method: 'POST',
        data: { url },
    })
        .then(post => {
            console.log('setPostbyURL', post);
            if (false !== post) {
                const attrs = getAttributesFromPost(post, imageSize, isRefresh);
                setAttributes(attrs);
            }
        })
        .catch(err => {
            console.error(err);
            setAttributes({ link: url });
        });
};

const setPostByStubID = (postId, imageSize, isRefresh, setAttributes) => {
    if (undefined === postId || undefined === setAttributes) {
        return;
    }
    apiFetch({
        path: `/wp/v2/stub/${postId}`,
        method: 'GET',
    })
        .then(post => {
            console.log('setPostByStubID', postId, post);
            if (false !== post) {
                const attrs = getAttributesFromPost(post, imageSize, isRefresh);
                setAttributes(attrs);
            }
        })
        .catch(err => console.error(err));
};

export {
    setArtBySize,
    setPostByStubID,
    setPostByURL,
    getAttributesFromURL,
    getStoryItemContentFromPostId,
}