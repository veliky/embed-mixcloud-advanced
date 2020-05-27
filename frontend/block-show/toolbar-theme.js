import {capitalize} from 'lodash';
import {Toolbar} from '@wordpress/components';
import {lightThemeIcon, darkThemeIcon} from './icons';

/**
 * @param {{}} props
 * @return {*}
 */
export default function ToolbarTheme (props) {

  const { value, onClick } = props;

  function createThumbsControl (theme) {
    return {
      icon: theme === 'light' ? lightThemeIcon : darkThemeIcon,
      title: capitalize(theme),
      isActive: value === theme,
      onClick: () => onClick(theme),
    };
  }

  return <Toolbar controls={['light', 'dark'].map(createThumbsControl)}/>;
}
