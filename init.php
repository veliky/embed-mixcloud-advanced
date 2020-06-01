<?php

namespace Veliky\EMA;

/**
 * Plugin Name:       Embed Mixcloud Advanced
 * Description:       Gutenberg block for a shows from mixcloud.com, allows you to customize it using 6 types of layout, two color schemes, and also provides the ability to play a short preview for each widget.
 * Version:           0.0.1
 * Author:            Evgeny Veliky
 * Author URI:        https://datcoder.com
 * Plugin URI:        https://datcoder.com/mixcloud-embed-advanced
 * Requires at least: 5.2
 * Tested up:         5.4
 * Requires PHP:      5.6
 * Text Domain:       ev_ema
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
require_once namespace\PLUGIN_DIR . 'backend/RestPreviewProvider.php';

add_action( 'plugins_loaded', __NAMESPACE__ . '\plugin_init' );
function plugin_init() {
  new Show();
  new RestPreviewProvider( new \wp_http );
}
