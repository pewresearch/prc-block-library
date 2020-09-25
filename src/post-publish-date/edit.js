import { useEffect } from '@wordpress/element';
import { useSelect } from '@wordpress/data';
import * as moment from 'moment';

const edit = ({ attributes, className, clientId, setAttributes }) => {
    const { date } = attributes;

    const postDate = useSelect(
        select => {
            const d = new Date(
                select('core/editor').getEditedPostAttribute('date'),
            ).toString();
            return moment(d).format('MMMM Do YYYY');
        },
        [clientId],
    );

    useEffect(() => {
        setAttributes({ date: postDate });
    }, [postDate]);

    return <div className={`${className} meta`}>{date}</div>;
};

export default edit;
