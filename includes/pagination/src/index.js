import './style.scss';

import classNames from 'classnames';

function Pagination(items = []) {
	console.log('Pagination', items);
	this.items = items;
	this.currentPageNum = 1;
	this.maxPagesToShow = 7;
	this.total = items.length;

	this.setItems(items);
}

Pagination.prototype.setItems = function (items) {
	items.forEach((item, i) => {
		item.page_num = i + 1;
	});

	const active = items.filter((item) => item.is_active);
	this.currentPageNum = active.length > 0 ? active[0].page_num : 1;
	this.items = items;
};

Pagination.prototype.setCurrentPageNum = function (num) {
	this.currentPageNum = num;
};

Pagination.prototype.getCurrentItem = function () {
	const active = this.items.filter((item) => item.is_active);
	return active.length > 0 ? active[0] : null;
};

Pagination.prototype.getNextItem = function () {
	const next = this.items.filter(
		(item) => item.page_num === this.currentPageNum + 1
	);
	return next.length > 0 ? next[0] : null;
};

Pagination.prototype.getPreviousItem = function () {
	const prev = this.items.filter(
		(item) => item.page_num === this.currentPageNum - 1
	);
	return prev.length > 0 ? prev[0] : null;
};

Pagination.prototype.getItems = function () {
	return this.items;
};

Pagination.prototype.returnRangeOfLinks = function (itemClassnames = '') {
	const pageLinks = [];

	if (this.total <= 1) {
		return [];
	}

	if (this.total <= this.maxPagesToShow) {
		for (let i = 1; i <= this.total; i++) {
			pageLinks.push(this.items[i]);
		}
	} else {
		const adjacents = Math.floor((this.maxPagesToShow - 3) / 2);

		let start;
		if (this.currentPageNum + adjacents > this.total) {
			start = this.total - this.maxPagesToShow + 2;
		} else {
			start = this.currentPageNum - adjacents;
		}
		if (start < 2) start = 2;

		let end = start + this.maxPagesToShow - 3;
		if (end >= this.total) end = this.total - 1;

		pageLinks.push(this.items[0]);

		if (start > 2) {
			pageLinks.push('...');
		}
		for (let i = start; i <= end; i++) {
			pageLinks.push(this.items[i]);
		}
		if (end < this.total - 1) {
			pageLinks.push('...');
		}

		pageLinks.push(this.items[this.total - 1]);
	}

	return pageLinks;
};

Pagination.prototype.renderItem = function (pagenum, classnames = '') {
	let isActive;
	let title;
	let link = false;
	let number;
	if ('...' !== pagenum) {
		// Get the item from the items array by pagenum.
		const matched = this.items.filter((item) => item.page_num === pagenum);
		const item = matched.shift();

		number = item.page_num.toLocaleString();
		// eslint-disable-next-line camelcase
		isActive = item?.is_active || false;
		link = item?.link || '';
		title = item?.title || '';
	} else {
		title = '...';
		number = '...';
	}

	classnames = classNames(
		classnames,
		'common-block-style__pagination__page-numbers',
		{
			// eslint-disable-next-line camelcase
			'is-active': isActive,
		}
	);
	const tagName = isActive || !link ? 'span' : 'a';
	return `<${tagName} ${tagName !== 'span' ? `href="${link}"` : ''} class="${classnames}" title="${title}">${number}</${tagName}>`;
};

Pagination.prototype.renderItems = function (
	classnames = '',
	itemClassnames = ''
) {
	const items = this.returnRangeOfLinks(itemClassnames);
	return items.map((item) => {
		if (item === '...') {
			return this.renderItem(
				'...',
				'common-block-style__pagination__ellipsis'
			);
		}
		return this.renderItem(item.page_num, classnames);
	});
};

// check if prcPagination exists in window.prc.functions, if it does, use it, otherwise, create it
function loadScript(slug, script) {
	if (!window.prcFunctions[slug]) {
		window.prcFunctions[slug] = script;
	}
}

loadScript('pagination', Pagination);
