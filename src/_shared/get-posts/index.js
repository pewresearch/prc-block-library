import * as moment from 'moment';

// @TODO: convert froomo wp api to apifetch https://www.npmjs.com/package/@wordpress/api-fetch

const getPosts = (saveMethod, perPage, format, program) => {
	if ( 'function' !== typeof(saveMethod) ) {
		console.error('saveMethod in getPosts is not a function');
		return false;
	}

	const formatDate = function( dateString ) {
		return moment(dateString).format("MMM D, YYYY");
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
				title: posts[index].title.rendered,
				date: formatDate(posts[index].date),
				link: posts[index].link,
			});
		}
		saveMethod({ posts: data });
	});
}

export default getPosts;