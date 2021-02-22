// Init additional panel body inspector tools area for core/table block.

// Dropzone for CSV file
// Convert to table json data
/**
 * WordPress Dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { InspectorControls } from '@wordpress/block-editor';
import {
    Button,
    DropZoneProvider,
    DropZone,
    PanelBody,
    PanelRow,
} from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';

/**
 * External Dependencies
 */
import csv from 'csv';

const convertToRow = (d, tag = 'td') => {
    return d.map(content => {
        return {
            content,
            tag,
        };
    });
};

const convertJSONToAttributes = (d, tag = 'td') => {
    console.log('convertJSONToAttributes', tag, d);
    if ('th' === tag) {
        return convertToRow(d, tag);
    }
    return d.map(row => {
        return { cells: convertToRow(row, tag) };
    });
};

const TableBlockEdit = props => {
    console.log('<TableBlockEdit/>', props);
    const { attributes, setAttributes } = props;
    const [hasDropped, toggleDropped] = useState(false);

    const onDropCSV = filesList => {
        const reader = new FileReader();
        // Define how data is parsed and handled.
        reader.onload = () => {
            csv.parse(reader.result, (err, data) => {
                console.log('onDropCSV Result...', data, props.attributes);

                const headerData = convertJSONToAttributes(data.shift(), 'th');

                const bodyData = convertJSONToAttributes(data);
                setAttributes({ body: bodyData });
                setAttributes({ head: [{ cells: headerData }] });
                console.log('...data...', bodyData, headerData);
            });
        };

        filesList.forEach(file => reader.readAsBinaryString(file));
    };

    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title="CSV Import">
                    <PanelRow>
                        <DropZoneProvider>
                            <Button isPrimary>Upload CSV</Button>
                            <DropZone
                                onFilesDrop={c => {
                                    console.log('onFilesDrop', c);
                                    onDropCSV(c);
                                    toggleDropped(true);
                                }}
                                onDrop={c => {
                                    console.log('onDrop', c);
                                    toggleDropped(true);
                                }}
                            />
                        </DropZoneProvider>
                    </PanelRow>
                </PanelBody>
            </InspectorControls>
        </Fragment>
    );
};

const TableBlockFilter = createHigherOrderComponent(BlockEdit => {
    return props => {
        const { name } = props;
        if ('core/table' !== name) {
            return <BlockEdit {...props} />;
        }
        return (
            <Fragment>
                <BlockEdit {...props} />
                <TableBlockEdit {...props} />
            </Fragment>
        );
    };
}, 'withInspectorControl');

addFilter('editor.BlockEdit', 'prc-block/table', TableBlockFilter, 21);
