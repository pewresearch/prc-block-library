/* eslint-disable no-param-reassign */
/**
 * WordPress Dependencies
 */
import domReady from '@wordpress/dom-ready';

const getSum = (items) => {
	let sum = 0;
	items.forEach((i) => {
		sum = i.classList.contains('icon')
			? sum + (i.clientWidth + 6)
			: sum + i.clientWidth;
	});
	return sum;
};
const getLastIndex = (items, itemsSum, containerWidth) => {
	let index = null;
	const differential =
		1 !== Math.sign(itemsSum - containerWidth) ? 0 : itemsSum - containerWidth;

	let s = 0;
	items.forEach((i) => {
		s = i.classList.contains('icon')
			? s + (i.clientWidth + 6)
			: s + i.clientWidth;
		// if the width of these items is less than or equal to the differential threshold then add them to the index.
		if (s <= differential) {
			// If this is an icon then we should go back one or go forward?
			index++;
		}
	});
	// Do a check that the last index isn't an icon, if it is then leave it otherwise add + 1;

	if (null !== index && items[index].classList.contains('icon')) {
		return index + 1;
	}

	return index;
};

const runCondenseItems = (items) => {
	// Get the breadCrumbNav at time of run so we have an up-to-date clientWidth.
	const sum = getSum(items);
	const breadCrumbNav = document.getElementById('breadcrumbs');

	// If the sum of items is smaller than the container width we don't need to do anything.
	if (sum <= breadCrumbNav.clientWidth) {
		return;
	}

	// Determine the last index to hide up to.
	const toHideIndex = getLastIndex(items, sum, breadCrumbNav.clientWidth);
	// Gather items to hide up to the toHideIndex.
	const itemsToHide = items.slice(0, toHideIndex);
	// Store the label of the last item.
	const truncateLabel =
		null !== toHideIndex ? items[toHideIndex].getAttribute('data-label') : null;

	if (null !== toHideIndex) {
		itemsToHide.forEach((e) => e.classList.add('hidden'));
		if (items[toHideIndex].innerText === truncateLabel) {
			items[toHideIndex].innerText = '...';
		}
	} else {
		itemsToHide.forEach((e) => e.classList.remove('hidden'));
		if (items[toHideIndex].innerText !== truncateLabel) {
			items[toHideIndex].innerText = truncateLabel;
		}
	}
};

const breadCrumbs = () => {
	const breadCrumbNav = document.getElementById('breadcrumbs');
	const breadCrumbMenu = breadCrumbNav.querySelector('.ui.breadcrumb');

	if (!breadCrumbMenu) {
		return;
	}

	// Store these items:
	const items = Array.from(breadCrumbMenu.querySelectorAll('.section, .icon'));
	const run = () => runCondenseItems(items);
	// Do initial run:
	run();
	// Watch for resize and run:
	window.addEventListener('resize', run);
};

domReady(() => {
	breadCrumbs();
});
