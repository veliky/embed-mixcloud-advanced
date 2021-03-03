/**
 * @type {Preview[]}
 */
const instances = [];

/**
 * Presents hover preview functionality
 *
 * @class
 */
export default class Preview {

  /**
   * @param {Element} container
   * @param {Element} previewBtn
   * @param {String} previewUrl
   * @param {function} onPlay
   *
   * @constructor
   */
  static getInstance(container, previewBtn, previewUrl, onPlay) {

    const instance = new Preview(container, previewBtn, previewUrl, onPlay);
    let instanceExists = false;

    instances.forEach(listedInstance => {
      if (listedInstance.previewUrl === instance.previewUrl) {
        instanceExists = true;
      }
    });

    if (!instanceExists) {
      instances.push(instance);
    }

    return instance;
  }

  /**
   * @param {Preview|boolean} instance
   */
  static pauseAll(instance = false) {

    instances.forEach(listedInstance => {
      if (instance === false || listedInstance.previewUrl !== instance.previewUrl) {
        listedInstance.stop(false);
      }
    });
  }

  /**
   * @param {Element} container
   * @param {Element} previewBtn
   * @param {String} previewUrl
   * @param {function} onPlay
   *
   * @constructor
   */
  constructor(container, previewBtn, previewUrl, onPlay) {

    this.container = container;
    this.previewBtn = previewBtn;
    this.previewUrl = previewUrl;
    this.onPlay = onPlay;

    this.play = this.play.bind(this);
    this.stop = this.stop.bind(this);
    this.on = this.on.bind(this);
    this.off = this.off.bind(this);
    this.onClick = this.onClick.bind(this);
    this.observeDeletion = this.observeDeletion.bind(this);

    if (previewUrl && !this.audio) {

      /**
       * Init audio component and setting hover play events
       *
       * @type {HTMLAudioElement}
       */

      this.audio = new Audio(previewUrl);
      this.audio.load();
      this.audio.addEventListener('loadeddata', this.on);
      this.audio.addEventListener('pause', this.stop);
    }

    this.playing = false;
    this.available = true;

    this.observeDeletion();
  }

  /**
   * @this Preview
   */
  observeDeletion() {

    const observer = new MutationObserver((mutations) => {

      mutations.forEach((mutation) => {

        const nodes = Array.from(mutation.removedNodes);

        if (nodes.indexOf(this.container)) {
          this.stop();
        }

      });
    });

    observer.observe(document.body, {
      childList: true
    });
  }

  /**
   * @this Preview
   */
  on() {
    this.previewBtn.addEventListener('click', this.onClick);
  }

  /**
   * Turns off events
   *
   * @this Preview
   */
  off() {
    this.previewBtn.removeEventListener('click', this.onClick);
  }

  /**
   * @this Preview
   */
  onClick() {

    if (this.playing) {
      this.stop(false);
    } else {
      this.play();
    }
  }

  /**
   * @param {number} duration
   */
  updateSpinnerDuration(duration) {
    this.container.style.setProperty('--spinner-duration', duration + 's');
  }

  /**
   * @param {number} progress
   */
  updateSpinnerProgress(progress) {

    // let dashArray = (56 / (this.audio.duration / progress)).toString() + ', ' + 56 - (56 / (this.audio.duration / progress)).toString();

    let dashArray = 56.52 / (this.audio.duration / progress) + ', ' + (56.52 - 56.52 / (this.audio.duration / progress));
    this.container.style.setProperty('--spinner-progress', dashArray);
  }

  /**
   * Plays with a delay
   *
   * @this Preview
   */
  play() {

    const delay = 0.5;
    this.constructor.pauseAll(this);
    this.onPlay();

    if (!this.playing && this.available) {

      this.playing = true;

      setTimeout(() => {

        if (this.playing && this.audio) {

          this.audio.play().then(() => {
            this.updateSpinnerDuration(this.audio.duration - this.audio.currentTime);
            this.container.className = this.container.className.replace(' mea-show__wrapper_pause', '');
            this.container.className += ' mea-show__wrapper_playing';
          });
        }

      }, delay * 1000);
    }
  }

  /**
   * @param {boolean} resetCurrentTime
   *
   * @this Preview
   */
  stop(resetCurrentTime = true) {

    if (this.playing) {

      this.playing = false;

      if (this.audio) {
        this.audio.pause();

        if (resetCurrentTime) {
          this.audio.currentTime = 0;
          this.updateSpinnerProgress(0);
        } else {
          this.container.className += ' mea-show__wrapper_pause';
          this.updateSpinnerProgress(this.audio.currentTime);
        }

        this.container.className = this.container.className.replace(' mea-show__wrapper_playing', '');
      }
    }
  }

  /**
   * Shows previewBtn for a while
   *
   * @param {Number=} duration Visibility duration in seconds
   * @this Preview
   */
  blink(duration = 1) {

    this.container.className += ' mea-show__wrapper_playing';
    this.updateSpinnerDuration(duration);

    setTimeout(() => {
      this.container.className = this.container.className.replace(' mea-show__wrapper_playing', '');
    }, duration * 1000);

  }
}
