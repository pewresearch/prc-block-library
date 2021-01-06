// WordPress Core
import { Fragment, RawHTML } from '@wordpress/element';
import { Item } from 'semantic-ui-react';
import classNames from 'classnames/bind';

import Image from './image';
import Kicker from './kicker';

const Header = ({
    title,
    label,
    date,
    link,
    size,
    enabled,
    isStyleMobileLoop,
    image,
    imageSize,
    isChartArt,
    altHeaderWeight,
}) => {
    if (true !== enabled) {
        return <Fragment />;
    }
    console.log(size);
    const classes = classNames({
        large: (1 === parseInt(size)),
        medium: (2 === parseInt(size)),
        small: (3 === parseInt(size)),
        light: altHeaderWeight,
    });

    console.log("<Header/>", size, classes);
    
    return (
        <Fragment>
            <Item.Meta>
                <Kicker label={label} date={date} />
            </Item.Meta>
            <Item.Header className={classes}>
                {true === isStyleMobileLoop && (
                    <Image
                        img={image}
                        size={imageSize}
                        link={link}
                        slot="left"
                        chartArt={isChartArt}
                    />
                )}
                <a href={link}>
                    <RawHTML>{title}</RawHTML>
                </a>
            </Item.Header>
        </Fragment>
    );
};

export default Header;
