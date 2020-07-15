// WordPress Core
import { Fragment, RawHTML } from '@wordpress/element';
import { Item } from 'semantic-ui-react';
import { Display as Image } from '../image';
import { Kicker } from '../kicker';

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
}) => {
    if (true !== enabled) {
        return <Fragment />;
    }
    return (
        <Fragment>
            <Item.Meta>
                <Kicker label={label} date={date} />
            </Item.Meta>
            <Item.Header className={size}>
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
