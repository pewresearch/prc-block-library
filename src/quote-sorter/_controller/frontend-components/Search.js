import { Input } from 'semantic-ui-react';
import { debounce } from 'lodash';

function Search({ placeholder, onchange }) {
	const throttle = debounce(onchange, 500);

	return (
		<Input
			icon="search"
			fluid
			placeholder={placeholder}
			onChange={(e, { value }) => {
				throttle(e.target, value.toLowerCase());
			}}
		/>
	);
}

export default Search;
