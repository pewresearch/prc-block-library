/**
 * WordPress dependencies
 */
import { Button, Placeholder } from '@wordpress/components';
import { forwardRef } from '@wordpress/element';
import { __ } from '@wordpress/i18n';

const NavigationPlaceholder = ({ onCreate }, ref) => {
    const onCreateEmptyMenu = () => {
        onCreate([], true);
    };

    const onCreateSocialToolbar = () => {
        onCreate([]);
    };

    return (
        <Placeholder
            label={__('Menu Configuration')}
            instructions="Create a new blank menu or select from predefined options below."
            ref={ref}
        >
            <Button isPrimary onClick={onCreateEmptyMenu}>
                {__('Create Blank Menu')}
            </Button>
            <Button isSecondary onClick={onCreateSocialToolbar}>
                {__('Create Social Toolbar')}
            </Button>
        </Placeholder>
    );
};

export default forwardRef(NavigationPlaceholder);
