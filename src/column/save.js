import { InnerBlocks } from '@wordpress/block-editor';
import { Grid } from 'semantic-ui-react';

const save = ({attributes}) => {
    const {width, items} = attributes;
    let w = width;
    if (0 === width) {
        w = false;
    }
    return(
        <Grid.Column width={w}>
            {true === items && (
                <div className="ui divided items">
                    <InnerBlocks.Content/>
                </div>
            )}
            {false === items && (
                <InnerBlocks.Content/>
            )}
        </Grid.Column>
    );
}

export default save;