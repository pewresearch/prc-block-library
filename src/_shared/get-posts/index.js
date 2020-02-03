import * as moment from 'moment';

const getPosts = (saveMethod, perPage, format, program) => {
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