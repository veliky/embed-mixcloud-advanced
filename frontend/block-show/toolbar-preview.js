import {Toolbar, ToolbarGroup} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {previewIcon, downloadIcon, previewAlignLeft, previewAlignCenter, previewAlignRight} from '../icons';

/**
 * @param {{}} props
 * @return {*}
 */
export default function ToolbarPreview (props) {

  const {
    url,
    emitLoadPreview,
    previewEnabled,
    togglePreviewEnabled,
    previewAlign,
    emitChangePreviewAlign,
    previewLoading
  } = props;

  const DEFAULT_PREVIEW_BTN_ALIGN = 'right';
  const ALIGNMENT_OPTIONS = {
    'left': {
      icon: previewAlignLeft,
      title: __('Left', 'embed-mixcloud-advanced'),
    },
    'center': {
      icon: previewAlignCenter,
      title: __('Center', 'embed-mixcloud-advanced'),
    },
    'right': {
      icon: previewAlignRight,
      title: __('Right', 'embed-mixcloud-advanced'),
    },
  };

  const alignControls = Object.keys(ALIGNMENT_OPTIONS).map(key => {
    return {
      ...ALIGNMENT_OPTIONS[key],
      isActive: previewAlign === key,
      className: 'aaa',
      onClick: () => emitChangePreviewAlign(key),
    };
  });

  if (url) {

    return <>
      <Toolbar
        className={'mea-toolbar'}
        controls={[
          {
            icon: previewIcon,
            title: __('Enable preview', 'embed-mixcloud-advanced'),
            onClick: togglePreviewEnabled,
            isActive: previewEnabled,
          },
        ]}
      />
      {previewEnabled && <ToolbarGroup className={'mea-toolbar'}
        icon={ALIGNMENT_OPTIONS[previewAlign] ? ALIGNMENT_OPTIONS[previewAlign].icon : ALIGNMENT_OPTIONS[DEFAULT_PREVIEW_BTN_ALIGN].icon}
        label={__('Preview button align', 'embed-mixcloud-advanced')}
        isCollapsed={true}
        controls={alignControls}
      />}
    </>;
  }

  return <Toolbar
    icon={previewIcon}
    controls={[
      {
        icon: downloadIcon(previewLoading),
        title: __('There is no preview data for this show. Download?', 'embed-mixcloud-advanced'),
        isActive: false,
        onClick: emitLoadPreview
      }
    ]}
  />;
}
