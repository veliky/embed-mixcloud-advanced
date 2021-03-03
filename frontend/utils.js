/**
 * @param {String} url
 *
 * @return {Boolean}
 */
export const matchMixcloudUrl = url => /^\s*(https?:\/\/(.+?\.)?mixcloud\.com\S+)\s*$/i.test(url);

/**
 * @param {String} channel Slug or URL
 *
 * @return {string}
 */
export const getMixcloudChannelName = (channel) => {

  const match = channel.match(new RegExp("com\/([^/]+)"));

  if (match && typeof match[1] === 'string') {
    channel = match[1];
  }

  return channel;

};

/**
 * @param {string} channelName
 * @return {string}
 */
export const getMixcloudChannelURL = (channelName) => `https://www.mixcloud.com/${channelName}`;

/**
 * @type {string}
 */
export const pluginUrl = 'https://datcoder.com/embed-mixcloud-advanced/';
