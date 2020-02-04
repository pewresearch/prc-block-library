import { Component, Fragment } from '@wordpress/element';
import PostsList from './list';

import ftLogoURL, { ReactComponent as ftLogoSVG } from "./fact-tank-logo.svg"; 

class FactTankList extends Component {
	constructor(props) {
		super(props);
		this.svgHeader = this.svgHeader.bind(this);
	}

	svgHeader({svg, width}) {
		let height = width / 5;
		return(<img style={{margin: 'auto', display: 'block'}} src={svg} width={width+'px'} height={height+'px'}/>)
	}

	render() {
		const Logo = this.svgHeader;
		return(
			<div id="js-fact-tank-widget">
				<Logo svg={ftLogoURL} width="200"/>
				<div class="ui segment inverted beige" style={{borderTop: '1px solid #b2b3a5'}}>
					<p className="tagline">NEWS IN THE NUMBERS</p>
					<PostsList {...this.props}/>
					<a href="#" className="read-more">More From Fact Tank</a>
				</div>
			</div>
		)
	}	
}

export default FactTankList;