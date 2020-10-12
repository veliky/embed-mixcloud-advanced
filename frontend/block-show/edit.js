import {BlockControls} from '@wordpress/block-editor';
import {Button, Notice, Spinner, Toolbar} from '@wordpress/components';
import {Component, createRef} from '@wordpress/element';
import {__} from '@wordpress/i18n';

import Placeholder from './placeholder';
import Show from './show';
import ToolbarPreview from './toolbar-preview';
import ToolbarTheme from './toolbar-theme';
import ToolbarWidgetType from './toolbar-widget-type';
import {WIDGET_TYPES} from './toolbar-widget-type';

const pluginUrl = 'https://datcoder.com/embed-mixcloud-advanced/';

/**
 * @class
 */
export default class Edit extends Component {

  /**
   * @param {{}} props
   * @constructor
   */
  constructor(props) {

    super(props);

    this.setUrl = this.setUrl.bind(this);
    this.emitChangeUrl = this.emitChangeUrl.bind(this);
    this.requestPreview = this.requestPreview.bind(this);
    this.getWidgetProp = this.getWidgetProp.bind(this);
    this.updateAttribute = this.updateAttribute.bind(this);

    this.state = {
      editingURL: false,
      url: props.attributes.url,
      widgetType: props.attributes.widgetType || 'classic',
      theme: props.attributes.theme || 'dark',
      autoplay: props.attributes.autoplay || false,
      previewUrl: props.attributes.previewUrl,
      previewEnabled: props.attributes.previewEnabled,
      previewAlign: props.attributes.previewAlign || 'left',
      previewLoading: false,
      previewLoadingError: false,
      widget: undefined,
      loadPreview: true,
    };

    this._show = createRef();
  }

  /**
   * @param {{}|undefined=} event
   * @this Edit
   */
  setUrl(event = undefined) {

    if (event) {
      event.preventDefault();
    }

    const {
      url,
      previewUrl,
      loadPreview
    } = this.state;
    const {setAttributes} = this.props;

    setAttributes({url});
    this.setState({editingURL: false});

    if (!previewUrl && loadPreview) {
      this.requestPreview();
    }
  }

  /**
   * @param {{}} payload
   * @this Edit
   */
  updateAttribute(payload) {

    this.setState(payload);

    const {setAttributes} = this.props;
    setAttributes(payload);
  }

  /**
   * @this Edit
   */
  emitChangeUrl() {

    this.setState({
      url: undefined,
      editingURL: true,
      previewUrl: undefined
    }, this.setUrl);
  }

  /**
   * @param {string} prop
   * @this Edit
   *
   * @return {*}
   */
  getWidgetProp(prop) {
    return WIDGET_TYPES[this.state.widgetType][prop];
  }

  /**
   * @this Edit
   */
  requestPreview() {

    this.setState({
      previewLoading: true,
      previewLoadingError: false,
    });

    (async () => {

      let response = await fetch(window.location.origin + '/wp-json/vema/v1/preview/?show_url=' + this.state.url);

      if (response.ok) {
        return await response.json();
      } else {
        console.error('HTTP ERROR: ' + response.status);
      }

    })().then((response) => {

      if (response && typeof response['preview_url'] !== 'undefined') {
        this.updateAttribute({previewUrl: response['preview_url']});
      } else {

        if (typeof response['error'] !== 'undefined') {
          this.setState({previewLoadingError: response['error']});
        } else {
          this.setState({previewLoadingError: __('Server responded that something went wrong.', 'embed-mixcloud-advanced')});
        }
      }

      this.setState({previewLoading: false});
    });
  }

  /**
   * @this Edit
   * @return {*}
   */
  render() {

    const {
      url,
      loadPreview,
      widgetType,
      previewUrl,
      editingURL,
      theme,
      autoplay,
      playing,
      previewEnabled,
      previewAlign,
      previewLoading,
      previewLoadingError
    } = this.state;

    const {
      fetching,
      preview,
      cannotEmbed,
      tryAgain,
      isSelected,
    } = this.props;

    if (fetching) {

      return <>
        <div className="wp-block-embed is-loading">
          <Spinner/>
          <p>{__('Embedding…', 'embed-mixcloud-advanced')}</p>
        </div>
      </>;
    }

    if (!fetching && (!preview || cannotEmbed || editingURL)) {
      return <>
        <Placeholder
          previewInfoLink={pluginUrl + '#preview'}
          cannotEmbed={cannotEmbed}
          url={url}
          loadPreview={loadPreview}
          tryAgain={tryAgain}
          onSubmit={this.setUrl}
          onChangeUrl={(event) => this.setState({url: event.target.value})}
          onChangeLoadPreview={() => this.setState({loadPreview: !loadPreview})}
        />
      </>;
    }

    const previewIcon = this.getWidgetProp('previewIcon') ? this.getWidgetProp('previewIcon') : false;

    return <>
      <BlockControls>

        <ToolbarWidgetType
          selected={widgetType}
          onSelect={type => this.updateAttribute({widgetType: type})}
        />

        <ToolbarTheme
          value={theme}
          onClick={value => this.updateAttribute({theme: value})}
        />

        <Toolbar controls={[
          {
            icon: 'controls-play',
            title: __('Autoplay', 'embed-mixcloud-advanced'),
            isActive: autoplay,
            onClick: value => this.updateAttribute({autoplay: !autoplay}),
          },
        ]}/>

        <ToolbarPreview
          emitLoadPreview={this.requestPreview}
          url={previewUrl}
          playing={playing}
          previewLoading={previewLoading}
          previewEnabled={previewEnabled}
          togglePreviewEnabled={() => {
            this.updateAttribute({previewEnabled: !this.state.previewEnabled});
            this._show.current.blinkPreview();
          }}
          previewAlign={previewAlign}
          emitChangePreviewAlign={value => {
            this.updateAttribute({previewAlign: value});
            this._show.current.blinkPreview();
          }}
        />

        <Toolbar controls={[{
          icon: 'edit',
          className: 'mea_preview_control',
          title: __('Edit URL', 'embed-mixcloud-advanced'),
          onClick: this.emitChangeUrl,
        }]}/>

      </BlockControls>

      {previewLoadingError && (
        <Notice status="error" onRemove={() => this.setState({previewLoadingError: false})}>
          {previewLoadingError} {__('You can', 'embed-mixcloud-advanced')}
          &nbsp;<Button isPrimary isSmall onClick={this.requestPreview}>{__('Try again', 'embed-mixcloud-advanced')}</Button> {__('or', 'embed-mixcloud-advanced')}
          &nbsp;<Button isSecondary isSmall href={pluginUrl} target="_blank">{__('Send report', 'embed-mixcloud-advanced')}</Button>
        </Notice>
      )}

      <Show
        ref={this._show}
        updateUrl={false}
        url={url}
        height={WIDGET_TYPES[widgetType].height}
        previewUrl={previewEnabled ? previewUrl : false}
        spinner={previewIcon}
        mini={this.getWidgetProp('mini')}
        autoplay={autoplay}
        hideCover={this.getWidgetProp('hideCover')}
        hideArtwork={this.getWidgetProp('hideArtwork')}
        light={theme === 'light'}
        isSelected={isSelected}
        previewAlign={previewAlign}
      />
    </>;
  }
};
