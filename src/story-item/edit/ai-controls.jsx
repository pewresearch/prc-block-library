/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { BlockControls } from '@wordpress/block-editor';
import {
	Modal,
	ToolbarDropdownMenu,
	ToolbarGroup,
} from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { update } from '@wordpress/icons';
import { useState } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal Dependencies
 */
import AIGenerateStoryItem from './ai-generate';

const ALLOWED_BLOCKS = ['prc-block/story-item'];

/**
 * Higher-order component that wraps the Story Item block edit component
 * to inject a Generate with AI toolbar dropdown containing title and blurb options.
 */
const withAIGenerateStoryItem = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const [isModalOpen, setIsModalOpen] = useState(false);
		const [mode, setMode] = useState('blurb');

		if (!window.PRCStoryItemAI?.enabled) {
			return <BlockEdit {...props} />;
		}

		if (!ALLOWED_BLOCKS.includes(props.name)) {
			return <BlockEdit {...props} />;
		}

		const headerEnabled = props.attributes.enableHeader !== false;
		const excerptEnabled = props.attributes.enableExcerpt !== false;

		// Don't render any AI control if both features are disabled.
		if (!headerEnabled && !excerptEnabled) {
			return <BlockEdit {...props} />;
		}

		const openModal = (selectedMode) => {
			setMode(selectedMode);
			setIsModalOpen(true);
		};

		const controls = [];

		if (headerEnabled) {
			controls.push({
				title: __('Generate title', 'prc-block-library'),
				onClick: () => openModal('title'),
			});
		}

		if (excerptEnabled) {
			controls.push({
				title: __('Generate blurb', 'prc-block-library'),
				onClick: () => openModal('blurb'),
			});
		}

		const modalTitle =
			mode === 'title'
				? __('Generate title', 'prc-block-library')
				: __('Generate blurb', 'prc-block-library');

		return (
			<>
				<BlockEdit {...props} />
				<BlockControls group="other">
					<ToolbarGroup>
						<ToolbarDropdownMenu
							icon={update}
							label={__('Generate with AI', 'prc-block-library')}
							controls={controls}
						/>
					</ToolbarGroup>
				</BlockControls>
				{isModalOpen && (
					<Modal
						title={modalTitle}
						onRequestClose={() => setIsModalOpen(false)}
					>
						<AIGenerateStoryItem
							mode={mode}
							attributes={props.attributes}
							setAttributes={props.setAttributes}
							onClose={() => setIsModalOpen(false)}
						/>
					</Modal>
				)}
			</>
		);
	};
}, 'withAIGenerateStoryItem');

addFilter(
	'editor.BlockEdit',
	'prc-block-library/story-item/ai-controls',
	withAIGenerateStoryItem
);
