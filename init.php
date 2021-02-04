<?php

namespace Veliky\EMA;

/**
 * Plugin Name:       Embed Mixcloud Advanced
 * Description:       This plugin adds two Gutenberg blocks for embedding shows from mixcloud.com: "Mixcloud Advanced" and "Mixcloud Advanced - List".
 * Version:           0.2.4
 * Author:            Evhen Veliky
 * Author URI:        https://datcoder.com
 * Plugin URI:        https://datcoder.com/embed-mixcloud-advanced
 * Requires at least: 5.2
 * Tested up:         5.6
 * Requires PHP:      5.6
 * Domain Path:       /languages
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */

defined( 'ABSPATH' ) || exit;

define( __NAMESPACE__ . '\PLUGIN_DIR', plugin_dir_path( __FILE__ ) . '/' );
define( __NAMESPACE__ . '\PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( __NAMESPACE__ . '\PREFIX', 'vema' );
define( __NAMESPACE__ . '\REST_NAMESPACE', 'vema/v1' );

/**
 * Adds plugin prefix to string
 *
 * @param string $string
 *
 * @return string
 */
function prefix( $string ) {
	return PREFIX . '_' . $string;
}

require_once namespace\PLUGIN_DIR . 'backend/Show.php';
require_once namespace\PLUGIN_DIR . 'backend/BlockList.php';
require_once namespace\PLUGIN_DIR . 'backend/RestPreviewProvider.php';

add_action( 'plugins_loaded', __NAMESPACE__ . '\plugin_init' );
function plugin_init() {

	load_plugin_textdomain('embed-mixcloud-advanced', false, dirname(plugin_basename(__FILE__)) . '/languages/');

	new Show();
	new BlockList();
	new RestPreviewProvider( new \wp_http );
}
