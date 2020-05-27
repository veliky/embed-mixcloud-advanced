import {BlockIcon} from '@wordpress/block-editor';
import {Button, Placeholder, CheckboxControl, ExternalLink, Dashicon} from '@wordpress/components';
import {__, _x} from '@wordpress/i18n';
import {previewIcon} from './icons';

export default (props) => {

  const {
    cannotEmbed,
    url,
    previewInfoLink,
    loadPreview,
    onSubmit,
    onChangeUrl,
    onChangeLoadPreview,
  } = props;

  return (
    <Placeholder
      icon={<BlockIcon icon={previewIcon} showColors/>}
      label={__('Mixcloud Embed Advanced')}
      className="wp-block-embed"
      instructions={cannotEmbed ? __('This content could not be embedded!') : __('Paste a link to the content you want to display on your site.')}
    >

      <form onSubmit={onSubmit}>
        <input
          type="url"
          value={url || ''}
          className={'components-placeholder__input' + (cannotEmbed ? ' components-placeholder__input-error' : '')}
          aria-label={__('Mixcloud URL')}
          placeholder={__('Enter URL to embed here…')}
          onChange={onChangeUrl}
        />
        <Button isSecondary type="submit">
          {_x('Embed', 'button label')}
        </Button>
      </form>

      <form>
        <CheckboxControl className='components-placeholder__learn-more'
                         label={__('Enable preview')}
                         checked={loadPreview}
                         onChange={onChangeLoadPreview}/>
      </form>
      <div>
        <div>
          {__('This function can be disabled. To download preview data, a request will be made from the server to the show page.')}
          &nbsp;<ExternalLink href={previewInfoLink} target='_blank'>See more</ExternalLink>
        </div>
      </div>

    </Placeholder>
  );
};
