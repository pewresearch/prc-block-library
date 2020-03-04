import { useEffect, useLayoutEffect } from '@wordpress/element';
import { withState } from '@wordpress/compose';
import { SelectControl, TextControl } from '@wordpress/components';
import { getTerms } from '../../helpers';

const getLabelOptions = taxonomy => {
    return new Promise(resolve => {
        getTerms(taxonomy).then(data => {
            const labelOptions = [];

            Object.keys(data).forEach(key => {
                const termObj = data[key];
                labelOptions.push({
                    value: termObj.name,
                    label: termObj.name,
                });
            });

            labelOptions.sort((a, b) => (a.label > b.label ? 1 : -1));

            resolve(labelOptions);
        });
    });
};

const KickerEditor = withState({
    labelOptions: [],
})(({ label, date, taxonomy, labelOptions, setState, setAttributes }) => {
    // On initial load:
    useLayoutEffect(() => {
        getLabelOptions(taxonomy).then(options =>
            setState({ labelOptions: options }),
        );
    }, []);

    // On taxonomy change:
    useEffect(() => {
        getLabelOptions(taxonomy).then(options =>
            setState({ labelOptions: options }),
        );
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
                />
            </div>
        </div>
    );
});

export default KickerEditor;
