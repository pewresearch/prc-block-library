import { Fragment } from '@wordpress/element';
import { StoryItemEdit, ifMatchSetAttribute } from 'shared';
import Controls from './controls';

const setImageSlotByClassName = (className, setAttributes) => {
    ifMatchSetAttribute(
        'is-style-top',
        className,
        'imageSlot',
        'top',
        setAttributes,
    );
    ifMatchSetAttribute(
        'is-style-bottom',
        className,
        'imageSlot',
        'bottom',
        setAttributes,
    );
    ifMatchSetAttribute(
        'is-style-left',
        className,
        'imageSlot',
        'left',
        setAttributes,
    );
    ifMatchSetAttribute(
        'is-style-right',
        className,
        'imageSlot',
        'right',
        setAttributes,
    );
    ifMatchSetAttribute(
        'is-style-disabled',
        className,
        'imageSlot',
        'disabled',
        setAttributes,
    );
    // Default
    ifMatchSetAttribute('', className, 'imageSlot', 'default', setAttributes);
};

const edit = ({ attributes, setAttributes, isSelected }) => {
    const { className } = attributes;
    setImageSlotByClassName(className, setAttributes);

    const props = attributes;
    props.isSelected = isSelected;
    props.setAttributes = setAttributes;

    return (
        <Fragment>
            {true === isSelected && <Controls {...props} />}
            <StoryItemEdit {...props} />
        </Fragment>
    );
};

export default edit;
