/**
 * WordPress Dependencies
 */
import { Fragment } from 'react';

/**
 * Internal Dependencies
 */
import Inspector from './inspector';
import Placeholder from './placeholder';
import Toolbar from './toolbar';

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
