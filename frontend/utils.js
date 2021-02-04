/**
 * @param {String} url
 *
 * @return {Boolean}
 */
export const matchMixcloudUrl = url => /^\s*(https?:\/\/(.+?\.)?mixcloud\.com\S+)\s*$/i.test(url);

/**
 * @param {String} url
 *
 * @return {string}
 */
export const getMixcloudChannelName = (url) => {

  const match = url.match(new RegExp("com\/([^/]+)"));

  if (match && typeof match[1] === 'string') {
    return match[1];
  }

  return '';

};

/**
 * @type {string}
 */
export const pluginUrl = 'https://datcoder.com/embed-mixcloud-advanced/';
