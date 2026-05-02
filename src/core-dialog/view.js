/**
 * WordPress Dependencies
 */

import { store, getElement, withSyncEvent } from '@wordpress/interactivity';

import { syncEntityIframeActive } from '../entity-as-iframe/shared/sync-entity-iframe-active.js';
import { prefetchEntityIframeUrl } from '../entity-as-iframe/shared/prefetch-entity-iframe.js';

const { VideoPressIframeApi } = window;

/**
 * Load the YouTube iframe API script dynamically.
 *
 * @return {Promise} A promise that resolves when the script has loaded.
 */
const loadYouTubeIframeAPI = () => {
	return new Promise((resolve, reject) => {
		// Check if the API is already loaded
		if (window.YT && window.YT.Player) {
			resolve(window.YT);
			return;
		}

		// Create a global callback for when the API loads
		window.onYouTubeIframeAPIReady = () => {
			resolve(window.YT);
		};

		const script = document.createElement('script');
		script.src = 'https://www.youtube.com/iframe_api';
		script.onload = () => {
			// The onYouTubeIframeAPIReady callback will be called by the API itself
		};
		script.onerror = (error) => {
			reject(error);
		};
		document.head.appendChild(script);
	});
};

/**
 * Load the Vimeo Player API script dynamically.
 *
 * @return {Promise} A promise that resolves when the script has loaded.
 */
const loadVimeoAPI = () => {
	return new Promise((resolve, reject) => {
		if (window.Vimeo && window.Vimeo.Player) {
			resolve(window.Vimeo);
			return;
		}

		const script = document.createElement('script');
		script.src = 'https://player.vimeo.com/api/player.js';
		script.onload = () => resolve(window.Vimeo);
		script.onerror = reject;
		document.head.appendChild(script);
	});
};

/**
 * Add VideoPress, YouTube, and Vimeo support to prc-block/dialog.
 * VideoPress API Docs: https://github.com/Automattic/videopress-player-api-doc/blob/trunk/public-js-api.md
 * YouTube IFrame API: https://developers.google.com/youtube/iframe_api_reference
 * Vimeo Player API: https://developer.vimeo.com/player/sdk/reference
 */
