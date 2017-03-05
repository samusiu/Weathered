// import preact
import { h, render, Component } from 'preact';
// import stylesheets for ipad & button
import style from './style';
// import jquery for API calls
import $ from 'jquery';
import Iphone from '../iphone';
export default class Weather extends Component {

	// a constructor with initial set states
	constructor(props){
		super(props);
		// temperature state
		this.state.temp = "";
		// button display state
		this.setState({ display: true });
		this.fetchWeatherData();
	}

	// a call to fetch weather data via wunderground
	fetchWeatherData = () => {
		// API URL with a structure of : http://api.wunderground.com/api/key/feature/q/country-code/city.json
		var url = "https://api.darksky.net/forecast/2320fd004bb95c2366084514d784827e/51.5074,0.1278";
		$.ajax({
			url: url,
			dataType: "jsonp",
			success : this.parseResponse,
			error : function(req, err){ console.log('API call failed ' + err); }
		})
		// once the data grabbed, hide the button
		this.setState({ display: false });
	}

	toCelsius(f) {
	    return (5/9) * (f-32);
	}

	//[string] condition based on darkskyAPI used to choose icon.
	//[boolean] main if icon is current. Only use setter if main == true.
	setIcon = (condition, main) => {
		switch (condition) {
			case "clear-day":
				main ? this.props.setter("clear-day") : null;
				return "../../assets/images/Sun.png";
			case "clear-night":
				main ? this.props.setter("clear-night") : null;
				return "../../assets/images/Sun.png";
			case "snow":
				main ? this.props.setter("snow") : null;
				return "../../assets/images/Snow.png";
			case "wind":
				main ? this.props.setter("wind") : null;
				return "../../assets/images/Wind.png";
			case "fog":
				main ? this.props.setter("fog") : null;
				return "../../assets/images/Fog.png";
			case "cloudy":
				main ? this.props.setter("cloudy") : null;
				return "../../assets/images/Cloud.png";
			case "partly-cloudy-day":
				main ? this.props.setter("partly-cloudy-day") : null;
				return "../../assets/images/PartlyCloud.png";
			case "partly-cloudy-night":
				main ? this.props.setter("partly-cloudy-night") : null;
				return "../../assets/images/PartlyCloud.png";
			case "rain":
			case "sleet":
				main ? this.props.setter("rain") : null;
				return "../../assets/images/Rain.png";
			default:
				main ? this.props.setter("defualt") : null;
				return "../../assets/images/Default.png";
		}

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
			temp: temp_c + "°",
			cond : conditions,
			humidity : humidity,
			date : date,
			precip : current_precip,
            preciplabel: "Precipitation: ",
            humidlabel: "Humidity: ",
            icon : this.setIcon(parsed_json.currently.icon, true),
            hour1con : this.setIcon(parsed_json.hourly.icon, false),
            hour2con : this.setIcon(parsed_json.hourly.icon, false),
            hour3con : this.setIcon(parsed_json.hourly.icon, false),
            hour4con : this.setIcon(parsed_json.hourly.icon, false),
            hour5con : this.setIcon(parsed_json.hourly.icon, false),
			hour1temp: hourly_temp[1] + "°",
			hour2temp: hourly_temp[2] + "°",
			hour3temp: hourly_temp[3] + "°",
			hour4temp: hourly_temp[4] + "°",
			hour5temp: hourly_temp[5] + "°",
			hour1conditions: hourly_conditions[1],
			hour2conditions: hourly_conditions[2],
			hour3conditions: hourly_conditions[3],
			hour4conditions: hourly_conditions[4],
			hour5conditions: hourly_conditions[5],
			hour1: hourly_time[1],
			hour2: hourly_time[2],
			hour3: hourly_time[3],
			hour4: hourly_time[4],
			hour5: hourly_time[5],
            gear: "../../assets/images/Gear.png",
            dote: "../../assets/images/Empty.png",
            dot1: "../../assets/images/Filled.png",
            dot2: "../../assets/images/Filled.png",
            dot3: "../../assets/images/Filled.png"
		});
	}


	render() {
			// check if temperature data is fetched, if so add the sign styling to the page
			const tempStyles = this.state.temp ? `${style.temperature} ${style.filled}` : style.temperature;

			// display all weather data
			return (
				<div class={ style.container }>
                    <div class={style.top}>
                        <img class={style.gear} src={this.state.gear}/>
                        <div class={style.dots}>
                            <img class={style.dot} src={this.state.dote}/>
                            <img class={style.dot} src={this.state.dot1}/>
                            <img class={style.dot} src={this.state.dot2}/>
                            <img class={style.dot} src={this.state.dot3}/>
                        </div>
                     </div>

                    <div class={style.main}>
                        <div  class={ style.head }>
                            <div class={style.headleft}>
                                <div class={ style.city }>{ this.state.locate }</div>
                                <div class={ style.date }>{ this.state.date }</div>
                            </div>
                            <div class={style.headright}>
						      <div class={ style.temperature }>{ this.state.temp }</div>
                            </div>
                        </div>

                        <div class={style.center}>
                            <img class={style.weatherimg} src={this.state.icon}/>
                            <div class={ style.condition }>{ this.state.cond }</div>
                        </div>

                        <div class={style.info}>
                            <div class={ style.precip }>
                                <div class={ style.label1 }>{ this.state.preciplabel }</div>
                                <div class={ style.text }>{ this.state.precip }</div>
                            </div>

                            <div class={ style.humid }>
                                <div class={ style.label2 }>{ this.state.humidlabel }</div>
                                <div class={ style.text }>{ this.state.humidity }</div>
                            </div>
                        </div>

                        <div class={style.hourly}>
                            <div class={style.hour}>
                                <img class={style.smallimg} src={this.state.hour1con}/>
                                <div class={ style.conditions }>{ this.state.hour1temp }</div>
                            </div>

                            <div class={style.hour}>
                                <img class={style.smallimg} src={this.state.hour2con}/>
                                <div class={ style.conditions }>{ this.state.hour2temp }</div>
                            </div>

                            <div class={style.hour}>
                                <img class={style.smallimg} src={this.state.hour3con}/>
                                <div class={ style.conditions }>{ this.state.hour3temp }</div>
                            </div>

                            <div class={style.hour}>
                                <img class={style.smallimg} src={this.state.hour4con}/>
                                <div class={ style.conditions }>{ this.state.hour4temp }</div>
                            </div>

                            <div class={style.hour}>
                                <img class={style.smallimg} src={this.state.hour5con}/>
                                <div class={ style.conditions }>{ this.state.hour5temp }</div>
                            </div>
                        </div>

                        <div class={style.line}>
                        </div>

                        <div class={style.hours}>
                            <div class={style.hour}>
                                <div class={ style.conditions }>{ this.state.hour1 }</div>
                            </div>
                            <div class={style.hour}>
                                <div class={ style.conditions }>{ this.state.hour2 }</div>
                            </div>
                            <div class={style.hour}>
                                <div class={ style.conditions }>{ this.state.hour3 }</div>
                            </div>
                            <div class={style.hour}>
                                <div class={ style.conditions }>{ this.state.hour4 }</div>
                            </div>
                            <div class={style.hour}>
                                <div class={ style.conditions }>{ this.state.hour5 }</div>
                            </div>
                        </div>
                    </div>
                <div class={style.foot}>

                </div>
				</div>
		);
	}
}
