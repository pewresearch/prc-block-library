import { Component, Fragment } from '@wordpress/element';
import { Tab } from 'semantic-ui-react';

class Tabs extends Component {
  constructor(props) {
		super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e, data) {
    let panes = document.querySelectorAll(`[data-block="${this.props.clientId}"] [data-type="prc-block/pane"]`);
    for (let i = 0; i < panes.length; i++) {
      panes[i].style.display = "none";
    }
    panes[data.activeIndex].style.display = "block";
  }

  render() {
    const {panes, menu} = this.props;
    return (
      <Tab panes={panes} menu={menu} renderActiveOnly={false} onTabChange={this.handleChange} />
    )
  }
}

export default Tabs;
