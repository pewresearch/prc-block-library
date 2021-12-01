/**
 * WordPress dependencies
 */
import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';

/**
 * Internal dependencies
 */
import './styles.scss';

const Livestream = ({ streamURL, chatURL }) => {
    return (
        <>
            <div className="prc-livestream-stream">
                <iframe
                    src={streamURL}
                    frameborder="0"
                    allow="autoplay; fullscreen; picture-in-picture"
                    allowfullscreen
                    style={{
                        position: 'absolute',
                        top: 0,
                        left: 0,
                        width: '100%',
                        height: '100%',
                    }}
                ></iframe>
            </div>
            <div className="prc-livestream-chat">
                <iframe
                    src={chatURL}
                    height="100%"
                    width="100%"
                    frameBorder="0"
                    style={{ minHeight: '560px' }}
                    title="Slido"
                ></iframe>
            </div>
        </>
    );
};

domReady(() => {
    if (document.querySelector('.wp-block-prc-block-livestream')) {
        console.log('stream loading');
        const streams = document.querySelectorAll(
            '.wp-block-prc-block-livestream',
        );
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
