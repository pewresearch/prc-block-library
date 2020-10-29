import classNames from 'classnames/bind';
import { ImageDisplay } from '../_shared';

const Image = ({ img, link, size, slot, chartArt }) => {
    const classes = () => {
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
            }
        }

        return classNames({
            ui: true,
            XL: isXL,
            A1: isA1,
            A2: isA2,
            A3: isA3,
            A4: isA4,
            image: true,
            bordered: chartArt,
        });
    };

    return (
        <div className={classes()}>
            <ImageDisplay img={img} size={size} link={link} />
        </div>
    );
};

export default Image;
