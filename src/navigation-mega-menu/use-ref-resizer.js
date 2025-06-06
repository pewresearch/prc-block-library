// Function to convert a complex CSS value to pixels
// Everything below is heavily cribbed from Nick Diego for the js math window math.
function convertCssValueToPixels(cssValue) {
	// Create a temporary element
	const tempElement = document.createElement('div');

	// Apply the CSS value to the temporary element
	// For example, setting its width to the complex CSS value
	tempElement.style.width = cssValue;

	// Append the temporary element to the body to make it part of the document
	document.body.appendChild(tempElement);

	// Use getComputedStyle to get the computed width in pixels
	const computedWidth = window.getComputedStyle(tempElement).width;

	// Remove the temporary element from the document
	document.body.removeChild(tempElement);

	// Return the computed width as a number
	return parseFloat(computedWidth);
}

function getRootPaddingValues() {
	const bodyStyles = window.getComputedStyle(document.body);
	let rootPaddingLeft = bodyStyles
		.getPropertyValue('--wp--style--root--padding-left')
		.trim();
	let rootPaddingRight = bodyStyles
		.getPropertyValue('--wp--style--root--padding-left')
		.trim();
	// Convert the CSS variable value to pixels.
	rootPaddingLeft = '16px';
	rootPaddingRight = '16px';

	const rootPaddingLeftValue = convertCssValueToPixels(rootPaddingLeft);
	const rootPaddingRightValue = convertCssValueToPixels(rootPaddingRight);

	return {
		rootPaddingLeftValue,
		rootPaddingRightValue,
	};
}

export function getValues(menuContainer, navBlock) {
	if (!menuContainer && !navBlock) {
		return;
	}

	// Get the height of the navigation block containingthe menu
	// we use this to position the menu directly below the navigation block.
	const navBlockHeight = navBlock.offsetHeight;

	// Find the body of menuContainer, remember iframes can have their own body.
	const body = menuContainer.closest('body');
	const windowWidth = body.offsetWidth;

	// Get the bounding rectangle of the menu container.
	const menuRect = menuContainer.getBoundingClientRect();
	// Then the left position of the menu container.
	// This is used to position the menu negatively to the left of the navigation block
	// so that it is flush with the left edge of the navigation block.
	const menuLeftPosition = menuRect?.left;

	// Determine the new values:
	// The top position of the menu is the height of
	// the navigation block minus 1px ( to account for borders )
	const newTop = `${navBlockHeight - 1}px`;
	// The left position of the menu is the negative of the left position of the menu container.
	const newLeft = `-${menuLeftPosition}px`;
	// We want all menus to extend the full width of the screen, for now.
	const newWidth = `${windowWidth}px`;

	return {
		width: newWidth,
		left: newLeft,
		top: newTop,
	};
}

export default function useRefResizer({ ref, isMobile, useState, useEffect }) {
	const [topPosition, setTopPosition] = useState(0);
	const [leftPosition, setLeftPosition] = useState(0);
	const [widthValue, setWidth] = useState(null);

	useEffect(() => {
		const updateRefPositions = () => {
			if (ref.current) {
				let menuContainer; // That which menu options are acted upon.
				if (
					ref.current.classList.contains(
						'wp-block-prc-block-navigation-mega-menu__container'
					)
				) {
					menuContainer = ref.current;
				} else {
					// Return early if the ref.current is not the menu container.
					return;
				}

				let navBlock = menuContainer.closest('.wp-block-navigation'); // That which menu options are derived from.
				navBlock = navBlock.parentElement;

				const { width, left, top } = getValues(menuContainer, navBlock);

				setTopPosition(top);
				setLeftPosition(left);
				setWidth(width);
			}
		};

		// Run once, to initially set the positions.
		updateRefPositions();

		// Add a listener for the window resize event
		window.addEventListener('resize', updateRefPositions);

		return () => {
			// Remove the listener when the component unmounts
			window.removeEventListener('resize', updateRefPositions);
		};
	}, [ref.current, isMobile]);

	return {
		topPosition,
		leftPosition,
		width: widthValue,
	};
}
