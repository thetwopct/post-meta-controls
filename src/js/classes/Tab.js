import l, { setSchema } from "../utils";
import Base from "./Base";

class Tab extends Base {
	getPropsDefault() {
		return {
			class_name: "tab",
			id: "",
			path: [],
			index: "",
			label: ""
		};
	}

	getPropsSchema() {
		const schema = {
			class_name: { type: "id" },
			id: { type: "id" },
			path: { type: "array_string" },
			index: { type: "integer" },
			label: { type: "text" }
		};

		const required_keys = ["class_name", "id", "path", "index", "label"];
		const private_keys = ["class_name"];
		const non_empty_values = ["id"];

		setSchema(schema, required_keys, private_keys, non_empty_values);

		return schema;
	}

	prePropsValidation() {
		this.assignPropId();
	}
}

export default Tab;
