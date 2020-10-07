// @TODO: convert froomo wp api to apifetch https://www.npmjs.com/package/@wordpress/api-fetch
import apiFetch from '@wordpress/api-fetch';

const { wp } = window;

const getTerms = (taxonomy, perPage = 25, letter) => {
    const collection = new wp.api.collections[taxonomy]();

    if (undefined !== letter) {
        return new Promise(resolve => {
            apiFetch({
                path: `/prc-api/v2/blocks/helpers/get-taxonomy-by-letter/?taxonomy=topic&letter=${letter}`,
            }).then(terms => {
                resolve(terms);
            });
        });
    }

    if (undefined !== collection) {
        return new Promise(resolve => {
            const data = {};
            collection
                .fetch({
                    data: { hide_empty: false, per_page: perPage },
                })
                .then(terms => {
                    for (let index = 0; index < terms.length; index++) {
                        const slug = terms[index].slug.replace(
                            `${taxonomy.toLowerCase()}_`,
                            '',
                        );
                        data[terms[index].id] = {
                            id: terms[index].id,
                            name: terms[index].name,
                            slug,
                        };
                    }
                    resolve(data);
                });
        });
    }

    return false;
};

const getTermsAsOptions = (taxonomy, perPage) => {
    return new Promise(resolve => {
        getTerms(taxonomy, perPage).then(data => {
            const labelOptions = [];

            Object.keys(data).forEach(key => {
                const termObj = data[key];
                labelOptions.push({
                    value: termObj.name,
                    label: termObj.name,
                });
            });

            labelOptions.sort((a, b) => (a.label > b.label ? 1 : -1));

            resolve(labelOptions);
        });
    });
};

export default getTerms;
export { getTerms, getTermsAsOptions };
