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
		this.setState({ display : true });
	}

	/** Retrieves the weekly weather conditions. Passed in as props. 
	 * @return weeklyWeather the weekly weather conditions
	 */
	weeklyWeather = () => {
		return this.props.weeklyWeather;
	}

	/** Toggles display of weekly weather component
	 */
	visualiseWeekly = () => {
		if (this.state.weekly == false) {
			this.setState({weekly : true});
		}
		else {
			this.setState({weekly : false});

		}
	}

	test = () => {
		console.log("weekly: " + this.weeklyWeather());
	}

	render() {
		return (
			<div class={ style.container }>
			<div class={style.hour}>
                    <div class={style.hourly}>
                            <div class={style.hour}>
                                <div class={ style.conditions }>{ this.state.tempMax1 }</div>
                            </div>

                            <div class={style.hour}>
                                <div class={ style.conditions }>{ this.state.tempMax2 }</div>
                            </div>

                            <div class={style.hour}>
                                <div class={ style.conditions }>{ this.state.tempMax3 }</div>
                            </div>

                            <div class={style.hour}>
                                <div class={ style.conditions }>{ this.state.tempMax4 }</div>
                            </div>

                            <div class={style.hour}>
                                <div class={ style.conditions }>{ this.state.tempMax5 }</div>
                            </div>
                        </div>
            </div>
			</div>
		);
	}
}
