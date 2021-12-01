/**
 * WordPress dependencies
 */
import { render } from '@wordpress/element';
import domReady from '@wordpress/dom-ready';
/**
 * External dependencies
 */
import { Placeholder } from 'semantic-ui-react';
/**
 * Internal dependencies
 */
import './styles.scss';

const Livestream = ({ streamURL, chatURL }) => {
    return (
        <>
            <div className="prc-livestream-stream">
                {streamURL && (
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
                    ></iframe>
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
