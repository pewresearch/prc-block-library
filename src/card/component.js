import './card.scss';

import classNames from 'classnames/bind';

// WordPress Import:
import { Fragment } from '@wordpress/element';
import { RichText, InnerBlocks } from '@wordpress/block-editor';

// Components
import { Card as SemanticCard } from 'semantic-ui-react';

const allowedBlocks = [
    'core/paragraph',
    'core/heading',
    'core/list',
    'core/image',
    'prc-block/staff',
    'prc-block/story-item',
    'prc-block/wp-query',
];

const Card = props => {
    const { className, isDisplay, setAttributes, link, label, title } = props;
    const classes = classNames(className, {
        basic: 'is-style-borderless' === className,
    });
    return (
        <SemanticCard fluid className={classes}>
            <SemanticCard.Header>
                <Fragment>
                    {false === isDisplay && (
                        <RichText
                            tagName="div" // The tag here is the element output and editable in the admin
                            value={title} // Any existing content, either from the database or an attribute default
                            onChange={t => setAttributes({ title: t })} // Store updated content as a block attribute
                            placeholder="Card Title" // Display this text before any content has been added by the user
                        />
                    )}
                    {true === isDisplay && '' === link && <span>{title}</span>}
                    {true === isDisplay && '' !== link && (
                        <a href={link}>{title}</a>
                    )}
                </Fragment>
            </SemanticCard.Header>

            <SemanticCard.Content>
                {false !== setAttributes && (
                    <InnerBlocks allowedBlocks={allowedBlocks} />
                    // State where isDisplay is false but alsoe set attribute is false. Internal save mode. But what we ultimately need is a flag "hasInnerBlocks
                )}
                {false === setAttributes && true === isDisplay && (
                    <InnerBlocks.Content />
                )}
                {'' !== label && '' !== link && (
                    <p className="relaxed">
                        <a href={link} className="read-more">
                            {label}
                        </a>
                    </p>
                )}
            </SemanticCard.Content>
        </SemanticCard>
    );
};

export default Card;
