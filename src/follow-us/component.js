import { Component, Fragment } from '@wordpress/element';
import { Card as SemanticCard, Image as SemanticImage } from 'semantic-ui-react';
import apiFetch from '@wordpress/api-fetch';
import classNames from 'classnames/bind';

class FollowUs extends Component {
	constructor(props) {
		super(props);
		this.state = {
			email: false,
		}
		this.setState = this.setState.bind(this);
	}

	submitHandler = () => {

	}

	render = () => {
		let isBasic = false;
		if ( 'is-style-borderless' === this.props.className ) {
			isBasic = true;
		}
		let classes = classNames(this.props.className, { basic: isBasic });
		return(
			<SemanticCard fluid className={classes}>
				<SemanticCard.Header>Follow Us</SemanticCard.Header>

				<SemanticCard.Content>
					Newsletter Options
				</SemanticCard.Content>

			</SemanticCard>
		)
	}	
}

export default FollowUs;