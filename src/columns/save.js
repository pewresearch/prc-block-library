import { InnerBlocks } from '@wordpress/block-editor';
import { Grid } from 'semantic-ui-react';
import { Fragment } from '@wordpress/element';

const save = ({attributes}) => {
    const { equal, divided } = attributes;
    return(
        <Fragment>
            { true === equal && (
                <Grid columns="equal" divided={divided} stackable><InnerBlocks.Content/></Grid>
            )}
            { false === equal && (
                <Grid divided={divided}><InnerBlocks.Content/></Grid>
            )}
        </Fragment>
    );
}

export default save;