import apiFetch from '@wordpress/api-fetch';

const setPostByURL = (url, setAttributes) => {
    if (undefined === setAttributes || undefined === url) {
        return;
    }

    apiFetch({
        path: `/prc-api/v2/blocks/helpers/get-staff-by-url/?url=${url}`,
    }).then(post => {
        if (false !== post) {
            const staff = {
                name: post.title,
                link: post.link,
                jobTitle: post.label,
                image: '',
            };
            setAttributes(staff);
        }
    });
};
