import {__} from '@wordpress/i18n';
import {Toolbar} from '@wordpress/components';
import {
  classicWidgetHideArtworkIcon,
  classicWidgetIcon,
  miniWidgetHideArtworkIcon,
  classicWidgetCoveredIcon,
  miniWidgetIcon,
  pictureWidgetIcon
} from '../icons';

export const WIDGET_TYPES = {
  picture: {
    title: __('Large Covered Widget', 'embed-mixcloud-advanced'),
    icon: pictureWidgetIcon,
    height: 180,
    hideCover: false,
  },
  classic: {
    title: __('Classic Widget', 'embed-mixcloud-advanced'),
    icon: classicWidgetIcon,
    height: 120,
    hideCover: true,
  },
  noArtwork: {
    title: __('Widget w/o Artwork', 'embed-mixcloud-advanced'),
    icon: classicWidgetHideArtworkIcon,
    height: 120,
    hideArtwork: true,
    hideCover: true,
  },
  covered: {
    title: __('Covered Widget', 'embed-mixcloud-advanced'),
    icon: classicWidgetCoveredIcon,
    height: 120,
    hideArtwork: true,
    hideCover: false,
  },
  mini: {
    title: __('Mini Widget', 'embed-mixcloud-advanced'),
    icon: miniWidgetIcon,
    height: 60,
    hideCover: true,
    mini: true,
  },
  minNoArtwork: {
    title: __('Mini Widget w/o Artwork', 'embed-mixcloud-advanced'),
    icon: miniWidgetHideArtworkIcon,
    height: 60,
    hideArtwork: true,
    hideCover: true,
    mini: true,
  },
};

/**
 * @param {{}} props
 * @return {*}
 */
export default function ToolbarWidgetType (props) {

  const { selected, onSelect } = props;
  const widgetTypesControls = Object.keys(WIDGET_TYPES).map((key) => {
    return {
      ...{
        title: WIDGET_TYPES[key]['title'],
        icon: WIDGET_TYPES[key]['icon']
      },
      isActive: selected === key,
      onClick: () => onSelect(key),
    };
  });

  return (
    <Toolbar className={'mea-toolbar'} controls={widgetTypesControls}/>
  );
}
