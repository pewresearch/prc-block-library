import './imageEditor.scss';

import { Fragment } from '@wordpress/element';
import classNames from 'classnames/bind';

import Display from './display';
import Edit from './edit';

/**
 * Props:
 * img:
 * size:
 * link:
 * slot: // if set to false then no image size chooser will be display
 * chartArt: // if undefined then no chart art button will appear
 * dataHandler: *When not in "edit mode" this prop should be false to signal that.*
 *
 * <Image id={} img={} size={} link={} slot={} chartArt={} dataHandler={}/>
 */

const Image = ({ img, link, size, slot, chartArt, dataHandler }) => {
    const classes = () => {
        let isMedium = false;

        if (false !== slot) {
            if ('left' === slot || 'right' === slot) {
                isMedium = true;
            }
        }

        return classNames({
            ui: true,
            medium: isMedium,
            image: true,
            bordered: chartArt,
        });
    };

    return (
        <Fragment>
            {false === dataHandler && (
                <div className={classes()}>
                    <Display img={img} size={size} link={link} />
                </div>
            )}
            {false !== dataHandler && (
                <Edit
                    img={img}
                    slot={slot}
                    size={size}
                    chartArt={chartArt}
                    dataHandler={dataHandler}
                    display={Display}
                    className={classes()}
                />
            )}
        </Fragment>
    );
};

Image.defaultProps = {
    img: '',
    link: '',
    size: 'A1',
    slot: false,
    chartArt: false,
    dataHandler: false,
};

export default Image;
