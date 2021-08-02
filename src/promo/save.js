/**
 * WordPress Dependencies
 */
import { Fragment } from '@wordpress/element';
import { InnerBlocks, RichText } from '@wordpress/block-editor';

const save = ({attributes}) => {
    const { heading, subHeading, headingLevel } = attributes;
    return (
        <Fragment>
            <div className="text">
                { heading && (<RichText.Content className="heading sans-serif" tagName={`h${headingLevel}`} value={heading}/>) }
                { subHeading && (<RichText.Content className="sub-heading sans-serif" tagName="div" value={subHeading}/>) }
            </div>
            <div className="action">
                <InnerBlocks.Content />
            </div>
        </Fragment>
    );
};

export default save;
