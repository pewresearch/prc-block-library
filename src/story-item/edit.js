import { Fragment } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
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
    ifMatchSetAttribute(
        'is-style-default',
        className,
        'imageSlot',
        'default',
        setAttributes,
    );
};

const edit = ({ attributes, setAttributes, isSelected, clientId, context }) => {
    const { rootClientId } = useSelect(
        select => {
            return {
                rootClientId: select('core/block-editor').getBlockRootClientId(
                    clientId,
                ),
            };
        },
        [clientId],
    );

    const { className } = attributes;
    setImageSlotByClassName(className, setAttributes);

    const props = attributes;
    props.isSelected = isSelected;
    props.setAttributes = setAttributes;
    props.wpQueryContext = false;
    props.rootClientId = rootClientId;
    if (context.hasOwnProperty('prc-block/wp-query')) {
        props.wpQueryContext = JSON.parse(context['prc-block/wp-query']);
    }

    console.log('StoryItem Context?', context);
    console.log(props);

    return (
        <Fragment>
            {true === isSelected && <Controls {...props} />}
            <StoryItemEdit {...props} />
        </Fragment>
    );
};

export default edit;
