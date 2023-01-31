/**
 * External Dependencies
 */
import styled from '@emotion/styled';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { __unstableStripHTML as stripHTML } from '@wordpress/dom';
import { __experimentalLinkControl as WPComLinkControl } from '@wordpress/block-editor';
import { Popover } from '@wordpress/components';

function updateLink(updatedValue, setAttributes) {
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
	context,
	anchor,
	onClose = () => {},
}) {
	const { label, url, id, taxonomy } = attributes;

	const link = {
		url,
		opensInNewTab: false,
		title: label,
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
				searchInputPlaceholder={__(
					`Search for ${taxonomy} term`,
					'prc-block-library',
				)}
				hasTextControl
				hasRichPreviews
				value={link}
				showInitialSuggestions
				// noDirectEntry={!!type}
				// noURLSuggestion={!!type}
				suggestionsQuery={{ type: 'term', subtype: 'topic' }}
				onChange={onChange}
				onRemove={onRemove}
				settings={[]}
			/>
		</StyledPopover>
	);
}
