/**
 * WordPress Dependencies
 */
import { render, Component } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

/**
 * Internal Dependencies
 */
import AudioPlayer from './AudioPlayer';

domReady(() => {
	const audioPlayers = document.querySelectorAll(
		'.wp-block-prc-block-audio-player'
	);

	audioPlayers.forEach((elm) => {
		// Gather the classes and styles for each audio player instance.
		const classes = elm.getAttribute('class');
		const id = elm.getAttribute('id');
		const type = elm.getAttribute('data-type');
		const title = elm.getAttribute('data-title');
		const description = elm.getAttribute('data-description');
		const source = elm.getAttribute('data-source');
		const imageSource = elm.getAttribute('data-image');
		const metaTitle = elm.getAttribute('data-meta-title');
		const metaDescription = elm.getAttribute('data-meta-description');
		const enableTracking = elm.getAttribute('data-enable-tracking');

		render(
			<AudioPlayer
				type={type}
				title={title}
				description={description}
				source={source}
				imageSource={imageSource}
				metaTitle={metaTitle}
				metaDescription={metaDescription}
				classes={classes}
				enableTracking={enableTracking}
			/>,
			elm
		);
	});
});
