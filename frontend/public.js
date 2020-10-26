import Preview from './block-show/preview';

/**
 * Startup events
 */

document.addEventListener('DOMContentLoaded', init);

if (document.readyState === 'loading') {

  // Init by original event if script loads with page
  window.addEventListener('load', init);

} else {

  // Init if script was loaded dynamically when page loading is done
  init();
}


/**
 * Entry point of blocks on front end
 */
function init () {

  for (let container of document.getElementsByClassName('mea-show__container')) {

    let previewBtn = container.getElementsByClassName('mea-show__preview-btn')[0];
    let wrapper = container.getElementsByClassName('mea-show__wrapper')[0];

    if (previewBtn && wrapper && wrapper['dataset']['previewUrl']) {

      let widget;

      const preview = Preview.getInstance(container, previewBtn, wrapper['dataset']['previewUrl'], () => {
        if (typeof widget !== 'undefined' && typeof widget.pause !== 'undefined') {
          widget.pause();
        }
      });

      // Avoiding playing preview and show at the same time

      if (typeof window['Mixcloud'] !== 'undefined') {

        widget = window['Mixcloud']['PlayerWidget'](wrapper.getElementsByTagName('iframe')[0]);
        widget.ready.then(() => {

          widget.events.play.on(() => {
            preview.stop(false);
            preview.constructor.pauseAll(preview);
          });
        });
      }
    }
  }
}
