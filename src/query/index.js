/**
 * WordPress Dependencies
 */
import { createHigherOrderComponent } from '@wordpress/compose';
import { Fragment, useState, useEffect } from '@wordpress/element';
import { InspectorControls, BlockControls } from '@wordpress/block-editor';
import {
    Button,
    KeyboardShortcuts,
    PanelBody,
    PanelRow,
} from '@wordpress/components';
import { addFilter } from '@wordpress/hooks';
import { registerBlockVariation, unregisterBlockVariation } from '@wordpress/blocks';
import { assign } from 'lodash';

/**
 * Internal Dependencies
 */

import TaxQuery from './tax-query';

const QueryBlockEdit = (props) => {
    const { attributes, setAttributes } = props;
    console.log('<QueryBlockEdit>', props);
    const {taxQuery} = attributes;
    if (undefined === taxQuery) {
        return <Fragment/>;
    }
    return (
        <Fragment>
            <InspectorControls>
                <PanelBody title="Taxonomy Query">
                    <div>
                        <TaxQuery taxQuery={taxQuery} setAttributes={setAttributes} />
                    </div>
                </PanelBody>
            </InspectorControls>
        </Fragment>
    );
};

const QueryBlockFilter = createHigherOrderComponent((BlockEdit) => {
    return (props) => {
        const { name } = props;
        if ('core/query' !== name) {
            return <BlockEdit {...props} />;
        }
        return (
            <Fragment>
                <BlockEdit {...props} />
                <QueryBlockEdit {...props} />
            </Fragment>
        );
    };
}, 'withInspectorControl');

registerBlockVariation(
    'core/query',
    {
		name: 'story-item-listing',
		title: 'Story Item Listing',
		description: 'Display a list of story items.',
		attributes: {
			query: {
				perPage: 3,
				pages: 1,
				offset: 0,
				postType: 'stub',
				categoryIds: [],
				tagIds: [],
				order: 'desc',
				orderBy: 'date',
				author: '',
				search: '',
				sticky: 'exclude',
				inherit: false,
			},
		},
        innerBlocks: [
			[
				'core/post-template',
				{},
				[ [ 'prc-block/story-item', {
					imageSlot: 'left',
					imageSize: 'A3'
				} ] ],
			],
		],
		scope: [ 'block' ],
	},
);

unregisterBlockVariation('core/query', 'posts-list');
unregisterBlockVariation('core/query', 'title-date');
unregisterBlockVariation('core/query', 'title-excerpt');
unregisterBlockVariation('core/query', 'title-date-excerpt');
unregisterBlockVariation('core/query', 'image-date-title');

// addFilter('editor.BlockEdit', 'prc-block/query', QueryBlockFilter, 21);
