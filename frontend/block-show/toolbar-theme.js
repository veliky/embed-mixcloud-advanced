import {capitalize} from 'lodash';
import {Toolbar} from '@wordpress/components';
import {lightThemeIcon, darkThemeIcon} from '../icons';
import {__} from '@wordpress/i18n';

/**
 * @param {{}} props
 * @return {*}
 */
export default function ToolbarTheme (props) {

  const { value, onClick } = props;

  function createThumbsControl (theme) {
    return {
      icon: theme === 'light' ? lightThemeIcon : darkThemeIcon,
      title: theme === 'light' ? __('Light', 'embed-mixcloud-advanced') : __('Dark', 'embed-mixcloud-advanced'),
      isActive: value === theme,
      onClick: () => onClick(theme),
    };
  }

  return <Toolbar className={'mea-toolbar'} controls={['light', 'dark'].map(createThumbsControl)}/>;
}
