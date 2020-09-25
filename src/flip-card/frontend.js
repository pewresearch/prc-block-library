import domReady from '@wordpress/dom-ready';
import { RawHTML, render, useState } from '@wordpress/element';
import ReactCardFlip from 'react-card-flip';
import './frontend.scss';

const FlipCard = ({ front, back }) => {
    const [flipped, toggleFlip] = useState(false);
    return (
        <div
            onClick={() => {
                toggleFlip(!flipped);
            }}
        >
            <ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
                <div className="flip-card-front">
                    <RawHTML>{front}</RawHTML>
                </div>

                <div className="flip-card-back">
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
            };
            render(<FlipCard {...props} />, elm);
        });
    }
};

domReady(() => {
    flipCardInit();
});
