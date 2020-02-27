import * as moment from 'moment';

const getPosts = (perPage, format, program, labelTaxonomy, relativeDate = false) => {
	const formatDate = function( dateString, relativeDate ) {
		let defaultFormat = "MMM D, YYYY";
		let todaysDate = moment().format(defaultFormat);
		let date = moment.unix(dateString).format(defaultFormat);
		if ( true === relativeDate && todaysDate === date ) {
			date = moment.unix(dateString).fromNow();
			// date = 'Today at ' + moment.unix(dateString).format('HH:mm');
		}
		return date;
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
							date: formatDate(result[index].timestamp, relativeDate),
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