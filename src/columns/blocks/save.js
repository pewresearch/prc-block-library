import { InnerBlocks } from '@wordpress/block-editor';
import { Grid } from 'semantic-ui-react';

const save = ({attributes}) => {
    const {width} = attributes;
    return <Grid.Column width={width}><InnerBlocks.Content/></Grid.Column>
}

export default save;