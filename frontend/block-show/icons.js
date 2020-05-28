import {Path, Rect, Circle, Polygon, SVG} from '@wordpress/components';

export const embedAudioIcon = (
  <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <Path fill="none" d="M0 0h24v24H0V0z"/>
    <Path d="M21 3H3c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h18c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2zm0 16H3V5h18v14zM8 15c0-1.66 1.34-3 3-3 .35 0 .69.07 1 .18V6h5v2h-3v7.03c-.02 1.64-1.35 2.97-3 2.97-1.66 0-3-1.34-3-3z"/>
  </SVG>
);

export const lightThemeIcon = (
  <SVG viewBox="0 0 302.4 302.4" xmlns="http://www.w3.org/2000/svg">
    <path d="M204.8,97.6C191.2,84,172,75.2,151.2,75.2s-40,8.4-53.6,22.4c-13.6,13.6-22.4,32.8-22.4,53.6s8.8,40,22.4,53.6
				c13.6,13.6,32.8,22.4,53.6,22.4s40-8.4,53.6-22.4c13.6-13.6,22.4-32.8,22.4-53.6S218.8,111.2,204.8,97.6z"/>
    <path d="M151.2,51.6c5.6,0,10.4-4.8,10.4-10.4V10.4c0-5.6-4.8-10.4-10.4-10.4c-5.6,0-10.4,4.8-10.4,10.4v30.8
				C140.8,46.8,145.6,51.6,151.2,51.6z"/>
    <path d="M236.4,80.8l22-22c4-4,4-10.4,0-14.4s-10.4-4-14.4,0l-22,22c-4,4-4,10.4,0,14.4C225.6,84.8,232,84.8,236.4,80.8z"/>
    <path d="M292,140.8h-30.8c-5.6,0-10.4,4.8-10.4,10.4c0,5.6,4.8,10.4,10.4,10.4H292c5.6,0,10.4-4.8,10.4-10.4
				C302.4,145.6,297.6,140.8,292,140.8z"/>
    <path d="M236,221.6c-4-4-10.4-4-14.4,0s-4,10.4,0,14.4l22,22c4,4,10.4,4,14.4,0s4-10.4,0-14.4L236,221.6z"/>
    <path d="M151.2,250.8c-5.6,0-10.4,4.8-10.4,10.4V292c0,5.6,4.8,10.4,10.4,10.4c5.6,0,10.4-4.8,10.4-10.4v-30.8
				C161.6,255.6,156.8,250.8,151.2,250.8z"/>
    <path d="M66,221.6l-22,22c-4,4-4,10.4,0,14.4s10.4,4,14.4,0l22-22c4-4,4-10.4,0-14.4C76.8,217.6,70.4,217.6,66,221.6z"/>
    <path d="M51.6,151.2c0-5.6-4.8-10.4-10.4-10.4H10.4c-5.6,0-10.4,4.8-10.4,10.4s4.8,10.4,10.4,10.4h30.8
				C46.8,161.6,51.6,156.8,51.6,151.2z"/>
    <path d="M66,80.8c4,4,10.4,4,14.4,0s4-10.4,0-14.4l-22-22c-4-4-10.4-4-14.4,0s-4,10.4,0,14.4L66,80.8z"/>
  </SVG>
);

export const darkThemeIcon = (
  <SVG viewBox="0 0 480 480" xmlns="http://www.w3.org/2000/svg">
    <Path d="M459.782,347.328c-4.288-5.28-11.488-7.232-17.824-4.96c-17.76,6.368-37.024,9.632-57.312,9.632
			c-97.056,0-176-78.976-176-176c0-58.4,28.832-112.768,77.12-145.472c5.472-3.712,8.096-10.4,6.624-16.832
			S285.638,2.4,279.078,1.44C271.59,0.352,264.134,0,256.646,0c-132.352,0-240,107.648-240,240s107.648,240,240,240
			c84,0,160.416-42.688,204.352-114.176C464.55,360.032,464.038,352.64,459.782,347.328z"/>
  </SVG>
);

export const pictureWidgetIcon = (
  <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <Rect height="20" width="20" y="2" x="2" fillOpacity="0" strokeOpacity="null" strokeWidth="2" stroke="currentColor"/>
  </SVG>
);

export const classicWidgetIcon = (
  <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <Rect height="12" width="22" y="6" x="1" fillOpacity="0" strokeOpacity="null" strokeWidth="2" stroke="currentColor"/>
    <line strokeLinecap="null" strokeLinejoin="null" y2="7" x2="11" y1="18" x1="11" fillOpacity="null" strokeOpacity="null" strokeWidth="2" stroke="currentColor" fill="none"/>
    <line strokeLinecap="null" strokeLinejoin="null" y2="12" x2="11" y1="12" x1="22" fillOpacity="null" strokeOpacity="null" strokeWidth="2" stroke="currentColor" fill="none"/>
  </SVG>
);

