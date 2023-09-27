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
		'.wp-block-embed__wrapper > iframe'
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
		'.wp-block-prc-block-popup-content'
	);

	const iframe = videoProvider.querySelector('iframe');

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
	} else {
		console.error('Vimeo player not found');
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
	let provider = false;

	if (
		!popupController ||
		!popupController.classList.contains('is-style-video')
	) {
		return {
			provider,
		};
	}

	const isCoreEmbedBlock = popupController.querySelector(
		'.wp-block-embed.is-type-video'
	);
	if (isCoreEmbedBlock) {
		provider = isCoreEmbedBlock.classList
			.toString()
			.split(' ')
			.find((className) => className.includes('is-provider-'))
			.replace('is-provider-', '');
	}

	const isVimeoBlock = popupController.querySelector(
		'.wp-block-vimeo-create'
	);
	if (isVimeoBlock) {
		provider = 'vimeo';
	}

	const videoProvider = isCoreEmbedBlock || isVimeoBlock;

	if (!videoProvider) {
		return {
			provider,
		};
	}

	return {
		provider,
		loadPlayer: () => {
			switch (provider) {
				case 'youtube':
					return loadYoutubePlayer(videoProvider, popupController);
				case 'vimeo':
					return loadVimeoPlayer(videoProvider, popupController);
				default:
					return false;
			}
		},
	};
}
