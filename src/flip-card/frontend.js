import domReady from '@wordpress/dom-ready';
import { RawHTML, render } from '@wordpress/element';
import { Reveal } from 'semantic-ui-react';

const FlipCard = ({ front, back }) => {
    return (
        <Reveal animated="small fade">
            <Reveal.Content visible>
                <div style={{ backgroundColor: 'white', cursor: 'pointer' }}>
                    <RawHTML>{front}</RawHTML>
                </div>
            </Reveal.Content>
            <Reveal.Content hidden>
                <div style={{ backgroundColor: 'white', cursor: 'pointer' }}>
                    <RawHTML>{back}</RawHTML>
                </div>
            </Reveal.Content>
        </Reveal>
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
