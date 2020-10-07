import * as moment from 'moment';
import apiFetch from '@wordpress/api-fetch';

const fetchPosts = (
    perPage,
    format,
    program,
    labelTaxonomy,
    relativeDate = false,
) => {
    const formatDate = dateString => {
        const defaultFormat = 'MMM D, YYYY';
        const todaysDate = moment().format(defaultFormat);
        let date = moment(dateString).format(defaultFormat);
        if (true === relativeDate && todaysDate === date) {
            date = moment(dateString).fromNow();
            // date = 'Today at ' + moment.unix(dateString).format('HH:mm');
        }
        return date;
    };

    return new Promise(resolve => {
        const data = [];
        apiFetch({
            path: `/prc-api/v2/fetch-posts/?perPage=${perPage}&format=${format}&program=${program}&labelTaxonomy=${labelTaxonomy}`,
        }).then(results => {
            console.log(
                'fetchPosts?',
                perPage,
                format,
                program,
                labelTaxonomy,
                relativeDate,
            );
            // eslint-disable-next-line no-plusplus
            results.forEach(result => {
                data.push({
                    id: result.id,
                    title: result.title,
                    excerpt: result.excerpt,
                    date: formatDate(result.timestamp, relativeDate),
                    link: result.link,
                    label: result.label,
                    image: result.image,
                });
            });
            resolve(data);
        });
    });
};

export default fetchPosts;
