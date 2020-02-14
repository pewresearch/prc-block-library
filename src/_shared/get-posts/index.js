import * as moment from 'moment';
import apiFetch from '@wordpress/api-fetch';

const getPosts = (perPage, format, program, labelTaxonomy) => {
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

	console.log('format');
	console.log(format);
	console.log('program');
	console.log(program);

	return new Promise( (resolve, reject) => {
		let data = [];
		apiFetch( { path: '/prc-api/v2/blocks/helpers/get-posts/?perPage='+perPage+'&format=' + format + '&program=' + program + '&labelTaxonomy=' + labelTaxonomy } ).then( posts => {
			for ( let index = 0; index < perPage ; index++ ) {
				data.push({
					id: posts[index].id,
					title: posts[index].title,
					excerpt: posts[index].excerpt,
					date: posts[index].date,
					link: posts[index].link,
					label: posts[index].label,
					image: posts[index].image,
				});
			}
			resolve(data);
		} );
	} ) ;
}

export default getPosts;