
const { Component, Fragment, RawHTML } = wp.element;

class PostsList extends Component {
	constructor(props) {
		super(props);
		this.getPosts = this.getPosts.bind(this);
	}

	getPosts(setAttributes) {
		// We could use a rest api endpoint here.
		// Every 10 minutes it should self update...
		console.info('Getting Posts');
		let data = [];
		return ( new wp.api.collections.FactTank() ).fetch().then( ( posts ) => {
			for (let index = 0; index < posts.length; index++) {
				data.push({
					title: posts[index].title.rendered,
					date: posts[index].date,
					link: posts[index].link,
				});
			}
			setAttributes({posts: data});
		});
	}

	posts({ data, isFactTank, disableLink }) {
		let classes = 'ui segment';
		if ( true === isFactTank ) {
			classes = classes + ' beige inverted';
		}
		return(
			<div className={classes}>
				{ true === isFactTank && (<p className="tagline sans-serif">News In The Numbers</p>) }
				<div class="ui relaxed divided list">
				{false !== data && data.map((item, index) => {
					if ( true === disableLink ) {
						return <div className="item"><span className="meta date">{item.date}</span><a><RawHTML>{item.title}</RawHTML></a></div>
					} else {
						return <div className="item"><span className="meta date">{item.date}</span><a href={item.link}><RawHTML>{item.title}</RawHTML></a></div>
					}
				})}
				</div>
			</div>
		)
	}

	componentDidMount() {
		if ( undefined !== this.props.edit ) {
			this.getPosts( this.props.edit.setAttributes );
		}
	}

	// We may need to import this ala the pancake promo
	logo() {
		const cls1 = {
			fill: 'none',
			stroke: '#ea9e2c',
			strokeMiterLimit: '10',
			strokeWidth:'4.72px',
		}
		const cls2 = { fill: '#ddd9c7' }
		const cls3 = { fill: '#808184' }
		const cls4 = { fill: '#231f20' }
		const cls5 = { fill: '#ea9e2c' }
		return(
			<svg id="Layer_1" data-name="Layer 1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 225 40"><polyline points="185.22 20.69 194.15 12.52 203.03 22.42 219.62 6.61" style={cls1}/><polygon style={cls2} points="194.15 19.23 194.15 40.08 200.7 40.08 200.7 26.49 194.15 19.23"/><polygon style={cls2} points="202.93 28.51 202.93 40.08 209.48 40.08 209.48 22.25 202.93 28.51"/><polygon style={cls2} points="211.71 20.12 211.71 40.08 218.26 40.08 218.26 13.87 211.71 20.12"/><polygon style={cls2} points="185.37 26.56 185.37 40.08 191.92 40.08 191.92 20.57 185.37 26.56"/><path style={cls3} d="M27.88,3.83v6.23H14.37V19.5H24.79v6.24H14.37V40H6.46V3.83Z"/><path style={cls3} d="M43.48,3.83,53.78,40H45.65l-1.79-7.43H33.66L31.93,40H24.61L35.45,3.83Zm-4.77,7.75L35.18,26.34h7.16Z"/><path style={cls3} d="M79,27.31c-.65,8.19-5.42,13.23-12.64,13.23-8.68,0-13.61-6.78-13.61-18.6S57.63,3.28,66.42,3.28c4.5,0,7.92,1.79,10,5.27,1.42,2.27,2,4.61,2.34,8.73l-7.27.54c-.22-3.15-.43-4.39-1.14-5.64a4.28,4.28,0,0,0-3.9-2.44c-3.86,0-5.43,3.74-5.43,12.8,0,8.19,1.57,11.55,5.43,11.55,2.87,0,4.5-2.28,5.09-7.27Z"/><polygon style={cls3} points="91.51 40 91.51 3.83 78.95 3.83 78.95 10.61 86.16 10.61 86.16 40 91.51 40"/><path style={cls4} d="M122,3.83,132.27,40h-8.13l-1.79-7.43h-10.2L110.42,40H103.1L113.94,3.83Zm-4.77,7.75-3.53,14.76h7.16Z"/><path style={cls4} d="M143.82,3.83,153,26.28V3.83h6.18V40h-7.1l-11-26.19V40H135V3.83Z"/><path style={cls4} d="M170.94,3.83V18.9l8.79-15.07h8L178.7,17.11,188.51,40h-8.18l-6.4-16.65-3,4.4V40H163V3.83Z"/><polygon style={cls4}points="92.92 3.83 92.92 40 98.17 40 98.17 10.61 105.54 10.61 105.54 3.83 92.92 3.83"/><polygon style={cls5} points="183.66 18.97 186.19 23.07 187.39 21.91 183.66 18.97"/></svg>
		)
	}

	render() {
		const Logo = this.logo;
		const Posts = this.posts;
		let disableLink = true;
		return(
			<Fragment>
				{ true === this.props.isFactTank && (<Logo/>) }
				<Posts data={this.props.posts} isFactTank={this.props.isFactTank} disableLink={disableLink}/>
			</Fragment>
		)
	}	
}

export default PostsList;