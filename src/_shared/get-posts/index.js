import * as moment from 'moment';

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

	return new Promise( (resolve, reject) => {
		let data = [];
		fetch( window.siteURL + '/wp-json/prc-api/v2/blocks/helpers/get-posts/?perPage='+perPage+'&format=' + format + '&program=' + program + '&labelTaxonomy=' + labelTaxonomy )
			.then( res => res.json() )
            .then(
                result => {
					for ( let index = 0; index < perPage ; index++ ) {
						data.push({
							id: result[index].id,
							title: result[index].title,
							excerpt: result[index].excerpt,
							date: result[index].date,
							link: result[index].link,
							label: result[index].label,
							image: result[index].image,
						});
					}
					resolve(data);
                },
                error => {
                    // eslint-disable-next-line no-console
                    console.log(error);
                }
            );
	} ) ;
}

export default getPosts;