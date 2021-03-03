<?php

namespace Veliky\EMA;

/**
 * Class BlockList
 *
 * @package Veliky\EMA
 */
class BlockList {

	/**
	 * @var array
	 */
	private $config = [
		'editor_script' => 'dist/block-list-editor-bundle.min.asset.php',
	];

	/**
	 * BlockList constructor.
	 */
	public function __construct() {

		add_action( 'init', [ $this, 'register_block' ] );
		add_action( 'admin_enqueue_scripts', [ $this, 'wp_enqueue_scripts' ], 5 );
		add_action( 'wp_enqueue_scripts', [ $this, 'wp_enqueue_scripts' ], 5 );
	}

	public function wp_enqueue_scripts() {

		$editor_script_data = include( PLUGIN_DIR . $this->config['editor_script'] );

		wp_register_script(
			prefix( 'block_list_editor_script' ),
			PLUGIN_URL . 'dist/block-list-editor-bundle.min.js',
			$editor_script_data['dependencies'],
			$editor_script_data['version']
		);

		wp_set_script_translations( prefix( 'block_list_editor_script' ), 'embed-mixcloud-advanced', PLUGIN_DIR . 'languages' );
	}

	/**
	 * Registers all block assets so that they can be enqueued through Gutenberg in
	 * the corresponding context.
	 *
	 * Passes translations to JavaScript.
	 */
	public function register_block() {

		register_block_type( 'veliky/mixcloud-list', [
			'editor_script' => prefix( 'block_list_editor_script' ),
			'script'        => prefix( 'public_script' ),
		] );
	}
}
