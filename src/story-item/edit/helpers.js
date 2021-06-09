import apiFetch from '@wordpress/api-fetch';

const setPostAsAttributes = (post, setAttributes) => {
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
    if (!post.art) {
        storyItem.image = post.image;
    }
    setAttributes(storyItem);
};

/**
 * Set's post attributes by url if a post is not found then failover and set just the link as what was passed through.
 * @param {string} url
 * @param {func} setAttributes
 */
const setPostByURL = (url, setAttributes) => {
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
                setPostAsAttributes(post, setAttributes);
            }
        })
        .catch(err => {
            console.error(err);
            setAttributes({ link: url });
        });
};

const setPostByStubID = (postId, setAttributes, refresh) => {
    if (undefined === postId || undefined === setAttributes) {
        return;
    }
    if (undefined !== refresh) {
        refresh(true);
    }
    apiFetch({
        path: `/wp/v2/stub/${postId}`,
        method: 'GET',
    })
        .then(post => {
            console.log('setPostByStubID', postId, post);
            if (false !== post) {
                // We should lookup the meta link here real quick and apply that to the post.link object before posting attributes.
                setPostAsAttributes(post, setAttributes);
            }
        })
        .catch(err => console.error(err))
        .then(() => {
            if (undefined !== refresh) {
                refresh(false);
            }
        });
};

export {
    setPostByStubID,
    setPostByURL,
}