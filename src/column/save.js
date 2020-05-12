import { InnerBlocks } from '@wordpress/block-editor';
import { Grid } from 'semantic-ui-react';

const save = ({attributes}) => {
    const {width} = attributes;
    let w = width;
    if (0 === width) {
        w = false;
    }
    return <Grid.Column width={w}><InnerBlocks.Content/></Grid.Column>
}

export default save;