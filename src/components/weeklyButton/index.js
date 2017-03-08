// import preact
import { h, render, Component } from 'preact';
import style from './style';

export default class WeeklyButton extends Component {

	// rendering a function when the button is clicked
	render({clickFunction}) {
		if(!clickFunction){
			clickFunction = () => {
				console.log("passed something as 'clickFunction' that wasn't a function !");
			}
		}
		return (
			<div>
				<button class={style.button} onClick={clickFunction}>Weekly</button>
			</div>
		);
	}
}
