import './imageEditor.scss';

import classNames from 'classnames/bind';

import Display from './display';
import Edit from './edit';

/**
 * Props:
 * img: string url of image to display
 * size: string of image/slot size (A1,A2,A3,A4)
 * link: string of url to go to when image is clicked on front end
 * slot: if set to null then no image size chooser will be display
 * chartArt: if set to null then no chart art button will appear
 * dataHandler: defaults to false unless otherwise provided a function to pass data back up to a HOC state.
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
        <div className={classes()}>
            <Display
                img={img}
                size={size}
                link={false !== dataHandler ? '' : link}
            />
            {false !== dataHandler && (
                <Edit
                    img={img}
                    slot={slot}
                    size={size}
                    chartArt={chartArt}
                    dataHandler={dataHandler}
                />
            )}
        </div>
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
