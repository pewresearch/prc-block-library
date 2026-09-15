/**
 * Apple News inspector for core/image and core/group.
 *
 * Register once even when both block editor scripts import this module.
 */

import { addFilter, hasFilter } from '@wordpress/hooks';
import { createHigherOrderComponent } from '@wordpress/compose';
import { useSelect } from '@wordpress/data';
import { store as editorStore } from '@wordpress/editor';
import { store as coreStore } from '@wordpress/core-data';

import AppleNewsInspectorPanel from './panel';
import {
	APPLE_NEWS_ATTRIBUTE,
	APPLE_NEWS_BLOCKS,
	postTypeSupportsAppleNews,
} from './utils';

const BLOCK_EDIT_HOOK = 'prc-block/apple-news-inspector';
const REGISTER_HOOK = 'prc-block/apple-news-inspector-attributes';

function usePostTypeSupportsAppleNews() {
	return useSelect((select) => {
		const editor = select(editorStore);
		if (!editor || typeof editor.getCurrentPostType !== 'function') {
			return false;
		}
		const postTypeSlug = editor.getCurrentPostType();
		if (!postTypeSlug) {
			return false;
		}
		const core = select(coreStore);
		if (!core || typeof core.getPostType !== 'function') {
			return false;
		}
		const postTypeRecord = core.getPostType(postTypeSlug);
		return postTypeSupportsAppleNews(postTypeRecord);
	}, []);
}

const withAppleNewsInspector = createHigherOrderComponent(
	(BlockEdit) =>
		function AppleNewsInspector(props) {
			const { name, attributes, setAttributes } = props;
			const hasSupport = usePostTypeSupportsAppleNews();

			if (!APPLE_NEWS_BLOCKS.includes(name) || !hasSupport) {
				return <BlockEdit {...props} />;
			}

			return (
				<>
					<AppleNewsInspectorPanel
						attributes={attributes}
						setAttributes={setAttributes}
					/>
					<BlockEdit {...props} />
				</>
			);
		},
	'withAppleNewsInspector'
);

/**
 * Attach inspector filters once per editor load.
 */
export function registerAppleNewsInspector() {
	if (!hasFilter('editor.BlockEdit', BLOCK_EDIT_HOOK)) {
		addFilter(
			'editor.BlockEdit',
			BLOCK_EDIT_HOOK,
			withAppleNewsInspector,
			21
		);
	}

	if (!hasFilter('blocks.registerBlockType', REGISTER_HOOK)) {
		addFilter(
			'blocks.registerBlockType',
			REGISTER_HOOK,
			(settings, name) => {
				if (!APPLE_NEWS_BLOCKS.includes(name)) {
					return settings;
				}
				if (settings?.attributes?.appleNews) {
					return settings;
				}
				return {
					...settings,
					attributes: {
						...settings.attributes,
						appleNews: APPLE_NEWS_ATTRIBUTE,
					},
				};
			}
		);
	}
}