const { state, actions } = store('prc-block/dialog', {
	state: {
		watchedVideos: [],
		videoPressAPIReady: false,
		youTubeAPIReady: false,
		vimeoAPIReady: false,
	},
	actions: {
		/**
		 * Checks the element for any available animations and dispatches them with the animations store.
		 */
		runAnimation: () => {
			const { isOpen } = state;
			if (!isOpen) {
				return;
			}
			const { ref } = getElement();
			const animationStore = store('prc-block/animation');
			const animationElements = ref.querySelectorAll(
				'.wp-block-prc-block-animation'
			);
			if (animationElements.length) {
				animationElements.forEach((element) => {
					const animationId = element.getAttribute('id');
					const { parentElement } = element;
					const isHidden =
						null !== parentElement?.getAttribute('hidden');
					if (animationId && !isHidden) {
						animationStore.state[animationId].enabled = true;
					}
				});
			}
		},
		/**
		 * Plays the video in the dialog if a VideoPress, YouTube, or Vimeo block is present.
		 * @param {string} id The dialog block id.
		 */
		play: (id) => {
			// These are direct id state calls instead of derived state because when calling play directly we want to be explicit about which video dialog we're targeting.
			// Sanity Checks:
			if (!id) {
				return;
			}
			// Play VideoPress video if available
			if (state.dialogs[id].videoPressAPI && state.videoPressAPIReady) {
				state.dialogs[id].videoPressAPI.controls.play();
			}
			// Play YouTube video if available
			if (state.dialogs[id].youTubePlayer && state.youTubeAPIReady) {
				state.dialogs[id].youTubePlayer.playVideo();
			}
			// Play Vimeo video if available
			if (state.dialogs[id].vimeoPlayer && state.vimeoAPIReady) {
				state.dialogs[id].vimeoPlayer.play();
			}
		},
		/**
		 * Pauses the video in the dialog if a VideoPress, YouTube, or Vimeo block is present.
		 * @param {string} id The dialog block id.
		 */
		pause: (id) => {
			// Sanity Checks:
			if (!id) {
				return;
			}
			// Pause VideoPress video if available
			if (state.dialogs[id].videoPressAPI && state.videoPressAPIReady) {
				state.dialogs[id].videoPressAPI.controls.pause();
			}
			// Pause YouTube video if available
			if (state.dialogs[id].youTubePlayer && state.youTubeAPIReady) {
				state.dialogs[id].youTubePlayer.pauseVideo();
			}
			// Pause Vimeo video if available
			if (state.dialogs[id].vimeoPlayer && state.vimeoAPIReady) {
				state.dialogs[id].vimeoPlayer.pause();
			}
		},
		/**
		 * Resets the video in the dialog to the beginning if a VideoPress, YouTube, or Vimeo block is present.
		 * @param {string} id The dialog block id.
		 */
		reset: (id) => {
			// Sanity Checks:
			if (!id) {
				return;
			}
			// Reset VideoPress video if available
			if (state.dialogs[id].videoPressAPI && state.videoPressAPIReady) {
				state.dialogs[id].videoPressAPI.controls.seek(0);
			}
			// Reset YouTube video if available
			if (state.dialogs[id].youTubePlayer && state.youTubeAPIReady) {
				state.dialogs[id].youTubePlayer.seekTo(0);
			}
			// Reset Vimeo video if available
			if (state.dialogs[id].vimeoPlayer && state.vimeoAPIReady) {
				state.dialogs[id].vimeoPlayer.setCurrentTime(0);
			}
		},
		/**
		 * When the element initializes, hoist the VideoPress API if a VideoPress block is present in the dialog content into global state.
		 */
		initVideoPressAPI: async () => {
			// Because the VideoPress block is on the page the VideoPressIframeApi should be available,
			// access it from window global, we import this (if available) at the top of the file.
			// If(when) a VideoPress JS module becomes available, we'll use that.
			if (!VideoPressIframeApi) {
				return;
			}
			const { id } = state;
			if (!id) {
				return;
			}
			const { ref } = getElement();
			const hasVideoPress = ref.querySelector(
				'.jetpack-videopress-player'
			);
			if (!hasVideoPress) {
				return;
			}
			const iframe = hasVideoPress.querySelector('iframe');
			if (!iframe) {
				return;
			}

			let duration = null;

			/**
			 * Wrap VideoPressIframeApi in a Promise so we can await the ready callback
			 * before returning. This ensures `play()` is never called before the
			 * postMessage communication channel between parent and iframe is established.
			 */
			await new Promise((resolve) => {
				const VideoPressInstance = VideoPressIframeApi(iframe, () => {
					// Disable the share button by default.
					VideoPressInstance.customize.set({ shareButton: false });
					// Set up a listener to get the initial duration once loaded.
					VideoPressInstance.info.onInfoUpdated(async () => {
						// Get the duration and store it in state for later use.
						duration = await VideoPressInstance.info.duration();
					});
					/**
					 * Set up an event listener to track playback duration time updates.
					 *
					 * Note: This event fires very frequently, so be cautious about what you do in this callback.
					 *
					 * Note: This is the total user playback duration, not the position in the video.
					 * For example, if a user watches the first 10 seconds of a 60 second video,
					 * then rewinds and watches the first 10 seconds again, this value will be 20 seconds.
					 */
					VideoPressInstance.status.onPlaybackTimeUpdated(
						(newPlaybackTime) => {
							const percentage = (
								(newPlaybackTime / duration) *
								100
							).toFixed(2);
							// If the user has watched more cumulatively more than 70 percent of the video duration, log that they've watched it.
							if (
								percentage >= 70 &&
								!state.watchedVideos.includes(id)
							) {
								state.watchedVideos = [
									...state.watchedVideos,
									id,
								];
							}
						}
					);

					// Mark ready AFTER the communication channel is established.
					state.videoPressAPIReady = true;
					resolve();
				});

				// Assign synchronously so duplicate init calls are prevented
				// while we await the ready callback above.
				state.dialogs[id].videoPressAPI = VideoPressInstance;
			});
		},

		/**
		 * When the element initializes, hoist the YouTube API if a YouTube iframe is present in the dialog content into global state.
		 */
		initYouTubeAPI: async () => {
			const { id } = state;
			if (!id) {
				return;
			}

			const { ref } = getElement();
			// Check for YouTube iframes
			// YouTube embeds typically have src containing "youtube.com/embed/" or "youtu.be/"
			const youtubeIframe = ref.querySelector(
				'iframe[src*="youtube.com/embed/"], iframe[src*="youtu.be/"]'
			);
			if (!youtubeIframe) {
				return;
			}

			// Load the YouTube API if needed
			try {
				const YT = await loadYouTubeIframeAPI();

				// Extract the video ID from the iframe src
				const src = youtubeIframe.src;
				const srcUrl = new URL(src);

				// Add API support to the iframe if not already present
				if (!srcUrl.search.includes('enablejsapi=1')) {
					srcUrl.searchParams.set('enablejsapi', '1');
					youtubeIframe.src = srcUrl.toString();
				}

				// Initialize the YouTube player with the iframe
				const youTubePlayer = new YT.Player(youtubeIframe, {
					events: {
						onReady: () => {
							state.youTubeAPIReady = true;
						},
						onStateChange: (event) => {
							const eventId = event.data;
							// Track video completion (state 0 = ended)
							if (eventId === YT.PlayerState.ENDED) {
								if (!state.watchedVideos.includes(id)) {
									state.watchedVideos = [
										...state.watchedVideos,
										id,
									];
								}
							}

							// Track video watching progress
							if (eventId === YT.PlayerState.PLAYING) {
								// Set up an interval to check progress
								if (state.dialogs[id].youTubeProgressInterval) {
									clearInterval(
										state.dialogs[id]
											.youTubeProgressInterval
									);
								}

								state.dialogs[id].youTubeProgressInterval =
									setInterval(() => {
										const player =
											state.dialogs[id].youTubePlayer;
										if (
											player &&
											typeof player.getCurrentTime ===
												'function'
										) {
											const currentTime =
												player.getCurrentTime();
											const duration =
												player.getDuration();
											const percentage = (
												(currentTime / duration) *
												100
											).toFixed(2);

											// If the user has watched more than 70 percent of the video duration, log that they've watched it
											if (
												percentage >= 70 &&
												!state.watchedVideos.includes(
													id
												)
											) {
												state.watchedVideos = [
													...state.watchedVideos,
													id,
												];
												// Clear the interval once we've marked as watched
												clearInterval(
													state.dialogs[id]
														.youTubeProgressInterval
												);
												state.dialogs[
													id
												].youTubeProgressInterval =
													null;
											}
										}
									}, 2000); // Check every 2 seconds
							}

							// Clear interval when paused or ended
							if (
								eventId === YT.PlayerState.PAUSED ||
								eventId === YT.PlayerState.ENDED
							) {
								if (state.dialogs[id].youTubeProgressInterval) {
									clearInterval(
										state.dialogs[id]
											.youTubeProgressInterval
									);
									state.dialogs[id].youTubeProgressInterval =
										null;
								}
							}
						},
					},
				});

				// Store the YouTube player instance in state
				state.dialogs[id].youTubePlayer = youTubePlayer;
			} catch {
				// YouTube API failed to load; video playback unavailable.
			}
		},

		/**
		 * When the element initializes, hoist the Vimeo API if a Vimeo iframe is present in the dialog content into global state.
		 */
		initVimeoAPI: async () => {
			const { id } = state;
			if (!id) {
				return;
			}

			const { ref } = getElement();
			const vimeoIframe = ref.querySelector(
				'iframe[src*="player.vimeo.com/video/"]'
			);
			if (!vimeoIframe) {
				return;
			}

			try {
				await loadVimeoAPI();
				const vimeoPlayer = new window.Vimeo.Player(vimeoIframe);

				vimeoPlayer.on('timeupdate', (data) => {
					// data.percent is 0-1
					if (
						data.percent >= 0.7 &&
						!state.watchedVideos.includes(id)
					) {
						state.watchedVideos = [...state.watchedVideos, id];
					}
				});

				vimeoPlayer.on('ended', () => {
					if (!state.watchedVideos.includes(id)) {
						state.watchedVideos = [...state.watchedVideos, id];
					}
				});

				state.dialogs[id].vimeoPlayer = vimeoPlayer;
				state.vimeoAPIReady = true;
			} catch {
				// Vimeo API failed to load; video playback unavailable.
			}
		},
	},
	callbacks: {
		onOpenStartVideo: async () => {
			const { id } = state;
			const isOpen = state.dialog?.isOpen;
			// Sanity Checks:
			if (!id || !isOpen) {
				return;
			}
			// Lazy-init VideoPress: initialize the API only when the dialog first opens
			// so the iframe has proper layout dimensions (fixes 0x0 rendering in hidden dialog).
			if (!state.dialogs[id].videoPressAPI) {
				await actions.initVideoPressAPI();
			}
			actions.play(id);
		},
		onCloseStopVideo: async () => {
			const { id } = state;
			const isOpen = state.dialog?.isOpen;
			if (!id) {
				return;
			}
			// Check if there's a video player (VideoPress, YouTube, or Vimeo)
			const hasVideoPlayer =
				undefined !== state.dialogs[id].videoPressAPI ||
				undefined !== state.dialogs[id].youTubePlayer ||
				undefined !== state.dialogs[id].vimeoPlayer;
			if (!isOpen && hasVideoPlayer) {
				// When the dialog closes, check if the video has been marked watch, if so reset it, otherwise pause it.
				actions.pause(id);
				if (state.watchedVideos.includes(id)) {
					// If we've already logged this video as watched, reset to the beginning.
					actions.reset(id);
				}
			}
		},
		/**
		 * Handles the animation end event, fires an event when the animation completes.
		 */
		onAnimationEnd: () => {
			const { id, dialog } = state;
			const animationDuration = dialog.animationDuration || 0;
			if (!id || !dialog.isOpen) {
				return;
			}
			setTimeout(() => {
				window.dispatchEvent(new CustomEvent('wpDialogAnimationEnd'));
			}, animationDuration);
		},
		/**
		 * Initialize VideoPress, YouTube, and Vimeo players when the dialog content is loaded.
		 */
		onVideoInit: async () => {
			// VideoPress is initialized lazily in onOpenStartVideo to ensure the
			// iframe has proper layout dimensions (not 0x0 from a hidden dialog).
			// Initialize YouTube
			actions.initYouTubeAPI();
			// Initialize Vimeo
			actions.initVimeoAPI();
		},
		/**
		 * Keep nested entity-as-iframe `isActive` in sync with `state.dialog.isOpen` (same `prc-block/dialog` store).
		 * Used with `data-wp-watch--sync-entity-iframes` so this re-runs when open state changes reactively.
		 */
		syncEntityIframeWithDialog: () => {
			const isOpen = state.dialog?.isOpen;
			const { ref } = getElement();
			if (!ref?.querySelector?.('.wp-block-prc-block-entity-as-iframe')) {
				return;
			}
			syncEntityIframeActive(ref, !!isOpen);
		},
		/**
		 * Prefetch entity iframe document(s) when the pointer enters the dialog trigger (set on trigger via PHP).
		 */
		prefetchEntityIframeOnTriggerPointer: withSyncEvent((event) => {
			const trigger = event.currentTarget;
			const dialogId = trigger.getAttribute('aria-controls');
			if (!dialogId) {
				return;
			}
			const dialogEl = document.getElementById(dialogId);
			if (!dialogEl) {
				return;
			}
			dialogEl
				.querySelectorAll('[data-entity-iframe-prefetch-url]')
				.forEach((el) => {
					const url = el.getAttribute(
						'data-entity-iframe-prefetch-url'
					);
					if (url) {
						prefetchEntityIframeUrl(url);
					}
				});
		}),
	},
});
