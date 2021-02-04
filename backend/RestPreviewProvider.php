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
	private $http;

	/**
	 * RestPreviewProvider constructor.
	 *
	 * @param \WP_Http $http
	 */
	public function __construct( $http ) {

		$this->http = $http;

		add_action( 'rest_api_init', function () {

			register_rest_route( REST_NAMESPACE, '/preview/', [
				'method'              => 'GET',
				'callback'            => [ $this, 'response' ],
				'permission_callback' => '__return_true'
			] );

		} );
	}

	/**
	 * @return \WP_REST_Response
	 */
	public function response() {

		$response = [];

		if (
			isset( $_REQUEST['show_url'] ) and
			$show_url = esc_url_raw( $_REQUEST['show_url'] ) and
			filter_var( $show_url, FILTER_VALIDATE_URL ) and
			preg_match( '/^\s*(https?:\/\/(.+?\.)?mixcloud\.com\S+)\s*$/i', $show_url )
		) {

			$http_response = $this->http->get( $show_url );

			if ( ! $http_response instanceof \WP_Error ) {

				$matches = [];
				preg_match( '/(?:&quot;previewUrl&quot;:&quot;)(.*?)(?:&quot;)/', $http_response['body'], $matches );

				$response = $matches;

				if ( isset( $matches[1] ) and ! empty( $matches[1] ) ) {
					$response = [
						'show_url'    => esc_url( $show_url ),
						'preview_url' => esc_url( $matches[1] ),
					];
				}

			} else {
				$response['error'] = $http_response->get_error_message();
			}

		} else {
			$response['error'] = __( 'Show url not specified!', 'embed-mixcloud-advanced' );
		}

		return new \WP_REST_Response( $response, 200 );
	}
}
