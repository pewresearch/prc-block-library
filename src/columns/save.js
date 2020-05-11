import { InnerBlocks } from '@wordpress/block-editor';
import { Grid } from 'semantic-ui-react';
import { Fragment } from '@wordpress/element';

const save = ({attributes}) => {
    const { equal } = attributes;
    return(
        <Fragment>
            { true === equal && (
                <Grid columns="equal"><InnerBlocks.Content/></Grid>
            )}
            { false === equal && (
                <Grid><InnerBlocks.Content/></Grid>
            )}
        </Fragment>
    );
}

export default save;