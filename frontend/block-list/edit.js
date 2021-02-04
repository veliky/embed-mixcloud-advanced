import {__} from '@wordpress/i18n';
import {Component} from '@wordpress/element';
import {useSelect, useDispatch, dispatch} from '@wordpress/data';
import {createBlock} from '@wordpress/blocks';
import {InnerBlocks} from '@wordpress/block-editor';
import {select} from '@wordpress/data';
import Placeholder from './placeholder';
import {withFocusReturn, Spinner} from '@wordpress/components';
import {getMixcloudChannelName, pluginUrl} from '../utils';

export default withFocusReturn(class Edit extends Component {


  withFocusReturn() {
    debugger;

  }

  /**
   * @param {{}} props
   * @this Edit
   * @constructor
   */
  constructor(props) {

    super(props);

    this.setUrl = this.setUrl.bind(this);
    this.submit = this.submit.bind(this);
    this.requestShows = this.requestShows.bind(this);
    this.initInnerBlocks = this.initInnerBlocks.bind(this);
    this.__set = this.__set.bind(this);

    this.state = {
      url: props.attributes.url,
      limit: props.attributes.limit,
      offset: props.attributes.offset,
      since: props.attributes.since || '',
      until: props.attributes.until || '',
      editingURL: props.attributes.editingURL,
      shows: props.attributes.url || [],
      loadPreview: props.attributes.url || true,
      editingChildURL: props.attributes.editingChildURL || false,
    };
  }

  /**
   * @param {string} url
   * @this Edit
   */
  setUrl(url) {

    this.__set({url});

    if (this.props.cannotEmbed && !this.state.editingURL) {
      this.__set({editingURL: true});
    }
  }

  /**
   * @this Edit
   */
  submit(event = undefined) {

    if (event) {
      event.preventDefault();
    }

    const {url} = this.state;

    if (url) {
      this.__set({editingURL: false});
      this.requestShows();
    }
  }

  /**
   * @param {{}} payload
   * @this Edit
   */
  __set(payload) {

    this.setState(payload);
    this.props.setAttributes(payload);
  }

  /**
   * @this Edit
   */
  requestShows() {

    this.setState({
      fetching: true,
    });

    const {url} = this.state;

    (async () => {

      let request = 'https://api.mixcloud.com/' + getMixcloudChannelName(url) + '/cloudcasts/?a=a';

      ['limit', 'offset', 'since', 'until'].forEach((element, index) => {
        if (this.state[element]) {
          request += `&${element}=${this.state[element]}`;
          request += ['since', 'until'].indexOf(element) > -1 ? ' 00:00:00' : '';
        }
      });

      const response = await fetch(request);

      if (response.ok) {
        return await response.json();
      } else {
        console.error('HTTP ERROR: ' + response.status);
      }

    })().then((response) => {

      if (typeof response.data !== 'undefined') {
        this.setState({shows: response.data});
      }

      const {setAttributes} = this.props;
      setAttributes({shows: response.data});

      this.initInnerBlocks();

    });
  }

  /**
   * @this Edit
   */
  initInnerBlocks() {

    const {shows, loadPreview, editingChildURL} = this.state;

    if (typeof shows !== 'undefined' && typeof shows.length !== 'undefined') {
      for (let i = 0; i < shows.length; i++) {

        const {index} = select('core/block-editor').getBlockInsertionPoint();
        let block = createBlock('veliky/mixcloud-show', {
          url: shows[i].url,
          loadPreview,
          editingURL: editingChildURL
        });

        dispatch('core/editor').insertBlocks(
          block,
          index,
          this.props.clientId
        );
      }

      this.__set({editingURL: true});
    }
  }

  /**
   * @this Edit
   */
  render() {

    const {
      url,
      limit,
      offset,
      since,
      until,
      loadPreview,
      editingChildURL
    } = this.state;

    const {
      className,
      allowedBlocks,
      cannotEmbed,
      fetching,
    } = this.props;

    if (fetching) {

      return <>
        <div className="wp-block-embed is-loading">
          <Spinner/>
          <p>{__('Loading…', 'embed-mixcloud-advanced')}</p>
        </div>
      </>;
    }

    return (
      <div className={'mea-list__container ' + className}>

        {!fetching && <Placeholder
          cannotLoad={cannotEmbed}
          url={url}
          limit={limit}
          offset={offset}
          since={since}
          until={until}
          previewInfoLink={pluginUrl + '#preview'}
          loadPreview={loadPreview}
          editingChildURL={editingChildURL}
          onSubmit={this.submit}
          onChangeValue={(key, value) => this.__set({[key]: value})}
          onChangeURL={event => this.setUrl(event.target.value)}
          inverse={key => event => this.setState({[key]:!this.state[key]})}
        />}

        <InnerBlocks allowedBlocks={allowedBlocks}/>
      </div>
    )
  }
})
