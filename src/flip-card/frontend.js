import domReady from '@wordpress/dom-ready';
import { RawHTML, render, useState } from '@wordpress/element';

import ReactCardFlip from 'react-card-flip';
import './frontend.scss';

const FlipCard = ({ front, back, height, borderColor, backgroundColor }) => {
    const [flipped, toggleFlip] = useState(false);
    return (
        <div
            onClick={() => {
                toggleFlip(!flipped);
            }}
        >
            <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
                <div
                    className="flip-card-front"
                    style={{
                        backgroundColor,
                        borderColor,
                        minHeight: `${height}px`,
                    }}
                >
                    <RawHTML>{front}</RawHTML>
                </div>

                <div
                    className="flip-card-back"
                    style={{
                        backgroundColor,
                        borderColor,
                        minHeight: `${height}px`,
                    }}
                >
                    <RawHTML>{back}</RawHTML>
                </div>
            </ReactCardFlip>
        </div>
    );
};

const flipCardInit = () => {
    if (document.querySelector('.wp-block-prc-block-flip-card')) {
        const elms = document.querySelectorAll('.wp-block-prc-block-flip-card');
        elms.forEach(elm => {
            const front = elm.querySelector(
                '.wp-block-prc-block-flip-card-front',
            );
            const back = elm.querySelector(
                '.wp-block-prc-block-flip-card-back',
            );
            const props = {
                front: front.innerHTML,
                back: back.innerHTML,
                height: elm.getAttribute('data-height'),
                borderColor: elm.getAttribute('data-border'),
                backgroundColor: elm.getAttribute('data-bg'),
            };
            render(<FlipCard {...props} />, elm);
        });
    }
};

domReady(() => {
    flipCardInit();
});
