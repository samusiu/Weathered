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
import Iphone from '../iphone';

export default class Weekly extends Component {

	/** a constructor with initial set states
	 * @param props the properties of the component
	 */
	constructor(props){
		super(props);

	}

	parse = () => {
		var data = this.props.weeklyGetter();
		var today = new Date();
		for(var i = 0; i<data.length; i++){
			today.setDate(today.getDate() + 1);
			console.log(today.toLocaleString('en-UK', {weekday: 'long'}));
		}
	}

	render() {
		this.parse();
		return (
			<div>
			</div>
		);
	}
}
