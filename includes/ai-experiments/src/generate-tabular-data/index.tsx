/**
 * External Dependencies
 */
import { AISuggestToolbarButton } from '@prc/components';

/**
 * WordPress Dependencies
 */
import { addFilter } from '@wordpress/hooks';
import { Modal } from '@wordpress/components';
import { __ } from '@wordpress/i18n';
import { useState } from '@wordpress/element';
import { createHigherOrderComponent } from '@wordpress/compose';

/**
 * Internal Dependencies
 */
import AIGenerateTable from './ai-generate-table';

const ALLOWED_BLOCKS = ['prc-block/table'];

/**
 * Higher-order component that wraps allowed block edit components
 * to inject an AI Generate toolbar button. Clicking the button opens
 * a modal containing the AI action interface.
 *
 * This filter is only registered when the AI experiment is enabled,
 * so the block's own code remains completely unaware of this feature.
 */
const withAIExperiments = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const [isModalOpen, setIsModalOpen] = useState(false);

		if (!ALLOWED_BLOCKS.includes(props.name)) {
			return <BlockEdit {...props} />;
		}

		return (
			<>
				<BlockEdit {...props} />
				<AISuggestToolbarButton
					label={__('Suggest with AI', 'prc-block-library')}
					onClick={() => setIsModalOpen(true)}
				/>
				{isModalOpen && (
					<Modal
						title={__('Suggest with AI', 'prc-block-library')}
						onRequestClose={() => setIsModalOpen(false)}
					>
						<AIGenerateTable
							attributes={props.attributes}
							setAttributes={props.setAttributes}
							onClose={() => setIsModalOpen(false)}
						/>
					</Modal>
				)}
			</>
		);
	};
}, 'withAIGenerateTable');

addFilter(
	'editor.BlockEdit',
	'prc-block-library/ai-experiments',
	withAIExperiments
);
