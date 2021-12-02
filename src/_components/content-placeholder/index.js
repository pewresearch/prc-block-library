/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import {
    Button,
    Placeholder as WPComPlaceholder,
    Spinner,
} from '@wordpress/components';
import { Fragment } from '@wordpress/element';

/**
 * Internal Dependencies
 */
 import { ContentPicker } from '../content-picker';

const ContentPlaceholder = ({
    blockProps,
    onChange,
    onSkip,
    mode = 'post',
    contentTypes = [ 'stub' ],
    label = __('Search for a post', 'prc-block-components'),
    placeholder = __('Search for a post or pate in a url...', 'prc-block-components'),
    value = [],
    loadingComponent = false,
    children,
}) => {
    return (
        <div {...blockProps}>
            <WPComPlaceholder
                label={`${label}:`}
                isColumnLayout
            >
                {false !== loadingComponent && (
                    <div style={{
                        textAlign: 'center',
                    }}>
                        <Spinner />
                        <p className="sans-serif">
                            Loading object...
                        </p>
                    </div>
                )}
                {false === loadingComponent && (
                    <Fragment>
                        {children}
                        <ContentPicker
                            onPickChange={ (pickedContent) => {
                                console.log('Step1:', pickedContent);
                                onChange(pickedContent);
                            } }
                            mode={mode}
                            label={`${label} or enter a url:`}
                            placeholder={placeholder}
                            contentTypes={contentTypes}
                            value={value}
                        />
                        <Button
                            isLink
                            onClick={()=>{
                                onSkip();
                            }}
                            text={__('Skip')}
                            style={{
                                paddingLeft: '9px'
                            }}
                        />
                    </Fragment>
                )}
            </WPComPlaceholder>
        </div>
    );
}

export { ContentPlaceholder };