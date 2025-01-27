export default function menuPositioner() {
	if ( justification === 'center' ) {
		if ( menuWidth > windowSpace ) {
			menu.style.width = `${ windowSpace }px`;
			menu.style.left = `-${ leftOffset }px`;
		} else if ( menuRect.left > 0 && leftSpace >= menuRect.left ) {
			// Do nothing, the menu is positioned with CSS and it looks fine.
			menu.style.left = '';
		} else if ( leftOffset >= leftSpace ) {
			// Reset width.
			menu.style.width = '';
			menu.style.left = `-${ leftOffset - leftSpace }px`;
		} else {
			menu.style.width = '';
			menu.style.left = `${ leftSpace - leftOffset }px`;
		}
	} else if (
		justification === 'left' ||
		justification === 'right'
	) {
		// The left value doesn't need to change for left and right justifications.
		if ( menuWidth > windowSpace ) {
			menu.style.width = `${ windowSpace }px`;
			menu.style.left = `${ leftOffset }px`;
		} else {
			menu.style.width = '';

			// Make sure the menu does not extend off the left-side of the screen.
			if ( menuRect.left <= 0 ) {
				// TODO: This is not correct when justified right in some scenarios.
				menu.style.left = `${ leftOffset }px`;
			} else {
				menu.style.left = '';
			}
		}
	}
}
