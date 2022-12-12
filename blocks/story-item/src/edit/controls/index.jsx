/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import Inspector from './Inspector';
import Placeholder from './Placeholder';
import Toolbar from './Toolbar';

function Controls({ attributes, setAttributes, context }) {
	return (
		<Fragment>
			<Toolbar {...{ attributes, setAttributes, context }} />
			<Inspector
				{...{
					attributes,
					setAttributes,
					context,
				}}
			/>
		</Fragment>
	);
}

export { Controls, Placeholder };
