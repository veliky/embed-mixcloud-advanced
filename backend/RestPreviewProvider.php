<?php
namespace Veliky\MEA;

/**
 * Class RestPreviewProvider
 *
 * @package Veliky\MEA
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
  public function __construct($http) {

    $this->http = $http;

    add_action('rest_api_init', function() {

      register_rest_route(REST_NAMESPACE, '/preview/', [
        'method' => 'GET',
        'callback' => [$this, 'response']
      ]);

    });
  }

  /**
   * @return \WP_REST_Response
   */
  public function response() {

    $response = [];

    if (isset($_REQUEST['show_url']) and $_REQUEST['show_url']) {

      $response['show_url'] = $_REQUEST['show_url'];
      $http_response = $this->http->get($_REQUEST['show_url']);

      if (! $http_response instanceof \WP_Error) {

        $matches = [];
        preg_match('/(?:&quot;previewUrl&quot;:&quot;)(.*?)(?:&quot;)/', $http_response['body'], $matches);

        if (isset($matches[1]) and ! empty($matches[1])) {
          $response['preview_url'] = $matches[1];
        }

      } else {
        $response['error'] = $http_response->get_error_message();
      }

    } else {
      $response['error'] = __('Show url not specified!', 'ev_mea');
    }

    return new \WP_REST_Response($response, 200);
  }
}
