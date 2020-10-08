// @TODO: convert froomo wp api to apifetch https://www.npmjs.com/package/@wordpress/api-fetch
import apiFetch from '@wordpress/api-fetch';

const { wp } = window;

const getTerms = (taxonomy, perPage = 25) => {
    const taxSlug = taxonomy;
    // strip dashes out of ataxonomy
    const collection = new wp.api.collections[taxSlug]();

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
                            `${taxSlug.toLowerCase()}_`,
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

const getTermsByLetter = (taxonomy, letter) => {
    return new Promise(resolve => {
        apiFetch({
            path: `/prc-api/v2/blocks/helpers/get-taxonomy-by-letter/?taxonomy=${taxonomy}&letter=${letter}`,
        }).then(terms => {
            resolve(terms);
        });
    });

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
export { getTerms, getTermsByLetter, getTermsAsOptions };
