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
		var map;
	}

	initialize(parsed_json) {
		if(parsed_json.status == google.maps.places.PlacesServiceStatus.OK){
			var center = new google.maps.LatLng(51.526806,-0.0419017);
			this.map = new google.maps.Map(document.getElementById('map'), {
				center: center,
				zoom: 13
			});
			var place;
			for(var i = 0; i < parsed_json.results.length; i++){
				place = parsed_json.results[i];
				var placeLoc = place.geometry.location;
				var marker = new google.maps.Marker({
					map: this.map,
					position: place.geometry.location
				});
			}
		}else {
			console.log("Invalid json");
		}
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : http://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "http://api.wunderground.com/api/33fcabd5190e7af3/conditions/q/UK/London.json";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}
	getPlaces = () => {
		//API info: https://developers.google.com/places/web-service/search
		var location = '51.5238447,-0.0404668';
		var radius = '5000';
		var type = 'park';
		//supported types here: https://developers.google.com/places/web-service/supported_types
		var api_url = 'https://maps.googleapis.com/maps/api/place/nearbysearch/json?location='+location+'&radius='+radius+'&type='+type+'&key=AIzaSyBiXC1s3oFkNEejJIRcMIB2E3AcUUEacH4';
		$.ajax({
		 url: api_url,
		 dataType: 'json',
		 success : this.initialize,
		 error : function(req, err){ console.log('API call failed ' + err); }
 });
	}

	createMap(parsed_json){
		initialize(parsed_json);
		google.maps.event.addDomListener(window, 'load', initialize);
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
					<span class={ tempStyles }>{ this.state.temp }</span>
				</div>
				<Map style="height: 100%"/>
				<div class={ style.details }></div>
				<div class= { style_iphone.container }>
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.getPlaces }/ > : null }
				</div>
			</div>
		);
	}
}
