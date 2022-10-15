/**
 * External Dependencies
 */
import ReactCardFlip from 'react-card-flip';

/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import { RawHTML, render, useState } from '@wordpress/element';

const MIN_HEIGHT = 200;

function parseStylesString(stylesString) {
	// check if stylesString is empty.
	if (!stylesString) {
		return {};
	}
	return stylesString
		.split(';')
		.filter((style) => style)
		.reduce((acc, style) => {
			const [key, value] = style.split(':');
			// convert key to camelCase.
			const camelCaseKey = key
				.split('-')
				.map((word, index) => {
					if (0 === index) {
						return word;
					}
					return word.charAt(0).toUpperCase() + word.slice(1);
				})
				.join('');
			acc[camelCaseKey] = value;
			return acc;
		}, {});
}

function FlipCard({ front, back, height, style }) {
	const [flipped, toggleFlip] = useState(false);
	console.log('<FlipCard />', { front, back, height, style });
	return (
		<button
			onClick={() => {
				toggleFlip(!flipped);
			}}
			type="button"
			aria-controls="wp-block-prc-block-flip-card-front, wp-block-prc-block-flip-card-back"
			aria-owns="wp-block-prc-block-flip-card-front, wp-block-prc-block-flip-card-back"
		>
			<ReactCardFlip isFlipped={flipped} flipDirection="horizontal">
				<div
					className={front.className}
					style={{
						...parseStylesString(front.style),
						minHeight: `${height}px`,
					}}
				>
					<RawHTML>{front.content}</RawHTML>
				</div>

				<div
					className={back.className}
					style={{
						...parseStylesString(back.style),
						minHeight: `${height}px`,
					}}
				>
					<RawHTML>{back.content}</RawHTML>
				</div>
			</ReactCardFlip>
		</button>
	);
}

const flipCardInit = () => {
	if (document.querySelector('.wp-block-prc-block-flip-card')) {
		const flipCards = document.querySelectorAll(
			'.wp-block-prc-block-flip-card',
		);

		flipCards.forEach((card) => {
			const front = card.querySelector('.wp-block-prc-block-flip-card-front');
			const back = card.querySelector('.wp-block-prc-block-flip-card-back');
			const height = Math.max(front.offsetHeight, back.offsetHeight);
			let minHeight = MIN_HEIGHT;
			if (height > minHeight) {
				minHeight = height;
			}
			const props = {
				front: {
					content: front.innerHTML,
					className: front.getAttribute('class') || '',
					style: front.getAttribute('style') || '',
				},
				back: {
					content: back.innerHTML,
					className: back.getAttribute('class') || '',
					style: back.getAttribute('style') || '',
				},
				height: minHeight,
				style: card.getAttribute('style') || '',
			};
			render(<FlipCard {...props} />, card);
		});
	}
};

domReady(() => {
	flipCardInit();
});
