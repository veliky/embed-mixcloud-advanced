<?php

namespace Veliky\EMA;

/**
 * Plugin Name:       Embed Mixcloud Advanced
 * Description:       All in one solution for embedding content from mixcloud.com. 2 Shortcodes + 2 Widgets + 2 Gutenberg blocks.
 * Version:           1.0.0
 * Author:            Evhen Veliky
 * Author URI:        https://datcoder.com
 * Plugin URI:        https://datcoder.com/embed-mixcloud-advanced
 * Requires at least: 5.2
 * Tested up to:      5.7
 * Requires PHP:      5.6
 * Domain Path:       /languages
 * License:           GPL v2 or later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 */

defined( 'ABSPATH' ) || exit;

define( __NAMESPACE__ . '\PLUGIN_DIR', plugin_dir_path( __FILE__ ) . '/' );
define( __NAMESPACE__ . '\PLUGIN_URL', plugin_dir_url( __FILE__ ) );
define( __NAMESPACE__ . '\PREFIX', 'vema' );
define( __NAMESPACE__ . '\TXT_DOMAIN', 'embed-mixcloud-advanced' );
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

require_once namespace\PLUGIN_DIR . 'backend/BlockShow.php';
require_once namespace\PLUGIN_DIR . 'backend/BlockList.php';
require_once namespace\PLUGIN_DIR . 'backend/RestPreviewProvider.php';
require_once namespace\PLUGIN_DIR . 'backend/ShortcodeShow.php';
require_once namespace\PLUGIN_DIR . 'backend/ShortcodeList.php';
require_once namespace\PLUGIN_DIR . 'backend/WidgetList.php';
require_once namespace\PLUGIN_DIR . 'backend/WidgetShow.php';

add_action( 'plugins_loaded', __NAMESPACE__ . '\plugin_init' );
function plugin_init() {

	load_plugin_textdomain( TXT_DOMAIN, false, dirname( plugin_basename( __FILE__ ) ) . '/languages/' );

	ShortcodeShow::init();
	ShortcodeList::init();
	RestPreviewProvider::init( new \wp_http );

	new BlockShow();
	new BlockList();
}

add_action( 'widgets_init', function () {
	register_widget( WidgetShow::class );
	register_widget( WidgetList::class );
} );
