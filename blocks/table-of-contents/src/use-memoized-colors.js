/**
 * WordPress Dependencies
 */
import { useMemo } from 'react';

// Construct a colors object that contains the color values and helper functions, re-compute whenever the color values change.
export default function useMemoizedColors({
	dropdownBackgroundColor,
	setDropdownBackgroundColor,
	dropdownTextColor,
	setDropdownTextColor,
	headingBackgroundColor,
	setHeadingBackgroundColor,
	headingTextColor,
	setHeadingTextColor,
	activeBackgroundColor,
	setActiveBackgroundColor,
	activeTextColor,
	setActiveTextColor,
	hoverBackgroundColor,
	setHoverBackgroundColor,
	hoverTextColor,
	setHoverTextColor,
	linkColor,
	setLinkColor,
}) {
	return useMemo(
		() => ({
			dropdownBackgroundColor,
			setDropdownBackgroundColor,
			dropdownTextColor,
			setDropdownTextColor,
			headingBackgroundColor,
			setHeadingBackgroundColor,
			headingTextColor,
			setHeadingTextColor,
			activeBackgroundColor,
			setActiveBackgroundColor,
			activeTextColor,
			setActiveTextColor,
			hoverBackgroundColor,
			setHoverBackgroundColor,
			hoverTextColor,
			setHoverTextColor,
			linkColor,
			setLinkColor,
		}),
		[
			dropdownBackgroundColor,
			setDropdownBackgroundColor,
			dropdownTextColor,
			setDropdownTextColor,
			headingBackgroundColor,
			setHeadingBackgroundColor,
			headingTextColor,
			setHeadingTextColor,
			activeBackgroundColor,
			setActiveBackgroundColor,
			activeTextColor,
			setActiveTextColor,
			hoverBackgroundColor,
			setHoverBackgroundColor,
			hoverTextColor,
			setHoverTextColor,
			linkColor,
			setLinkColor,
		]
	);
}
