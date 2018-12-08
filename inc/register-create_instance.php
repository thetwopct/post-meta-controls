<?php

namespace POSTSETTINGS;

function create_instance(
	$class_name = '',
	$elements = array(),
	$path = array(),
	$meta_key_prefix_from_sidebar = ''
) {

	if ( ! is_array( $elements ) ) {
		return array();
	}

	$props = array();

	foreach ( $elements as $key => $element ) {
		if ( ! is_array( $element ) ) {
			continue;
		}

		$class_instance      = false;
		$is_valid            = false;
		$id                  = '';
		$children_els        = array();
		$children_class_name = '';

		$element['path']  = $path;
		$element['index'] = $key;

		if ( 'sidebar' === $class_name && ! empty( $element['tabs'] ) ) {

			$class_instance      = new Sidebar( $element );
			$children_els        = $element['tabs'];
			$children_class_name = 'tab';
			$meta_key_prefix_from_sidebar = $class_instance->get_meta_key_prefix();

		} elseif ( 'tab' === $class_name && ! empty( $element['panels'] ) ) {

			$class_instance      = new Tab( $element );
			$children_els        = $element['panels'];
			$children_class_name = 'panel';

		} elseif ( 'panel' === $class_name && ! empty( $element['settings'] ) ) {

			$class_instance      = new Panel( $element );
			$children_els        = $element['settings'];
			$children_class_name = 'setting';

		} elseif ( 'setting' === $class_name && ! empty( $element['type'] ) ) {

			$element['meta_key_prefix_from_sidebar'] = $meta_key_prefix_from_sidebar;

			if ( 'checkbox' === $element['type'] ) {
				$class_instance = new Checkbox( $element );
			} elseif ( 'radio' === $element['type'] ) {
				$class_instance = new Radio( $element );
			} elseif ( 'custom_component' === $element['type'] ) {
				// new CustomComponent( $element );
			}
		}

		if ( $class_instance !== false ) {
			$is_valid = $class_instance->is_valid();
			$id       = $class_instance->get_id();
		}

		if ( true !== $is_valid || empty( $id ) ) {
			return;
		}

		$props_this = $class_instance->get_props_for_js();

		if ( ! empty( $children_class_name ) ) {
			$props_this[ $children_class_name . "s" ] =
				create_instance(
					$children_class_name,
					$children_els,
					array_merge( $path, array( $id ) ),
					$meta_key_prefix_from_sidebar
				);
		}

		$props = array_merge( $props, array( $props_this ) );
	}

	return $props;
}
