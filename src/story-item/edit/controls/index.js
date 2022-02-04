/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';

/**
 * Internal Dependencies
 */
import Inspector from './inspector';
import Placeholder from './placeholder';
import Toolbar from './toolbar';

const Controls = ({ attributes, setAttributes, context, rootClientId }) => {
    return (
        <Fragment>
            <Toolbar {...{ attributes, setAttributes, context, rootClientId }} />
            <Inspector
                {...{
                    attributes,
                    setAttributes,
                    context,
                    rootClientId,
                }}
            />
        </Fragment>
    );
}

export {
    Controls,
    Placeholder
}
