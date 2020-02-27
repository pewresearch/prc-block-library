// @TODO: convert froomo wp api to apifetch https://www.npmjs.com/package/@wordpress/api-fetch

const getTerms = (taxonomy) => {
	console.log('getting terms for '+taxonomy);
	// Set up taxonomy collection:
	const collection = new wp.api.collections[taxonomy];
	if ( undefined === collection ) {
		return false;
	}
	return new Promise( (resolve, reject) => {
		let data = [];
		collection.fetch( {data: { hide_empty: false, per_page: 25 }} ).then( ( terms ) => {
			for (let index = 0; index < terms.length; index++) {
				let slug = terms[index].slug.replace(taxonomy.toLowerCase() + '_', '');
				let obj = {
					label: terms[index].name,
					value: terms[index].id + ','+ slug,
				}
				data.push(obj);
			}
	
			resolve(data);
		} );
	} ) ;
}

export default getTerms;