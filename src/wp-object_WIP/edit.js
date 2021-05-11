/**
 * External dependencies
 */
import classnames from 'classnames';

/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, useState } from '@wordpress/element';
import {
    __experimentalLinkControl as LinkControl,
    useBlockProps,
} from '@wordpress/block-editor';
import { Placeholder, SelectControl } from '@wordpress/components';

const edit = ({ attributes, className, setAttributes }) => {
    const { objectInfo } = attributes;

    const [type, setType] = useState(false);

    const blockProps = useBlockProps({
        className: classnames(className),
    });

    const onChange = o => {
        setAttributes({ objectInfo: o });
    };

    return (
        <div {...blockProps}>
            <Placeholder
                label={__(`WP Object`)}
                instructions={__(`Select an object type to display.`)}
                icon="block-default"
                isColumnLayout
            >
                <SelectControl
                    label="Type"
                    value={type}
                    options={[
                        { label: 'Template Block', value: 'template-block' },
                        { label: 'Chart', value: 'chart' },
                        { label: 'Interactive', value: 'interactives' },
                    ]}
                    onChange={t => {
                        setType(t);
                        console.log('Type?', t);
                    }}
                />
                {(false !== type || '' !== objectInfo.type) && (
                    <div
                        style={{
                            backgroundColor: '#f5f5f5',
                        }}
                    >
                        <LinkControl
                            className="wp-block-navigation-link__inline-link-input"
                            value={{ ...objectInfo }}
                            suggestionsQuery={{ type: 'post', subtype: type }}
                            onChange={o => onChange(o)}
                            settings={[]}
                        />
                    </div>
                )}
            </Placeholder>
        </div>
    );
};

export default edit;