export const miniWidgetIcon = (
  <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <Rect height="8" width="22" y="8" x="1" fillOpacity="0" strokeOpacity="null" strokeWidth="2" stroke="currentColor"/>
    <line strokeLinecap="null" strokeLinejoin="null" y2="9" x2="10" y1="16" x1="10" fillOpacity="null" strokeOpacity="null" strokeWidth="2" stroke="currentColor" fill="none"/>
  </SVG>
);

export const classicWidgetHideArtworkIcon = (
  <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <Rect height="12" width="22" y="6" x="1" fillOpacity="0" strokeOpacity="null" strokeWidth="2" stroke="currentColor"/>
    <line strokeLinecap="null" strokeLinejoin="null" y2="12" x2="2" y1="12" x1="22" fillOpacity="null" strokeOpacity="null" strokeWidth="2" stroke="currentColor" fill="none"/>
  </SVG>
);

export const classicWidgetCoveredIcon = (
  <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <Rect height="12" width="22" y="6" x="1" fillOpacity="0" strokeOpacity="null" strokeWidth="2" stroke="currentColor"/>
  </SVG>
);

export const miniWidgetHideArtworkIcon = (
  <SVG viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
    <Rect height="8" width="22" y="8" x="1" fillOpacity="0" strokeOpacity="null" strokeWidth="2" stroke="currentColor"/>
  </SVG>
);

export const previewIcon = (
  <SVG className='mea-show__spinner' width="20" height='20' viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <Circle cx="10" cy="10" r="9"/>
    <path d="M8 6l6 4.03L8 14V6z" fill="currentColor"/>
  </SVG>
);

export const downloadIcon = (rotate = false) => {

  const classes = 'mea-show__spinner' + (rotate ? ' mea-show__spinner_download' : '');

  return <SVG className={classes} width="20" height='20' viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
    <Circle cx="10" cy="10" r="9"/>
    <path d="M14 8l-4.03 6L6 8h8z" fill="currentColor"/>
  </SVG>
};

export const previewAlignLeft = (
  <SVG width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false">
    <line strokeLinecap="null" strokeLinejoin="null" y2="2" x2="1" y1="2" x1="9" fillOpacity="null" strokeOpacity="null" strokeWidth="2" stroke="currentColor" fill="none"/>
    <Rect height="12" width="22" y="6" x="1" fillOpacity="0" strokeOpacity="null" strokeWidth="2" stroke="currentColor"/>
    <line strokeLinecap="null" strokeLinejoin="null" y2="7" x2="11" y1="18" x1="11" fillOpacity="null" strokeOpacity="null" strokeWidth="2" stroke="currentColor" fill="none"/>
    <line strokeLinecap="null" strokeLinejoin="null" y2="12" x2="11" y1="12" x1="22" fillOpacity="null" strokeOpacity="null" strokeWidth="2" stroke="currentColor" fill="none"/>
  </SVG>
);

export const previewAlignCenter = (
  <SVG width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false">
    <line strokeLinecap="null" strokeLinejoin="null" y2="2" x2="8" y1="2" x1="16" fillOpacity="null" strokeOpacity="null" strokeWidth="2" stroke="currentColor" fill="none"/>
    <Rect height="12" width="22" y="6" x="1" fillOpacity="0" strokeOpacity="null" strokeWidth="2" stroke="currentColor"/>
    <line strokeLinecap="null" strokeLinejoin="null" y2="7" x2="11" y1="18" x1="11" fillOpacity="null" strokeOpacity="null" strokeWidth="2" stroke="currentColor" fill="none"/>
    <line strokeLinecap="null" strokeLinejoin="null" y2="12" x2="11" y1="12" x1="22" fillOpacity="null" strokeOpacity="null" strokeWidth="2" stroke="currentColor" fill="none"/>
  </SVG>
);

export const previewAlignRight = (
  <SVG width="24" height="24" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg" role="img" aria-hidden="true" focusable="false">
    <line strokeLinecap="null" strokeLinejoin="null" y2="2" x2="15" y1="2" x1="23" fillOpacity="null" strokeOpacity="null" strokeWidth="2" stroke="currentColor" fill="none"/>
    <Rect height="12" width="22" y="6" x="1" fillOpacity="0" strokeOpacity="null" strokeWidth="2" stroke="currentColor"/>
    <line strokeLinecap="null" strokeLinejoin="null" y2="7" x2="11" y1="18" x1="11" fillOpacity="null" strokeOpacity="null" strokeWidth="2" stroke="currentColor" fill="none"/>
    <line strokeLinecap="null" strokeLinejoin="null" y2="12" x2="11" y1="12" x1="22" fillOpacity="null" strokeOpacity="null" strokeWidth="2" stroke="currentColor" fill="none"/>
  </SVG>
);
