import {__} from '@wordpress/i18n';
import {compose} from '@wordpress/compose';
import {withSelect} from '@wordpress/data';
import {registerBlockType} from '@wordpress/blocks';
import {InnerBlocks} from '@wordpress/block-editor';
import {mixcloudIcon} from '../icons';
import Edit from './edit';
import {getMixcloudChannelURL, matchMixcloudUrl} from "../utils";

registerBlockType('veliky/mixcloud-list', {

  title: __('Mixcloud Advanced - List', 'embed-mixcloud-advanced'),
  icon: mixcloudIcon,

  attributes: {
    channel: {
      type: 'string',
    },
    limit: {
      type: 'string',
      default: '5',
    },
    offset: {
      type: 'string',
      default: '0',
    },
    since: {
      type: 'string',
    },
    until: {
      type: 'string',
    },
    editingURL: {
      type: 'boolean',
      default: true,
    },
  },

  /**
   * @see {Edit}
   */
  edit: compose(
    withSelect((select, ownProps) => {

      const { channel, editingURL } = ownProps.attributes;
      const url = matchMixcloudUrl(channel) ? channel : getMixcloudChannelURL(channel);
      const core = select('core');
      const {
        getEmbedPreview,
        isPreviewEmbedFallback,
        isRequestingEmbedPreview,
      } = core;

      if (editingURL) {
        return;
      }

      const definedUrl = undefined !== url && url !== '';
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
  )(Edit),

  save: ({className}) => {
    return (
      <div className={className}>
        <InnerBlocks.Content allowedBlocks={Edit.allowedBlocks}/>
      </div>
    )
  },
});
