import l, { store_slug } from "../../utils";
import withStoreConnection from "./_withStoreConnection";

const { withState, compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { Component } = wp.element;
const { RadioControl } = wp.components;

class Radio extends Component {
	render() {
		const { options, label, help, value, updateId } = this.props;

		return (
			<RadioControl
				className="ps-control-radio"
				label={label}
				help={help}
				selected={value}
				options={options}
				onChange={updateId}
			/>
		);
	}
}

export default withStoreConnection(Radio);
