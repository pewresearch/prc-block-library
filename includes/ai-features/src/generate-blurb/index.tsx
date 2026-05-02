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
import AIGenerateBlurb from './ai-generate-blurb';

const ALLOWED_BLOCKS = ['prc-block/story-item'];

/**
 * Higher-order component that wraps the Story Item block edit component
 * to inject a Generate blurb toolbar button.
 */
const withAIGenerateBlurb = createHigherOrderComponent((BlockEdit) => {
	return (props) => {
		const [isModalOpen, setIsModalOpen] = useState(false);

		if (!ALLOWED_BLOCKS.includes(props.name)) {
			return <BlockEdit {...props} />;
		}

		const excerptEnabled = props.attributes.enableExcerpt !== false;

		return (
			<>
				<BlockEdit {...props} />
				{excerptEnabled && (
					<>
						<AISuggestToolbarButton
							label={__('Generate blurb', 'prc-block-library')}
							onClick={() => setIsModalOpen(true)}
						/>
						{isModalOpen && (
							<Modal
								title={__(
									'Generate blurb',
									'prc-block-library'
								)}
								onRequestClose={() => setIsModalOpen(false)}
							>
								<AIGenerateBlurb
									attributes={props.attributes}
									setAttributes={props.setAttributes}
									onClose={() => setIsModalOpen(false)}
								/>
							</Modal>
						)}
					</>
				)}
			</>
		);
	};
}, 'withAIGenerateBlurb');

addFilter(
	'editor.BlockEdit',
	'prc-block-library/ai-features/generate-blurb',
	withAIGenerateBlurb
);
