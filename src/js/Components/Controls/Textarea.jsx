import l, { plugin_slug } from "../../utils";
import withStoreConnection from "./_withStoreConnection";

const { Component } = wp.element;
const { TextareaControl } = wp.components;

class Textarea extends Component {
	render() {
		const { label, help, placeholder, value, updateValue } = this.props;

		return (
			<TextareaControl
				className={`${plugin_slug}-control-textarea`}
				label={label}
				help={help}
				placeholder={placeholder}
				value={value}
				onChange={updateValue}
			/>
		);
	}
}

export default withStoreConnection(Textarea);
