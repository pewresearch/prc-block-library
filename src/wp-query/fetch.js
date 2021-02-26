import * as moment from 'moment';
import apiFetch from '@wordpress/api-fetch';

const fetchPosts = attributes => {
    const formatDate = dateString => {
        const defaultFormat = 'MMM D, YYYY';
        const date = moment(dateString).format(defaultFormat);
        return date;
    };

    return new Promise(resolve => {
        const data = [];
        console.log('fetchPosts?', attributes);

        const request = {
            method: 'POST',
            path: '/prc-api/v2/block/wp-query',
            data: attributes,
        };

        apiFetch(request).then(results => {
            console.log(results);
            // eslint-disable-next-line no-plusplus
            results.forEach(result => {
                const d = {
                    id: result.id,
                    title: result.title,
                    excerpt: result.excerpt,
                    date: formatDate(result.timestamp),
                    link: result.link,
                    label: result.label,
                    image: result.image,
                };
                data.push(d);
            });
            resolve(data);
        });
    });
};

export default fetchPosts;
