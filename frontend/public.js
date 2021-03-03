import Preview from './block-show/preview';

let loaded = false;

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
function init() {

  if (loaded) {
    return;
  }

  const widgets = [];
  const previews = [];

  for (let container of document.getElementsByClassName('mea-show__container')) {

    let currentIndex = widgets.length;
    let previewBtn = container.getElementsByClassName('mea-show__preview-btn')[0];
    let wrapper = container.getElementsByClassName('mea-show__wrapper')[0];

    const pauseAllWidgets = (currentIndex = false) => (widget, index) => {
      if (currentIndex === false || currentIndex !== index) {
        widget.pause();
      }
    };

    if (previewBtn && wrapper && wrapper['dataset']['previewUrl']) {

      previews[currentIndex] = Preview.getInstance(container, previewBtn, wrapper['dataset']['previewUrl'], () => {
        if (typeof widgets[currentIndex] !== 'undefined' && typeof widgets[currentIndex].pause !== 'undefined') {
          widgets.forEach(pauseAllWidgets());
        }
      });
    }

    // Avoiding playing previews and shows at the same time

    if (typeof window['Mixcloud'] !== 'undefined') {

      widgets[currentIndex] = window['Mixcloud']['PlayerWidget'](container.getElementsByTagName('iframe')[0]);
      widgets[currentIndex].ready.then(() => {

        widgets[currentIndex].events.play.on(() => {

          widgets.forEach(pauseAllWidgets(currentIndex));

          if (typeof previews[currentIndex] !== 'undefined' ) {
            previews[currentIndex].stop(false);
            previews[currentIndex].constructor.pauseAll(previews[currentIndex]);
          } else {
            Preview.pauseAll();
          }

        });

        // Play next show when previous was ended

        widgets[currentIndex].events.ended.on(() => {

          if (typeof widgets[currentIndex + 1] !== 'undefined') {
            widgets[currentIndex + 1].play();
          }

        });

      });

      loaded = true;
    }
  }
}
