import {BlockIcon} from '@wordpress/block-editor';
import {TextControl, Button, Placeholder, CheckboxControl, ExternalLink} from '@wordpress/components';
import {__, _x} from '@wordpress/i18n';
import {mixcloudIcon} from '../icons';

export default (props) => {

  const {
    cannotLoad,
    url,
    limit,
    offset,
    since,
    until,
    previewInfoLink,
    loadPreview,
    editingChildURL,
    onChangeURL,
    inverse,
    onSubmit,
    onChangeValue,
  } = props;

  const onChange = (key) => (value) => {
    onChangeValue(key, value);
  };

  return (
    <Placeholder
      icon={<BlockIcon icon={mixcloudIcon} showColors/>}
      label={__('Mixcloud Advanced - List', 'embed-mixcloud-advanced')}
      className="wp-block-embed"
      instructions={cannotLoad ? __('Something went wrong!', 'embed-mixcloud-advanced') : __('To import shows from a Mixcloud channel please select the parameters and press button.', 'embed-mixcloud-advanced')}
    >

      <form className={"mea-list__form"} onSubmit={onSubmit}>
        <div className={"mea-list__form__group"}>
          <input
            type="url"
            value={url || ''}
            className={'components-placeholder__input' + (cannotLoad ? ' components-placeholder__input-error' : '')}
            aria-label={__('Mixcloud Channel URL', 'embed-mixcloud-advanced')}
            placeholder={__('Enter channel URL here…', 'embed-mixcloud-advanced')}
            onChange={onChangeURL}
          />

          <Button isPrimary type="submit" tabIndex={0}>
            {_x('Embed', 'button label')}
          </Button>
        </div>

        <div className={"mea-list__form__group_secondary"}>

          <label>
            <span>{__('Offset', 'embed-mixcloud-advanced')}:</span>
            <TextControl
              autoFocus={true}
              type="number"
              value={offset}
              onChange={onChange('offset')}
              aria-label={__('Offset', 'embed-mixcloud-advanced')}
            />
          </label>

          <label>
            <span>{__('Limit', 'embed-mixcloud-advanced')}:</span>
            <TextControl
              type="number"
              value={limit}
              onChange={onChange('limit')}
              aria-label={__('Limit', 'embed-mixcloud-advanced')}
            />
          </label>

          <label>
            <span>{__('Since', 'embed-mixcloud-advanced')}:</span>
            <TextControl
              tabIndex={-1}
              type="date"
              value={since}
              onChange={onChange('since')}
              aria-label={__('Since', 'embed-mixcloud-advanced')}
            />
          </label>

          <label>
            <span>{__('Until', 'embed-mixcloud-advanced')}:</span>
            <TextControl
              tabIndex={-1}
              type="date"
              value={until}
              onChange={onChange('until')}
              aria-label={__('Until', 'embed-mixcloud-advanced')}
            />
          </label>

        </div>
      </form>

      <form>
        <CheckboxControl className='components-placeholder__learn-more'
                         label={__('Enable preview on each show', 'embed-mixcloud-advanced')}
                         checked={loadPreview}
                         onChange={inverse('loadPreview')}/>
        <CheckboxControl className='components-placeholder__learn-more'
                         label={__('Placeholder instead widget (editing parameters mode)', 'embed-mixcloud-advanced')}
                         checked={editingChildURL}
                         onChange={inverse('editingChildURL')}/>
      </form>

      <div>
        {__('To download the preview data, a request will be made from the server to the show page.', 'embed-mixcloud-advanced')}
      </div>

    </Placeholder>
  );
};
