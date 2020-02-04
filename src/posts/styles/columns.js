
import { Component, Fragment } from '@wordpress/element';
import { Grid } from 'semantic-ui-react';
import StoryItem from '../../story-item/component';

class PostsColumns extends Component {
	constructor(props) {
		super(props);
		this.state = {
			defaultOptions: {
				emphasis: false,
				disableHeader: false,
				disableExcerpt: false,
				headerSize: 'small',
			}
		}
	}

	componentDidMount() {
	}

	render() {
		const data = this.props.posts;
		return(
			<Fragment>
			<div className="ui sub header">{this.props.title}</div>
			<Grid divided columns='equal'>
				<Grid.Row>
				{ false !== data && data.map((item, index) => {
					let storyItemArgs = {
						postID: '',
						title: item.title,
						link: item.link,
						date: item.date,
						label: '',
						excerpt: '',
						extra: '',
						image: {
							slot: 'top',
							src: '',
							isChartArt: false,
						},
						// These are very much 
						options: this.state.defaultOptions,
						classNames: 'is-style-top',
					};
					return <Grid.Column><StoryItem {...storyItemArgs}/></Grid.Column>
				}) }
				</Grid.Row>
			</Grid>
			</Fragment>
		)
	}	
}

export default PostsColumns;