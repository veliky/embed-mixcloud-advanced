<?php

namespace Veliky\EMA;

/**
 * Class RestPreviewProvider
 *
 * @package Veliky\EMA
 */
class RestPreviewProvider {

	/**
	 * @var \WP_Http
	 */
	private static $http;

	/**
	 * RestPreviewProvider initialization.
	 *
	 * @param \WP_Http $http
	 */
	public static function init( $http ) {

		self::$http = $http;

		add_action( 'rest_api_init', function () {

			register_rest_route( REST_NAMESPACE, '/preview/', [
				'method'              => 'GET',
				'callback'            => [ __CLASS__, 'response' ],
				'permission_callback' => '__return_true'
			] );

		} );
	}

	/**
	 * @return \WP_REST_Response
	 */
	public static function response() {

		$response = [];

		if (
			isset( $_REQUEST['show_url'] ) and
			$preview = self::load_preview( $_REQUEST['show_url'] )
		) {

			if ( $preview instanceof \WP_Error ) {
				$response['error'] = $preview->get_error_message();
			} else if ( $preview ) {

				$response = [
					'show_url'    => esc_url( $_REQUEST['show_url'] ),
					'preview_url' => $preview['url'],
				];
			}

		} else {
			$response['error'] = __( 'Show url not specified!', 'embed-mixcloud-advanced' );
		}

		return new \WP_REST_Response( $response, 200 );
	}

	/**
	 * @param string $show_url
	 *
	 * @return array|bool|\WP_Error
	 */
	public static function load_preview( $show_url ) {

		$preview = false;

		if (
			$show_url = esc_url_raw( $show_url ) and
			filter_var( $show_url, FILTER_VALIDATE_URL ) and
			preg_match( '/^\s*(https?:\/\/(.+?\.)?mixcloud\.com\S+)\s*$/i', $show_url )
		) {

			$http_response = self::$http->get( $show_url );

			if ( ! $http_response instanceof \WP_Error ) {

				$matches = [];
				preg_match( '/(?:&quot;previewUrl&quot;:&quot;)(.*?)(?:&quot;)/', $http_response['body'], $matches );

				if ( isset( $matches[1] ) and ! empty( $matches[1] ) ) {
					$preview = [
						'url' => esc_url( $matches[1] ),
					];
				}
			}
		}

		return $preview;
	}
}
