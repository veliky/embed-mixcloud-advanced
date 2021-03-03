import {__} from '@wordpress/i18n';
import {Toolbar} from '@wordpress/components';

const WidgetTypesConfig = require('../../config/widget-types');
const IconsConfig = require('../icons');

/**
 * @param {{}} props
 * @return {*}
 */
export default function ToolbarWidgetType(props) {

  const {selected, onSelect} = props;
  const widgetTypesControls = Object.keys(WidgetTypesConfig).map((key) => {

    return {
      ...{
        title: __(WidgetTypesConfig[key]['title'], 'embed-mixcloud-advanced'),
        icon: IconsConfig[key + 'WidgetIcon']
      },
      isActive: selected === key,
      onClick: () => onSelect(key),
    };
  });

  return (
    <Toolbar className={'mea-toolbar'} controls={widgetTypesControls}/>
  );
}

export const WIDGET_TYPES = WidgetTypesConfig;
