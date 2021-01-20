// eslint-disable-next-line import/no-unresolved
import { Fragment } from '@wordpress/element';
import { useBlockProps } from '@wordpress/block-editor';

/** Returns a server side block callback */
const save = () => {
    const blockProps = useBlockProps.save();
    return <Fragment {...blockProps} />;
};

export default save;
