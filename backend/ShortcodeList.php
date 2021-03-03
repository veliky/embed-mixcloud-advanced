<?php

namespace Veliky\EMA;

/**
 * Class ShortcodeList
 *
 * @package Veliky\EMA
 */
class ShortcodeList extends ShortcodeShow {

	/**
	 * Show constructor.
	 */
	public static function init() {
		add_shortcode( prefix('list'), [ __CLASS__, 'get_output' ] );
	}

	/**
	 * @param array $atts
	 *
	 * @return string
	 */
	public static function get_output( $atts = [] ) {

		ob_start();
		self::display( $atts );

		return ob_get_clean();
	}

	/**
	 * @param array $atts
	 */
	public static function display( $atts = [] ) {

		if ( isset( $atts['channel'] ) and ! empty( $atts['channel'] ) ) {

			$shows = self::load_shows( $atts['channel'], $atts );

			foreach ( $shows as $key => $show ) {
				ShortcodeShow::display( array_merge( $show, $atts ) );
				$atts['autoplay'] = ( $atts['autoplay'] and $key == 0 ) ? false : $atts['autoplay'];
			}
		}
	}

	/**
	 * @param string $channel Name of URL
	 * @param array $args
	 *
	 * @return mixed|string
	 */
	public static function load_shows( $channel, $args = [] ) {

		if (filter_var($channel, FILTER_VALIDATE_URL)) {
			$parts = explode('/', trim($channel, '/'));
			$channel = end($parts);
		}

		$shows   = [];
		$request = 'https://api.mixcloud.com/' . $channel . '/cloudcasts/?a=a';

		foreach ( [ 'limit', 'offset', 'since', 'until' ] as $key ) {
			if ( isset( $args[ $key ] ) and ! empty( $args[ $key ] ) ) {
				$request .= "&$key=$args[$key]";
				$request .= in_array( $key, [ 'since', 'until' ] ) ? '+00:00:00' : '';
			}
		}

		$response_json = wp_remote_get( $request );

		if ( ! is_wp_error( $response_json ) ) {
			$response = json_decode( $response_json['body'], true );
			$shows    = $response['data'];
		}

		return $shows;
	}
}
