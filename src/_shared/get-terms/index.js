// @TODO: convert froomo wp api to apifetch https://www.npmjs.com/package/@wordpress/api-fetch

const getTerms = (saveMethod, taxonomy) => {
	if ( 'function' !== typeof(saveMethod) ) {
		console.error('saveMethod in getTerms is not a function');
		return false;
	}
	
	// Define posts collection
	const collection = new wp.api.collections.Stub();

	let args = { 'per_page': Number(perPage), 'formats': [ Number(format) ] };
	if ( 0 !== program ) {
		args.programs = Number(program);
	}
	let data = [];

	collection.fetch( { data: args } ).then( ( posts ) => {
		console.info('Fetching posts for format: ' + format);
		for ( let index = 0; index < posts.length; index++ ) {
			data.push({
				id: '',
				title: posts[index].title.rendered,
				// excerpt: posts[index].excerpt.rendered,
				date: formatDate(posts[index].date),
				link: posts[index].link,
				label: '',
				image: '',
			});
		}
		saveMethod({ posts: data });
	});
}

export default getTerms;