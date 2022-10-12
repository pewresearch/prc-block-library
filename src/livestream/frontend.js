/**
 * WordPress dependencies
 */
import { render, Fragment } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';
/**
 * External dependencies
 */
import { Placeholder } from 'semantic-ui-react';
/**
 * Internal dependencies
 */
import './styles.scss';

function Livestream({ streamURL, chatURL }) {
	return (
		<Fragment>
			<div className="prc-livestream-stream">
				{streamURL && (
					<iframe
						title="PRC Livestream"
						src={streamURL}
						frameBorder="0"
						allow="autoplay; fullscreen; picture-in-picture"
						allowFullScreen
						style={{
							position: 'absolute',
							top: 0,
							left: 0,
							width: '100%',
							height: '100%',
						}}
					/>
				)}
				{!streamURL && (
					<Placeholder
						fluid
						style={{
							height: '100%',
						}}
					>
						<Placeholder.Image
							fluid
							style={{
								height: '100%',
							}}
						/>
					</Placeholder>
				)}
			</div>
			<div className="prc-livestream-chat">
				{chatURL && (
					<iframe
						src={chatURL}
						frameBorder="0"
						style={{
							width: '100%',
							height: '100%',
							minHeight: '560px',
						}}
						title="Slido"
					/>
				)}
				{!chatURL && (
					<Placeholder
						style={{
							width: '100%',
							height: '100%',
							minHeight: '560px',
						}}
					>
						<Placeholder.Paragraph>
							{[...Array(30)].map(() => (
								<Placeholder.Line />
							))}
						</Placeholder.Paragraph>
					</Placeholder>
				)}
			</div>
		</Fragment>
	);
}

domReady(() => {
	if (document.querySelector('.wp-block-prc-block-livestream')) {
		console.log('stream loading');
		const streams = document.querySelectorAll('.wp-block-prc-block-livestream');
		console.log(streams);
		streams.forEach((stream) => {
			const props = {
				streamURL: stream.dataset.streamUrl,
				chatURL: stream.dataset.chatUrl,
			};
			render(<Livestream {...props} />, stream);
		});
	}
});
