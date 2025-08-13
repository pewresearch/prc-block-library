import {
	store,
	getContext,
	getServerContext,
	getServerState,
	getElement,
	withScope,
	withSyncEvent,
} from '@wordpress/interactivity';

/**
 * Internal Dependencies
 */

/**
 * Load the confetti script.
 */
const loadConfettiScript = () => {
	return new Promise((resolve, reject) => {
		const script = document.createElement('script');
		script.src =
			'https://cdn.jsdelivr.net/npm/canvas-confetti@1.9.3/dist/confetti.browser.min.js';
		script.onload = resolve;
		script.onerror = reject;
		document.head.appendChild(script);
	});
};

/**
 * Generate a random number between a min and max.
 */
function randomInRange(min, max) {
	return Math.random() * (max - min) + min;
}

const { state, actions } = store('prc-block/animation', {
	state: {
		get isAnimating() {
			const context = getContext();
			console.log('isAnimating', { ...context });
			if (!context) {
				return false;
			}
			const { id } = context;
			if (!id) {
				return false;
			}
			if (!state[id]) {
				return false;
			}
			return state[id].enabled;
		},
	},
	actions: {
		*explodeConfettiFireworks(speed) {
			console.log('explodeConfettiFireworks', { ...state });
			if (!state.isAnimating) {
				return;
			}
			const context = getContext();
			console.log('Confetti Fireworks!', { ...context, speed });
			var duration = speed;
			var animationEnd = Date.now() + duration;
			var defaults = {
				startVelocity: 30,
				spread: 360,
				ticks: 60,
				zIndex: 0,
			};

			var interval = setInterval(
				withScope(() => {
					var timeLeft = animationEnd - Date.now();

					if (timeLeft <= 0) {
						return clearInterval(interval);
					}

					var particleCount = 50 * (timeLeft / duration);
					// since particles fall down, start a bit higher than random
					confetti({
						...defaults,
						particleCount,
						origin: {
							x: randomInRange(0.1, 0.3),
							y: Math.random() - 0.2,
						},
					});
					confetti({
						...defaults,
						particleCount,
						origin: {
							x: randomInRange(0.7, 0.9),
							y: Math.random() - 0.2,
						},
					});
					context.enabled = false;
				}),
				250
			);
		},
		*explodeConfettiFromCenterOfScreen(speed) {
			if (!state.isAnimating) {
				return;
			}
			const context = getContext();
			console.log('Center Confetti Explosion!', { ...context, speed });

			// Single burst from center
			confetti({
				particleCount: 100,
				spread: 360,
				startVelocity: 30,
				gravity: 0.8,
				ticks: 100,
				origin: {
					x: 0.5, // Center horizontally
					y: 0.5, // Center vertically
				},
				colors: [
					'#FFD700',
					'#FF6B6B',
					'#4ECDC4',
					'#45B7D1',
					'#FFA07A',
					'#98D8C8',
				],
				shapes: ['square', 'circle'],
				scalar: 1.2,
			});

			// Additional burst with different timing for layered effect
			setTimeout(() => {
				confetti({
					particleCount: 50,
					spread: 270,
					startVelocity: 25,
					gravity: 0.9,
					ticks: 80,
					origin: {
						x: 0.5,
						y: 0.5,
					},
					colors: ['#FF69B4', '#00CED1', '#FFD700', '#32CD32'],
					shapes: ['circle'],
					scalar: 0.8,
				});

				// Reset animation state after all effects complete
				setTimeout(
					withScope(() => {
						context.enabled = false;
					}),
					2000
				);
			}, 200);
		},
		*explodeEmojiFireworks(emoji, speed) {
			if (!state.isAnimating) {
				return;
			}
			const context = getContext();
			console.log('Emoji Fireworks!', { ...context, emoji, speed });
			const emojiShape = confetti.shapeFromText({
				text: emoji,
				scalar: 1.2,
			});
			var duration = speed;
			var animationEnd = Date.now() + duration;
			var defaults = {
				startVelocity: 30,
				spread: 360,
				ticks: 60,
				zIndex: 0,
				shapes: [emojiShape],
			};

			var interval = setInterval(
				withScope(() => {
					var timeLeft = animationEnd - Date.now();

					if (timeLeft <= 0) {
						return clearInterval(interval);
					}

					var particleCount = 50 * (timeLeft / duration);
					// since particles fall down, start a bit higher than random
					confetti({
						...defaults,
						particleCount,
						origin: {
							x: randomInRange(0.1, 0.3),
							y: Math.random() - 0.2,
						},
					});
					confetti({
						...defaults,
						particleCount,
						origin: {
							x: randomInRange(0.7, 0.9),
							y: Math.random() - 0.2,
						},
					});
					context.enabled = false;
				}),
				250
			);
		},
		*explodeEmojiFromCenterOfScreen(emoji, speed) {
			if (!state.isAnimating) {
				return;
			}
			const context = getContext();
			console.log('Emoji Explosion!', { ...context, emoji, speed });
			const emojiShape = confetti.shapeFromText({
				text: emoji,
				scalar: 1.2,
			});

			// Single burst from center
			confetti({
				particleCount: 100,
				spread: 360,
				startVelocity: 30,
				gravity: 0.8,
				ticks: 100,
				origin: {
					x: 0.5, // Center horizontally
					y: 0.5, // Center vertically
				},
				shapes: [emojiShape],
				scalar: 1.2,
			});

			// Additional burst with different timing for layered effect
			setTimeout(() => {
				confetti({
					particleCount: 50,
					spread: 270,
					startVelocity: 25,
					gravity: 0.9,
					ticks: 80,
					origin: {
						x: 0.5,
						y: 0.5,
					},
					shapes: [emojiShape],
					scalar: 0.8,
				});

				// Reset animation state after all effects complete
				setTimeout(
					withScope(() => {
						context.enabled = false;
					}),
					2000
				);
			}, 200);
		},
		*rainConfetti(speed) {
			if (!state.isAnimating) {
				return;
			}
			const context = getContext();
			console.log('Confetti Rain!', { ...context, speed });
			var duration = speed;
			var animationEnd = Date.now() + duration;
			var defaults = {
				startVelocity: 10,
				spread: 45,
				ticks: 60,
				zIndex: 0,
				gravity: 1.2,
				colors: [
					'#3498db',
					'#2980b9',
					'#5dade2',
					'#85c1e9',
					'#aed6f1',
					'#d6eaf8',
				],
				shapes: ['square', 'circle'],
				scalar: 0.6,
			};

			var interval = setInterval(
				withScope(() => {
					var timeLeft = animationEnd - Date.now();

					if (timeLeft <= 0) {
						clearInterval(interval);
						context.enabled = false;
						return;
					}

					var particleCount = 15 * (timeLeft / duration);
					// Rain falls from top across the screen
					for (let i = 0; i < 5; i++) {
						setTimeout(() => {
							confetti({
								...defaults,
								particleCount: particleCount / 5,
								origin: {
									x: randomInRange(0.1, 0.9),
									y: -0.1, // Start above screen
								},
							});
						}, i * 100);
					}
				}),
				200
			);
		},
		*rainEmoji(emoji, speed) {
			if (!state.isAnimating) {
				return;
			}
			const context = getContext();
			console.log('Emoji Rain!', { ...context, emoji, speed });
			const emojiShape = confetti.shapeFromText({
				text: emoji,
				scalar: 1.0,
			});
			var duration = speed;
			var animationEnd = Date.now() + duration;
			var defaults = {
				startVelocity: 10,
				spread: 45,
				ticks: 60,
				zIndex: 0,
				gravity: 1.2,
				shapes: [emojiShape],
				scalar: 0.8,
			};

			var interval = setInterval(
				withScope(() => {
					var timeLeft = animationEnd - Date.now();

					if (timeLeft <= 0) {
						clearInterval(interval);
						context.enabled = false;
						return;
					}

					var particleCount = 15 * (timeLeft / duration);
					// Rain falls from top across the screen
					for (let i = 0; i < 5; i++) {
						setTimeout(() => {
							confetti({
								...defaults,
								particleCount: particleCount / 5,
								origin: {
									x: randomInRange(0.1, 0.9),
									y: -0.1, // Start above screen
								},
							});
						}, i * 100);
					}
				}),
				200
			);
		},
	},
	callbacks: {
		*onAnimate() {
			if (!state.isAnimating) {
				return;
			}
			const context = getContext();
			const { id } = context;
			const { animation, effect, emoji, speed } = state[id];
			const { ref } = getElement();
			const { parentElement } = ref;
			if (parentElement.getAttribute('hidden')) {
				console.info(
					'Parent Element for Animation is Hidden, failing over and not running animation'
				);
				return;
			}
			console.log('onAnimate', { state: state[id], ref });
			// When the animation is enabled, we'll load the confetti script and explode the confetti.
			if (ref) {
				yield loadConfettiScript();
				if (animation === 'confetti' && effect === 'fireworks') {
					yield actions.explodeConfettiFireworks(speed);
				}
				if (animation === 'confetti' && effect === 'center') {
					yield actions.explodeConfettiFromCenterOfScreen(speed);
				}
				if (animation === 'confetti' && effect === 'rain') {
					yield actions.rainConfetti(speed);
				}
				if (animation === 'emoji' && effect === 'center') {
					yield actions.explodeEmojiFromCenterOfScreen(emoji, speed);
				}
				if (animation === 'emoji' && effect === 'fireworks') {
					yield actions.explodeEmojiFireworks(emoji, speed);
				}
				if (animation === 'emoji' && effect === 'rain') {
					yield actions.rainEmoji(emoji, speed);
				}
			}
		},
	},
});
