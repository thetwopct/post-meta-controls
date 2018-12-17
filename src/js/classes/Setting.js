import l from "../utils";
import uuid from "uuid/v4";
import Base from "./Base";

class Setting extends Base {
	isDataTypeNotNone() {
		const types_can_have_meta = [
			"checkbox",
			"radio",
			"select",
			"range",
			"text",
			"textarea",
			"color",
			"image"
		];
		if (
			this.props.data_type === "meta" &&
			types_can_have_meta.includes(this.props.type)
		) {
			return true;
		}

		const types_can_have_localstorage = [
			"checkbox",
			"radio",
			"select",
			"range",
			"color"
		];
		if (
			this.props.data_type === "localstorage" &&
			types_can_have_localstorage.includes(this.props.type)
		) {
			return true;
		}

		return false;
	}

	getDataKey() {
		return this.props.data_key_with_prefix;
	}

	getPrivates() {
		return ["class_name", "warnings"];
	}

	getDefaults() {
		return {
			class_name: "setting",
			warnings: [],
			id: uuid(),
			path: [],
			label: "",
			type: "",
			description: "",
			help: "",
			data_type: "none",
			metadata_exists: false,
			data_key_with_prefix: ""
		};
	}

	getSchema() {
		const data_type_not_none = this.isDataTypeNotNone();

		return {
			class_name: {
				type: "id",
				conditions: "not_empty"
			},
			warnings: {
				type: "array_empty"
			},
			id: {
				type: "id",
				conditions: "not_empty"
			},
			path: {
				type: "array_id",
				conditions: "not_empty"
			},
			label: {
				type: "text"
			},
			type: {
				type: "id",
				conditions: "not_empty"
			},
			description: {
				type: "text"
			},
			help: {
				type: "text"
			},
			data_type: {
				type: "id"
			},
			metadata_exists: {
				type: "boolean"
			},
			data_key_with_prefix: {
				type: "id",
				conditions: data_type_not_none ? "not_empty" : false
			}
		};
	}
}

export default Setting;
