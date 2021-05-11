/**
 * WordPress dependencies
 */
import { __ } from '@wordpress/i18n';
import { PanelBody, PanelRow, SelectControl } from '@wordpress/components';

const DataControls = ({ attributes, setAttributes }) => {
    const { sortOrder } = attributes;
    return (
        <PanelBody title={__('Data Sorting')} initialOpen={false}>
            <PanelRow>
                For data that is categorical, we can sort the data in a number
                of ways (eg. not linear or time scale. Think stacked bar charts,
                grouped bar charts, dot plots, etc.).
            </PanelRow>
            <PanelRow>
                Selecting a sort will sort the dependent variable of your
                dataset (this will almost always be the first column of your
                table). The underlying library is a little finnicky re: sorting,
                so you may have to try a couple permutations to find the order
                you want.
            </PanelRow>
            <PanelRow>
                <ul>
                    <li>Ascending: usually returns data sorted A &#8594; Z</li>
                    <li>Descending: usually returns data sorted Z &#8594; A</li>
                    <li>No sort: returns data as it is input in the table</li>
                    <li>
                        Reverse: for some chart types, not sorting will return
                        the data in reverse order. Choose this option to reverse
                        the reverse :)
                    </li>
                </ul>
            </PanelRow>
            <SelectControl
                label={__('Sort Order')}
                value={sortOrder}
                options={[
                    {
                        value: 'ascending',
                        label: 'Ascending',
                    },
                    {
                        value: 'descending',
                        label: 'Descending',
                    },
                    {
                        value: 'none',
                        label: 'No Sort',
                    },
                    {
                        value: 'reverse',
                        label: 'Reverse',
                    },
                ]}
                onChange={(type) => {
                    setAttributes({
                        sortOrder: type,
                    });
                }}
            />
        </PanelBody>
    );
};

export default DataControls;
