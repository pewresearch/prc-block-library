/**
 * WordPress Dependencies
 */
import { store, getContext } from '@wordpress/interactivity';

const { actions } = store('prc-block/timeline', {
	actions: {
		togglePlay: () => {
			const context = getContext();
			context.isPlaying = !context.isPlaying;

			// Update aria-pressed state
			const button = document.querySelector(
				`#${context.id} .play-pause-button`
			);
			if (button) {
				button.setAttribute('aria-pressed', context.isPlaying);
			}

			if (context.isPlaying) {
				actions.startAutoPlay();
			} else {
				actions.stopAutoPlay();
			}
		},
		startAutoPlay: () => {
			const context = getContext();
			const { id, ticks, interval } = context;
			const slider = document.getElementById(id);

			context.intervalId = setInterval(() => {
				let currentValue = parseInt(slider.value);
				if (currentValue >= ticks.length - 1) {
					currentValue = 0;
				} else {
					currentValue++;
				}

				slider.value = currentValue;
				const tick = ticks[currentValue];
				context.activeTickId = tick.id;
			}, interval);
		},
		stopAutoPlay: () => {
			const context = getContext();
			if (context.intervalId) {
				clearInterval(context.intervalId);
				context.intervalId = null;
				context.isPlaying = false;
			}
		},
		activateTick: () => {
			// If used, stop autoplay immediately
			actions.stopAutoPlay();
			const context = getContext();
			const { tick } = context;
			const { id } = tick;
			context.activeTickId = id;
			// Update focus for keyboard users
			const tickElement = document.querySelector(
				`[data-tick-id="${id}"]`
			);
			if (tickElement) {
				tickElement.focus();
			}
			// Update the input range to match, use the index of the
			// given tick from context.ticks given the id
			const slider = document.getElementById(context.id);
			const index = context.ticks.findIndex((t) => t.id === id);
			slider.value = index;
		},
	},
	callbacks: {
		onInit: () => {
			const context = getContext();
			const { id, ticks, isPlaying } = context;
			const slider = document.getElementById(id);

			// Handle continuous sliding
			slider.addEventListener('input', (event) => {
				const value = parseFloat(event.target.value);
				// Find the nearest tick index based on the current value
				const tickIndex = Math.min(
					Math.round(
						(value / (ticks.length - 1)) * (ticks.length - 1)
					),
					ticks.length - 1
				);
				const tick = ticks[tickIndex];
				context.activeTickId = tick.id;
			});

			// Handle snap on release
			slider.addEventListener('change', (event) => {
				const value = parseFloat(event.target.value);
				// Calculate the nearest tick position
				const tickIndex = Math.min(
					Math.round(
						(value / (ticks.length - 1)) * (ticks.length - 1)
					),
					ticks.length - 1
				);
				// Update the slider value to the nearest tick position
				slider.value = tickIndex;
				const tick = ticks[tickIndex];
				context.activeTickId = tick.id;
			});

			// Start autoplay if autostart is enabled
			if (isPlaying) {
				actions.startAutoPlay();
			}
		},
		isTimelineSlideActive: () => {
			const context = getContext();
			const { id, activeTickId } = context;
			return id === activeTickId;
		},
		autoPlayButtonText: () => {
			const context = getContext();
			return context.isPlaying ? 'Pause' : 'Play';
		},
		getTickPosition: () => {
			const context = getContext();
			const { tick } = context;
			const activePosition = tick.position;
			return `left: ${activePosition}%`;
		},
	},
});
