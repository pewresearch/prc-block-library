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
 * setAttributes: defaults to false unless otherwise provided a function to pass data back up to a HOC state.
 *
 * <Image id={} img={} size={} link={} slot={} chartArt={} postId={} setAttributes={}/>
 */

const Image = ({ img, link, size, slot, chartArt, postId, setAttributes }) => {
    const classes = () => {
        let isMedium = false;
        let isXL = false;
        let isA1 = false;
        let isA2 = false;
        let isA3 = false;
        let isA4 = false;
        if (false !== slot) {
            if ('XL' === size) {
                isXL = true;
            } else if ('A1' === size) {
                isA1 = true;
            } else if ('A2' === size) {
                isA2 = true;
            } else if ('A3' === size) {
                isA3 = true;
            } else if ('A4' === size) {
                isA4 = true;
            } else if ('left' === slot || 'right' === slot) {
                isMedium = true;
            }
        }

        return classNames({
            ui: true,
            XL: isXL,
            A1: isA1,
            A2: isA2,
            A3: isA3,
            A4: isA4,
            medium: isMedium,
            image: true,
            bordered: chartArt,
        });
    };

    return (
        <div className={classes()}>
            {false === setAttributes && (
                <Display
                    img={img}
                    size={size}
                    link={false !== setAttributes ? '' : link}
                />
            )}
            {false !== setAttributes && (
                <Edit
                    img={img}
                    size={size}
                    chartArt={chartArt}
                    postId={postId}
                    setAttributes={setAttributes}
                />
            )}
        </div>
    );
};

export default Image;
