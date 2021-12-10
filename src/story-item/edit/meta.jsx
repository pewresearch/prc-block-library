/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { SelectControl, TextControl } from '@wordpress/components';

const Meta = ({ enabled, date, label, setAttributes, termOptions }) => {
    if ( ! enabled ) {
        return <Fragment />;
    }

    return (
        <div className="meta" style={{ display: 'flex', alignItems: 'center' }}>
            <div>
                <SelectControl
                    value={label}
                    options={termOptions}
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