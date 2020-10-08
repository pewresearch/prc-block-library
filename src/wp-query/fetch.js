import * as moment from 'moment';
import apiFetch from '@wordpress/api-fetch';

const fetchPosts = (
    postType,
    perPage,
    formatTermId,
    programTermId,
    labelTaxonomy,
    expertsOnly,
) => {
    const formatDate = dateString => {
        const defaultFormat = 'MMM D, YYYY';
        const date = moment(dateString).format(defaultFormat);
        return date;
    };

    return new Promise(resolve => {
        const data = [];
        let path = `/prc-api/v2/fetch-posts/?postType=${postType}&perPage=${perPage}&formatTermId=${formatTermId}&programTermId=${programTermId}&labelTaxonomy=${labelTaxonomy}`;
        if ('staff' === postType) {
            path = `/prc-api/v2/fetch-posts/?postType=${postType}&perPage=${perPage}&programTermId=${programTermId}&expertsOnly=${expertsOnly}`;
        }
        console.log(
            'fetchPosts?',
            postType,
            perPage,
            formatTermId,
            programTermId,
            labelTaxonomy,
            expertsOnly,
        );
        apiFetch({
            path,
        }).then(results => {
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
