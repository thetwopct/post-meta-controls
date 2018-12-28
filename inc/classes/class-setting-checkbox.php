<?php

namespace POSTSETTINGS;

class Checkbox extends Setting {

	protected function set_defaults() {
		$this_defaults = array(
			'type'          => 'checkbox',
			'default_value' => false,
		);

		$parent_defaults = parent::get_defaults();

		$this->props_defaults =
			wp_parse_args( $this_defaults, $parent_defaults );
	}

	protected function set_schema() {
		$this_schema = array(
			'default_value' => array(
				'type'   => 'boolean',
				'for_js' => true,
			),
			'label' => array(
				'type'       => 'text',
				'for_js'     => true,
				'conditions' => 'not_empty',
			),
		);

		$parent_schema = parent::get_schema();

		$this->props_schema =
			wp_parse_args( $this_schema, $parent_schema );
	}
}
