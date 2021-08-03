import classnames from 'classnames';

/**
 * WordPress Dependencies
 */
import { __ } from '@wordpress/i18n';
import { Fragment, RawHTML, useEffect, useState } from '@wordpress/element';
import { ToolbarGroup, ToolbarDropdownMenu } from '@wordpress/components';
import { BlockControls } from '@wordpress/block-editor';

const Icon = ({ value, icons, className }) => {
    const selected = icons.filter(icon => icon.value === value);
    // If selected does not have an svg value, return a fragment.
    if (!selected.length || !selected[0].svg) {
        return <Fragment/>
    }
    return (
        <div className={className} style={{width: selected[0].width}}>
            <RawHTML>
                {selected[0].svg}
            </RawHTML>
        </div>
    );
};

const IconToolbar = ({value, icons, setAttributes}) => {
    const [selected, setSelection] = useState(value);
    const [selectedIcon, setSelectedIcon] = useState('⛔️');

    // Set variable called controls mapped of icons.
    const controls = icons.map(icon => {
        return {
            title: __(icon.label),
            icon: () => <div style={{paddingRight: '4px'}}><RawHTML>{icon.emoji}</RawHTML></div>,
            isActive: (value === icon.value),
            onClick: () => setSelection(icon.value),
        }
    });

    useEffect(() => {
        const s = icons.filter(icon => icon.value === selected);
        if (s.length && !!s[0].emoji) {
            setSelectedIcon(s[0].emoji);
        }
        setAttributes({
            icon: selected
        });
    }, [selected]);

    return(
        <BlockControls>
            <ToolbarGroup>
                <ToolbarDropdownMenu
                    icon={() => <RawHTML>{selectedIcon}</RawHTML>}
                    label="Select Icon"
                    controls={controls}
                />
            </ToolbarGroup>
        </BlockControls>
    );
}

export { Icon, IconToolbar };

export default Icon;