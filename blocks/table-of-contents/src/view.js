/**
 * WordPress Dependencies
 */
import { store, getContext, getElement } from '@wordpress/interactivity';

const { actions, state } = store('prc-block/table-of-contents', {
	state: {
		get chapterEls() {
			const internalChaptersList = state.chaptersWatchList;
			const chapterEls = internalChaptersList.map((chapter) => {
				const chapterRef = document.getElementById(chapter.id);
				return chapterRef;
			});
			return chapterEls;
		},
	},
	actions: {
		getInternalChaptersList: () => {
			const { ref } = getElement();
			// check if the first level of the list has list-items with is-top-level class
			// if so, return the first level of the list
			if (
				ref.querySelector(
					'.wp-block-prc-block-table-of-contents__list .is-top-level'
				)
			) {
				return ref.querySelector(
					'.wp-block-prc-block-table-of-contents__list'
				);
			}
			return ref.querySelector(
				'.wp-block-prc-block-table-of-contents__list .wp-block-prc-block-table-of-contents__list'
			);
		},
		initSmoothScrollClickHandler: () => {
			const internalChaptersList = actions.getInternalChaptersList();

			if (!internalChaptersList) {
				return;
			}
			const links = internalChaptersList.querySelectorAll('a');

			if (!links) {
				return;
			}

			links.forEach((link) => {
				link.addEventListener('click', (e) => {
					const href = link.getAttribute('href');
					// If the link is a hash link, we need to smooth scroll to the hash.
					if (0 === href.indexOf('#')) {
						e.preventDefault();
						const target = document.getElementById(
							href.replace('#', '')
						);
						if (target) {
							target.scrollIntoView({ behavior: 'smooth' }, true);
							// Add the hash to the end of the URL.
							window.history.pushState(null, null, href);
						}
					}
				});
			});
		},
		onDropdownClick: (event) => {
			event.preventDefault();
			const context = getContext();
			context.isDropdownOpen = !context.isDropdownOpen;
		},
	},
	callbacks: {
		onInit: () => {
			const context = getContext();
			const { ref } = getElement();
			actions.initSmoothScrollClickHandler();

			// So long as there is one TOC block that has this enabled we will enable the watch for chapter scroll function.
			const { showCurrentChapter } = context;
			if (true === showCurrentChapter) {
				const { postId } = state;
				// get the object our of state.chapters with the same id as the postId
				const thisChapter =
					state.chapters.find((chapter) => chapter.id === postId) ||
					{};
				const internalChapters = thisChapter?.internal_chapters || [];

				state.enableWatchForChapterScroll = true;
				state.chaptersWatchList = internalChapters;
			}
		},
		onResize: () => {
			const context = getContext();
			const { autoDropdownEnabled, autoDropdownWidth } = context;
			if (!autoDropdownEnabled) {
				return;
			}
			const { ref } = getElement();
			// get the width of the ref
			const width = ref.offsetWidth;
			// if the width is less than the autoDropdownWidth and autoDropdownEnabled is true
			// set isDropdown to true
			if (width < autoDropdownWidth && autoDropdownEnabled) {
				context.isDropdown = true;
			} else {
				context.isDropdown = false;
			}
		},
		isListItemActive: () => {
			const elm = getElement();
			const { ref } = elm;
			// set const id to elm.data-ref-value but remove the # from the beginning
			const id = ref?.getAttribute('data-ref-value')?.replace('#', '');

			if (id === state.currentChapter) {
				return true;
			}

			return false;
		},
		watchForChapterScroll: () => {
			if (!state.enableWatchForChapterScroll) {
				return;
			}

			// get the current chapter
			let { currentChapter, chapterEls } = state;

			// get the current scroll position
			const scrollPosition = window.scrollY;

			const debounce = (func, wait) => {
				let timeout;
				return function executedFunction(...args) {
					const later = () => {
						timeout = null;
						func(...args);
					};
					clearTimeout(timeout);
					timeout = setTimeout(later, wait);
				};
			};

			const getCurrentChapter = debounce(() => {
				// iterate over the chapterEls array backwards
				// if the top of the chapter is less than the scroll position
				// set the currentChapter to the id of the chapter
				currentChapter = null;
				if (!chapterEls || chapterEls.length === 0) {
					return;
				}
				for (let i = chapterEls.length - 1; i >= 0; i--) {
					const chapterTop = chapterEls[i].offsetTop;
					if (scrollPosition > chapterTop) {
						currentChapter = chapterEls[i].id;
						if (currentChapter !== state.currentChapter) {
							state.currentChapter = currentChapter;
						}
						break;
					}
				}
			}, 300);

			getCurrentChapter();
		},
		onWindowClick: (event) => {
			const context = getContext();
			const { ref } = getElement();
			if (!ref.contains(event.target) && context.isDropdown) {
				context.isDropdownOpen = false;
			}
		},
	},
});
