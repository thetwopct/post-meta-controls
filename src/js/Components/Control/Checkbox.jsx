import l, { store_slug } from "../../utils";
import withStoreConnection from "./_withStoreConnection";

const { withState, compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { Component } = wp.element;
const { CheckboxControl } = wp.components;

class Checkbox extends Component {
	render() {
		const { label, help, value, toggleBool } = this.props;

		return (
			<CheckboxControl
				className="ps-control-checkbox"
				label={label}
				help={help}
				checked={value}
				onChange={toggleBool}
			/>
		);
	}
}

export default withStoreConnection(Checkbox);
