// TODO: WIP, not currently rendering icon block. Further investigation needed.

import { __ } from '@wordpress/i18n';
import { toggleFormat, insertObject } from '@wordpress/rich-text';
import { RichTextToolbarButton } from '@wordpress/block-editor';
import { Dropdown } from '@wordpress/components';
import { Icon as PRCIcon } from '@prc/icons';

import styled from '@emotion/styled';
import IconPicker from './icon-picker';

const StyledIconPickerDropdown = styled(IconPicker)`
	margin: 6px;
	width: 248px;
	height: 248px;
`;

const StyledIcon = styled(PRCIcon)`
	/* this is dumb. for some reason icon is setting to 24em */
	font-size: 1px;
	color: red;
`;

const name = 'prc-block/icon';
const title = __('Inline Icon');

const icon = {
	name,
	title,
	object: true,
	tagName: 'i',
	attributes: {
		name: 'name',
		library: 'library',
		size: 'size',
	},
	className: null,
	edit: (props) => {
		const { value, isActive } = props;
		return (
			<Dropdown
				className="component-icon-picker-toolbar-button"
				contentClassName="component-icon-picker-toolbar-button__content"
				popoverProps={{
					placement: 'bottom-start',
				}}
				renderToggle={({ isOpen, onToggle }) => (
					<RichTextToolbarButton
						title={__('Inline Icon')}
						onClick={onToggle}
						isActive={isActive}
						aria-expanded={isOpen}
						icon={() => (
							<StyledIcon
								icon={value?.name}
								library={value?.library}
								size={1}
							/>
						)}
					/>
				)}
				renderContent={() => <StyledIconPickerDropdown {...props} />}
			/>
		);
	},
};

export default icon;
