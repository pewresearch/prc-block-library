import './card.scss';

import classNames from 'classnames/bind';

// WordPress Import:
import { Fragment, RawHTML } from '@wordpress/element';
import { RichText, InnerBlocks } from '@wordpress/block-editor';

// Components
import { Card as SemanticCard } from 'semantic-ui-react';
import { Image } from '../_shared';

const allowedBlocks = [
    'core/paragraph',
    'core/list',
    'core/image',
    'prc-block/story-item',
];

const Card = props => {
    const { className, edit } = props;
    const classes = classNames(className, {
        basic: className === 'is-style-borderless',
    });
    return (
        <SemanticCard fluid className={classes}>
            <SemanticCard.Header>
                <Fragment>
                    {this.props.edit.enabled === true && (
                        <RichText
                            tagName="div" // The tag here is the element output and editable in the admin
                            value={this.props.title} // Any existing content, either from the database or an attribute default
                            onChange={title =>
                                this.props.edit.setAttributes({ title })
                            } // Store updated content as a block attribute
                            placeholder="Card Title" // Display this text before any content has been added by the user
                        />
                    )}

                    {this.props.edit.enabled !== true &&
                        this.props.link === '' && (
                            <span>{this.props.title}</span>
                        )}
                    {this.props.edit.enabled !== true &&
                        this.props.link !== '' && (
                            <a href={this.props.link}>{this.props.title}</a>
                        )}
                </Fragment>
            </SemanticCard.Header>

            <SemanticCard.Content>
                <div className="ui relaxed items">
                    {this.props.edit.display === false && (
                        <InnerBlocks allowedBlocks={allowedBlocks} />
                    )}
                    {this.props.edit.display === true && (
                        <InnerBlocks.Content />
                    )}
                </div>

                {this.props.label !== '' && this.props.link !== '' && (
                    <p>
                        <strong>
                            <a href={this.props.link} className="read-more">
                                {this.props.label}
                            </a>
                        </strong>
                    </p>
                )}
            </SemanticCard.Content>
        </SemanticCard>
    );
};

export default Card;
