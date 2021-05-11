import { Fragment } from '@wordpress/element';
import classNames from 'classnames/bind';
import * as moment from 'moment';

const KickerDisplay = ({ label = 'Report', date }) => {
    const formatDate = dateString => {
        return moment(dateString).format('MMM D, YYYY');
    };

    const labelSlug = null !== label ? label.replace(/\s+/g, '-').toLowerCase() : 'report';

    const classes = classNames(labelSlug, 'label');

    const d = formatDate(date);

    return (
        <Fragment>
            <span className={classes}>{label || 'Report'}</span>
            {' | '}
            <span className="date">{d}</span>
        </Fragment>
    );
}

export default KickerDisplay;