import { useEffect } from '@wordpress/element';
import { withState } from '@wordpress/compose';
import { SelectControl, TextControl } from '@wordpress/components';
import { getTermsAsOptions } from 'shared';

const KickerEditor = withState({
    labelOptions: [],
})(({ label, date, taxonomy, setAttributes, setState, labelOptions }) => {
    // On initial load & taxonomy change:
    useEffect(() => {
        getTermsAsOptions(taxonomy).then(options => {
            setState({ labelOptions: options });
        });
    }, [taxonomy]);

    return (
        <div style={{ display: 'flex', alignItems: 'center' }}>
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
});

export default KickerEditor;
