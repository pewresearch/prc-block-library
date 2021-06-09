/**
 * WordPress Dependencies
 */

import { Placeholder as WPComPlaceholder } from '@wordpress/components';
 
const Placeholder = ({onChange}) => (
    <WPComPlaceholder
        icon="wordpress-alt"
        label="Search for a Story Item"
    />
);

export default Placeholder;