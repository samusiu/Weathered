//
// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
import style_iphone from '../button/style_iphone';
// import jquery for API calls
import $ from 'jquery';
// import the Button component
import Button from '../button';
import Weather from '../weather';
import Map from '../map';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		this.setState({ display: true });
		this.setState({ rec: false });
		var map;
	}

	visualiseMap = () => {
		if (this.state.rec == false) {
			this.setState({rec : true});
			this.setState({display : false});
		}
		else {
			this.setState({rec : false});
			this.setState({display : true});

		}
	}

	render() {
		return (
			<div>
				{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.visualiseMap }/ > : null }
				{this.state.rec ? null : <Weather/>}
				{ this.state.rec ? <Map text={this.generateMap} /> : null}
			</div>
		);
	}
}
