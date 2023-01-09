export function arrayToJson(arr: string | any[]) {
	const stripDowncase = (string: string) => {
		// only return if value is indeed a string
		if (typeof string === 'string') {
			return string.replace(/\W/g, '').replace(/\s/g, '').toLowerCase();
		}
	};
	const categories = arr[0].slice(1);
	const categoriesFormatted = categories.map((category) =>
		stripDowncase(category),
	);
	function returnAttribution(row: any[]) {
		if (attributionPosition) {
			const attribution = row[attributionPosition + 1];
			row.splice(attributionPosition + 1, 1);
			return attribution;
		}
		return null;
	}
	const data = arr.slice(1);
	const quotes = {};
	const typologies = {};
	const references = {};
	const attributionPosition = categoriesFormatted.includes('attribution')
		? categoriesFormatted.indexOf('attribution')
		: null;
	categoriesFormatted.splice(attributionPosition, 1);
	// loop through data
	for (let i = 0; i < data.length; i += 1) {
		const row = data[i];
		const quote = row[0];
		const attribution = returnAttribution(row);
		const props = row.slice(1);
		// create quotes object
		quotes[i] = {
			quote,
			attribution,
			props: categoriesFormatted.map(
				(category: string, index: string | number) =>
					`${category}_${stripDowncase(props[index])}`,
			),
		};

		// generate typologies
		for (let j = 0; j < props.length; j += 1) {
			const key = `${categoriesFormatted[j]}_${stripDowncase(props[j])}`;
			if (!typologies[key]) {
				typologies[key] = {
					name: props[j],
					category: categories[j],
				};
			}
		}

		// map quote ids to typologies
		for (let k = 0; k < categoriesFormatted.length; k += 1) {
			const key = `${categoriesFormatted[k]}_${stripDowncase(props[k])}`;
			if (!references[key]) {
				references[key] = [i];
			} else {
				references[key].push(i);
			}
		}
	}
	return {
		quotes,
		typologies,
		references,
	};
}
