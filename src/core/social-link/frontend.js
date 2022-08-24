/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import { addQueryArgs } from '@wordpress/url';

/**
 * Internal Dependencies
 */
import './style.scss';

// eslint-disable-next-line no-undef
const { innerWidth, innerHeight, open } = window;

const getArgs = (elm) => {
	let description = elm.getAttribute('data-share-description');
	if (!description) {
		// eslint-disable-next-line no-undef
		description = document
			.querySelector('meta[property="og:description"]')
			.getAttribute('content');
	}
	let title = elm.getAttribute('data-share-title');
	if (!title) {
		// eslint-disable-next-line no-undef
		title = document
			.querySelector('meta[property="og:title"]')
			.getAttribute('content');
	}

	let url = elm.getAttribute('data-share-url');
	if (!url) {
		// eslint-disable-next-line no-undef
		url = document
			.querySelector('meta[property="og:url"]')
			.getAttribute('content');
	}
	return {
		url,
		description,
		title,
	};
};

const initFacebookLinks = () => {
	// eslint-disable-next-line no-undef
	const items = document.querySelectorAll(
		'.wp-block-social-link.wp-social-link-facebook',
	);
	items.forEach((elm) => {
		const { url, title, description } = getArgs(elm);

		const link = elm.querySelector('a');

		link.addEventListener('click', (e) => {
			e.preventDefault();
			const actionUrl = addQueryArgs(
				'https://www.facebook.com/sharer/sharer.php',
				{
					u: url,
				},
			);

			open(
				actionUrl,
				'fbShareWindow',
				`height=450, width=550, top=${innerHeight / 2 - 275}, left=${
					innerWidth / 2 - 225
				}, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0`,
			);
			e.stopPropagation();
		});
	});
};

const initLinkedInLinks = () => {
	// eslint-disable-next-line no-undef
	const items = document.querySelectorAll(
		'.wp-block-social-link.wp-social-link-linkedin',
	);
	items.forEach((elm) => {
		const { url, title, description } = getArgs(elm);

		const link = elm.querySelector('a');

		link.addEventListener('click', (e) => {
			e.preventDefault();
			const actionUrl = addQueryArgs('https://www.linkedin.com/shareArticle', {
				// mini: true,
				summary: description,
				url,
				title,
				source: 'PewResearch',
			});
			open(
				actionUrl,
				'linkedinShareWindow',
				`height=450, width=550, top=${innerHeight / 2 - 275}, left=${
					innerWidth / 2 - 225
				}, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0`,
			);
			e.stopPropagation();
		});
	});
};

const initTwitterLinks = () => {
	// eslint-disable-next-line no-undef
	const items = document.querySelectorAll(
		'.wp-block-social-link.wp-social-link-twitter',
	);
	items.forEach((elm) => {
		const { url, title, description } = getArgs(elm);

		const link = elm.querySelector('a');

		link.addEventListener('click', (e) => {
			e.preventDefault();
			const actionUrl = addQueryArgs('https://twitter.com/intent/tweet', {
				text: description,
				url,
			});
			open(
				actionUrl,
				'twtrShareWindow',
				`height=450, width=550, top=${innerHeight / 2 - 275}, left=${
					innerWidth / 2 - 225
				}, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0`,
			);
			e.stopPropagation();
		});
	});
};

domReady(() => {
	initFacebookLinks();
	initLinkedInLinks();
	initTwitterLinks();
});
