import { InnerBlocks } from '@wordpress/block-editor';
import { Grid } from 'semantic-ui-react';
import { Fragment } from '@wordpress/element';

const save = ({attributes, className}) => {
    const { equal, divided } = attributes;
    return(
        <Fragment>
            { true === equal && (
                <Grid className={className} columns="equal" divided={divided} stackable padded="vertically"><InnerBlocks.Content/></Grid>
            )}
            { false === equal && (
                <Grid className={className} divided={divided} padded="vertically"><InnerBlocks.Content/></Grid>
            )}
        </Fragment>
    );
}

export default save;