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

	componentDidMount = () => {
		var table = document.getElementById("weekdays");
		var data = this.props.weeklyData;
		var today = new Date();
		var day;
		var icon;
		var precip;
		var humid;
		console.log(data);
		for(var i = 0; i<data.length; i++){
			today.setDate(today.getDate() + 1);
			day = today.toLocaleString('en-UK', {weekday: 'long'});
			icon = this.props.setIcon(data[i].icon,false);
			precip = Math.round(data[i].precipProbability * 100) + "%";
			humid = data[i].humidity * 100 + "%";
			console.log(day + " Precipitation: " + precip + " Humidity: " + humid + icon);
			table.innerHTML += '<tr><td>' + day + '</dt><dt><img src=' + icon + ' alt"" height=200px width=200px/></dt><dt>' + precip + '</dt><dt>' + humid + '</dt><dt></tr>';
		}
	}

	render() {
		return (
			<div>
				<table id="weekdays"> </table>
			</div>
		);
	}
}
