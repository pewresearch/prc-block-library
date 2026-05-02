/**
 * Sync prc-block/entity-as-iframe Interactivity state from a container's visibility.
 *
 * @param {Element} containerEl - Element that contains `.wp-block-prc-block-entity-as-iframe`.
 * @param {boolean} isActive    - Whether the iframe should be active (load src + resizer).
 */
import { store } from '@wordpress/interactivity';

export function syncEntityIframeActive(containerEl, isActive) {
	const entityRoot = containerEl?.querySelector?.(
		'.wp-block-prc-block-entity-as-iframe'
	);
	if (!entityRoot) {
		return;
	}
	const entityIframe = entityRoot.querySelector('iframe');
	if (!entityIframe) {
		return;
	}
	const entityIframeId = entityIframe.getAttribute('id');
	if (!entityIframeId) {
		return;
	}
	const { state } = store('prc-block/entity-as-iframe');
	if (state?.[entityIframeId]) {
		state[entityIframeId].isActive = isActive;
	}
}
