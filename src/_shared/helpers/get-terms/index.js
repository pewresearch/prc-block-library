// @TODO: convert froomo wp api to apifetch https://www.npmjs.com/package/@wordpress/api-fetch

const getTerms = taxonomy => {
    const collection = new wp.api.collections[taxonomy]();
    if (undefined === collection) {
        return false;
    }
    return new Promise((resolve, reject) => {
        const data = {};
        collection
            .fetch({
                data: { hide_empty: false, per_page: 25 },
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
};

export default getTerms;
