/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';
import { addQueryArgs } from '@wordpress/url';

// eslint-disable-next-line no-undef
const { innerWidth, innerHeight, open } = window;

function getArgs(elm) {
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
}

function initFacebookLinks() {
	// eslint-disable-next-line no-undef
	const items = document.querySelectorAll(
		'.wp-block-social-link.wp-social-link-facebook, .share-tools .social-link.facebook'
	);
	items.forEach((elm) => {
		const { url } = getArgs(elm);

		let link = null;
		if (elm.parentElement.classList.contains('share-tools')) {
			link = elm;
		} else {
			link = elm.querySelector('a');
		}

		if (link) {
			link.addEventListener('click', (e) => {
				e.preventDefault();
				const actionUrl = addQueryArgs(
					'https://www.facebook.com/sharer/sharer.php',
					{
						u: url,
					}
				);

				open(
					actionUrl,
					'fbShareWindow',
					`height=450, width=550, top=${
						innerHeight / 2 - 275
					}, left=${
						innerWidth / 2 - 225
					}, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0`
				);
				e.stopPropagation();
			});
		}
	});
}

function initLinkedInLinks() {
	// eslint-disable-next-line no-undef
	const items = document.querySelectorAll(
		'.wp-block-social-link.wp-social-link-linkedin, .share-tools .social-link.linkedin'
	);
	items.forEach((elm) => {
		const { url, title, description } = getArgs(elm);

		let link = null;
		if (elm.parentElement.classList.contains('share-tools')) {
			link = elm;
		} else {
			link = elm.querySelector('a');
		}

		if (link) {
			link.addEventListener('click', (e) => {
				e.preventDefault();
				const actionUrl = addQueryArgs(
					'https://www.linkedin.com/shareArticle',
					{
						// mini: true,
						summary: description,
						url,
						title,
						source: 'PewResearch',
					}
				);
				open(
					actionUrl,
					'linkedinShareWindow',
					`height=450, width=550, top=${
						innerHeight / 2 - 275
					}, left=${
						innerWidth / 2 - 225
					}, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0`
				);
				e.stopPropagation();
			});
		}
	});
}

function initTwitterLinks() {
	// eslint-disable-next-line no-undef
	const items = document.querySelectorAll(
		'.wp-block-social-link.wp-social-link-twitter, .share-tools .social-link.twitter'
	);
	items.forEach((elm) => {
		const { url, description } = getArgs(elm);

		let link = null;
		if (elm.parentElement.classList.contains('share-tools')) {
			link = elm;
		} else {
			link = elm.querySelector('a');
		}

		if (link) {
			link.addEventListener('click', (e) => {
				e.preventDefault();
				const actionUrl = addQueryArgs(
					'https://twitter.com/intent/tweet',
					{
						text: description,
						url,
					}
				);
				open(
					actionUrl,
					'twtrShareWindow',
					`height=450, width=550, top=${
						innerHeight / 2 - 275
					}, left=${
						innerWidth / 2 - 225
					}, toolbar=0, location=0, menubar=0, directories=0, scrollbars=0`
				);
				e.stopPropagation();
			});
		}
	});
}

function start() {
	initFacebookLinks();
	initLinkedInLinks();
	initTwitterLinks();
}

domReady(() => start());
