<?php

namespace Veliky\EMA;

/**
 * Class WidgetList
 *
 * @package Veliky\EMA
 */
class WidgetList extends \WP_Widget {

	/**
	 * @var ShortcodeList
	 */
	private $shortcode;

	/**
	 * @var WidgetShow
	 */
	private $widget_show;

	/**
	 * @var array
	 */
	private $defaults = [
		'channel'     => '',
		'offset'      => 0,
		'limit'       => 5,
		'since'       => '',
		'until'       => '',
		'widget_type' => 'classic',
		'theme'       => 'dark',
	];

	/**
	 * WidgetList constructor.
	 */
	public function __construct() {

		$this->shortcode   = ShortcodeList::class;
		$this->widget_show = WidgetShow::class;

		parent::__construct( prefix( 'widget_music_list' ), __( 'Mixcloud Advanced - List', 'embed-mixcloud-advanced' ), [
			'description' => __( 'Displays a list of mixcloud shows.', 'embed-mixcloud-advanced' ),
		] );

		add_action( 'admin_enqueue_scripts', [ WidgetShow::class, 'admin_enqueue_scripts' ] );
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
		$this->shortcode::display( $instance );
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

		$instance = wp_parse_args( $instance, $this->defaults );
		wp_print_styles( prefix( 'widgets_style' ) );

		?>

		<div class="mea-widget_list">

			<label for="<?php echo esc_attr( $this->get_field_id( 'channel' ) ); ?>">
				<?php esc_attr_e( 'Channel slug or URL:', 'embed-mixcloud-advanced' ); ?>
			</label>
			<input class="widefat" type="text"
			       id="<?php echo esc_attr( $this->get_field_id( 'channel' ) ); ?>"
			       name="<?php echo esc_attr( $this->get_field_name( 'channel' ) ); ?>"
			       value="<?php echo esc_attr( $instance['channel'] ); ?>">

			<div class="mea-widget_list___filters">
				<label for="<?php echo esc_attr( $this->get_field_id( 'offset' ) ); ?>">
					<span><?php esc_attr_e( 'Offset', 'embed-mixcloud-advanced' ); ?>:</span>
					<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'offset' ) ); ?>"
					       name="<?php echo esc_attr( $this->get_field_name( 'offset' ) ); ?>" type="number"
					       value="<?php echo esc_attr( $instance['offset'] ); ?>">
				</label>

				<label for="<?php echo esc_attr( $this->get_field_id( 'limit' ) ); ?>">
					<span><?php esc_attr_e( 'Limit', 'embed-mixcloud-advanced' ); ?>:</span>
					<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'limit' ) ); ?>"
					       name="<?php echo esc_attr( $this->get_field_name( 'limit' ) ); ?>" type="number"
					       value="<?php echo esc_attr( $instance['limit'] ); ?>">
				</label>
			</div>

			<div class="mea-widget_list___filters">
				<label for="<?php echo esc_attr( $this->get_field_id( 'since' ) ); ?>">
					<span><?php esc_attr_e( 'Since', 'embed-mixcloud-advanced' ); ?>:</span>
					<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'since' ) ); ?>"
					       name="<?php echo esc_attr( $this->get_field_name( 'since' ) ); ?>" type="date"
					       value="<?php echo esc_attr( $instance['since'] ); ?>">
				</label>

				<label for="<?php echo esc_attr( $this->get_field_id( 'until' ) ); ?>">
					<span><?php esc_attr_e( 'Until', 'embed-mixcloud-advanced' ); ?>:</span>
					<input class="widefat" id="<?php echo esc_attr( $this->get_field_id( 'until' ) ); ?>"
					       name="<?php echo esc_attr( $this->get_field_name( 'until' ) ); ?>" type="date"
					       value="<?php echo esc_attr( $instance['until'] ); ?>">
				</label>
			</div>

			<?php $this->widget_show::display_options_panel( $this, $instance ) ?>

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

		$instance = [];

		foreach ( $this->defaults as $key => $default_value ) {
			$instance[ $key ] = ( ! empty( $new_instance[ $key ] ) ) ? sanitize_text_field( $new_instance[ $key ] ) : $this->defaults[ $key ];
		}

		$instance['autoplay'] = ( ! empty( $new_instance['autoplay'] ) );

		return $instance;
	}
}
