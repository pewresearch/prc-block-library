/**
 * WordPress dependencies
 */
import { Button, Placeholder } from '@wordpress/components';
import { forwardRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const NavigationPlaceholder = ( { onCreate }, ref ) => {

	const onCreateEmptyMenu = () => {
		onCreate( [] );
	};

	return (
		<Placeholder label="Menu Configuration" ref={ref} isColumnLayout>
			<Button onClick={ onCreateEmptyMenu }>
				{ __( 'Start empty' ) }
			</Button>
		</Placeholder>
	);
}

export default forwardRef( NavigationPlaceholder );
