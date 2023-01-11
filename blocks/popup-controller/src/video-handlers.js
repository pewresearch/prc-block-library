/**
 * External Dependencies
 */

/**
 * WordPress Dependencies
 */

/**
 * Internal Dependencies
 */

function loadYoutubePlayer(videoProvider, popupController) {
	const iframe = videoProvider.querySelector(
		'.wp-block-embed__wrapper > iframe',
	);

	let id = iframe.getAttribute('id');

	if (!id) {
		id = `video${Math.floor(Math.random() * 1000)}`;
		iframe.setAttribute('id', id);
		// set enablejsapi to 1
		const src = iframe.getAttribute('src');
		iframe.setAttribute('src', `${src}&enablejsapi=1`);
	}

	const videoId = iframe.getAttribute('src').split('embed/')[1].split('?')[0];
	// If desired we could add GA tracking here.

	const Youtube = window.hasOwnProperty('YT') ? window.YT : false;
	let p = false;
	if (false !== Youtube && Youtube.hasOwnProperty('Player')) {
		p = new Youtube.Player(id, {
			videoId,
		});
	}

	return p;
}

function loadVimeoPlayer(videoProvider, popupController) {
	const trigger = popupController.querySelector(
		'.wp-block-prc-block-popup-content',
	);

	const iframe = videoProvider.querySelector('iframe.vimeo-core-video');

	let id = iframe.getAttribute('id');

	if (!id) {
		id = `video${Math.floor(Math.random() * 1000)}`;
		iframe.setAttribute('id', id);
	}

	iframe.setAttribute('allow', 'autoplay');

	const Vimeo = window.hasOwnProperty('Vimeo') ? window.Vimeo : false;
	const player = new Vimeo.Player(iframe);

	// Initialize the player on hover to avoid loading the video on page load.
	if (false !== player) {
		// When mouse enters the trigger zone console.log('mouseenter');
		trigger.addEventListener('mouseenter', () => {
			player.ready().then(() => {
				// the player is ready
				console.log('the player is ready');
			});
		});
	}

	return {
		provider: 'vimeo',
		playVideo: () => {
			player
				.play()
				.then(() => {
					console.log('the video was played');
				})
				.catch((error) => {
					console.log('error...', error);
					switch (error.name) {
						case 'PasswordError':
							// the video is password-protected and the viewer needs to enter the
							// password first
							break;

						case 'PrivacyError':
							// the video is private
							break;

						default:
							// some other error occurred
							break;
					}
				});
		},
		stopVideo: () => {
			player
				.unload()
				.then(() => {
					console.log('the video was unloaded');
				})
				.catch((error) => {
					switch (error.name) {
					case 'PasswordError':
						// the video is password-protected and the viewer needs to enter the
							// password first
						break;

						case 'PrivacyError':
						// the video is private
							break;

					default:
						// some other error occurred
							break;
					}
				});
		},
	};
}

export default function loadVideoHandler(popupController) {
	if (
		!popupController ||
		!popupController.classList.contains('is-style-video')
	) {
		return {
			provider: false,
		};
	}

	// const videoProvider = popupController.querySelector(
	// 	'.wp-block-embed.is-type-video',
	// );
	// if (!videoProvider) {
	// 	return {
	// 		provider: false,
	// 	};
	// }

	// const provider = videoProvider.classList
	// 	.toString()
	// 	.split(' ')
	// 	.find((className) => className.includes('is-provider-'))
	// 	.replace('is-provider-', '');

	const provider = 'vimeo';
	const videoProvider = popupController.querySelector('.wp-block-vimeo-create');
	if (!videoProvider) {
		return {
			provider: false,
		};
	}

	// eslint-disable-next-line consistent-return
	return {
		provider,
		loadPlayer: () => loadVimeoPlayer(videoProvider, popupController),
	};
}
