// @TODO: convert froomo wp api to apifetch https://www.npmjs.com/package/@wordpress/api-fetch

const getTerms = (taxonomy, returnTermID) => {
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
				let obj = {
					label: terms[index].name,
				}
				if ( true === returnTermID ) {
					obj.value = terms[index].id;
				} else {
					obj.value = terms[index].name;
				}
				data.push(obj);
			}
	
			resolve(data);
		} );
	} ) ;
}

export default getTerms;