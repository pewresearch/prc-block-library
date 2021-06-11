import apiFetch from '@wordpress/api-fetch';

const setArtBySize = (imageSize, postId, setAttributes) => {
    if (false !== art && false !== setAttributes) {
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

const setPostAsAttributes = (post, imageSize, setAttributes) => {
    const storyItem = {
        title: post.title.hasOwnProperty('rendered')
            ? post.title.rendered
            : post.title,
        excerpt: post.excerpt.hasOwnProperty('rendered')
            ? post.excerpt.rendered
            : post.excerpt,
        link: post.link,
        label: post.hasOwnProperty('label') ? post.label : 'Report',
        date: post.date,
        postID: post.id,
        extra: '', // We want to clear extra when pulling a new post
    };

    // If the post has art then let the image editor mounting effect handle setting it.
    // Get art...
    if (post.art) {
        storyItem.image = post.art[imageSize].rawUrl;
        storyItem.isChartArt = post.art[imageSize].chartArt;
    }
    // Set art here??
    console.log('setPostAsAttributes', post, storyItem);
    setAttributes(storyItem);
};

/**
 * Set's post attributes by url if a post is not found then failover and set just the link as what was passed through.
 * @param {string} url
 * @param {func} setAttributes
 */
const setPostByURL = (url, imageSize, setAttributes) => {
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
                setPostAsAttributes(post, imageSize, setAttributes);
            }
        })
        .catch(err => {
            console.error(err);
            setAttributes({ link: url });
        });
};

const setPostByStubID = (postId, imageSize, setAttributes) => {
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
                // We should lookup the meta link here real quick and apply that to the post.link object before posting attributes.
                setPostAsAttributes(post, imageSize, setAttributes);
            }
        })
        .catch(err => console.error(err));
};

export {
    setPostByStubID,
    setPostByURL,
}