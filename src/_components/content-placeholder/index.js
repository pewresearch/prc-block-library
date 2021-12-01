/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment } from '@wordpress/element';
import {
    Button,
    Placeholder as WPComPlaceholder,
} from '@wordpress/components';

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
    label = __('Search for a post'),
    placeholder = __('Search for a post...'),
    icon = 'format-aside',
    value = [],
}) => {
    return (
        <div {...blockProps}>
            <WPComPlaceholder
                icon={icon}
                label={`  ${label}:`}
                isColumnLayout
            >
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
            </WPComPlaceholder>
        </div>
    );
}

export { ContentPlaceholder };