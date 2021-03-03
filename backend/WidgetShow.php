<?php

namespace Veliky\EMA;

/**
 * Class WidgetShow
 *
 * @package Veliky\EMA
 */
class WidgetShow extends \WP_Widget {

	/**
	 * @var array
	 */
	private static $widget_types = [];

	/**
	 * @var ShortcodeShow
	 */
	private static $shortcode;

	/**
	 * @var RestPreviewProvider
	 */
	private static $preview_provider;

	/**
	 * @var array
	 */
	private static $defaults = [
		'url'           => '',
		'widget_type'   => 'classic',
		'theme'         => 'dark',
		'preview_align' => 'right',
	];

	/**
	 * WidgetShow constructor.
	 */
	public function __construct() {

		self::$shortcode        = ShortcodeShow::class;
		self::$preview_provider = RestPreviewProvider::class;

		$widget_types = json_decode( file_get_contents( PLUGIN_DIR . 'config/widget-types.json' ), true );

		foreach ( $widget_types as $key => $args ) {
			self::$widget_types[ $key ]          = $args;
			self::$widget_types[ $key ]['title'] = __( $args['title'], 'embed-mixcloud-advanced' );
		}

		parent::__construct( prefix( 'widget_music_show' ), __( 'Mixcloud Advanced', 'embed-mixcloud-advanced' ), [
			'description' => __( 'Displays a mixcloud show.', 'embed-mixcloud-advanced' ),
		] );

		add_action( 'admin_enqueue_scripts', [ __CLASS__, 'admin_enqueue_scripts' ] );
	}

	/**
	 * Registers widget form styles
	 */
	public static function admin_enqueue_scripts() {

		wp_register_style(
			prefix( 'widgets_style' ),
			PLUGIN_URL . 'dist/widgets.min.css',
			[],
			filemtime( PLUGIN_DIR . 'dist/widgets.min.css' )
		);
	}

	/**
	 * Front-end display of widget.
	 *
	 * @param array $args Widget arguments.
	 * @param array $instance Saved values from database.
	 *
	 * @see WP_Widget::widget()
	 *
	 */
	public function widget( $args, $instance ) {

		echo $args['before_widget'];
		self::$shortcode::display( $instance );
		echo $args['after_widget'];
	}

	/**
	 * Back-end widget form.
	 *
	 * @param array $instance Previously saved values from database.
	 *
	 * @see WP_Widget::form()
	 *
	 */
	public function form( $instance ) {

		wp_enqueue_style( prefix( 'widgets_style' ) );

		?>

		<div class="mea-widget_show">

			<label for="<?= esc_attr( $this->get_field_id( 'url' ) ); ?>"><?php esc_attr_e( 'URL:' ); ?></label>
			<input class="widefat" type="text"
			       id="<?= esc_attr( $this->get_field_id( 'url' ) ); ?>"
			       name="<?= esc_attr( $this->get_field_name( 'url' ) ); ?>"
			       value="<?= esc_attr( @$instance['url'] ); ?>">

			<?php self::display_options_panel( $this, $instance, true ) ?>

		</div>

		<?php
	}

