/**
 * WordPress Dependencies
 */

import { Placeholder as WPComPlaceholder } from '@wordpress/components';

export default function Placeholder({ children }) {
	return (
		<WPComPlaceholder
			isColumnLayout
			icon="networking"
			label="Taxonomy Index A-Z Listing"
		>
			<div>{children}</div>
		</WPComPlaceholder>
	);
}
