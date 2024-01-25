/**
 * External Dependencies
 */
import styled from '@emotion/styled';

/**
 * WordPress Dependencies
 */

import { __experimentalLinkControl as WPComLinkControl } from '@wordpress/block-editor';
import { Popover } from '@wordpress/components';
import { decodeEntities } from '@wordpress/html-entities';

function updateLink(updatedValue, setAttributes) {
	console.log('updateLink', updatedValue);
	const { title, url, id } = updatedValue;
	setAttributes({
		url,
		label: title,
		id,
	});
}

export default function LinkControl({
	attributes,
	setAttributes,
	anchor,
	onClose = () => {},
}) {
	const { label, url, taxonomy } = attributes;

	const link = {
		url,
		opensInNewTab: false,
		title: decodeEntities(label),
	};

	const onRemove = () => {
		// Reset everything that was set by the link control.
		setAttributes({
			url: '',
			label: '',
			id: '',
		});
		onClose();
	};

	const onChange = (updatedValue) => {
		updateLink(updatedValue, setAttributes);
		// onClose();
	};

	const StyledPopover = styled(Popover)`
		.components-popover__content {
			padding-bottom: 16px;
		}
	`;

	return (
		<StyledPopover
			placement="bottom"
			noArrow={false}
			onClose={onClose}
			anchor={anchor}
			shift
		>
			<WPComLinkControl
				searchInputPlaceholder={`Search for ${taxonomy} term`}
				hasTextControl
				hasRichPreviews
				value={link}
				showInitialSuggestions
				// noDirectEntry={!!type}
				// noURLSuggestion={!!type}
				suggestionsQuery={{ type: 'term', subtype: taxonomy }}
				onChange={onChange}
				onRemove={onRemove}
				settings={[]}
			/>
		</StyledPopover>
	);
}
