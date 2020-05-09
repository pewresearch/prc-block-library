import { InnerBlocks } from '@wordpress/block-editor';
import { Grid } from 'semantic-ui-react';

const save = props => {
    return <Grid><InnerBlocks.Content/></Grid>
}

export default save;