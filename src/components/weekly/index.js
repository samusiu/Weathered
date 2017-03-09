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
import WeatherButton from '../weatherButton';
import Map from '../map';
import Iphone from '../iphone';

export default class Weekly extends Component {

	/** a constructor with initial set states
	 * @param props the properties of the component
	 */
	constructor(props){
		super(props);
	}

	fillTable = () => {
		var table = document.getElementById("weekdays");
		var data = this.props.weeklyData;
		var today = new Date();
		var day;
		var icon;
        var temp;
		var precip;
		var humid;
		for(var i = 0; i<data.length; i++){
			today.setDate(today.getDate() + 1);
			day = today.toLocaleString('en-UK', {weekday: 'long'});
            temp = Math.round(this.toCelsius(data[i].temperatureMin)) + "°/" + Math.round(this.toCelsius(data[i].temperatureMax)) + "°";
			icon = this.props.setIcon(data[i].icon,false);
			precip = Math.round(data[i].precipProbability * 100) + "%";
			humid = data[i].humidity * 100 + "%";
			table.innerHTML += '<tr><td>' + day + '</td><td><img src=' + icon + ' alt="weather"}/></td><td>' + precip + '</td><td>' + humid + '</td><td>' + temp + '</td></tr>';
		}
	}

	/** Converts temp from fahrenheit to celsius
	 * @param f the temperature to be converted from fahrenheit to celsius
	 */
	toCelsius(f) {
	    return (5/9) * (f-32);
	}

	componentDidMount = () => {
		this.fillTable();
	}

	componentDidUpdate = () => {
		this.fillTable();
	}

	render() {
		return (
			<div class={ style.container }>
                <div class={style.top}>
                </div>

                <table id="weekdays" class={style.table}>
                    <tr><th>Day</th><th>Weather</th><th>Precip</th><th>Humidity</th><th>Min/Max</th></tr>
                </table>

                <div class={style.foot}>
                </div>
			</div>
		);
	}
}
