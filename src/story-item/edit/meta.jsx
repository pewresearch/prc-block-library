/**
 * External Dependencies
 */
import { getTermsAsOptions } from '@pewresearch/app-components';

/**
 * WordPress Dependencies
 */
import { Fragment, useState, useEffect } from '@wordpress/element';
import { SelectControl, TextControl } from '@wordpress/components';

const Meta = ({ enabled, date, label, taxonomy, setAttributes, isSelected }) => {
    if ( 'disabled' === taxonomy || ! enabled ) {
        return <Fragment />;
    }
    
    const [labelOptions, setLabelOptions] = useState([]);

    useEffect(() => {
        getTermsAsOptions(taxonomy).then(options => {
            setLabelOptions(options);
        });
    }, [taxonomy]);

    return (
        <div className="meta" style={{ display: 'flex', alignItems: 'center' }}>
            <div>
                <SelectControl
                    value={label}
                    options={labelOptions}
                    onChange={l => {
                        setAttributes({ label: l });
                    }}
                    style={{ marginBottom: '0px' }}
                    className="story-label-select"
                />
            </div>
            <div>&nbsp;|&nbsp;</div>
            <div>
                <TextControl
                    value={date}
                    onChange={d => {
                        setAttributes({ date: d });
                    }}
                    style={{ marginBottom: '0px' }}
                    className="story-label-select"
                />
            </div>
        </div>
    );
}

export default Meta;