import * as moment from 'moment';
import apiFetch from '@wordpress/api-fetch'

// @TODO: convert froomo wp api to apifetch https://www.npmjs.com/package/@wordpress/api-fetch

const getPosts = (saveMethod, perPage, format, program) => {
	if ( 'function' !== typeof(saveMethod) ) {
		console.error('saveMethod in getPosts is not a function');
		return false;
	}

	const formatDate = function( dateString ) {
		// $date_format = 'M j, Y';
		// $timestamp   = get_the_date( 'U', $post_id );
		// $date        = get_the_date( $date_format, $post_id );

		// // If today...
		// if ( date( 'M j', $timestamp ) == date( 'M j' ) ) {
		// 	$date = 'Today at ' . get_the_date( 'g:i a', $post_id );
		// }
		return moment(dateString).format("MMM D, YYYY");
	}
	// Define posts collection
	const collection = new wp.api.collections.Stub();

	let args = { 'per_page': Number(perPage), 'formats': [ Number(format) ] };
	if ( 0 !== program ) {
		args.programs = Number(program);
	}
	let data = [];

	apiFetch( { path: '/prc-api/v2/blocks/helpers/get-posts/?format=' + format + '&program=' + program } ).then( posts => {
		console.log(posts);
	} );

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

export default getPosts;