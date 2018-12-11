<?php

namespace POSTSETTINGS;

class Tab extends Base {

	protected function get_js_props() {
		return array(
			'id',
			'path',
			// 'index',
			'label',
			// 'post_type',
		);
	}

	protected function get_props_default() {
		return array(
			'id'        => \wp_generate_uuid4(),
			'path'      => array(),
			'index'     => '',
			'label'     => '',
			'post_type' => 'post',
		);
	}

	protected function get_props_schema() {
		$schema = array(
			'id'        => array( 'type' => 'id', ),
			'path'      => array( 'type' => 'array_string', ),
			'index'     => array( 'type' => 'integer', ),
			'label'     => array( 'type' => 'text', ),
			'post_type' => array( 'type' => 'id', ),
		);
		$required_keys = array(
			'id',
			'path',
			'index',
			'label',
			'post_type',
		);
		$private_keys = array(
			// 'id',
		);
		$conditions = array(
			'id'    => 'not_empty',
			'label' => 'not_empty',
		);

		$schema = set_schema( $schema, $required_keys, $private_keys, $conditions );

		return $schema;
	}

	// // TODO: check if this could be set to private.
	// protected function pre_props_validation() {

	// 	$this->assign_prop_id();

	// }
}
