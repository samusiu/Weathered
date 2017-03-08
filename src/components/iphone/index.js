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
import Weather from '../weather';
import Map from '../map';
import Weekly from '../weekly';
import TestButton from '../testButton';


export default class Iphone extends Component {
//var Iphone = React.createClass({

	/** a constructor with initial set states
	 * @param props the properties of the component
	 */
	constructor(props){
		super(props);
		this.setState({ display: true });
		this.setState({ rec: false });
		this.setState({weekly : false});
		var weatherCondition = "";

	}

	/** Retrieves the weather condition. To be passed as props in order
	 * to provide access across the app
	 * @return weatherCondition the current weather condition
	 */
	conditionGetter = () => {
		return this.weatherCondition;
	}

	/** Sets the weather condition. To be passed as props in order
	 * to provide access across the app
	 * @param condition the current weather condition to set
	 */
	conditionSetter = (condition) => {
		this.weatherCondition = condition;
	}

	/** Toggles display of map component
	 */
	visualiseMap = () => {
		if (this.state.rec == false) {
			this.setState({rec : true});
			this.setState({display : false});
		}
		else {
			this.setState({rec : false});
			this.setState({display : true});

		}
	}

	visualizeWeekly = () => {
		if (this.state.weekly == false) {
			this.setState({rec : false});
			this.setState({display : false});
			this.setState({weekly : true})
		}
		else {
			this.setState({rec : true});
			this.setState({display : true});
			this.setState({weekly : false})
		}
	}

	render() {
		return (
			<div>
				{this.state.rec ? null : <Weather setter={this.conditionSetter} dates = {this.dates} tempsMax = {this.tempsMax} tempsMin = {this.tempsMin}/>}
                { this.state.display ? <Button class={ style_iphone.button } clickFunction={ this.visualiseMap }/> : null }
				{ this.state.display ? <TestButton class={ style_iphone.button } clickFunction={ this.visualizeWeekly }/> : null }
				{ this.state.rec ? <Map text={this.visualiseMap} getter={this.conditionGetter} /> : null}
				{ this.state.weekly ? <Weekly dates = {this.dates} tempsMax = {this.tempsMax} tempsMin = {this.tempsMin}/> : null}
			</div>
		);
	}
}
