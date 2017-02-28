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

	initialize() {
		var center = new google.maps.LatLng(51.526806,-0.0419017);
		this.map = new google.maps.Map(document.getElementById('map'), {
			center: center,
			zoom: 13
		});

		google.maps.event.addDomListener(window, 'load', this.initialize);
		var request1 = {
			location: center,
			radius: 8000,
			types: ['restaurant']
		};
		var request2 = {
			location: center,
			radius: 8000,
			types: ['park']
		};

		var service = new google.maps.places.PlacesService(map);

		service.nearbySearch(request1, this.callback);
		service.nearbySearch(request2, this.callback);
	}

	callback(result, status) {
		if(status == google.maps.places.PlacesServiceStatus.OK){
			for(var i = 0; i < result.length; i++){
				createMarker(result[i]);
			}
		}
	}

	createMarker(place){
		var placeLoc = place.geometry.location;
		var marker = new google.maps.Marker({
			map: map,
			position: place.geometry.location
		});
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

	// the main render method for the iphone component
	render() {
		// check if temperature data is fetched, if so add the sign styling to the page
		const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

		// display all weather data
		return (
			<div class={ style.container }>
			<Map class={style_iphone.map}/>
				<div class= { style_iphone.container }>
					{ this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.initialize }/ > : null }
				</div>
			</div>
		);
	}

	parseResponse = (parsed_json) => {
        //Variables to get form URL
		var location = parsed_json['current_observation']['display_location']['city'];
		var temp_c = parsed_json['current_observation']['temp_c'];
		var conditions = parsed_json['current_observation']['weather'];

		// set states for fields so they could be rendered later on
		this.setState({
			locate: location,
			temp: temp_c,
			cond : conditions
		});
	}
}
