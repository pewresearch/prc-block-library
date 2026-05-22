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
		PRCStoryItemAI: {
			enabled: boolean;
			abilityGenerateBlurb: string;
			abilityGenerateTitle: string;
		};
	}
}

const MODAL_CONTENT_WIDTH = '360px';

interface AIGenerateStoryItemProps {
	mode: 'title' | 'blurb';
	attributes: Record<string, unknown>;
	setAttributes: (attrs: Record<string, unknown>) => void;
	onClose?: () => void;
}

/**
 * Modal UI for generating a story item title or blurb via AI.
 *
 * @param root0
 * @param root0.mode
 * @param root0.attributes
 * @param root0.setAttributes
 * @param root0.onClose
 */
export default function AIGenerateStoryItem({
	mode,
	attributes,
	setAttributes,
	onClose,
}: AIGenerateStoryItemProps) {
	const postId = attributes.postId as number | undefined;

	const aiConfig = window.PRCStoryItemAI;
	const abilityName =
		mode === 'title'
			? aiConfig?.abilityGenerateTitle || 'prc-ai/generate-title'
			: aiConfig?.abilityGenerateBlurb || 'prc-ai/generate-blurb';

	const { isLoading, error, result, fetch, reset, dismissError } =
		useAISuggest<string>({
			abilityName,
			transformResult: (raw) =>
				mode === 'title'
					? (raw.title as string)
					: (raw.blurb as string),
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
		if (mode === 'title') {
			// title is a plain-text attribute; strip any HTML markup from model output
			// before storing so server-side esc_html() is the only escaping layer needed.
			setAttributes({ title: result.replace(/<[^>]*(>|$)/g, '') });
		} else {
			const html = `<p>${escapeHTML(result)}</p>`;
			setAttributes({ excerpt: html });
		}
		reset();
		onClose?.();
	}, [mode, result, setAttributes, onClose, reset]);

	const handleDismiss = useCallback(() => {
		reset();
		onClose?.();
	}, [reset, onClose]);

	const contentStyle = {
		minWidth: MODAL_CONTENT_WIDTH,
		maxWidth: MODAL_CONTENT_WIDTH,
	};

	const warningText =
		mode === 'title'
			? __(
					'Link a post to this story item before generating a title.',
					'prc-block-library'
				)
			: __(
					'Link a post to this story item before generating a blurb.',
					'prc-block-library'
				);

	const loadingText =
		mode === 'title'
			? __('Generating title…', 'prc-block-library')
			: __('Generating blurb…', 'prc-block-library');

	const previewHeaderLabel =
		mode === 'title'
			? __('Suggested title', 'prc-block-library')
			: __('Suggested blurb', 'prc-block-library');

	if (!postId) {
		return (
			<div style={contentStyle}>
				<Notice status="warning" isDismissible={false}>
					{warningText}
				</Notice>
			</div>
		);
	}

	return (
		<div style={contentStyle}>
			{isLoading && <AILoadingIndicator message={loadingText} />}

			{error && (
				<Notice status="warning" isDismissible onDismiss={dismissError}>
					{error}
				</Notice>
			)}

			{result && !isLoading && (
				<AISuggestionPreview
					headerLabel={previewHeaderLabel}
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
