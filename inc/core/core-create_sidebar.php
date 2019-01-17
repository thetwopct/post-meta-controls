<?php

namespace POSTMETACONTROLS;

// Exit if accessed directly.
if ( ! defined( 'ABSPATH' ) ) { exit; }

/**
 * Create sidebar properties array
 *
 * @since 1.0.0
 */
function create_sidebar() {

	// This is the filter used to add custom sidebars inside other plugins/themes.
	$props_raw = apply_filters( 'pmc_create_sidebar', array() );

	if ( ! is_array( $props_raw ) || empty( $props_raw ) ) {
		return;
	}

	// Create the class instances for each item: sidebars, tabs, panels and settings.
	$instances =
		create_instances(
			array(
				'current'  => 'sidebars',
				'children' => 'tabs',
			),
			$props_raw
		);

	if (
		empty( $instances['sidebars'] ) ||
		empty( $instances['tabs'] ) ||
		empty( $instances['panels'] ) ||
		empty( $instances['settings'] )
	) {
		return;
	}

	// Register the meta fields for those settings that are of meta data_type.
	register_meta( $instances['settings'] );

	// Enqueue the locale moment.js scripts.
	enqueue_locale( $instances['settings'] );

	// Add the action to localize the data into the editor.
	add_action(
		'pmc_after_enqueue',
		function() use ( $instances ) {

			// Set this property here, as the post id wasn't available before.
			set_meta_key_exists( $instances['settings'] );

			$post_type = get_post_type();

			// Create an array of properties to localize into the main script.
			// It checks that the instance is assigned to the current post type.
			$props = array(
				'sidebars' => get_props( $instances['sidebars'], $post_type ),
				'tabs'     => get_props( $instances['tabs'], $post_type ),
				'panels'   => get_props( $instances['panels'], $post_type ),
				'settings' => get_props( $instances['settings'], $post_type ),
			);

			if (
				empty( $props['sidebars'] ) ||
				empty( $props['tabs'] ) ||
				empty( $props['panels'] ) ||
				empty( $props['settings'] )
			) {
				return;
			}

			wp_localize_script( PLUGIN_NAME, 'pmc_items', $props );
		}
	);
}
