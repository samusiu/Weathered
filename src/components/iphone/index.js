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
import Map from '../map';

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
		this.setState({ rec: false });
		var map;
	}

	generateMap = () => {
		if (this.state.rec == false) {
			this.setState({rec : true});
			this.setState({display : false});
		}
		else {
			this.setState({rec : false});
			this.setState({display : true});

		}
	}
	// the main render method for the iphone component
	render() {
		console.log(this.props);
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

		// display all weather data
		return (
			<div>
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.generateMap }/ > : null }
					{ this.state.rec ? <Map text={this.generateMap}/> : null}
			</div>

		);
	}
}
