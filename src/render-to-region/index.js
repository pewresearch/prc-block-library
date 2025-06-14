/**
 * Registers a new block provided a unique name and an object defining its behavior.
 *
 * @see https://developer.wordpress.org/block-editor/developers/block-api/#registering-a-block
 */

/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */
import { registerBlockType } from '@wordpress/blocks';
import { addFilter } from '@wordpress/hooks';
import { InspectorAdvancedControls } from '@wordpress/block-editor';
import { createHigherOrderComponent } from '@wordpress/compose';
import { PanelBody, SelectControl, BaseControl } from '@wordpress/components';
import { store as editorStore } from '@wordpress/editor';
import { useSelect } from '@wordpress/data';
import { useMemo } from '@wordpress/element';

/**
 * Internal Dependencies
 */

/**
 * Lets webpack process CSS, SASS or SCSS files referenced in JavaScript files.
 * All files containing `style` keyword are bundled together. The code used
 * gets applied both to the front of your site and to the editor. All other files
 * get applied to the editor only.
 *
 * @see https://www.npmjs.com/package/@wordpress/scripts#using-css
 */
import './style.scss';
import './editor.scss';
import edit from './edit';
import save from './save';
import metadata from './block.json';
import useRegionsFromPost from './get-regions-from-wp-template';

const { name } = metadata;

const settings = {
	edit,
	save,
};

registerBlockType(name, { ...metadata, ...settings });

/**
 * Add the responsiveContainerQuery controls to the core/group block.
 */
addFilter(
	'editor.BlockEdit',
	'prc-block/render-to-region-controls',
	createHigherOrderComponent(
		(BlockEdit) =>
			function RenderToRegion(props) {
				const { name, attributes, setAttributes, clientId } = props;
				const { metadata } = attributes;
				// we need to check if the block has the metadata.renderToRegion property and if it doesnt we dont need to be running these expensive queries. Also we should have an "is control open" state to prevent unnecessary re-renders...

				const { postId, postType, templateId } = useSelect((select) => {
					const {
						getCurrentPostId,
						getCurrentPostType,
						getCurrentTemplateId,
					} = select(editorStore);
					return {
						postId: getCurrentPostId(),
						postType: getCurrentPostType(),
						templateId: getCurrentTemplateId(),
					};
				}, []);

				const memoizedPostId = useMemo(() => postId, [postId]);
				const memoizedPostType = useMemo(() => postType, [postType]);
				const memoizedTemplateId = useMemo(
					() => templateId,
					[templateId]
				);

				const postRegions = useRegionsFromPost(
					memoizedPostId,
					memoizedPostType
				);

				// const templateRegions = useRegionsFromPost(
				// 	templateId,
				// 	'wp_template'
				// );

				/**
				 * Combine the regions from the post and the template and remove duplicates.
				 */
				const uniqueRegions = useMemo(() => {
					if (!postRegions) return [];
					const combinedRegions = [
						...postRegions,
						// ...templateRegions,
					];
					console.log('combinedRegions', combinedRegions);
					return [...new Set(combinedRegions)];
				}, [postRegions]);

				return (
					<>
						<InspectorAdvancedControls>
							<BaseControl
								label="Render To Region"
								id="prc-block-render-to-region-control"
								help="When you select a region, the block will be rendered to that region when that region's activation criteria are met."
							>
								<p>
									Regions available on this post and on this
									posts template will be available here...
									{`postId: ${memoizedPostId}, postType: ${memoizedPostType}, templateId: ${memoizedTemplateId}`}
								</p>
							</BaseControl>
						</InspectorAdvancedControls>
						<BlockEdit {...props} />
					</>
				);
			},
		'withRenderToRegionControls'
	),
	100
);
