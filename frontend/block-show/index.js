import {__} from '@wordpress/i18n';
import {registerBlockType} from '@wordpress/blocks';
import {compose} from '@wordpress/compose';
import {withSelect, withDispatch} from '@wordpress/data';

import Edit from './edit';
import Show from './show';
import {previewIcon} from './icons';
import {WIDGET_TYPES} from './toolbar-widget-type';

/**
 * @param {String} url
 *
 * @return {Boolean}
 */
export const matchMixcloudUrl = url => /^\s*(https?:\/\/(.+?\.)?mixcloud\.com\S+)\s*$/i.test(url);

/**
 * Back end Gutenberg entry point
 */
registerBlockType('veliky/mixcloud-show', {

  title: __('Mixcloud Advanced', 'ev_mea'),
  icon: previewIcon,
  category: 'embed',
  supports: {
    align: true,
  },
  attributes: {
    url: {
      type: 'string',
    },
    widgetType: {
      type: 'string',
    },
    theme: {
      type: 'string',
    },
    autoplay: {
      type: 'boolean',
    },
    previewUrl: {
      type: 'string',
    },
    previewEnabled: {
      type: 'boolean',
      default: true,
    },
    previewAlign: {
      type: 'string',
      default: 'right',
    }
  },

  /**
   * Composition of the WP embedding algorithm with the block editing component
   *
   * @see {Edit}
   */
  edit: compose(
    withSelect((select, ownProps) => {

      const { url } = ownProps.attributes;
      const core = select('core');
      const {
        getEmbedPreview,
        isPreviewEmbedFallback,
        isRequestingEmbedPreview,
      } = core;

      const definedUrl = undefined !== url;
      const preview = definedUrl && getEmbedPreview(url);

      const previewIsFallback = definedUrl && isPreviewEmbedFallback(url);
      const fetching = definedUrl && isRequestingEmbedPreview(url);

      // The external oEmbed provider does not exist. We got no type info and no html.
      const badEmbedProvider = !!preview && undefined === preview.type && false === preview.html;

      // Some WordPress URLs that can't be embedded will cause the API to return
      // a valid JSON response with no HTML and `data.status` set to 404, rather
      // than generating a fallback response as other embeds do.
      const wordpressCantEmbed = !!preview && preview.data && preview.data.status === 404;

      const validPreview = !!preview && !badEmbedProvider && !wordpressCantEmbed;
      const cannotEmbed = definedUrl && (!matchMixcloudUrl(url) || !validPreview || previewIsFallback);

      return {
        preview: validPreview ? preview : undefined,
        fetching,
        cannotEmbed,
      };

    }),

    withDispatch((dispatch, ownProps) => {

      const { url, widgetType, theme, autoplay } = ownProps.attributes;
      const coreData = dispatch('core/data');

      const tryAgain = () => {
        coreData.invalidateResolution('core', 'getEmbedPreview', [
          url
        ]);
      };
      return { tryAgain };

    })
  )(Edit),

  /**
   * Renders a block for publication
   *
   * @param {{}} attributes
   *
   * @return {null|*}
   */
  save ({ attributes }) {

    const { url, widgetType, previewUrl, theme, previewAlign } = attributes;

    if (!url) {
      return null;
    }

    const widget = WIDGET_TYPES[widgetType || 'classic'];

    return (
      <figure>
        <Show
          updateUrl={true}
          url={url}
          height={widget.height}
          previewUrl={previewUrl}
          spinner={widget.previewIcon}
          mini={widget.mini}
          hideCover={widget.hideCover}
          hideArtwork={widget.hideArtwork}
          light={theme && theme === 'light'}
          previewAlign={previewAlign}
        />
      </figure>
    );
  },
});
