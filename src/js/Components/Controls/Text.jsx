import l, { plugin_slug } from "../../utils";
import withStoreConnection from "./_withStoreConnection";

const { Component } = wp.element;
const { TextControl } = wp.components;

class Text extends Component {
	render() {
		const { label, help, placeholder, value, updateValue } = this.props;

		return (
			<TextControl
				className={`${plugin_slug}-control-text`}
				label={label}
				help={help}
				placeholder={placeholder}
				value={value}
				onChange={updateValue}
			/>
		);
	}
}

export default withStoreConnection(Text);