	/**
	 * @param WidgetShow|WidgetList $object
	 * @param array $instance
	 * @param bool $allow_preview (optional)
	 */
	public static function display_options_panel( $object, $instance, $allow_preview = false ) {

		$widget_type   = ( ! empty( $instance['widget_type'] ) ) ? $instance['widget_type'] : 'classic';
		$theme         = ( ! empty( $instance['theme'] ) ) ? $instance['theme'] : 'dark';
		$preview_align = ( ! empty( $instance['preview_align'] ) ) ? $instance['preview_align'] : 'right';

		$instance = wp_parse_args( $instance, array_merge( self::$defaults, [
			'autoplay'    => false,
			'preview'     => $allow_preview,
			'preview_url' => false,
		] ) );

		?>

		<div class="mea-widget_show___filters">
			<div class="mea-widget_show___filters-row" aria-label="<?= __( 'Widget type', 'embed-mixcloud-advanced' ) ?>">

				<?php foreach ( self::$widget_types as $key => $args ) : ?>

					<label title="<?= $args['title'] ?>" class="<?= $widget_type == $key ? 'icon_active' : '' ?>">
						<input type="radio"
						       name="<?= esc_attr( $object->get_field_name( 'widget_type' ) ); ?>"
						       value="<?= $key ?>" <?= $widget_type == $key ? 'checked' : '' ?>>
						<?= self::$shortcode::get_icon( 'type-' . $key ) ?>
					</label>

				<?php endforeach; ?>

			</div>

			<div class="mea-widget_show___filters-row">

				<label title="<?= __( 'Light', 'embed-mixcloud-advanced' ) ?>">
					<input type="radio" id="<?= esc_attr( $object->get_field_id( 'theme_light' ) ); ?>"
					       name="<?= esc_attr( $object->get_field_name( 'theme' ) ); ?>"
					       value="light" <?= $theme == 'light' ? 'checked' : '' ?>>
					<?= self::$shortcode::get_icon( 'theme-light' ) ?>
				</label>

				<label title="<?= __( 'Autoplay', 'embed-mixcloud-advanced' ) ?>">
					<input type="checkbox" <?= $instance['autoplay'] ? 'checked' : '' ?>
					       name="<?= esc_attr( $object->get_field_name( 'autoplay' ) ); ?>">
					<span class="icon">
						<span class="dashicon dashicons dashicons-controls-play"></span>
					</span>
				</label>

				<label
					title="<?= $instance['preview_url'] ? __( 'Enable preview', 'embed-mixcloud-advanced' ) : __( 'Download and enable preview', 'embed-mixcloud-advanced' ) ?>">
					<input type="checkbox" <?= $instance['preview'] ? 'checked' : '' ?>
					       id="<?= esc_attr( $object->get_field_id( 'preview' ) ); ?>"
						<?= $allow_preview ? '' : ' disabled="disabled" ' ?>
						   name="<?= esc_attr( $object->get_field_name( 'preview' ) ); ?>">
					<?= $instance['preview_url'] ? self::$shortcode::get_icon( 'preview' ) : self::$shortcode::get_icon( 'preview-down' ) ?>
				</label>

				<label title="<?= __( 'Preview button align: Left', 'embed-mixcloud-advanced' ) ?>">
					<input type="radio" name="<?= esc_attr( $object->get_field_name( 'preview_align' ) ); ?>"
						<?= $allow_preview ? '' : ' disabled="disabled" ' ?>
						   value="left" <?= $preview_align == 'left' ? 'checked' : '' ?>>
					<?= self::$shortcode::get_icon( 'preview-btn-left' ) ?>
				</label>

				<label title="<?= __( 'Preview button align: Center', 'embed-mixcloud-advanced' ) ?>">
					<input type="radio" name="<?= esc_attr( $object->get_field_name( 'preview_align' ) ); ?>"
						<?= $allow_preview ? '' : ' disabled="disabled" ' ?>
						   value="center" <?= $preview_align == 'center' ? 'checked' : '' ?>>
					<?= self::$shortcode::get_icon( 'preview-btn-center' ) ?>
				</label>

				<label title="<?= __( 'Preview button align: Right', 'embed-mixcloud-advanced' ) ?>">
					<input type="radio" name="<?= esc_attr( $object->get_field_name( 'preview_align' ) ); ?>"
						<?= $allow_preview ? '' : ' disabled="disabled" ' ?>
						   value="right" <?= $preview_align == 'right' ? 'checked' : '' ?>>
					<?= self::$shortcode::get_icon( 'preview-btn-right' ) ?>
				</label>

			</div>
		</div>

		<?php
	}

	/**
	 * Sanitize widget form values as they are saved.
	 *
	 * @param array $new_instance Values just sent to be saved.
	 * @param array $old_instance Previously saved values from database.
	 *
	 * @return array Updated safe values to be saved.
	 * @see WP_Widget::update()
	 *
	 */
	public function update( $new_instance, $old_instance ) {

		foreach ( self::$defaults as $key => $default_value ) {
			$instance[ $key ] = ( ! empty( $new_instance[ $key ] ) ) ? sanitize_text_field( $new_instance[ $key ] ) : self::$defaults[ $key ];
		}

		$instance['autoplay'] = ( ! empty( $new_instance['autoplay'] ) );
		$instance['preview']  = ( ! empty( $new_instance['preview'] ) );

		if ( empty( $new_instance['preview_url'] ) ) {

			if ( $preview = self::$preview_provider::load_preview( $instance['url'] ) ) {
				$instance['preview_url'] = isset( $preview['url'] ) ? $preview['url'] : false;
			}

		} else {
			$instance['preview_url'] = sanitize_text_field( $new_instance['preview_url'] );
		}

		return $instance;
	}
}
