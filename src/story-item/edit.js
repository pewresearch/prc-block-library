import { Fragment } from '@wordpress/element';
import { StoryItem } from 'shared';
import Controls from './controls';

const edit = props => {
    if ('is-style-top' === props.attributes.className) {
        props.setAttributes({ imageSlot: 'top' });
    } else if ('is-style-bottom' === props.attributes.className) {
        props.setAttributes({ imageSlot: 'bottom' });
    } else if ('is-style-left' === props.attributes.className) {
        props.setAttributes({ imageSlot: 'left' });
    } else if ('is-style-right' === props.attributes.className) {
        props.setAttributes({ imageSlot: 'right' });
    } else if ('is-style-disabled' === props.attributes.className) {
        props.setAttributes({ imageSlot: 'disabled' });
    } else {
        props.setAttributes({ imageSlot: 'default' });
    }

    const controlProps = { ...props.attributes };
    controlProps.setAttributes = props.setAttributes;

    return (
        <Fragment>
            {true === props.isSelected && <Controls {...controlProps} />}
            <StoryItem {...props} />
        </Fragment>
    );
};

export default edit;
