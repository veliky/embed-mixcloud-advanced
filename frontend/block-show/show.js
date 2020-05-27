import {Component, createRef} from '@wordpress/element';
import {__} from '@wordpress/i18n';
import Preview from './preview';
import {previewIcon} from "./icons";

/**
 * @class
 */
export default class Show extends Component {

  /**
   * @param {{}} props
   * @constructor
   */
  constructor(props) {

    super(props);

    this.hideOverlay = this.hideOverlay.bind(this);

    this.state = {
      interactive: false,
    };

    this._iframe = createRef();
  }

  getContainer () {
    return this._iframe.current.parentElement.parentElement;
  }

  getPreviewBtn () {
    return this.getContainer().getElementsByClassName('mea-show__preview-btn')[0];
  }

  /**
   * @this Show
   */
  componentDidMount() {

    if (this.props.previewUrl) {
      this.preview = Preview.getInstance(this.getContainer(), this.getPreviewBtn(), this.props.previewUrl, () => this.pause());
    }

    this._iframe.current.addEventListener('load', event => {
      this.updateWidgetOptions();
    });
  }

  /**
   * Automatically stop playing preview when a block has been deleted
   *
   * @this Show
   */
  componentWillUnmount() {

    if (this.preview) {
      this.preview.stop();
    }
  }

  /**
   * @this Show
   */
  componentDidUpdate() {

    if (!this.preview && this.props.previewUrl) {
      this.preview = Preview.getInstance(this.getContainer(), this.getPreviewBtn(), this.props.previewUrl, () => this.pause());
    }

    if (this.preview) {
      if (!this.props.previewUrl) {
        this.preview.off();
      } else {
        this.preview.on();
      }
    }

    this.updateWidgetOptions();
  }

  /**
   * @this Show
   */
  pause () {
    if (typeof this.widget !== 'undefined' && typeof this.widget.pause !== 'undefined') {
      this.widget.pause()
    }
  }

  /**
   * @this Show
   */
  blinkPreview() {

    if (this.preview) {
      this.preview.blink();
    }
  }

  /**
   * @this Show
   */
  updateWidgetOptions() {

    const update = () => {

      if (this.widget.setOption) {

        this.widget.setOption('mini', this.props.mini);
        this.widget.setOption('light', this.props.light);
        this.widget.setOption('hide_artwork', this.props.hideArtwork);
        this.widget.setOption('hide_cover', this.props.hideCover);

        if (this.props.autoplay) {
          this.widget.play();
        } else {
          this.widget.pause();
        }

        // Avoiding playing preview and show at the same time

        this.widget.events.play.on(() => {
          if (this.preview) {
            this.preview.stop(false);
            this.preview.constructor.pauseAll(this.preview);
          }
        });
      }

    };

    console.log(window['Mixcloud']['PlayerWidget']);

    if (typeof window['Mixcloud']['PlayerWidget'] !== 'undefined') {

      if (!this.widget || this._iframe.current.getBoundingClientRect()['y'] !== this.iframeY) {

        this.widget = window['Mixcloud']['PlayerWidget'](this._iframe.current);
        this.iframeY = this._iframe.current.getBoundingClientRect()['y'];

        this.widget.ready.then(() => {

          this._iframe.current.style.setProperty('visibility', 'visible');
          update();

        });
      }

      update();
    }
  }

  /**
   * @param {{}} nextProps
   * @param {{}} state
   *
   * @static
   * @see @wordpress/block-library/src/embed/embed-preview.js:35
   *
   * @return {null|{interactive: Boolean}}
   */
  static getDerivedStateFromProps(nextProps, state) {

    if (!nextProps.isSelected && state.interactive) {

      // We only want to change this when the block is not selected, because changing it when
      // the block becomes selected makes the overlap disappear too early. Hiding the overlay
      // happens on mouseup when the overlay is clicked.
      return {interactive: false};
    }

    return null;
  }

  /**
   * @this Show
   * @see @wordpress/block-library/src/embed/embed-preview.js:46
   */
  hideOverlay() {

    // This is called onMouseUp on the overlay. We can't respond to the `isSelected` prop
    // changing, because that happens on mouse down, and the overlay immediately disappears,
    // and the mouse event can end up in the preview content. We can't use onClick on
    // the overlay to hide it either, because then the editor misses the mouseup event, and
    // thinks we're multi-selecting blocks.
    this.setState({interactive: true});
  }

  /**
   * @this Show
   * @return {String|Boolean}
   */
  getUrl() {

    let {
      url,
      updateUrl,
      mini,
      hideCover,
      hideArtwork,
      light,
    } = this.props;

    if (url) {

      let [base, showPath] = url.split('.com');
      url = 'https://www.mixcloud.com/widget/iframe/?feed=' + showPath + (
        updateUrl ? (
          '&mini=' + (mini | 0) +
          '&hide_cover=' + (hideCover | 0) +
          '&hide_artwork=' + (hideArtwork | 0) +
          '&light=' + (light | 0)
        ) : '');

      return url;
    }

    return false;
  }

  /**
   * @this Show
   */
  render() {

    let {
      previewUrl,
      height,
      light,
      previewAlign,
      autoplay,
    } = this.props;

    const {interactive} = this.state;
    const url = this.getUrl();

    if (url) {

      const containerClasses = 'mea-show__container' + (previewUrl ? ' mea-show__container_with_preview' : '');
      const btnAlignClass = ' mea-show__preview-btn_' + previewAlign;

      return (
        <div
          className={containerClasses}
          onFocus={this.hideOverlay}
        >
          {previewUrl && (
            <div
              className={'mea-show__preview-btn ' + (light ? 'mea-show__preview-btn_light' : '') + btnAlignClass}>
              {previewIcon}
              <span>{__('Preview')}</span>
            </div>
          )}
          <div
            className='mea-show__wrapper'
            data-preview-url={previewUrl}
          >
            <iframe ref={this._iframe} width="100%" height={height} src={url} frameBorder="0" allow={autoplay ? 'autoplay' : null}/>
          </div>

          {!interactive && (
            <div
              className="block-library-embed__interactive-overlay"
              onMouseUp={this.hideOverlay}
            />
          )}
        </div>
      );
    }
  }
}
