// import preact
import { h, render, Component } from 'preact';
// import jquery for API calls
import $ from 'jquery';
import Button from '../button';
import Iphone from '../iphone';
import style from './style2';
export default class Map extends Component {

	constructor(props){
		super(props);
		var map;
		var markers;
		var lat;
		var long;
	}

	getPlaces = () => {
		//Get current location from API or hardcode
		this.lat = "51.5238447";
		this.long = "-0.0404668";
		//API info: https://developers.google.com/places/web-service/search
		var location = this.lat + ',' + this.long;
		var radius = '5000';
		var type = 'park';
        var down = "../../assets/images/Down.png";
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
		console.log("printing " + this.props.getter());
	}

	initialize = (parsed_json) => {
		if(parsed_json.status == google.maps.places.PlacesServiceStatus.OK){
			var center = new google.maps.LatLng(this.lat,this.long);
			this.map = new google.maps.Map(document.getElementById('map'), {
				center: center,
				zoom: 13
			});
			var placesList = document.getElementById('places');
			var place;
			var markers = [];
			for(var i = 0; i < parsed_json.results.length; i++){
				place = parsed_json.results[i];
				var placeLoc = place.geometry.location;
				var marker = new google.maps.Marker({
					map: this.map,
					position: place.geometry.location,
					title: place.name
				});
				marker.addListener('click', this.markerClicked);
				markers[i] = marker;
				var dist = Math.round( this.markerDistance(placeLoc) * 10) / 10;
				placesList.innerHTML += '<li>' + place.name + '</li>';
				console.log(place.name +" is "+ dist +" km");
			}
			this.markers = markers;
		}else {
			console.log("Invalid json");
		}
	}

	markerClicked = (marker) => {
		for(var i=0; i< this.markers.length; i++){
			if(marker.latLng == this.markers[i].position){
				var marker = this.markers[i];
				break;
			}
		}
		var list = document.getElementById("places");
		for(var i = 0; i<list.childElementCount; i++){
			if(list.childNodes[i].innerHTML == marker.title) {
				this.activateLocation(list.childNodes[i], marker);
				break;
			}
		}
	}

	listClicked = (mouseEvent) => {
		for(var i = 0; i < this.markers.length; i++) {
			if(this.markers[i].title == mouseEvent.target.innerHTML) {
				this.activateLocation(mouseEvent.target, this.markers[i]);
				break;
			}
		}
	}

	activateLocation = (item, marker) => {
		this.map.panTo(marker.getPosition());
		$(item).parent().find('li').removeClass('active');
		$(item).addClass('active');
	}

	markerDistance = (marker) => {
		var lat1 = this.lat;
		var lon1 = this.long;
		var lat2 = marker.lat;
		var lon2 = marker.lng;
  	var R = 6371; // Radius of the earth in km
  	var dLat = this.deg2rad(lat2-lat1);  // deg2rad below
  	var dLon = this.deg2rad(lon2-lon1);
  	var a =
    	Math.sin(dLat/2) * Math.sin(dLat/2) +
    	Math.cos(this.deg2rad(lat1)) * Math.cos(this.deg2rad(lat2)) *
    	Math.sin(dLon/2) * Math.sin(dLon/2)
    ;
  	var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  	var d = R * c; // Distance in km
  	return d;
	}

	deg2rad = (deg) => {
	  return deg * (Math.PI/180)
	}

	render() {
		this.getPlaces();
		return (
			<div class={style.container}>
                <div class={style.top}>
                    <img class={style.gear} src="../../assets/images/Gear.png"/>
                    <Button class={style.button} clickFunction={ this.props.text }/ >
                </div>

                <div class={style.main}>
                    <div style="height:200px" id="map" class={style.map}></div>

                    <ul class={style.recs} id="places" onClick={this.listClicked} ></ul>
                </div>

                <div class={style.foot}>

                </div>
            </div>
		);
	}
}
