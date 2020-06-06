import {Toolbar} from '@wordpress/components';
import {__} from '@wordpress/i18n';
import {previewIcon, downloadIcon, previewAlignLeft, previewAlignCenter, previewAlignRight} from './icons';

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
      title: __('Left', 'ev_ema'),
    },
    'center': {
      icon: previewAlignCenter,
      title: __('Center', 'ev_ema'),
    },
    'right': {
      icon: previewAlignRight,
      title: __('Right', 'ev_ema'),
    },
  };

  const alignControls = Object.keys(ALIGNMENT_OPTIONS).map(key => {
    return {
      ...ALIGNMENT_OPTIONS[key],
      isActive: previewAlign === key,
      onClick: () => emitChangePreviewAlign(key),
    };
  });

  if (url) {

    return <>
      <Toolbar
        controls={[
          {
            icon: previewIcon,
            title: __('Enable preview', 'ev_ema'),
            onClick: togglePreviewEnabled,
            isActive: previewEnabled,
          },
        ]}
      />
      {previewEnabled && <Toolbar
        icon={ALIGNMENT_OPTIONS[previewAlign] ? ALIGNMENT_OPTIONS[previewAlign].icon : ALIGNMENT_OPTIONS[DEFAULT_PREVIEW_BTN_ALIGN].icon}
        label={__('Preview button align', 'ev_ema')}
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
        title: __('There is no preview data for this show. Download?', 'ev_ema'),
        isActive: false,
        onClick: emitLoadPreview
      }
    ]}
  />;
}
