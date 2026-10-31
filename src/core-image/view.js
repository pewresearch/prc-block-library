/**
 * WordPress Dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

/**
 * Internal Dependencies
 */
import {
	SHARE_IMAGE_QUERY_ARG,
	generateShareUrl,
	getPageUrl,
	openShareWindow,
} from '../core-social-links/shared/share-urls.js';

function getImageShareUrl(imageId) {
	const url = getPageUrl();
	url.searchParams.set(SHARE_IMAGE_QUERY_ARG, imageId);
	return url.toString();
}

function closeAndFocusToggle(context, ref) {
	context.isOpen = false;
	ref.querySelector('.wp-block-image__share-toggle')?.focus();
}

store('prc-block/core-image-share', {
	actions: {
		toggle() {
			const context = getContext();
			context.isOpen = !context.isOpen;
		},
		share() {
			const { imageId } = getContext();
			const { ref } = getElement();
			const platform = ref.dataset.target;
			openShareWindow(
				generateShareUrl(platform, {
					url: getImageShareUrl(imageId),
				}),
				platform
			);
		},
		*download() {
			const { imageUrl, filename } = getContext();
			try {
				const response = yield window.fetch(imageUrl);
				if (!response.ok) {
					throw new Error(response.statusText);
				}
				const blob = yield response.blob();
				const objectUrl = URL.createObjectURL(blob);
				const anchor = document.createElement('a');
				anchor.href = objectUrl;
				anchor.download = filename;
				document.body.appendChild(anchor);
				anchor.click();
				anchor.remove();
				URL.revokeObjectURL(objectUrl);
			} catch {
				window.open(imageUrl, '_blank', 'noopener');
			}
		},
		closeOnEscape(event) {
			const context = getContext();
			if ('Escape' !== event.key || !context.isOpen) {
				return;
			}
			closeAndFocusToggle(context, getElement().ref);
		},
		closeOnOutsideClick(event) {
			const context = getContext();
			const { ref } = getElement();
			if (context.isOpen && !ref.contains(event.target)) {
				context.isOpen = false;
			}
		},
	},
	callbacks: {
		revealSharedImage() {
			const { imageId } = getContext();
			const sharedId = new URLSearchParams(window.location.search).get(
				SHARE_IMAGE_QUERY_ARG
			);
			if (String(imageId) !== sharedId) {
				return;
			}
			const { ref } = getElement();
			const firstMatch = [
				...document.querySelectorAll('.wp-block-image__share'),
			].find(
				(el) =>
					JSON.parse(el.dataset.wpContext || '{}').imageId === imageId
			);
			if (firstMatch === ref) {
				ref.closest('figure')?.scrollIntoView({ block: 'center' });
			}
		},
	},
});
