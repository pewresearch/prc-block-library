/**
 * External Dependencies
 */
import {
	useAISuggest,
	AILoadingIndicator,
	AISuggestionPreview,
} from '@prc/components';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { useCallback, useEffect } from '@wordpress/element';
import { escapeHTML } from '@wordpress/escape-html';
import { Notice } from '@wordpress/components';

declare global {
	interface Window {
		PRCBlurbAI: {
			enabled: boolean;
			abilityName: string;
		};
	}
}

const MODAL_CONTENT_WIDTH = '360px';

interface AIGenerateBlurbProps {
	attributes: Record<string, unknown>;
	setAttributes: (attrs: Record<string, unknown>) => void;
	onClose?: () => void;
}

/**
 * Modal UI for generating a story item excerpt blurb via AI.
 *
 * @param root0
 * @param root0.attributes
 * @param root0.setAttributes
 * @param root0.onClose
 */
export default function AIGenerateBlurb({
	attributes,
	setAttributes,
	onClose,
}: AIGenerateBlurbProps) {
	const postId = attributes.postId as number | undefined;

	const aiConfig = window.PRCBlurbAI;
	const abilityName = aiConfig?.abilityName || 'prc-ai/generate-blurb';

	const { isLoading, error, result, fetch, reset, dismissError } =
		useAISuggest<string>({
			abilityName,
			transformResult: (raw) => raw.blurb as string,
		});

	const handleFetch = useCallback(() => {
		if (!postId) {
			return;
		}
		fetch({ post_id: postId });
	}, [fetch, postId]);

	useEffect(() => {
		if (!postId) {
			return;
		}
		void fetch({ post_id: postId });
	}, [postId, fetch]);

	const applyResult = useCallback(() => {
		if (!result) {
			return;
		}
		const html = `<p>${escapeHTML(result)}</p>`;
		setAttributes({ excerpt: html });
		reset();
		onClose?.();
	}, [result, setAttributes, onClose, reset]);

	const handleDismiss = useCallback(() => {
		reset();
		onClose?.();
	}, [reset, onClose]);

	const contentStyle = {
		minWidth: MODAL_CONTENT_WIDTH,
		maxWidth: MODAL_CONTENT_WIDTH,
	};

	if (!postId) {
		return (
			<div style={contentStyle}>
				<Notice status="warning" isDismissible={false}>
					{__(
						'Link a post to this story item before generating a blurb.',
						'prc-block-library'
					)}
				</Notice>
			</div>
		);
	}

	return (
		<div style={contentStyle}>
			{isLoading && (
				<AILoadingIndicator
					message={__('Generating blurb…', 'prc-block-library')}
				/>
			)}

			{error && (
				<Notice status="warning" isDismissible onDismiss={dismissError}>
					{error}
				</Notice>
			)}

			{result && !isLoading && (
				<AISuggestionPreview
					headerLabel={__('Suggested blurb', 'prc-block-library')}
					onApply={applyResult}
					onDismiss={handleDismiss}
					onRegenerate={handleFetch}
					regenerateLabel={__('Generate again', 'prc-block-library')}
				>
					<p style={{ margin: 0, lineHeight: 1.5 }}>{result}</p>
				</AISuggestionPreview>
			)}
		</div>
	);
}
