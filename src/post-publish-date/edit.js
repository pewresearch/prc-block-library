import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import { useBlockProps } from '@wordpress/block-editor';
import classnames from 'classnames';
import * as moment from 'moment';

const edit = ({ attributes, className, clientId, setAttributes }) => {
    const { date, asItem } = attributes;

    const { postDate, rootBlock } = useSelect(
        select => {
            const d = new Date(
                select('core/editor').getEditedPostAttribute('date'),
            ).toString();
            const rootClientId = select(
                'core/block-editor',
            ).getBlockRootClientId(clientId);
            return {
                postDate: moment(d).format('MMMM D, YYYY'),
                rootBlock: select('core/block-editor').getBlockName(
                    rootClientId,
                ),
            };
        },
        [clientId],
    );

    const blockProps = useBlockProps({
        className: classnames(className, 'meta', {
            item: asItem,
        }),
    });

    useEffect(() => {
        setAttributes({
            date: postDate,
            asItem: 'prc-block/menu' === rootBlock,
        });
    }, [postDate, rootBlock]);

    return <div {...blockProps}>{date}</div>;
};

export default edit;
