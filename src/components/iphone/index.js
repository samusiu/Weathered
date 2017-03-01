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

export default class Iphone extends Component {
//var Iphone = React.createClass({

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : http://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "https://api.darksky.net/forecast/18fd0928fdde0a015b26a293ba8b91ac/51.5074,0.1278";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

		// display all weather data
		return (
			<div class={ style.container }>
				<div class={ style.header }>
					<div class={ style.city }>{ this.state.locate }</div>
					<div class={ style.conditions }>{ this.state.cond }</div>
					<div class={ style.conditions }>{ this.state.temp }</div>
					<div class={ style.conditions }>{ this.state.date }</div>
					<div class={ style.conditions }>{ this.state.humidity }</div>
					<div class={ style.conditions }>{ this.state.precip }</div>
					<div class={ style.conditions }>{ this.state.hour1 }</div>
					<div class={ style.conditions }>{ this.state.hour1temp }</div>
					<div class={ style.conditions }>{ this.state.hour1conditions }</div>
					<div class={ style.conditions }>{ this.state.hour2 }</div>
					<div class={ style.conditions }>{ this.state.hour2temp }</div>
					<div class={ style.conditions }>{ this.state.hour2conditions }</div>
					<div class={ style.conditions }>{ this.state.hour3 }</div>
					<div class={ style.conditions }>{ this.state.hour3temp }</div>
					<div class={ style.conditions }>{ this.state.hour3conditions }</div>
					<div class={ style.conditions }>{ this.state.hour4 }</div>
					<div class={ style.conditions }>{ this.state.hour4temp }</div>
					<div class={ style.conditions }>{ this.state.hour4conditions }</div>
					<div class={ style.conditions }>{ this.state.hour5 }</div>
					<div class={ style.conditions }>{ this.state.hour5temp }</div>
					<div class={ style.conditions }>{ this.state.hour5conditions }</div>



				</div>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }>
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.fetchWeatherData }/ > : null }
				</div>
			</div>
		);
	}

	toCelsius(f) {
	    return (5/9) * (f-32);
	}



	parseResponse = (parsed_json) => {
        //Variables to get form URL
		var location = parsed_json.timezone;
		var temp_f = parsed_json.currently.temperature;
		var temp_c = Math.round((5/9) * (temp_f-32));
		var conditions = parsed_json.currently.summary;
		var humidity = parsed_json.currently.humidity*100 + "%";
		var current_precip = Math.round(parsed_json.currently.precipIntensity*100) + "%";
		//get current month/day/weekday
		var date = new Date((parsed_json.currently.time)*1000);
		var date = date.toLocaleString('en-UK', {month: "long", day: 'numeric', weekday: 'long'});
		//store 5 hourly forecasts in an array
		var hourly_precip = [];
		var hourly_time = [];
		var hourly_temp = [];
		var hourly_conditions = [];
		//start at 1 since index 0 is current time
		for (var i = 1; i<6; i++){
			var hour = new Date(parsed_json.hourly.data[i]['time']*1000);
			//converts timestamp into am/pm time
			hourly_time[i] = hour.toLocaleString('en-UK', { hour: 'numeric', hour12: true });
			var f = parsed_json.hourly.data[i]['temperature'];
			hourly_temp[i] = Math.round((5/9) * (f-32));
			hourly_conditions[i] = parsed_json.hourly.data[i]['summary'];
			hourly_precip[i] = parsed_json.hourly.data[i].precipProbability;
		}
		// set states for fields so they could be rendered later on
		//need high/low
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions,
			humidity : humidity,
			date : date,
			precip : current_precip,
			hour1temp: hourly_temp[1],
			hour2temp: hourly_temp[2],
			hour3temp: hourly_temp[3],
			hour4temp: hourly_temp[4],
			hour5temp: hourly_temp[5],
			hour1conditions: hourly_conditions[1],
			hour2conditions: hourly_conditions[2],
			hour3conditions: hourly_conditions[3],
			hour4conditions: hourly_conditions[4],
			hour5conditions: hourly_conditions[5],
			hour1: hourly_time[1],
			hour2: hourly_time[2],
			hour3: hourly_time[3],
			hour4: hourly_time[4],
			hour5: hourly_time[5]
		});
	}
}
