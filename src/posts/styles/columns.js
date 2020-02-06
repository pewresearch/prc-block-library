
import { Component, Fragment } from '@wordpress/element';
import { Grid } from 'semantic-ui-react';
import StoryItem from '../../story-item/component';

class PostsColumns extends Component {
	constructor(props) {
		super(props);
		this.state = {
			defaultOptions: {
				emphasis: false,
				enableHeader: true,
				enableExcerpt: true,
				headerSize: 'small',
			}
		}
	}

	componentDidMount() {
	}

	render() {
		const data = this.props.posts;
		return(
			<div style={{marginBottom: '2rem'}}>
			<div className="ui sub header" style={{marginBottom: '1rem'}}>{this.props.title}</div>
			<Grid divided padded stackable columns='equal' style={{backgroundColor: this.props.backgroundColor}}>
				<Grid.Row>
				{ false !== data && data.map((item, index) => {
					let storyItemArgs = {
						postID: '',
						title: item.title,
						link: item.link,
						date: item.date,
						label: item.label,
						excerpt: '',
						extra: '',
						image: {
							slot: 'top',
							src: item.image,
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
			</div>
		)
	}	
}

export default PostsColumns;