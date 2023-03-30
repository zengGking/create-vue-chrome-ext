import MessageEmitter from "../util/MessageEmitter";

/**
 * AJAX
 * @param {string} url 请求路径
 * @param {Object} config 同axios config配置
 * @returns 
 */
export function request(url, config) {
  return new Promise((resolve, reject) => {
    MessageEmitter.prototype.emit.call(this,'ajax', { url, ...config }, (response) => {
      resolve(response);
    })
  });
}