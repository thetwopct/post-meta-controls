import l, { store_slug } from "../../utils";

const { compose } = wp.compose;
const { withSelect, withDispatch } = wp.data;
const { Component } = wp.element;
const { isEmpty } = lodash;

const withStoreConnection = WrappedComponent => {
	return class extends Component {
		render() {
			return <WrappedComponent {...this.props} />;
		}
	};
};

export default compose([
	withSelect((select, { id }) => {
		const { getEditedPostAttribute } = select("core/editor");

		return {
			meta: getEditedPostAttribute("meta")
		};
	}),
	withDispatch((dispatch, { id, data_key_with_prefix, value: value_old }) => {
		const { updateSettingValue } = dispatch(store_slug);
		const { editPost } = dispatch("core/editor");

		return {
			update: value_new => {
				updateSettingValue(id, data_key_with_prefix, value_new);
				if (!isEmpty(data_key_with_prefix)) {
					editPost({
						meta: { [data_key_with_prefix]: value_new }
					});
				}
			},
			toggle: () => {
				updateSettingValue(id, data_key_with_prefix, !value_old);
				if (!isEmpty(data_key_with_prefix)) {
					editPost({ meta: { [data_key_with_prefix]: !value_old } });
				}
			}
		};
	}),
	withStoreConnection
]);
