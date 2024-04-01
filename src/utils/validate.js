/**
 * Created by PanJiaChen on 16/11/18.
 */

/**
 * @param {string} path
 * @returns {Boolean}
 */
export function isExternal(path) {
  return /^(https?:|mailto:|tel:)/.test(path)
}

/**
 * @param {string} str
 * @returns {number}
 */
export function validUsername(str) {
  // const valid_map = ['super', 'editor']
  // return valid_map.indexOf(str.trim()) >= 0
  return 1
}

export function validPassword(str) {
  // const valid_map = ['super', 'editor']
  // return valid_map.indexOf(str.trim()) >= 0
  return 1
}
