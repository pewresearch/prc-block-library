/* global MutationObserver */

/**
 * WordPress Dependencies
 */
import { store, getElement, useEffect } from '@wordpress/interactivity';

import { syncEntityIframeActive } from '../entity-as-iframe/shared/sync-entity-iframe-active.js';
import { prefetchEntityIframeUrl } from '../entity-as-iframe/shared/prefetch-entity-iframe.js';

/**
 * Sync entity-as-iframe isActive state with the accordion's open/close class.
 *
 * @param {Element} ref    - The accordion-item DOM element.
 * @param {boolean} isOpen - Whether the accordion item is open.
 */
function syncEntityIframes(ref, isOpen) {
	syncEntityIframeActive(ref, isOpen);
}

/* eslint-disable react-hooks/rules-of-hooks -- data-wp-run callbacks support hooks per Interactivity API spec */
store('core/accordion-extended', {
	callbacks: {
		watchOpenState: () => {
			const { ref } = getElement();

			useEffect(() => {
				if (!ref) {
					return;
				}

				syncEntityIframes(ref, ref.classList.contains('is-open'));

				const observer = new MutationObserver((mutations) => {
					for (const mutation of mutations) {
						if (
							mutation.type === 'attributes' &&
							mutation.attributeName === 'class'
						) {
							syncEntityIframes(
								ref,
								ref.classList.contains('is-open')
							);
						}
					}
				});

				observer.observe(ref, {
					attributes: true,
					attributeFilter: ['class'],
				});

				const prefetchOnHeaderEnter = (event) => {
					const header = event.target.closest?.(
						'.wp-block-accordion-header'
					);
					if (!header || !ref.contains(header)) {
						return;
					}
					if (ref.classList.contains('is-open')) {
						return;
					}
					const root = ref.querySelector(
						'.wp-block-prc-block-entity-as-iframe'
					);
					const url = root?.getAttribute(
						'data-entity-iframe-prefetch-url'
					);
					if (url) {
						prefetchEntityIframeUrl(url);
					}
				};

				ref.addEventListener(
					'pointerenter',
					prefetchOnHeaderEnter,
					true
				);

				return () => {
					observer.disconnect();
					ref.removeEventListener(
						'pointerenter',
						prefetchOnHeaderEnter,
						true
					);
				};
			}, [ref]); // eslint-disable-line react-hooks/exhaustive-deps
		},
	},
});
/* eslint-enable react-hooks/rules-of-hooks */
