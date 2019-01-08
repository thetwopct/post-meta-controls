<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

function prepare_options( $options = array() ) {

	$options_clean = array();

	foreach ( $options as $key => $value ) {
		if (
			( ! is_string( $key ) && ! is_int( $key ) ) ||
			( ! is_string( $value ) && ! is_int( $value ) )
		) {
			continue;
		}

		$options_clean[] = array(
			'value' => sanitize_id( $key ),
			'label' => sanitize_text( $value ),
		);
	}

	return $options_clean;
}
