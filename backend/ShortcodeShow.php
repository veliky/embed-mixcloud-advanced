<?php

namespace Veliky\EMA;

/**
 * Class ShortcodeShow
 *
 * @package Veliky\EMA
 */
class ShortcodeShow {

	/**
	 * @var array
	 */
	private static $mixcloud_widget_types = [];

	/**
	 * Show constructor.
	 */
	public static function init() {

		add_shortcode( prefix( 'show' ), [ __CLASS__, 'get_output' ] );

		self::$mixcloud_widget_types = json_decode( file_get_contents( PLUGIN_DIR . 'config/widget-types.json' ), true );

		foreach ( self::$mixcloud_widget_types as $key => &$args ) {
			$args['title'] = __( $args['title'], 'embed-mixcloud-advanced' );
		}
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

		if ( ! empty( $atts['url'] ) and self::match_mixcloud_url( $atts['url'] ) ) {

			$args = wp_parse_args( $atts, [
				'widget_type'   => 'classic',
				'theme'         => 'dark',
				'autoplay'      => false,
				'preview'       => false,
				'preview_url'   => false,
				'preview_align' => 'right',
			] );

			if ( isset( $args['preview'] ) and $args['preview'] and isset( $args['preview_url'] ) and $args['preview_url'] ) {
				wp_enqueue_script( prefix( 'public_script' ) );
			}

			$widget_type_args = self::$mixcloud_widget_types[ $args['widget_type'] ];

			$url_split = explode( '.com', esc_html__( $args['url'] ) );
			$feed      = $url_split[1];
			$feed      .= substr( $url_split[1], - 1 ) != '/' ? '/' : '';

			$url = 'https://www.mixcloud.com/widget/iframe/?feed=' . $feed .
			       '&light=' . ( $args['theme'] == 'light' ) .
			       ( $args['autoplay'] ? '&autoplay=1' : '' ) .
			       ( isset( $widget_type_args['mini'] ) ? '&mini=' . $widget_type_args['mini'] : '' ) .
			       ( isset( $widget_type_args['hideCover'] ) ? '&hide_cover=' . (int) $widget_type_args['hideCover'] : '' ) .
			       ( isset( $widget_type_args['hideArtwork'] ) ? '&hide_artwork=' . (int) $widget_type_args['hideArtwork'] : '' );

			$preview_btn_classes =
				'mea-show__preview-btn_' . ( isset( $args['preview_align'] ) ? $args['preview_align'] : 'right' ) .
				( $args['theme'] == 'light' ? ' mea-show__preview-btn_light' : '' );

			$autoplay_attr = $args['autoplay'] ? ' allow="autoplay" ' : '';

			?>

			<div class="mea-show__container <?= ( $args['preview'] and $args['preview_url'] ) ? 'mea-show__container_with_preview' : '' ?>">

				<?php if ( $args['preview'] and $args['preview_url'] ) : ?>

					<div class="mea-show__preview-btn  <?= $preview_btn_classes ?>">
						<?= self::get_icon( 'preview' ) ?>
						<span><?= __( 'Preview', 'embed-mixcloud-advanced' ) ?></span>
					</div>

				<?php endif; ?>

				<div class="mea-show__wrapper" data-preview-url="<?= $args['preview_url'] ?>">
					<iframe width="100%" height="<?= $widget_type_args['height'] ?>" src="<?= $url ?>" <?= $autoplay_attr ?> frameBorder="0"></iframe>
				</div>
			</div>

			<?php

		}
	}

	/**
	 * @param string $url
	 *
	 * @return bool
	 */
	public static function match_mixcloud_url( $url ) {

		preg_match_all( '/^\s*(https?:\/\/(.+?\.)?mixcloud\.com\S+)\s*$/i', $url, $matches );

		return isset( $matches[0] ) and ! empty( $matches[0] );
	}

	/**
	 * @param string $name
	 *
	 * @return bool|false|string
	 */
	public static function get_icon( $name ) {

		$path = PLUGIN_DIR . 'icons/' . $name . '.svg';

		if ( file_exists( $path ) ) {
			return file_get_contents( $path );
		}

		return false;
	}
}
