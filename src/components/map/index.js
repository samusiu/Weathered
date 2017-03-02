// import preact
import { h, render, Component } from 'preact';
// import jquery for API calls
import $ from 'jquery';
import Button from '../button';
import Iphone from '../iphone';
export default class Map extends Component {

	constructor(props){
		super(props);
		var map;
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
		 success : this.createMap,
		 error : function(req, err){ console.log('API call failed ' + err); }
 });
	}

	createMap = (parsed_json) => {
		this.initialize(parsed_json);
		google.maps.event.addDomListener(window, 'load', this.initialize);
	}

	initialize = (parsed_json) => {
		if(parsed_json.status == google.maps.places.PlacesServiceStatus.OK){
			var center = new google.maps.LatLng(51.526806,-0.0419017);
			this.map = new google.maps.Map(document.getElementById('map'), {
				center: center,
				zoom: 13
			});
			var placesList = document.getElementById('places');
			var place;
			for(var i = 0; i < parsed_json.results.length; i++){
				place = parsed_json.results[i];
				var placeLoc = place.geometry.location;
				var marker = new google.maps.Marker({
					map: this.map,
					position: place.geometry.location,
					title: place.name
				});
				placesList.innerHTML += '<li>' + place.name + '</li>';
			}
		}else {
			console.log("Invalid json");
		}
	}


	render() {
		this.getPlaces();
		return (
			<div>
				<Button clickFunction={ this.props.text }/ >
				<div id="map" style="height:200px"></div>
		    <div id="right-panel">
		      <ul id="places"></ul>
		    </div>
			</div>
		);
	}
}
