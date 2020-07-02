import './columns.scss';
import { Grid } from 'semantic-ui-react';
import { StoryItem } from 'shared';

const PostsColumns = ({ posts, title, backgroundColor }) => {
    return (
        <div style={{ marginBottom: '2rem' }}>
            <div className="ui sub header" style={{ marginBottom: '1rem' }}>
                {title}
            </div>
            <Grid
                divided
                padded
                stackable
                columns="equal"
                style={{ backgroundColor }}
            >
                <Grid.Row>
                    {false !== posts &&
                        posts.map(item => {
                            const storyItemArgs = {
                                title: item.title,
                                image: item.image,
                                excerpt: item.excerpt,
                                link: item.link,
                                label: item.label,
                                date: item.date,
                                extra: '',
                                postID: item.id,
                                emphasis: false,
                                isChartArt: false,
                                imageSlot: 'top',
                                imageSize: 'legacy-260',
                                horizontal: false,
                                stacked: true,
                                enableHeader: true,
                                enableExcerpt: false,
                                enableEmphasis: false,
                                enableExtra: false,
                                enableProgramsTaxonomy: false,
                                headerSize: 'small',
                                classNames: 'is-style-top',
                            };
                            return (
                                <Grid.Column>
                                    <StoryItem {...storyItemArgs} />
                                </Grid.Column>
                            );
                        })}
                </Grid.Row>
            </Grid>
        </div>
    );
};

export default PostsColumns;
